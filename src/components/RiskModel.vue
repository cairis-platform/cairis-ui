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
    <asset-modal ref="assetDialog" :environment="this.theEnvironmentName" :asset="this.theSelectedObject"/> 
    <attacker-modal ref="attackerDialog" :environment="this.theEnvironmentName" :attacker="this.theSelectedObject"/> 
    <countermeasure-modal ref="cmDialog" :environment="this.theEnvironmentName" :countermeasure="this.theSelectedObject"/> 
    <obstacle-modal ref="obsDialog" :environment="this.theEnvironmentName" :obstacle="this.theSelectedObject"/> 
    <misuse-case-modal ref="mcDialog" :environment="this.theEnvironmentName" :misusecase="this.theSelectedObject"/> 
    <requirement-modal ref="reqDialog" :requirement="this.theSelectedObject"/> 
    <response-modal ref="responseDialog" :environment="this.theEnvironmentName" :response="this.theSelectedObject"/> 
    <risk-modal ref="riskDialog" :environment="this.theEnvironmentName" :risk="this.theSelectedObject" :responseList="this.theResponseList"/> 
    <role-modal ref="roleDialog" :environment="this.theEnvironmentName" :role="this.theSelectedObject"/> 
    <task-modal ref="taskDialog" :environment="this.theEnvironmentName" :task="this.theSelectedObject"/> 
    <threat-modal ref="threatDialog" :environment="this.theEnvironmentName" :threat="this.theSelectedObject"/> 
    <vulnerability-modal ref="vulDialog" :environment="this.theEnvironmentName" :vulnerability="this.theSelectedObject"/> 
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Environment" label-for="riskModelEnvironment" :label-cols="4" horizontal>
            <dimension-select ref="riskModelEnvironment" id="riskModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Type" label-for="riskModelType" :label-cols="2" horizontal>
            <b-form-select id="riskModelType" ref="riskModelType" v-model="filterParameters.dimension_name" :options="dimensionTypes" class="mb-3" v-on:change="typeSelected" required>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Name" label-form="riskModelName" :label-cols="4" horizontal>
            <dimension-select id="riskModelName" ref="riskModelName" :environment="theEnvironmentName" :dimensionUrl="nameURI" includeall v-on:dimension-select-change="nameSelected" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    </b-card>
    <graphical-model v-if="theEnvironmentName != ''" :api="riskModelURI" :jsonParameters="this.filterParameters" v-on:graphical-model-url="nodeClicked"/>
  </div>
</template>

<script>

import axios from 'axios';
import AssetModal from '@/components/AssetModal.vue'
import AttackerModal from '@/components/AttackerModal.vue'
import CountermeasureModal from '@/components/CountermeasureModal.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'
import GraphicalModel from '@/components/GraphicalModel.vue'
import MisuseCaseModal from '@/components/MisuseCaseModal.vue'
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
        layout : 'Hierarchical'
      },
      dimensionTypes : ['all','asset','attacker','countermeasure','misusecase','obstacle','requirement','response','risk','role','task','threat','vulnerability'],
      theSelectedObject: null
    }
  },
  components : {
    GraphicalModel,
    DimensionSelect,
    AssetModal,
    AttackerModal,
    CountermeasureModal,
    MisuseCaseModal,
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
          this.$refs.assetDialog.show();  
        }
        else if (dimName == 'attackers') {
          this.$refs.attackerDialog.show();  
        }
        else if (dimName == 'countermeasures') {
          this.$refs.cmDialog.show();  
        }
        else if (dimName == 'misusecases') {
          this.theSelectedObject = {}
          this.theSelectedObject.theName = response.data.theName
          this.theSelectedObject.theDescription = response.data.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theDescription
          this.$refs.mcDialog.show();  
        }
        else if (dimName == 'obstacles') {
          this.$refs.obsDialog.show();  
        }
        else if (dimName == 'requirements') {
          this.$refs.reqDialog.show();  
        }
        else if (dimName == 'responses') {
          this.$refs.responseDialog.show();  
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
        else if (dimName == 'roles') {
          this.$refs.roleDialog.show();  
        }
        else if (dimName == 'tasks') {
          this.$refs.taskDialog.show();  
        }
        else if (dimName == 'threats') {
          this.$refs.threatDialog.show();  
        }
        else if (dimName == 'vulnerabilities') {
          this.$refs.vulDialog.show();  
        }
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    },
    environmentSelected(envName) {
      this.theEnvironmentName = envName
      this.filterParameters.dimension_name = 'all'
      this.$refs.riskModelType.selected = 'all';
      this.$refs.riskModelName.selected = 'all';
    },
    typeSelected() {
      this.$refs.riskModelName.selected = 'all';
    }, 
    nameSelected(objtName) {
      this.filterParameters.object_name = objtName
      this.$refs.riskModelName.$emit('dimension-select-change',objtName);
    }
  }
}
</script>
