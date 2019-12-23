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

  <div class="usergoalmodel">
    <task-modal v-if="taskSelected" ref="taskDialog" :environment="this.theEnvironmentName" :task="this.theSelectedObject"/> 
    <user-goal-modal v-if="userGoalSelected" ref="ugDialog" :userGoal="this.theSelectedObject"/> 
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Environment" label-for="ugEnvironment" :label-cols="4" >
            <dimension-select ref="ugEnvironment" id="ugEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" v-on:dimension-items-updated="environmentsLoaded" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Filter" label-for="ugFilter" :label-cols="2" >
            <dimension-select ref="ugFilter" id="ugmFilter" dimension="ugm_filter" :environment="theEnvironmentName" initial="all" includeall v-on:dimension-select-change="filterSelected" v-on:dimension-items-updated="filtersLoaded" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Refresh" label-for="refreshCtrl" >
            <font-awesome-icon id="refreshCtrl" icon="sync" @click.stop="refreshModel" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    </b-card>
    <b-container fluid>
      <graphical-model v-if="theEnvironmentName != ''" ref="graphicalModel" :api="dfdURI" v-on:graphical-model-url="nodeClicked"/>
    </b-container>
  </div>
</template>

<script>

import axios from 'axios';
import GraphicalModel from '@/components/GraphicalModel.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'
import TaskModal from '@/components/TaskModal.vue'
import UserGoalModal from '@/components/UserGoalModal.vue'
import EventBus from '../utils/event-bus';

export default {
  computed : {
    dfdURI() {
      return "/api/user_goals/model/environment/" + this.theEnvironmentName + "/filter_name/" + this.theFilterName ;
    },
    taskSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'tasks' ? true : false;
    },
    userGoalSelected() {
      return this.theSelectedObject != null && this.theSelectedDimension == 'user_goals' ? true : false;
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      theFilterName : 'all',
      theSelectedObject: null,
      theSelectedDimension: ''
    }
  },
  components : {
    GraphicalModel,
    DimensionSelect,
    TaskModal,
    UserGoalModal
  },
  methods : {
    nodeClicked(url) {
      const dimName = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      this.theSelectedDimension = dimName;
      let that = this;
      if (['tasks','user_goals'].indexOf(dimName) == -1) {
        return;
      }
      axios.get(url,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        this.theSelectedObject = response.data;
        if (dimName == 'tasks') {
          if (that.$refs.taskDialog != undefined) {
            that.$refs.taskDialog.show();  
          }
        }
        else if (dimName == 'user_goals') {
          if (that.$refs.ugDialog != undefined) {
            that.$refs.ugDialog.show();  
          }
        }
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    },
    environmentSelected(envName) {
      this.theEnvironmentName = envName;
      this.$refs.ugEnvironment.selected = envName;
    },
    environmentsLoaded(envName) {
      this.theEnvironmentName = envName;
      this.$refs.ugEnvironment.selected = envName;
    },
    filterSelected(filterName) {
      this.theFilterName = filterName;
    },
    filtersLoaded(filterName) {
      this.theFilterName = filterName;
    },
    refreshModel() {
      this.$refs.graphicalModel.loadModel();
    }
  }
}
</script>