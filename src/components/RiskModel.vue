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

  <div class="riskmodel">
    <side-bar :dimension="theSelectedDimension" :panelParameters="panelParameters" :panelObject="theSelectedObject" />
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Environment" label-for="riskModelEnvironment">
            <dimension-select ref="riskModelEnvironment" id="riskModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" v-on:dimension-items-updated="environmentsLoaded" /> 
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Type" label-for="riskModelType">
            <b-form-select id="riskModelType" ref="riskModelType" v-model="filterParameters.dimension_name" :options="dimensionTypes" class="mb-3" v-on:change="typeSelected" required />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Name" label-form="riskModelName">
            <dimension-select id="riskModelName" ref="riskModelName" :environment="theEnvironmentName" :dimensionUrl="nameURI" includeall v-on:dimension-select-change="nameSelected" v-on:dimension-items-updated="namesLoaded" /> 
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Layout">
            <b-form-radio-group id="riskModelRadioLayout" v-model="filterParameters.orientation" :options="orientationOptions" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Tags" label-form="riskModelTagGroups">
            <b-form-checkbox id="riskModelTagGroups" v-model="isTagged" v-on:change="tagUpdated" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    </b-card>
    <graphical-model v-if="theEnvironmentName != ''" ref="graphicalModel" :api="riskModelURI" :jsonParameters="this.filterParameters" v-on:graphical-model-url="nodeClicked"/>
  </div>
</template>

<script>

import axios from 'axios';
import SideBar from '@/components/SideBar.vue';
import DimensionSelect from '@/components/DimensionSelect.vue';
import GraphicalModel from '@/components/GraphicalModel.vue';
import EventBus from '../utils/event-bus';

export default {
  computed : {
    riskModelURI() {
      return "/api/risks/model/environment/" + this.theEnvironmentName;
    },
    nameURI() {
      return "api/risks/model/environment/" + this.theEnvironmentName + "/names"
    },
    panelParameters() {
      return this.theEnvironmentName != '' ? {'environment' : this.theEnvironmentName, 'responses' : this.theResponseList} : undefined;
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      theType : 'all',
      theResponseList : [],
      filterParameters : {
        dimension_name : 'all',
        object_name : 'all',
        layout : 'Hierarchical',
        orientation: 'Vertical',
        tagged : '0'
      },
      dimensionTypes : ['all','asset','attacker','countermeasure','document_reference','obstacle','requirement','response','risk','role','task','threat','vulnerability'],
      theSelectedObject: null,
      theSelectedDimension : '',
      isTagged : false,
      orientationOptions: [
        {text: 'Vertical', value: 'Vertical'},
        {text: 'Horizontal', value: 'Horizontal'}
      ]
    }
  },
  components : {
    GraphicalModel,
    DimensionSelect,
    SideBar
  },
  methods : {
    nodeClicked(url) {
      this.theSelectedDimension = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      if (['assets','attackers','countermeasures','document_references','misusecases','obstacles','requirements','responses','risks','roles','tasks','threats','vulnerabilities'].indexOf(this.theSelectedDimension) == -1) {
        return;
      }
      axios.get(url,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        let dimObjt = response.data;
        if (this.theSelectedDimension == 'risks') {
          axios.get('/api/risks/name/' + dimObjt.theName + '/threat/' + dimObjt.theThreatName + '/vulnerability/' + dimObjt.theVulnerabilityName + '/environment/' + this.theEnvironmentName,{
            baseURL : this.$store.state.url,
            params : {'session_id' : this.$store.state.session}
          })
          .then(response => {
            this.theResponseList = response.data;
            this.theSelectedObject = dimObjt;
          })
          .catch((error) => {
            EventBus.$emit('operation-failure',error)
          })
        }
        else {
          this.theSelectedObject = dimObjt;
        }
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    },
    environmentChanged(envName) {
      this.theEnvironmentName = envName;
      this.$refs.riskModelEnvironment.selected = envName;
      this.filterParameters.dimension_name = 'all';
      this.filterParameters.tagged = (this.isTagged == true ? '1' : '0');
      if (this.$refs.riskModelType != undefined) {
        this.$refs.riskModelType.selected = 'all';
      }
      if (this.$refs.riskModelName != undefined) {
        this.$refs.riskModelName.selected = 'all';
      }
    },
    environmentSelected(envName) {
      this.environmentChanged(envName);
    },
    environmentsLoaded(envName) {
      this.environmentChanged(envName);
    },
    typeSelected() {
      if (this.$refs.riskModelName != undefined) {
        this.filterParameters.tagged = (this.isTagged == true ? '1' : '0');
        this.$refs.riskModelName.selected = 'all';
      }
    }, 
    nameChanged(objtName) {
      this.filterParameters.object_name = objtName;
      this.filterParameters.tagged = (this.isTagged == true ? '1' : '0');
    },
    nameSelected(objtName) {
      this.nameChanged(objtName);
    },
    namesLoaded(objtName) {
      this.nameChanged(objtName);
    },
    tagUpdated(v) {
      this.filterParameters.tagged = (v == true ? '1' : '0');
    }
  }
}
</script>
