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
    <asset-modal v-if="assetSelected" ref="assetDialog" :environment="this.theEnvironmentName" :asset="this.theSelectedObject"/> 
    <attacker-modal v-if="attackerSelected" ref="attackerDialog" :environment="this.theEnvironmentName" :attacker="this.theSelectedObject"/> 
    <countermeasure-modal v-if="countermeasureSelected" ref="cmDialog" :environment="this.theEnvironmentName" :countermeasure="this.theSelectedObject"/> 
    <obstacle-modal v-if="obstacleSelected" ref="obsDialog" :environment="this.theEnvironmentName" :obstacle="this.theSelectedObject"/> 
    <requirement-modal v-if="requirementSelected" ref="reqDialog" :requirement="this.theSelectedObject"/> 
    <response-modal v-if="responseSelected" ref="responseDialog" :environment="this.theEnvironmentName" :response="this.theSelectedObject"/> 
    <risk-modal v-if="riskSelected" ref="riskDialog" :environment="this.theEnvironmentName" :risk="this.theSelectedObject" :responseList="this.theResponseList"/> 
    <role-modal v-if="roleSelected" ref="roleDialog" :role="this.theSelectedObject"/> 
    <task-modal v-if="taskSelected" ref="taskDialog" :environment="this.theEnvironmentName" :task="this.theSelectedObject"/> 
    <threat-modal v-if="threatSelected" ref="threatDialog" :environment="this.theEnvironmentName" :threat="this.theSelectedObject"/> 
    <vulnerability-modal v-if="vulnerabilitySelected" ref="vulDialog" :environment="this.theEnvironmentName" :vulnerability="this.theSelectedObject"/> 
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
import AssetModal from '@/components/AssetModal.vue'
import AttackerModal from '@/components/AttackerModal.vue'
import CountermeasureModal from '@/components/CountermeasureModal.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'
import GraphicalModel from '@/components/GraphicalModel.vue'
import ObstacleModal from '@/components/ObstacleModal.vue'
import RequirementModal from '@/components/RequirementModal.vue'
import ResponseModal from '@/components/ResponseModal.vue'
import RiskModal from '@/components/RiskModal.vue'
import RoleModal from '@/components/RoleModal.vue'
import TaskModal from '@/components/TaskModal.vue'
import ThreatModal from '@/components/ThreatModal.vue'
import VulnerabilityModal from '@/components/VulnerabilityModal.vue'
import EventBus from '../utils/event-bus';

export default {
  computed : {
    riskModelURI() {
      return "/api/risks/model/environment/" + this.theEnvironmentName;
    },
    nameURI() {
      return "api/risks/model/environment/" + this.theEnvironmentName + "/names"
    },
    assetSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'assets' ? true : false;
    },
    attackerSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'attackers' ? true : false;
    },
    countermeasureSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'countermeasures' ? true : false;
    },
    obstacleSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'obstacles' ? true : false;
    },
    requirementSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'requirements' ? true : false;
    },
    responseSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'responses' ? true : false;
    },
    riskSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'risks' ? true : false;
    },
    roleSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'roles' ? true : false;
    },
    taskSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'tasks' ? true : false;
    },
    threatSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'threats' ? true : false;
    },
    vulnerabilitySelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'vulnerabilities' ? true : false;
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
      dimensionTypes : ['all','asset','attacker','countermeasure','obstacle','requirement','response','risk','role','task','threat','vulnerability'],
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
    AssetModal,
    AttackerModal,
    CountermeasureModal,
    ObstacleModal,
    RequirementModal,
    ResponseModal,
    RiskModal,
    RoleModal,
    TaskModal,
    ThreatModal,
    VulnerabilityModal
  },
  methods : {
    nodeClicked(url) {
      const dimName = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      this.theSelectedDimension = dimName;
      let that = this;
      if (['assets','attackers','countermeasures','misusecases','obstacles','requirements','responses','risks','roles','tasks','threats','vulnerabilities'].indexOf(dimName) == -1) {
        return;
      }
      axios.get(url,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        this.theSelectedObject = response.data;
        if (dimName == 'assets') {
          if (that.$refs.assetDialog != undefined) {
            that.$refs.assetDialog.show();  
          }
        }
        else if (dimName == 'attackers') {
          if (that.$refs.attackerDialog != undefined) {
            that.$refs.attackerDialog.show();  
          }
        }
        else if (dimName == 'countermeasures') {
          if (that.$refs.cmDialog != undefined) {
            that.$refs.cmDialog.show();  
          }
        }
        else if (dimName == 'obstacles') {
          if (that.$refs.obsDialog != undefined) {
            that.$refs.obsDialog.show();  
          }
        }
        else if (dimName == 'requirements') {
          if (that.$refs.reqDialog != undefined) {
            that.$refs.reqDialog.show();  
          }
        }
        else if (dimName == 'responses') {
          if (that.$refs.responseDialog != undefined) {
            that.$refs.responseDialog.show();  
          }
        }
        else if (dimName == 'risks') {
          axios.get('/api/risks/name/' + this.theSelectedObject.theName + '/threat/' + this.theSelectedObject.theThreatName + '/vulnerability/' + this.theSelectedObject.theVulnerabilityName + '/environment/' + this.theEnvironmentName,{
            baseURL : this.$store.state.url,
            params : {'session_id' : this.$store.state.session}
          })
          .then(response => {
            this.theResponseList = response.data;
            if (that.$refs.riskDialog != undefined) {
              that.$refs.riskDialog.show();  
            }
          })
          .catch((error) => {
            EventBus.$emit('operation-failure',error)
          })
        }
        else if (dimName == 'roles') {
          if (that.$refs.roleDialog != undefined) {
            that.$refs.roleDialog.show();  
          }
        }
        else if (dimName == 'tasks') {
          if (that.$refs.taskDialog != undefined) {
            that.$refs.taskDialog.show();  
          }
        }
        else if (dimName == 'threats') {
          if (that.$refs.threatDialog != undefined) {
            that.$refs.threatDialog.show();  
          }
        }
        else if (dimName == 'vulnerabilities') {
          if (that.$refs.vulDialog != undefined) {
            that.$refs.vulDialog.show();  
          }
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
