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

  <div class="taskmodel">
    <asset-modal v-if="assetSelected" ref="assetDialog" :environment="this.theEnvironmentName" :asset="this.theSelectedObject"/> 
    <attacker-modal v-if="attackerSelected" ref="attackerDialog" :environment="this.theEnvironmentName" :attacker="this.theSelectedObject"/> 
    <misuse-case-modal v-if="misuseCaseNodeSelected" ref="mcDialog" :environment="this.theEnvironmentName" :misusecase="this.theSelectedObject"/> 
    <persona-modal v-if="personaSelected" ref="personaDialog" :environment="this.theEnvironmentName" :persona="this.theSelectedObject"/> 
    <role-modal v-if="roleSelected" ref="roleDialog" :role="this.theSelectedObject"/> 
    <task-modal v-if="taskNodeSelected" ref="taskDialog" :environment="this.theEnvironmentName" :task="this.theSelectedObject"/> 
    <use-case-modal v-if="useCaseSelected" ref="ucDialog" :environment="this.theEnvironmentName" :usecase="this.theSelectedObject"/> 
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Environment" label-for="taskModelEnvironment" :label-cols="4">
            <dimension-select id="taskModelEnvironment" ref="taskModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Task" label-for="taskModelTask" :label-cols="2" >
            <dimension-select id="taskModelTask" ref="taskModelTask" dimension="task" :environment="theEnvironmentName" initial="all" includeall v-on:dimension-select-change="taskSelected" />
          </b-form-group>
        </b-col>
        <b-col v-show="theEnvironmentName != ''">
          <b-form-group label="Misuse Case" label-form="taskModelMisuseCase" :label-cols="4" >
            <dimension-select id="taskModelMisuseCase" ref="taskModelMisuseCase" dimension="misusecase" :environment="theEnvironmentName" initial="all" includeall v-on:dimension-select-change="misuseCaseSelected" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    </b-card>
    <graphical-model v-if="theEnvironmentName != ''" :api="taskModelURI" v-on:graphical-model-url="nodeClicked"/>
  </div>
</template>

<script>

import axios from 'axios';
import GraphicalModel from '@/components/GraphicalModel.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'
import AssetModal from '@/components/AssetModal.vue'
import AttackerModal from '@/components/AttackerModal.vue'
import MisuseCaseModal from '@/components/MisuseCaseModal.vue'
import PersonaModal from '@/components/PersonaModal.vue'
import RoleModal from '@/components/RoleModal.vue'
import TaskModal from '@/components/TaskModal.vue'
import UseCaseModal from '@/components/UseCaseModal.vue'
import EventBus from '../utils/event-bus';

export default {
  computed : {
    taskModelURI() {
      return "/api/tasks/model/environment/" + this.theEnvironmentName + "/task/" + this.theTaskName + "/misusecase/" + this.theMisuseCaseName;
    },
    assetSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'assets' ? true : false;
    },
    attackerSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'attackers' ? true : false;
    },
    misuseCaseNodeSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'misusecases' ? true : false;
    },
    personaSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'personas' ? true : false;
    },
    roleSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'roles' ? true : false;
    },
    taskNodeSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'tasks' ? true : false;
    },
    useCaseSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'usecases' ? true : false;
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      theTaskName : 'all',
      theMisuseCaseName : 'all',
      theSelectedObject: null,
      theSelectedDimension: ''
    }
  },
  components : {
    DimensionSelect,
    GraphicalModel,
    AssetModal,
    AttackerModal,
    MisuseCaseModal,
    PersonaModal,
    RoleModal,
    TaskModal,
    UseCaseModal
  },
  methods : {
    nodeClicked(url) {
      const dimName = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      this.theSelectedDimension = dimName;
      let that = this;
      if (['assets','attackers','misusecases','personas','roles','tasks','usecases'].indexOf(dimName) == -1) {
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
        else if (dimName == 'misusecases') {
          if (that.$refs.mcDialog != undefined) {
            that.$refs.mcDialog.show();  
          }
        }
        else if (dimName == 'personas') {
          if (that.$refs.personaDialog != undefined) {
            that.$refs.personaDialog.show();  
          }
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
        else if (dimName == 'usecases') {
          if (that.$refs.ucDialog != undefined) {
            that.$refs.ucDialog.show();  
          }
        }
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    },
    environmentSelected(envName) {
      this.theEnvironmentName = envName;
      this.$refs.taskModelEnvironment.selected = envName;
      if (this.$refs.taskModelTask != undefined) {
        this.theTaskName = 'all'
        this.theMisuseCaseName = 'all'
        this.$refs.taskModelTask.selected = this.theTaskName;
        this.$refs.taskModelMisuseCase.selected = this.theMisuseCaseName;
      }
    },
    taskSelected(taskName) {
      this.theTaskName = taskName
    },
    misuseCaseSelected(mcName) {
      this.theMisuseCaseName = mcName
    }
  }
}
</script>
