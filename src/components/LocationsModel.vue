<template>
<!--  
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.

Authors: Shamal Faily 
-->

  <div class="locationsmodel">
    <asset-modal ref="assetDialog" :environment="this.theEnvironmentName" :asset="this.theSelectedObject"/> 
    <risk-modal ref="riskDialog" :environment="this.theEnvironmentName" :risk="this.theSelectedObject" :responseList="this.theResponseList"/> 
    <persona-modal ref="personaDialog" :environment="this.theEnvironmentName" :persona="this.theSelectedObject" /> 
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Location" label-for="locationsModelLocation" :label-cols="4" >
            <dimension-select id="locationsModelLocation" ref="locationsModelLocation" dimension="locations" v-on:dimension-select-change="locationsSelected" v-on:dimension-items-updated="locationsLoaded" />
          </b-form-group>
        </b-col>
        <b-col v-if="theLocationsName != ''">
          <b-form-group label="Environment" label-for="locationsModelEnvironment" :label-cols="4" >
            <dimension-select id="locationsModelEnvironment" ref="locationsModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" v-on:dimension-items-updated="environmentsLoaded" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    </b-card>
    <graphical-model v-if="theEnvironmentName != ''" :api="locationsModelURI" v-on:graphical-model-url="nodeClicked"/>
  </div>
</template>

<script>

import axios from 'axios';
import GraphicalModel from '@/components/GraphicalModel.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'
import AssetModal from '@/components/AssetModal.vue'
import RiskModal from '@/components/RiskModal.vue'
import PersonaModal from '@/components/PersonaModal.vue'
import EventBus from '../utils/event-bus';

export default {
  computed : {
    locationsModelURI() {
      return "/api/locations/model/locations/" + this.theLocationsName + "/environment/" + this.theEnvironmentName;
    }
  },
  data() {
    return {
      theLocationsName : '',
      theEnvironmentName : '',
      theResponseList : [],
      theSelectedObject: null
    }
  },
  components : {
    DimensionSelect,
    GraphicalModel,
    AssetModal,
    RiskModal,
    PersonaModal,
  },
  methods : {
    nodeClicked(url) {
      const dimName = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      if (['assets','risks','personas'].indexOf(dimName) == -1) {
        return;
      }
      axios.get(url,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        this.theSelectedObject = response.data;
        if (dimName == 'assets') {
          this.$refs.assetDialog.show();  
        }
        else if (dimName == 'personas') {
          this.$refs.personaDialog.show();  
        }
        else if (dimName == 'risks') {
          axios.get('/api/risks/name/' + this.theSelectedObject.theName + '/threat/' + this.theSelectedObject.theThreatName + '/vulnerability/' + this.theSelectedObject.theVulnerabilityName + '/environment/' + this.theEnvironmentName,{
            baseURL : this.$store.state.url,
            params : {'session_id' : this.$store.state.session}
          })
          .then(response => {
            this.theResponseList = response.data;
            this.$refs.riskDialog.show();  
          })
          .catch((error) => {
            EventBus.$emit('operation-failure',error)
          })
        }
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    },
    locationsSelected(locsName) {
      this.theLocationsName = locsName
    },
    locationsLoaded(locsName) {
      this.theLocationsName = locsName
    },
    environmentSelected(envName) {
      this.theEnvironmentName = envName
    },
    environmentsLoaded(envName) {
      this.theEnvironmentName = envName
    }
  }
}
</script>
