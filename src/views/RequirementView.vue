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

  <div class="requirementview">
    <b-breadcrumb :items="bcItems" /> 
    <requirement :object="this.objt" :domain="this.domain" :label="this.commitLabel" v-on:requirement-commit="commitRequirement" />
  </div>
</template>


<script>

import axios from 'axios';
import axiosMixin from '../mixins/axiosMixin'
import Requirement from '@/components/Requirement.vue'
import store from '../store'
import EventBus from '../utils/event-bus';

export default {
  props : {
    objectName : String,
    domain : Object
  },
  mixins : [
    axiosMixin
  ],
  computed : {
    bcItems() {
     return [{text: 'Home', to: {name: 'home'}},{text: 'Requirements', to: {name: 'objectsview', params: {dimension: 'requirement'}}},{text: this.objt.theName, to : {name: 'requirement'}}]
    }
  },
  components : {
    Requirement
  },
  data() {
    return {
      objt : {
        theName : '',
        theLabel : '-1',
        theDescription : '',
        thePriority : '1',
        theOriginator : '',
        theFitCriterion : '',
        theRationale : '',
        theType : 'Functional',
        theDomain : ''
      },
      commitLabel : 'Create',
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.objectName == 'New requirement') {
      next();
    }
    else {
      var url = "/api/requirements/name/" + to.params.objectName
      axios.get(url,{
        baseURL : store.state.url,
        params : {'session_id' : store.state.session}
      })
      .then(response => {
        next(vm => {
          vm.commitLabel = 'Update';
          var objt = response.data;
          objt['theDomain'] = to.params.domain.name;
          vm.objt = objt;
          vm.selectedDomain = to.params.domain.type;
        });
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    }
  },
  methods : {
    commitRequirement(commitObjt) {
      this.objt = commitObjt.object
      var updateUrl = this.$store.state.url + "/api/requirements/name/" + this.objectName + "?session_id=" + this.$store.state.session;
      var createUrl = this.$store.state.url + "/api/requirements";
      this.commitObject(updateUrl,createUrl,'objectsview',commitObjt.parameters,'requirement');
    }
  }
}
</script>