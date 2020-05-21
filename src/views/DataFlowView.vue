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

  <div class="dataflowview">
    <b-breadcrumb :items="bcItems" /> 
    <data-flow :object="this.objt" :label="this.commitLabel" v-on:data-flow-commit="commitDataFlow" />
  </div>
</template>


<script>

import axios from 'axios';
import axiosMixin from '../mixins/axiosMixin'
import DataFlow from '@/components/DataFlow.vue'
import store from '../store'
import EventBus from '../utils/event-bus';

export default {
  props : {
    objectName : String,
    envName : String
  },
  mixins : [
    axiosMixin
  ],
  computed : {
    bcItems() {
     return [{text: 'Home', to: {name: 'home'}},{text: 'Data Flows', to: {name: 'objectsview', params: {dimension: 'dataflow'}}},{text: this.objt.theEnvironmentName + " / " + this.objt.theName, to : {name: 'dataflow'}}]
    }
  },
  components : {
    DataFlow 
  },
  data() {
    return {
      objt : {
        theName : '',
        theType : 'Information',
        theEnvironmentName : '',
        theFromType : 'entity',
        theFromName : '',
        theToType : 'process',
        theToName : '',
        theAssets : [],
        theObstacles : []
      },
      commitLabel : 'Create',
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.objectName == 'New dataflow') {
      next();
    }
    else {
      const url = "/api/dataflows/name/" + to.params.objectName + "/environment/" + to.params.envName
      axios.get(url,{
        baseURL : store.state.url,
        params : {'session_id' : store.state.session}
      })
      .then(response => {
        next(vm => {
          vm.commitLabel = 'Update';
          vm.objt = response.data;
        })
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    }
  },
  methods : {
    commitDataFlow(objt) {
      this.objt = objt
      var updateUrl = this.$store.state.url + "/api/dataflows/name/" + this.objectName + "/environment/" + this.envName + "?session_id=" + this.$store.state.session;
      var createUrl = this.$store.state.url + "/api/dataflows";
      this.commitObject(updateUrl,createUrl,'objectsview',undefined,'dataflow');
    }
  }

}
</script>