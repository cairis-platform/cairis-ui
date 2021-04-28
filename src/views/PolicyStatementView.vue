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

  <div class="policystatementview">
    <b-breadcrumb :items="bcItems" /> 
    <policy-statement :object="this.objt" :label="this.commitLabel" v-on:policy-statement-commit="commitPolicyStatement" />
  </div>
</template>


<script>

import axios from 'axios';
import axiosMixin from '../mixins/axiosMixin'
import PolicyStatement from '@/components/PolicyStatement.vue'
import store from '../store'
import EventBus from '../utils/event-bus';

export default {
  props : {
    goalName : String,
    envName : String,
    subjName : String,
    atName : String,
    resName : String
  },
  mixins : [
    axiosMixin
  ],
  computed : {
    bcItems() {
     return [{text: 'Home', to: {name: 'home'}},{text: 'Policy statements', to: {name: 'objectsview', params: {dimension: 'policy_statement'}}},{text: this.objt.theEnvironmentName + " / " + this.objt.theGoalName + ' / ' + this.objt.theSubject + ' / ' + this.objt.theAccessType + ' / ' + this.objt.theResource, to : {name: 'policy_statement'}}]
    }
  },
  components : {
    PolicyStatement
  },
  data() {
    return {
      objt : {
        theGoalName : '',
        theEnvironmentName : '',
        theSubject : '',
        theAccessType : 'interact',
        theResource : '',
        thePermission : 'deny'
      },
      commitLabel : 'Create',
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.goalName == 'To set') {
      next();
    }
    else {
      const url = "/api/policy_statements/goal/" + to.params.goalName + "/environment/" + to.params.envName + "/subject/" + to.params.subjName + "/access_type/" + to.params.atName + "/resource/" + to.params.resName;
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
    commitPolicyStatement(objt) {
      this.objt = objt;
      var updateUrl = this.$store.state.url + "/api/policy_statements/goal/" + this.goalName + "/environment/" + this.envName + "/subject/" + this.subjName + "/access_type/" + this.atName + "/resource/" + this.resName + "?session_id=" + this.$store.state.session;
      var createUrl = this.$store.state.url + "/api/policy_statements";
      this.commitObject(updateUrl,createUrl,'objectsview',undefined,'policy_statement');
    }
  }
}
</script>