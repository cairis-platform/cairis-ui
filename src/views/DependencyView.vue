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

  <div class="dependencyview">
    <b-breadcrumb :items="bcItems" /> 
    <dependency :object="this.objt" :label="this.commitLabel" v-on:dependency-commit="commitDependency" />
  </div>
</template>


<script>

import axios from 'axios';
import axiosMixin from '../mixins/axiosMixin'
import Dependency from '@/components/Dependency.vue'
import store from '../store'
import EventBus from '../utils/event-bus';

export default {
  props : {
    envName : String,
    depName : String,
    deeName : String,
    dpyName : String
  },
  mixins : [
    axiosMixin
  ],
  computed : {
    bcItems() {
     return [{text: 'Home', to: {name: 'home'}},{text: 'Dependency', to: {name: 'objectsview', params: {dimension: 'dependency'}}},{text: this.objt.theEnvironmentName + ' / ' + this.objt.theDepender + ' / ' + this.objt.theDependee + ' / ' + this.objt.theDependency, to : {name: 'dependency'}}]
    }
  },
  components : {
    Dependency 
  },
  data() {
    return {
      objt : {
        theEnvironmentName : '', 
        theDependencyType : 'goal',
        theDepender : '',
        theDependee : '',
        theDependency : '',    
        theRationale : 'None'
      },
      commitLabel : 'Create'
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.depName == 'To set') {
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
    else {
      const url = "/api/dependencies/environment/" + to.params.envName + '/depender/' + to.params.depName + '/dependee/' + to.params.deeName + '/dependency/' + to.params.dpyName;
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
    commitDependency(objt) {
      this.objt = objt
      const updateUrl = this.$store.state.url + "/api/dependencies/environment/" + this.envName + '/depender/' + this.depName + '/dependee/' + this.deeName + '/dependency/' + this.dpyName +  "?session_id=" + this.$store.state.session;
      const createUrl = this.$store.state.url + "/api/dependencies";
      this.commitObject(updateUrl,createUrl,'objectsview',undefined,'dependency');
    }
  }

}
</script>