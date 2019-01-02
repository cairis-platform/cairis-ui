<template>
  <div class="assetmodel">
    <b-breadcrumb :items="bcItems" />
    <b-card no-body>
    <b-container>
      <b-row>
        <b-col>
          <b-form-group label="Environment" label-for="assetModelEnvironment" :label-cols="4" horizontal>
            <dimension-select id="assetModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Asset" label-for="assetModelAsset" :label-cols="2" horizontal>
            <dimension-select id="assetModelAsset" dimension="asset" :environment="theEnvironmentName" all="true" v-on:dimension-select-change="assetSelected" />
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
    <graphical-model v-if="theEnvironmentName != ''" :api="assetModelURI" v-on:graphical-model-url="nodeClicked"/>
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
      return "/api/assets/model/environment/" + this.theEnvironmentName + "/asset/" + this.theAssetName;
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