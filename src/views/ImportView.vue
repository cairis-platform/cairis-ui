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

  <div class="importview">
    <b-form class="vid-parent">
      <loading :active.sync="isLoading" is-full-page></loading>
      <b-breadcrumb :items="bcItems" /> 
      <b-container fluid>
        <b-card bg-variant="light">
          <b-form-group label="Model" label-class="text-md-left" label-cols="3" horizontal label-for="theModelSelect">
            <b-form-select id="theModelSelect" v-model="theModelType" :options="modelTypes" class="mb-3" required>
            </b-form-select>
          </b-form-group>
          <b-form-group label="File" label-class="text-md-left" label-cols="3" horizontal label-for="theImportFileInput">
            <b-form-file accept="text/xml+vnd.graphviz" v-model="theImportFile" class="mt-3" plain>
            </b-form-file>
          </b-form-group>
        </b-card>
      </b-container> 
      <b-container fluid>
        <b-form-row>
          <b-col md="4" offset-md="5" >
            <b-button type="submit" variant="primary" @click="onImport">Import</b-button>
            <b-button type="submit" variant="secondary" @click="onCancel">Cancel</b-button>
          </b-col>
        </b-form-row>
      </b-container> 
    </b-form>

  </div>
</template>


<script>

import axios from 'axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import store from '../store'
import EventBus from '../utils/event-bus';

export default {
  computed : {
    bcItems() {
     return [{text: 'Home', to: {name: 'home'}},{text: 'Import', to: {name: 'import'}}]
    }
  },
  components : {
    Loading
  },
  data() {
    return {
      isLoading : false,
      theModelType : 'Model',
      modelTypes : ['Model','Project data','Requirements','Risk Analysis','Usability','Misusability','Associations','Threat and Vulnerability Types','Domain Values','Threat and Vulnerability Directory','Security Pattern','Architectural Pattern','Attack Pattern','Synopses','Assets','Processes','Locations','Dataflows','Attack Tree (Dot)'],
      theImportFile : '',
      theModelContent : ''
    }
  },
  methods : {
    onImport(evt) {
      evt.preventDefault();
      let reader = new FileReader();
      reader.onload = e => {
        this.isLoading = true;
        this.theModelContent = e.target.result;
        const importObjt = {'urlenc_file_contents' : this.theModelContent,'overwrite' : 1, 'type': this.theModelType};
        const importUrl = this.$store.state.url + '/api/import/text'
        axios.post(importUrl,{
          session_id : store.state.session,
          object : importObjt
        })
        .then(response => {
          EventBus.$emit('operation-success',response.data.message)
          this.isLoading = false;
          this.$router.push({ name: 'home'})
        })
        .catch((error) => {
          this.isLoading = false;
          EventBus.$emit('operation-failure',error)
        })
      }
      reader.readAsText(this.theImportFile)
    },
    onCancel(evt) {
      evt.preventDefault();
      this.isLoading = false;
      this.$router.push({ name: 'home'})
    }
  }
}
</script>