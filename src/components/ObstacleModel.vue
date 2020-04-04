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
    <side-bar :dimension="theSelectedDimension" :panelParameters="panelParameters" :panelObject="theSelectedObject" />
    <b-card no-body>
      <b-container fluid>
        <b-row>
          <b-col>
            <b-form-group label="Environment" label-for="obstacleModelEnvironment">
              <dimension-select id="obstacleModelEnvironment" ref="obstacleModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" v-on:dimension-items-updated="environmentsLoaded" />
            </b-form-group>
          </b-col>
          <b-col v-if="theEnvironmentName != ''">
            <b-form-group label="Obstacle" label-for="obstacleModelObstacle">
              <dimension-select id="obstacleModelObstacle" ref="obstacleModelObstacle" dimension="obstacle" :environment="theEnvironmentName" initial="all" includeall v-on:dimension-select-change="obstacleSelected" v-on:dimension-items-updated="obstaclesLoaded" />
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
    <graphical-model v-if="theEnvironmentName != ''" ref="graphicalModel" :api="obstacleModelURI" v-on:graphical-model-url="nodeClicked"/>
  </div>
</template>

<script>

import axios from 'axios';
import GraphicalModel from '@/components/GraphicalModel.vue';
import DimensionSelect from '@/components/DimensionSelect.vue';
import SideBar from '@/components/SideBar.vue';
import EventBus from '../utils/event-bus';

export default {
  computed : {
    obstacleModelURI() {
      return "/api/obstacles/model/environment/" + this.theEnvironmentName + "/obstacle/" + this.theObstacleName;
    },
    panelParameters() {
      return this.theEnvironmentName != '' ? {'environment' : this.theEnvironmentName} : undefined;
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      theObstacleName : 'all',
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
      if (['goals','countermeasures','obstacles','usecases','domainproperties','requirements','roles','tasks'].indexOf(this.theSelectedDimension) == -1) {
        return;
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
    environmentSelected(envName) {
      this.theEnvironmentName = envName;
      this.$refs.obstacleModelEnvironment.selected = envName;
      if (this.$refs.obstacleModelObstacle != undefined) {
        this.theObstacleName = 'all';
        this.$refs.obstacleModelObstacle.selected = this.theObstacleName;
      }
    },
    environmentsLoaded(envName) {
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
    obstaclesLoaded(obsName) {
      this.theObstacleName = obsName
    },
    refreshModel() {
      this.$refs.graphicalModel.loadModel();
    }
  }
}
</script>
