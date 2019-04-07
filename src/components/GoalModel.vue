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

  <div class="goalmodel">
    <goal-modal ref="goalDialog" :environment="this.theEnvironmentName" :goal="this.theSelectedObject"/> 
    <goal-association-modal ref="assocDialog" :association="this.theSelectedObject"/> 
    <obstacle-modal ref="obsDialog" :environment="this.theEnvironmentName" :obstacle="this.theSelectedObject"/> 
    <countermeasure-modal ref="cmDialog" :environment="this.theEnvironmentName" :countermeasure="this.theSelectedObject"/> 
    <domain-property-modal ref="dpDialog" :environment="this.theEnvironmentName" :domainproperty="this.theSelectedObject"/> 
    <use-case-modal ref="ucDialog" :environment="this.theEnvironmentName" :usecase="this.theSelectedObject"/> 
    <requirement-modal ref="reqDialog" :requirement="this.theSelectedObject"/> 
    <role-modal ref="roleDialog" :role="this.theSelectedObject"/> 
    <task-modal ref="taskDialog" :environment="this.theEnvironmentName" :task="this.theSelectedObject"/> 
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Environment" label-for="goalModelEnvironment">
            <dimension-select id="goalModelEnvironment" ref="goalModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Goal" label-for="goalModelGoal">
            <dimension-select id="goalModelGoal" ref="goalModelGoal" dimension="goal" :environment="theEnvironmentName" initial="all" includeall v-on:dimension-select-change="goalSelected" />
          </b-form-group>
        </b-col>
        <b-col v-show="theEnvironmentName != ''">
          <b-form-group label="Use Case" label-form="goaModelUseCase">
            <dimension-select id="goalModelUseCase" ref="goalModelUseCase" dimension="usecase" :environment="theEnvironmentName" initial="all" includeall v-on:dimension-select-change="useCaseSelected" />
          </b-form-group>
        </b-col>
        <b-col v-show="theEnvironmentName != ''">
          <b-form-group label="Top-level goals" label-form="goalModelTopLevel">
            <b-form-checkbox id="goalModelTopLevel" v-model="theTopLevel" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    </b-card>
    <graphical-model v-if="theEnvironmentName != ''" :api="goalModelURI" :parameters="topParameters" v-on:graphical-model-url="nodeClicked"/>
  </div>
</template>

<script>

import axios from 'axios';
import GraphicalModel from '@/components/GraphicalModel.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'
import GoalModal from '@/components/GoalModal.vue'
import GoalAssociationModal from '@/components/GoalAssociationModal.vue'
import CountermeasureModal from '@/components/CountermeasureModal.vue'
import ObstacleModal from '@/components/ObstacleModal.vue'
import UseCaseModal from '@/components/UseCaseModal.vue'
import TaskModal from '@/components/TaskModal.vue'
import DomainPropertyModal from '@/components/DomainPropertyModal.vue'
import RequirementModal from '@/components/RequirementModal.vue'
import RoleModal from '@/components/RoleModal.vue'
import EventBus from '../utils/event-bus';

export default {
  computed : {
    goalModelURI() {
      return "/api/goals/model/environment/" + this.theEnvironmentName + "/goal/" + this.theGoalName + "/usecase/" + this.theUseCaseName;
    },
    topParameters() {
      return this.theTopLevel == 0 ? '&top=0' : '&top=1';
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      theGoalName : 'all',
      theUseCaseName : 'all',
      theTopLevel : 0,
      theSelectedObject: null
    }
  },
  components : {
    CountermeasureModal,
    DimensionSelect,
    DomainPropertyModal,
    GoalModal,
    GoalAssociationModal,
    GraphicalModel,
    ObstacleModal,
    RequirementModal,
    RoleModal,
    TaskModal,
    UseCaseModal
  },
  methods : {
    nodeClicked(url) {
      const dimName = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      if (['goals','goalassociations','countermeasures','obstacles','usecases','domainproperties','requirements','roles','tasks'].indexOf(dimName) == -1) {
        return;
      }
      if (dimName == 'goalassociations') {
        url = '/api/goals/association' + url.substring(url.indexOf(dimName) + dimName.length);
      }
      axios.get(url,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        this.theSelectedObject = response.data;
        if (dimName == 'goals') {
          this.$refs.goalDialog.show();  
        }
        else if (dimName == 'goalassociations') {
          this.$refs.assocDialog.show();  
        }
        else if (dimName == 'countermeasures') {
          this.$refs.cmDialog.show();  
        }
        else if (dimName == 'usecases') {
          this.$refs.ucDialog.show();  
        }
        else if (dimName == 'obstacles') {
          this.$refs.obsDialog.show();  
        }
        else if (dimName == 'domainproperties') {
          this.$refs.dpDialog.show();  
        }
        else if (dimName == 'requirements') {
          this.$refs.reqDialog.show();  
        }
        else if (dimName == 'roles') {
          this.$refs.roleDialog.show();  
        }
        else if (dimName == 'tasks') {
          this.$refs.taskDialog.show();  
        }
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    },
    environmentSelected(envName) {
      this.theEnvironmentName = envName
      if (this.$refs.goalModelGoal != undefined) {
        this.theGoalName = 'all'
        this.theUseCaseName = 'all'
        this.$refs.goalModelGoal.selected = this.theGoalName;
        this.$refs.goalModelUseCase.selected = this.theUseCaseName;
      }
    },
    goalSelected(goalName) {
      this.theGoalName = goalName
    },
    useCaseSelected(ucName) {
      this.theUseCaseName = ucName
    }
  }
}
</script>
