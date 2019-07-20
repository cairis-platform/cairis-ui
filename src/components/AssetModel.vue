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
    <asset-modal v-if="theEnvironmentName != ''" ref="assetDialog" :environment="this.theEnvironmentName" :asset="this.theSelectedObject"/> 
    <persona-modal v-if="theEnvironmentName != ''" ref="personaDialog" :environment="this.theEnvironmentName" :persona="this.theSelectedObject"/> 
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Environment" label-for="assetModelEnvironment" :label-cols="4" >
            <dimension-select ref="assetModelEnvironment" id="assetModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Asset" label-for="assetModelAsset" :label-cols="2" >
            <dimension-select id="assetModelAsset" ref="assetModelAsset" dimension="asset" initial="all" :environment="theEnvironmentName" includeall v-on:dimension-select-change="assetSelected" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Hide Concerns" label-form="assetModelHideConcerns" :label-cols="3">
            <b-form-checkbox id="assetModelHideConcerns" v-model="theConcernsHidden" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Refresh" label-for="amRefresh" :label-cols="3" >
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
import GraphicalModel from '@/components/GraphicalModel.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'
import AssetModal from '@/components/AssetModal.vue'
import PersonaModal from '@/components/PersonaModal.vue'
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
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      theAssetName : 'all',
      theConcernsHidden : true,
      theSelectedObject: null
    }
  },
  components : {
    GraphicalModel,
    DimensionSelect,
    AssetModal,
    PersonaModal
  },
  methods : {
    nodeClicked(url) {
      const dimName = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      if (['assets','personas'].indexOf(dimName) == -1) {
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
        else if (dimName == 'personas') {
          this.$refs.personaDialog.show();  
        }
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
    assetSelected(assetName) {
      this.theAssetName = assetName;
    },
    refreshModel() {
      this.$refs.graphicalModel.loadModel();
    }
  }
}
</script>
