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
    <obstacle-modal ref="obsDialog" :environment="this.theEnvironmentName" :obstacle="this.theSelectedObject"/> 
    <role-modal ref="roleDialog" :environment="this.theEnvironmentName" :role="this.theSelectedObject"/> 
    <task-modal ref="taskDialog" :environment="this.theEnvironmentName" :task="this.theSelectedObject"/> 
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Environment" label-for="riskModelEnvironment" :label-cols="4" horizontal>
            <dimension-select id="riskModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" />
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
            <dimension-select id="riskModelName" ref="riskModelName" :environment="theEnvironmentName" :dimensionUrl="nameURI" includeall="true" v-on:dimension-select-change="nameSelected" />
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
import GraphicalModel from '@/components/GraphicalModel.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'
import ObstacleModal from '@/components/ObstacleModal.vue'
import TaskModal from '@/components/TaskModal.vue'
import RoleModal from '@/components/RoleModal.vue'
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
    ObstacleModal,
    RoleModal,
    TaskModal
  },
  methods : {
    nodeClicked(url) {
      const dimName = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      if (['roles','tasks'].indexOf(dimName) == -1) {
        return;
      }
      axios.get(url,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        this.theSelectedObject = response.data;
        if (dimName == 'roles') {
          this.$refs.roleDialog.show();  
        }
        else if (dimName == 'tasks') {
          this.$refs.taskDialog.show();  
        }
        // TO DO: assets, attackers, countermeasures, misusecases, obstacles, requirements, responses, risks, threats, vulnerabilities
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    },
    environmentSelected(envName) {
      this.theEnvironmentName = envName
      this.filterParameters.dimension_name = 'all'
      this.$refs.riskModelType.$emit('dimension-select-change','all');
      this.$refs.riskModelName.$emit('dimension-select-change','all');
    },
    typeSelected() {
      this.$refs.riskModelName.$emit('dimension-select-change','all');
    }, 
    nameSelected(objtName) {
      this.filterParameters.object_name = objtName
      this.$refs.riskModelName.$emit('dimension-select-change',objtName);
    }
  }
}
</script>
