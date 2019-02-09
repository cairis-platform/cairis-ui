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
    <kaos-association :object="this.objt" :label="this.commitLabel" v-on:kaos-association-commit="commitKaosAssociation" />
  </div>
</template>


<script>

import axios from 'axios';
import axiosMixin from '../mixins/axiosMixin'
import KaosAssociation from '@/components/KaosAssociation.vue'
import store from '../store'
import EventBus from '../utils/event-bus';

export default {
  props : {
    envName : String,
    goalName : String,
    subGoalName : String
  },
  mixins : [
    axiosMixin
  ],
  computed : {
    bcItems() {
     return [{text: 'Home', to: {name: 'home'}},{text: 'KAOS Associations', to: {name: 'kaosassociations'}},{text: this.objt.theEnvironmentName + ' / ' + this.objt.theGoal + ' / ' + this.objt.theSubGoal, to : {name: 'kaosassociation'}}]
    }
  },
  components : {
    KaosAssociation 
  },
  data() {
    return {
      objt : {
        theEnvironmentName : '', 
        theGoalDimension : 'goal', 
        theAssociationType : 'and', 
        theGoal : '', 
        theRationale : 'None', 
        theSubGoalDimension : 'goal', 
        theAlternativeId : 0, 
        theSubGoal : ''
      },
      commitLabel : 'Create',
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.goalName == 'To set') {
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
      const url = "/api/goals/association/environment/" + to.params.envName + '/goal/' + to.params.goalName + '/subgoal/' + to.params.subGoalName;
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
    commitKaosAssociation(objt) {
      this.objt = objt
      const updateUrl = this.$store.state.url + "/api/goals/association/environment/" + objt.theEnvironmentName + '/goal/' + objt.theGoal + '/subgoal/' + objt.theSubGoal + "?session_id=" + this.$store.state.session;
      const createUrl = this.$store.state.url + "/api/goals/association";
      this.commitObject(updateUrl,createUrl,'kaosassociations');
    }
  }

}
</script>