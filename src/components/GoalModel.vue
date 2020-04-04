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
    <side-bar :dimension="theSelectedDimension" :panelParameters="panelParameters" :panelObject="theSelectedObject" />
    <b-card no-body>
      <b-container fluid>
        <b-row>
          <b-col>
            <b-form-group label="Environment" label-for="goalModelEnvironment">
              <dimension-select id="goalModelEnvironment" ref="goalModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" v-on:dimension-items-updated="environmentsLoaded" />
            </b-form-group>
          </b-col>
          <b-col v-if="theEnvironmentName != ''">
            <b-form-group label="Goal" label-for="goalModelGoal">
              <dimension-select id="goalModelGoal" ref="goalModelGoal" dimension="goal" :environment="theEnvironmentName" initial="all" includeall v-on:dimension-select-change="goalSelected" v-on:dimension-items-loaded="goalsLoaded" />
            </b-form-group>
          </b-col>
          <b-col v-show="theEnvironmentName != ''">
            <b-form-group label="Use Case" label-form="goaModelUseCase">
              <dimension-select id="goalModelUseCase" ref="goalModelUseCase" dimension="usecase" :environment="theEnvironmentName" initial="all" includeall v-on:dimension-select-change="useCaseSelected" v-on:dimension-items-updated="useCasesLoaded" />
            </b-form-group>
          </b-col>
          <b-col v-show="theEnvironmentName != ''">
            <b-form-group label="Top-level goals" label-form="goalModelTopLevel">
              <b-form-checkbox id="goalModelTopLevel" v-model="theTopLevel" />
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
    <graphical-model v-if="theEnvironmentName != ''" ref="graphicalModel" :api="goalModelURI" :parameters="topParameters" v-on:graphical-model-url="nodeClicked"/>
  </div>
</template>

<script>

import axios from 'axios';
import GraphicalModel from '@/components/GraphicalModel.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'
import SideBar from '@/components/SideBar.vue'
import EventBus from '../utils/event-bus';

export default {
  computed : {
    goalModelURI() {
      return "/api/goals/model/environment/" + this.theEnvironmentName + "/goal/" + this.theGoalName + "/usecase/" + this.theUseCaseName;
    },
    topParameters() {
      return this.theTopLevel == 0 ? '&top=0' : '&top=1';
    },
    panelParameters() {
      return this.theEnvironmentName != '' ? {'environment' : this.theEnvironmentName} : undefined;
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      theGoalName : 'all',
      theUseCaseName : 'all',
      theTopLevel : 0,
      theSelectedObject: null,
      theSelectedDimension : ''
    }
  },
  components : {
    DimensionSelect,
    GraphicalModel,
    SideBar
  },
  methods : {
    nodeClicked(url) {
      this.theSelectedDimension = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      if (['goals','goalassociations','countermeasures','obstacles','usecases','domainproperties','requirements','roles','tasks'].indexOf(this.theSelectedDimension) == -1) {
        return;
      }
      if (this.theSelectedDimension == 'goalassociations') {
        url = '/api/goals/association' + url.substring(url.indexOf(this.theSelectedDimension) + this.theSelectedDimension.length);
      }
      axios.get(url,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        this.theSelectedObject = response.data;
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    },
    environmentChanged(envName) {
      this.theEnvironmentName = envName;
      this.$refs.goalModelEnvironment.selected = envName;
      if (this.$refs.goalModelGoal != undefined) {
        this.theGoalName = 'all'
        this.theUseCaseName = 'all'
        this.$refs.goalModelGoal.selected = this.theGoalName;
        this.$refs.goalModelUseCase.selected = this.theUseCaseName;
      }
    },
    environmentSelected(envName) {
      this.environmentChanged(envName);
    },
    environmentsLoaded(envName) {
      this.environmentChanged(envName);
    },
    goalChanged(goalName) {
      this.theGoalName = goalName
      this.theUseCaseName = 'all';
      this.$refs.goalModelUseCase.selected = 'all';
    },
    goalSelected(goalName) {
      this.goalChanged(goalName);
    },
    goalsLoaded(goalName) {
      this.goalChanged(goalName);
    },
    useCaseChanged(ucName) {
      this.theUseCaseName = ucName;
      this.theGoalName = 'all';
      this.$refs.goalModelGoal.selected = 'all';
    },
    useCaseSelected(ucName) {
      this.useCaseChanged(ucName);
    },
    useCasesLoaded(ucName) {
      this.useCaseChanged(ucName);
    },
    refreshModel() {
      this.$refs.graphicalModel.loadModel();
    }
  }
}
</script>
