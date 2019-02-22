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

  <div class="requirementmodel">
    <requirement-modal ref="reqDialog" :requirement="this.theSelectedObject"/> 
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Environment" label-for="requirementModelEnvironment" :label-cols="4" >
            <dimension-select id="requirementModelEnvironment" ref="requirementModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Requirement" label-for="requirementModelRequirement" :label-cols="3" >
            <dimension-select id="requirementModelRequirement" ref="requirementModelRequirement" dimension="requirement" initial="all" includeall v-on:dimension-select-change="requirementSelected" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    </b-card>
    <graphical-model v-if="theEnvironmentName != ''" :api="requirementModelURI" v-on:graphical-model-url="nodeClicked"/>
  </div>
</template>

<script>

import axios from 'axios';
import GraphicalModel from '@/components/GraphicalModel.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'
import RequirementModal from '@/components/RequirementModal.vue'
import EventBus from '../utils/event-bus';

export default {
  computed : {
    requirementModelURI() {
      return "/api/requirements/model/environment/" + this.theEnvironmentName + "/requirement/" + this.theRequirementName;
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      theRequirementName : 'all',
      theSelectedObject: null
    }
  },
  components : {
    DimensionSelect,
    GraphicalModel,
    RequirementModal
  },
  methods : {
    nodeClicked(url) {
      const dimName = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      if (['requirements'].indexOf(dimName) == -1) {
        return;
      }
      axios.get(url,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        this.theSelectedObject = response.data;
        this.$refs.reqDialog.show();  
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    },
    environmentSelected(envName) {
      this.theEnvironmentName = envName
      if (this.$refs.requirementsModelRequirement != undefined) {
        this.theRequirementName = 'all'
        this.$refs.requirementModelRequirement.selected = this.theRequirementName;
      }
    },
    requirementSelected(reqName) {
      this.theRequirementName = reqName
    }
  }
}
</script>
