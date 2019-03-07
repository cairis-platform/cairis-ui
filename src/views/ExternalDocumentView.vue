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

  <div class="externaldocumentview">
    <b-breadcrumb :items="bcItems" /> 
    <external-document :object="this.objt" :label="this.commitLabel" v-on:externaldocument-commit="commitExternalDocument" />
  </div>
</template>


<script>

import axios from 'axios';
import axiosMixin from '../mixins/axiosMixin'
import ExternalDocument from '@/components/ExternalDocument.vue'
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
     return [{text: 'Home', to: {name: 'home'}},{text: 'External documents', to: {name: 'objectsview', params: {dimension: 'externaldocument'}}},{text: this.objt.theName, to : {name: 'externaldocument'}}]
    }
  },
  components : {
    ExternalDocument 
  },
  data() {
    return {
      objt : {
        theName : '',
        theVersion : '',
        thePublicationDate : '',
        theAuthors : '',
        theDescription : ''
      },
      commitLabel : 'Create',
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.objectName == 'New externaldocument') {
      next();
    }
    else {
      var url = "/api/external_documents/name/" + to.params.objectName
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
    commitExternalDocument(objt) {
      this.objt = objt
      var updateUrl = this.$store.state.url + "/api/external_documents/name/" + this.objectName + "?session_id=" + this.$store.state.session;
      var createUrl = this.$store.state.url + "/api/external_documents";
      this.commitObject(updateUrl,createUrl,'objectsview',undefined,'externaldocument');
    }
  }

}
</script>