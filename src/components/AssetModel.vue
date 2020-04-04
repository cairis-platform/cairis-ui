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

  <div class="assetmodel">
    <b-card no-body>
      <side-bar :dimension="theSelectedDimension" :panelParameters="panelParameters" :panelObject="theSelectedObject" />
      <b-container fluid>
        <b-row>
          <b-col>
            <b-form-group label="Environment" label-for="assetModelEnvironment" >
              <dimension-select ref="assetModelEnvironment" id="assetModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" v-on:dimension-items-updated="environmentsLoaded" />
            </b-form-group>
          </b-col>
          <b-col v-if="theEnvironmentName != ''">
            <b-form-group label="Asset" label-for="assetModelAsset">
              <dimension-select id="assetModelAsset" ref="assetModelAsset" dimension="asset" initial="all" :environment="theEnvironmentName" includeall v-on:dimension-select-change="assetSelected" v-on:dimension-items-updated="assetsLoaded" />
            </b-form-group>
          </b-col>
          <b-col v-if="theEnvironmentName != ''">
            <b-form-group label="Hide Concerns" label-form="assetModelHideConcerns" >
              <b-form-checkbox id="assetModelHideConcerns" v-model="theConcernsHidden" />
            </b-form-group>
          </b-col>
          <b-col v-if="theEnvironmentName != ''">
            <b-form-group label="Refresh" label-for="amRefresh" >
              <font-awesome-icon id="amRefresh" icon="sync" @click.stop="refreshModel" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
    <b-container fluid>
      <graphical-model v-if="theEnvironmentName != ''" ref="graphicalModel" :api="assetModelURI" :parameters="concernsParameter" v-on:graphical-model-url="nodeClicked"/>
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
    assetModelURI() {
      return "/api/assets/model/environment/" + this.theEnvironmentName + "/asset/" + this.asset ;
    },
    concernsParameter() {
      return this.theConcernsHidden == true ? '' : '&hide_concerns=0'
    },
    asset() {
      return this.theAssetName == undefined || this.theAssetName.length == 0 ? 'all' : this.theAssetName;
    },
    panelParameters() {
      return this.theEnvironmentName != '' ? {'environment' : this.theEnvironmentName} : undefined;
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      theAssetName : 'all',
      theConcernsHidden : true,
      theSelectedObject: null,
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
      if (['assets','personas'].indexOf(this.theSelectedDimension) == -1) {
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
      this.$refs.assetModelEnvironment.selected = envName;
      this.theAssetName = 'all';
    },
    environmentsLoaded(envName) {
      this.theEnvironmentName = envName;
      this.$refs.assetModelEnvironment.selected = envName;
      this.theAssetName = 'all';
    },
    assetSelected(assetName) {
      this.theAssetName = assetName;
    },
    assetsLoaded(assetName) {
      this.theAssetName = assetName;
    },
    refreshModel() {
      this.$refs.graphicalModel.loadModel();
    }
  }
}
</script>
