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
    <b-breadcrumb :items="bcItems" />
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Environment" label-for="assetModelEnvironment" :label-cols="4" horizontal>
            <dimension-select id="assetModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Asset" label-for="assetModelAsset" :label-cols="2" horizontal>
            <dimension-select id="assetModelAsset" dimension="asset" :environment="theEnvironmentName" :includeall="true" v-on:dimension-select-change="assetSelected" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Hide Concerns" label-form="assetModelHideConcerns" :label-cols="4" horizontal>
            <b-form-checkbox id="assetModelHideConcerns" v-model="theConcernsHidden" />
          </b-form-group>

        </b-col>
      </b-row>
    </b-container>
    </b-card>
    <graphical-model v-if="theEnvironmentName != ''" :api="assetModelURI" :parameters="concernsParameter" v-on:graphical-model-url="nodeClicked"/>
  </div>
</template>

<script>

import GraphicalModel from '@/components/GraphicalModel.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'

export default {
  computed : {
    bcItems() {
      return [{text: 'Home', to: {name: 'home'}},{text: 'Asset Model', to: {name: 'assetmodel'}}]
    },
    assetModelURI() {
      return "/api/assets/model/environment/" + this.theEnvironmentName + "/asset/" + this.theAssetName ;
    },
    concernsParameter() {
      return this.theConcernsHidden == true ? '' : '&hide_concerns=0'
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      theAssetName : 'all',
      theConcernsHidden : true
    }
  },
  components : {
    GraphicalModel,
    DimensionSelect
  },
  methods : {
    nodeClicked(url) {
      alert('clicked ' + url)
    },
    environmentSelected(envName) {
      this.theEnvironmentName = envName
      this.theAssetName = 'all'
      this.$refs.assetModelAsset.$emit('dimension-select-change',this.theAssetName);
    },
    assetSelected(assetName) {
      this.theAssetName = assetName
    }
  }
}
</script>