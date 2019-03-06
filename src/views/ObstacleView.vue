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

  <div class="obstacleview">
    <b-breadcrumb :items="bcItems" /> 
    <obstacle :object="this.objt" :label="this.commitLabel" v-on:obstacle-commit="commitObstacle" />
  </div>
</template>


<script>

import axios from 'axios';
import axiosMixin from '../mixins/axiosMixin'
import Obstacle from '@/components/Obstacle.vue'
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
     return [{text: 'Home', to: {name: 'home'}},{text: 'Obstacles', to: {name: 'objectsview', params: {dimension: 'obstacle'}}},{text: this.objt.theName, to : {name: 'obstacle'}}]
    }
  },
  components : {
    Obstacle 
  },
  data() {
    return {
      objt : {
        theName : '',
        theOriginator : '',
        theTags : '',
        theEnvironmentProperties : []
      },
      commitLabel : 'Create',
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.objectName == 'New obstacle') {
      next();
    }
    else {
      var url = "/api/obstacles/name/" + to.params.objectName
      axios.get(url,{
        baseURL : store.state.url,
        params : {'session_id' : store.state.session}
      })
      .then(response => {
        next(vm => {
          vm.commitLabel = 'Update';
          vm.objt = response.data;
          vm.objt.theTags = response.data.theTags.join(', ');
        })
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    }
  },
  methods : {
    commitObstacle(objt) {
      this.objt = objt
      var updateUrl = this.$store.state.url + "/api/obstacles/name/" + this.objectName + "?session_id=" + this.$store.state.session;
      var createUrl = this.$store.state.url + "/api/obstacles";
      this.commitObject(updateUrl,createUrl,'objectsview',undefined,'obstacle');
    }
  }

}
</script>