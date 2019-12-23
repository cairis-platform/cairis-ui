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

  <div class="goalcontributionview">
    <b-breadcrumb :items="bcItems" /> 
    <goal-contribution :object="this.objt" :label="this.commitLabel" v-on:goal-contribution-commit="commitGoalContribution" />
  </div>
</template>


<script>

import axios from 'axios';
import axiosMixin from '../mixins/axiosMixin'
import GoalContribution from '@/components/GoalContribution.vue'
import store from '../store'
import EventBus from '../utils/event-bus';
import defaultObjectFactory from '../utils/defaultObjectFactory';

export default {
  props : {
    sourceName : String,
    targetName : String
  },
  mixins : [
    axiosMixin
  ],
  computed : {
    bcItems() {
     return this.objt != undefined ? [{text: 'Home', to: {name: 'home'}},{text: 'Goal contributions', to: {name: 'objectsview', params: {dimension: 'goal_contribution'}}},{text: this.objt.theSource + ' / ' + this.objt.theDestination, to : {name: 'goal_contribution'}}] : [];
    }
  },
  components : {
    GoalContribution 
  },
  data() {
    return {
      objt : undefined,
      commitLabel : 'Create'
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.sourceName == 'To set') {
      next(vm => {
        vm.objt = JSON.parse(JSON.stringify(defaultObjectFactory['goal_contribution']));
      });
    }
    else {
      const url = "/api/goal_contributions/source/" + to.params.sourceName + '/target/' + to.params.targetName;
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
    commitGoalContribution(objt) {
      this.objt = objt
      const updateUrl = this.$store.state.url + "/api/goal_contributions/source/" + this.objt.theSource + '/target/' + this.objt.theDestination + "?session_id=" + this.$store.state.session;
      const createUrl = this.$store.state.url + "/api/goal_contributions";
      this.commitObject(updateUrl,createUrl,'objectsview',undefined,'goal_contribution');
    }
  }
}
</script>