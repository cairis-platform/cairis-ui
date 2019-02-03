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

  <div class="environmentview">
    <b-breadcrumb :items="bcItems" /> 
    <environment :object="this.objt" :label="this.commitLabel" v-on:environment-commit="commitEnvironment" />
  </div>
</template>


<script>

import axios from 'axios';
import axiosMixin from '../mixins/axiosMixin'
import Environment from '@/components/Environment.vue'
import store from '../store'
import EventBus from '../utils/event-bus';

export default {
  props : {
    objectName : String
  },
  mixins : [
    axiosMixin
  ],
  computed : {
    bcItems() {
     return [{text: 'Home', to: {name: 'home'}},{text: 'Environments', to: {name: 'environments'}},{text: this.objt.theName, to : {name: 'environment'}}]
    }
  },
  components : {
    Environment 
  },
  data() {
    return {
      objt : {
        theName : '',
        theShortCode : '',
        theDescription : '',
        theEnvironments : [],
        theDuplicateProperty : 'None',
        theOverridingEnvironment : '',
        theTensions : [
          {"value": 0, "attr_id": 4, "base_attr_id": 0, "rationale": "None"}, 
          {"value": 0, "attr_id": 5, "base_attr_id": 0, "rationale": "None"}, 
          {"value": 0, "attr_id": 6, "base_attr_id": 0, "rationale": "None"}, 
          {"value": 0, "attr_id": 7, "base_attr_id": 0, "rationale": "None"}, 
          {"value": 0, "attr_id": 4, "base_attr_id": 1, "rationale": "None"}, 
          {"value": 0, "attr_id": 5, "base_attr_id": 1, "rationale": "None"}, 
          {"value": 0, "attr_id": 6, "base_attr_id": 1, "rationale": "None"}, 
          {"value": 0, "attr_id": 7, "base_attr_id": 1, "rationale": "None"}, 
          {"value": 0, "attr_id": 4, "base_attr_id": 2, "rationale": "None"}, 
          {"value": 0, "attr_id": 5, "base_attr_id": 2, "rationale": "None"}, 
          {"value": 0, "attr_id": 6, "base_attr_id": 2, "rationale": "None"}, 
          {"value": 0, "attr_id": 7, "base_attr_id": 2, "rationale": "None"}, 
          {"value": 0, "attr_id": 4, "base_attr_id": 3, "rationale": "None"}, 
          {"value": 0, "attr_id": 5, "base_attr_id": 3, "rationale": "None"},
          {"value": 0, "attr_id": 6, "base_attr_id": 3, "rationale": "None"}, 
          {"value": 0, "attr_id": 7, "base_attr_id": 3, "rationale": "None"}] 
      },
      commitLabel : 'Create'
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.objectName == 'New environment') {
      next();
    }
    else {
      var url = "/api/environments/name/" + to.params.objectName
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
    commitEnvironment(objt) {
      this.objt = objt
      var updateUrl = this.$store.state.url + "/api/environments/name/" + this.objectName + "?session_id=" + this.$store.state.session;
      var createUrl = this.$store.state.url + "/api/environments";
      this.commitObject(updateUrl,createUrl,'environments');
    }
  }

}
</script>