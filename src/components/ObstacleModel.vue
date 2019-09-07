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

  <div class="obstaclemodel">
    <goal-modal v-if="theEnvironmentName != ''" ref="goalDialog" :environment="this.theEnvironmentName" :goal="this.theSelectedObject"/> 
    <obstacle-modal v-if="theEnvironmentName !=''" ref="obsDialog" :environment="this.theEnvironmentName" :obstacle="this.theSelectedObject"/> 
    <countermeasure-modal v-if="theEnvironmentName != ''" ref="cmDialog" :environment="this.theEnvironmentName" :countermeasure="this.theSelectedObject"/> 
    <domain-property-modal v-if="theEnvironmentName !=''" ref="dpDialog" :environment="this.theEnvironmentName" :domainproperty="this.theSelectedObject"/> 
    <use-case-modal v-if="theEnvironmentName != ''" ref="ucDialog" :environment="this.theEnvironmentName" :usecase="this.theSelectedObject"/> 
    <requirement-modal v-if="theEnvironmentName != ''" ref="reqDialog" :requirement="this.theSelectedObject"/> 
    <role-modal v-if="theEnvironmentName != ''" ref="roleDialog" :role="this.theSelectedObject"/> 
    <task-modal v-if="theEnvironmentName != ''" ref="taskDialog" :environment="this.theEnvironmentName" :task="this.theSelectedObject"/> 
    <b-navbar sticky>
      <b-card no-body>
        <b-container fluid>
          <b-row>
            <b-col>
              <b-form-group label="Environment" label-for="obstacleModelEnvironment">
                <dimension-select id="obstacleModelEnvironment" ref="obstacleModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" />
              </b-form-group>
            </b-col>
            <b-col v-if="theEnvironmentName != ''">
              <b-form-group label="Obstacle" label-for="obstacleModelObstacle">
                <dimension-select id="obstacleModelObstacle" ref="obstacleModelObstacle" dimension="obstacle" :environment="theEnvironmentName" initial="all" includeall v-on:dimension-select-change="obstacleSelected" />
              </b-form-group>
            </b-col>
            <b-col v-if="theEnvironmentName != ''">
              <b-form-group label="Refresh" label-for="gmRefresh">
                <font-awesome-icon id="gmRefresh" icon="sync" @click.stop="refreshModel" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>
      </b-card>
    </b-navbar>
    <graphical-model v-if="theEnvironmentName != ''" ref="graphicalModel" :api="obstacleModelURI" v-on:graphical-model-url="nodeClicked"/>
  </div>
</template>

<script>

import axios from 'axios';
import GraphicalModel from '@/components/GraphicalModel.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'
import GoalModal from '@/components/GoalModal.vue'
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
    obstacleModelURI() {
      return "/api/obstacles/model/environment/" + this.theEnvironmentName + "/obstacle/" + this.theObstacleName;
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      theObstacleName : 'all',
      theSelectedObject: null
    }
  },
  components : {
    CountermeasureModal,
    DimensionSelect,
    DomainPropertyModal,
    GoalModal,
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
      if (['goals','countermeasures','obstacles','usecases','domainproperties','requirements','roles','tasks'].indexOf(dimName) == -1) {
        return;
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
      this.theEnvironmentName = envName;
      this.$refs.obstacleModelEnvironment.selected = envName;
      if (this.$refs.obstacleModelObstacle != undefined) {
        this.theObstacleName = 'all';
        this.$refs.obstacleModelObstacle.selected = this.theObstacleName;
      }
    },
    obstacleSelected(obsName) {
      this.theObstacleName = obsName
    },
    refreshModel() {
      this.$refs.graphicalModel.loadModel();
    }
  }
}
</script>
