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

  <div class="domainpropertyview">
    <b-breadcrumb :items="bcItems" /> 
    <domain-property :object="this.objt" :label="this.commitLabel" v-on:domainproperty-commit="commitDomainProperty" />
  </div>
</template>


<script>

import axios from 'axios';
import axiosMixin from '../mixins/axiosMixin'
import DomainProperty from '@/components/DomainProperty.vue'
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
     return [{text: 'Home', to: {name: 'home'}},{text: 'Domain Properties', to: {name: 'domainproperties'}},{text: this.objt.theName, to : {name: 'domainproperty'}}]
    }
  },
  components : {
    DomainProperty 
  },
  data() {
    return {
      objt : {
        theName : '',
        theType : '',
        theDescription : '',
        theOriginator : '',
        theTags : ''
      },
      commitLabel : 'Create',
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.objectName == 'New domainproperty') {
      next();
    }
    else {
      var url = "/api/domainproperties/name/" + to.params.objectName
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
    commitDomainProperty(objt) {
      this.objt = objt
      var updateUrl = this.$store.state.url + "/api/domainproperties/name/" + this.objectName + "?session_id=" + this.$store.state.session;
      var createUrl = this.$store.state.url + "/api/domainproperties";
      this.commitObject(updateUrl,createUrl,'domainproperties');
    }
  }

}
</script>