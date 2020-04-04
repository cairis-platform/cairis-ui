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

  <div class="dataflowdiagram">
    <side-bar :dimension="theSelectedDimension" :panelParameters="panelParameters" :panelObject="theSelectedObject" />
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Environment" label-for="dfdEnvironment" :label-cols="4" >
            <dimension-select ref="dfdEnvironment" id="dfdEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" v-on:dimension-items-updated="environmentsLoaded" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-radio-group id="theFilterTypeRadio" v-model="theFilterType" v-on:change="filterTypeChanged">
            <b-form-radio value="None">None</b-form-radio>
            <b-form-radio value="diagramEntity">Entity</b-form-radio>
            <b-form-radio value="diagramProcess">Process</b-form-radio>
            <b-form-radio value="diagramDatastore">Datastore</b-form-radio>
          </b-form-radio-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Filter" label-for="dfdFilter" :label-cols="2" >
            <dimension-select ref="dfdFilter" id="dfdFilter" :dimension="dfdFilter" :environment="theEnvironmentName" initial="all" includeall v-on:dimension-select-change="filterSelected" v-on:dimension-items-updated="filtersLoaded" />
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
import SideBar from '@/components/SideBar.vue'
import EventBus from '../utils/event-bus';

export default {
  computed : {
    dfdURI() {
      return "/api/dataflows/diagram/environment/" + this.theEnvironmentName + "/filter_type/" + this.filterType + "/filter_name/" + this.theFilterName ;
    },
    filterType() {
      return this.theFilterType == 'diagramEntity' ? 'entity' : (this.theFilterType == 'diagramProcess' ? 'process' : (this.theFilterType == 'diagramDatastore' ? 'datastore' : 'None'));
    },
    dfdFilter() {
      return this.theFilterType == 'None' ? 'dfd_filter' : this.theFilterType;
    },
    panelParameters() {
      return this.theEnvironmentName != '' ? {'environment' : this.theEnvironmentName} : undefined;
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      theFilterName : 'all',
      theSelectedObject: null,
      theFilterType : 'None',
      theSelectedDimension : ''
    }
  },
  components : {
    GraphicalModel,
    DimensionSelect,
    SideBar
  },
  methods : {
    nodeClicked(url) {
      this.theSelectedDimension = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      if (['assets','usecases','dataflows'].indexOf(this.theSelectedDimension) == -1) {
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
      this.$refs.dfdEnvironment.selected = envName;
    },
    environmentsLoaded(envName) {
      this.theEnvironmentName = envName;
      this.$refs.dfdEnvironment.selected = envName;
    },
    filterSelected(filterName) {
      this.theFilterName = filterName;
    },
    filtersLoaded(filterName) {
      this.theFilterName = filterName;
    },
    refreshModel() {
      this.$refs.graphicalModel.loadModel();
    },
    filterTypeChanged(ftName) {
      if (ftName == 'None') {
        this.theFilterName = 'all'
      }
    }
  }
}
</script>