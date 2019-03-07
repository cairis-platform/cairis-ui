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

  <div class="documentreferenceview">
    <b-breadcrumb :items="bcItems" /> 
    <document-reference :object="this.objt" :label="this.commitLabel" v-on:documentreference-commit="commitDocumentReference" />
  </div>
</template>


<script>

import axios from 'axios';
import axiosMixin from '../mixins/axiosMixin'
import DocumentReference from '@/components/DocumentReference.vue'
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
     return [{text: 'Home', to: {name: 'home'}},{text: 'Document references', to: {name: 'objectsview', params: {dimension: 'documentreference'}}},{text: this.objt.theName, to : {name: 'documentreference'}}]
    }
  },
  components : {
    DocumentReference
  },
  data() {
    return {
      objt : {
        theName : '',
        theDocName : '',
        theContributor : '',
        theExcerpt : ''
      },
      commitLabel : 'Create',
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.objectName == 'New documentreference') {
      next();
    }
    else {
      var url = "/api/document_references/name/" + to.params.objectName
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
    commitDocumentReference(objt) {
      this.objt = objt
      var updateUrl = this.$store.state.url + "/api/document_references/name/" + this.objectName + "?session_id=" + this.$store.state.session;
      var createUrl = this.$store.state.url + "/api/document_references";
      this.commitObject(updateUrl,createUrl,'objectsview',undefined,'documentreference');
    }
  }

}
</script>