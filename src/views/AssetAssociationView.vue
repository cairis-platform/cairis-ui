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

  <div class="kaosassociationview">
    <b-breadcrumb :items="bcItems" /> 
    <asset-association :object="this.objt" :label="this.commitLabel" v-on:asset-association-commit="commitAssetAssociation" />
  </div>
</template>


<script>

import axios from 'axios';
import axiosMixin from '../mixins/axiosMixin'
import AssetAssociation from '@/components/AssetAssociation.vue'
import store from '../store'
import EventBus from '../utils/event-bus';

export default {
  props : {
    envName : String,
    headName : String,
    tailName : String
  },
  mixins : [
    axiosMixin
  ],
  computed : {
    bcItems() {
     return [{text: 'Home', to: {name: 'home'}},{text: 'Asset Associations', to: {name: 'assetassociations'}},{text: this.objt.theEnvironmentName + ' / ' + this.objt.theHeadAsset + ' / ' + this.objt.theTailAsset, to : {name: 'assetassociation'}}]
    }
  },
  components : {
    AssetAssociation 
  },
  data() {
    return {
      objt : {
        theEnvironmentName : '', 
        theHeadAsset : '', 
        theHeadNavigation : 0, 
        theHeadType : 'Association', 
        theHeadMultiplicity : '*', 
        theHeadRole : '', 
        theTailRole : '', 
        theTailMultiplicity : '*', 
        theTailType : 'Association', 
        theTailNavigation : 0, 
        theTailAsset : '', 
        theRationale : 'None'
      },
      commitLabel : 'Create'
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.headName == 'To set') {
      axios.get('/api/dimensions/table/environment',{
        baseURL : store.state.url,
        params : {'session_id' : store.state.session}
      })
      .then(response => {
        next(vm => {
          vm.objt.theEnvironmentName = response.data[0];
        });
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });
    }
    else if (to.params.envName != undefined) {
      const url = "/api/assets/association/environment/" + to.params.envName + '/head/' + to.params.headName + '/tail/' + to.params.tailName;
      axios.get(url,{
        baseURL : store.state.url,
        params : {'session_id' : store.state.session}
      })
      .then(response => {
        next(vm => {
          vm.commitLabel = 'Update';
          vm.objt = response.data;
        });
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });
    }
  },
  methods : {
    commitAssetAssociation(objt) {
      this.objt = objt
      const updateUrl = this.$store.state.url + "/api/assets/association/environment/" + this.envName + '/head/' + this.headName + '/tail/' + this.tailName + "?session_id=" + this.$store.state.session;
      const createUrl = this.$store.state.url + "/api/assets/association";
      this.commitObject(updateUrl,createUrl,'assetassociations');
    }
  }

}
</script>