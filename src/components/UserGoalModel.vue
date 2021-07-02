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
    <side-bar :dimension="theSelectedDimension" :panelParameters="panelParameters" :panelObject="theSelectedObject" />
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Environment" label-for="ugEnvironment" :label-cols="4" >
            <dimension-select ref="ugEnvironment" id="ugEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" v-on:dimension-items-updated="environmentsLoaded" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Persona" label-for="pFilter" :label-cols="2" >
            <dimension-select ref="pFilter" id="pFilter" dimension="persona" :environment="theEnvironmentName" initial="all" includeall v-on:dimension-select-change="personaSelected" v-on:dimension-items-updated="personasLoaded" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Filter" label-for="ugFilter" :label-cols="2" >
            <dimension-select ref="ugFilter" id="ugmFilter" :dimensionUrl="filterUrl" initial="all" includeall v-on:dimension-select-change="filterSelected" v-on:dimension-items-updated="filtersLoaded" />
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
      <graphical-model v-if="theEnvironmentName != ''" ref="graphicalModel" :api="ugmURI" v-on:graphical-model-url="nodeClicked"/>
    </b-container>
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
    ugmURI() {
      return "/api/user_goals/model/environment/" + this.theEnvironmentName + "/persona/" + this.thePersonaName + "/filter_name/" + this.theFilterName ;
    },
    filterUrl() {
      return "/api/user_goals/model/environment/" + this.theEnvironmentName + "/persona/" + this.thePersonaName + "/filters";
    },
    sidebarTitle() {
      return this.theSelectedObject != undefined ? this.theSelectedObject.theName : '';
    },
    panelParameters() {
      return this.theEnvironmentName != '' ? {'environment' : this.theEnvironmentName} : undefined;
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      thePersonaName : 'all',
      theFilterName : 'all',
      theSelectedObject: null,
      theSelectedDimension: ''
    }
  },
  components : {
    GraphicalModel,
    DimensionSelect,
    SideBar
  },
  methods : {
    nodeClicked(url) {
      const dimName = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      this.theSelectedDimension = dimName;
      if (['tasks','user_goals'].indexOf(dimName) == -1) {
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
      this.$refs.ugEnvironment.selected = envName;
    },
    environmentsLoaded(envName) {
      this.theEnvironmentName = envName;
      this.$refs.ugEnvironment.selected = envName;
    },
    personaSelected(personaName) {
      this.thePersonaName = personaName;
    },
    personasLoaded(personaName) {
      this.thePersonaName = personaName;
    },
    filtersLoaded(filterName) {
      this.theFilterName = filterName;
    },
    filterSelected(filterName) {
      this.theFilterName = filterName;
    },
    refreshModel() {
      this.$refs.graphicalModel.loadModel();
    }
  }
}
</script>