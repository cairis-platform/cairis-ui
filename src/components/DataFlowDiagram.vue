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
    <asset-modal ref="assetDialog" :environment="this.theEnvironmentName" :asset="this.theSelectedObject"/> 
    <use-case-modal ref="ucDialog" :environment="this.theEnvironmentName" :usecase="this.theSelectedObject"/> 
    <data-flow-modal ref="dfDialog" :environment="this.theEnvironmentName" :dataflow="this.theSelectedObject"/> 
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Environment" label-for="dfdEnvironment" :label-cols="4" >
            <dimension-select ref="dfdEnvironment" id="dfdEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" v-on:dimension-items-updated="environmentsLoaded" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Filter" label-for="dfdFilter" :label-cols="2" >
            <dimension-select ref="dfdFilter" id="dfdFilter" dimension="dfd_filter" :environment="theEnvironmentName" initial="None" :includeall="true" v-on:dimension-select-change="filterSelected" v-on:dimension-items-updated="filtersLoaded" />
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
import AssetModal from '@/components/AssetModal.vue'
import UseCaseModal from '@/components/UseCaseModal.vue'
import DataFlowModal from '@/components/DataFlowModal.vue'
import EventBus from '../utils/event-bus';

export default {
  computed : {
    dfdURI() {
      return "/api/dataflows/diagram/environment/" + this.theEnvironmentName + "/filter/" + this.theFilterName ;
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      theFilterName : 'None',
      theSelectedObject: null
    }
  },
  components : {
    GraphicalModel,
    DimensionSelect,
    AssetModal,
    DataFlowModal,
    UseCaseModal
  },
  methods : {
    nodeClicked(url) {
      const dimName = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      if (['assets','usecases','dataflows'].indexOf(dimName) == -1) {
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
        else if (dimName == 'usecases') {
          this.$refs.ucDialog.show();  
        }
        else if (dimName == 'dataflows') {
          this.$refs.dfDialog.show();  
        }
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
    }
  }
}
</script>