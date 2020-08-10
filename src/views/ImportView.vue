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
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <b-form class="vld-parent">
      <loading :active.sync="isLoading" is-full-page></loading>
      <b-breadcrumb :items="bcItems" /> 
      <b-container fluid>
        <b-card bg-variant="light">
          <b-form-group label="Model" label-class="text-md-left" label-cols="3" label-for="theModelSelect">
            <b-form-select id="theModelSelect" v-model="theModelType" :options="modelTypes" class="mb-3" required />
          </b-form-group>
          <div v-show="theModelType == 'Model'">
            <b-form-group>
              <b-form-checkbox v-model="isOverwrite" >Overwrite existing</b-form-checkbox>
            </b-form-group>
          </div>
          <b-form-group label="File" label-class="text-md-left" label-cols="3" label-for="theImportFileInput">
            <b-form-file accept="text/xml+vnd.graphviz" v-model="theImportFile" class="mt-3" plain />
          </b-form-group>
          <div v-if="theModelType == 'Attack Tree (Dot)'">
            <b-card bg-variant="light">
              <b-row>
                <b-col md="6">
                  <b-form-group label="Environment" label-class="font-weight-bold text-md-left" label-for="theEnvironmentSelect">
                    <dimension-select id="theEnvironmentSelect" dimension='environment' v-on:dimension-select-change="environmentSelected" v-on:dimension-items-updated="environmentsLoaded" />
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Contributor" label-class="font-weight-bold text-md-left" label-for="theContributorInput">
                    <b-form-input id="theContributorInput" v-model="theContributor" type="text" required />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card>
          </div>
          <div v-if="isDiagramsNetModel">
            <b-card bg-variant="light">
              <b-row>
                <b-col md="12">
                  <b-form-group label="Environment" label-class="font-weight-bold text-md-left" label-for="theEnvironmentSelect">
                    <dimension-select id="theEnvironmentSelect" dimension='environment' v-on:dimension-select-change="environmentSelected" v-on:dimension-items-updated="environmentsLoaded" />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card>
          </div>
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
import DimensionSelect from '@/components/DimensionSelect.vue'

export default {
  computed : {
    bcItems() {
     return [{text: 'Home', to: {name: 'home'}},{text: 'Import', to: {name: 'import'}}]
    },
    overwriteFlag() {
      return this.isOverwrite == true ? 1 : 0;
    },
    isDiagramsNetModel() {
      return (this.theModelType == 'diagrams.net (Data Flow Diagram)' || this.theModelType == 'diagrams.net (Asset Model)') ? true : false;
    }
  },
  components : {
    Loading,
    DimensionSelect
  },
  data() {
    return {
      isLoading : false,
      isOverwrite : true,
      errors : [],
      theModelType : 'Model Package',
      modelTypes : ['Model Package',
                    'Model',
                    'Project data',
                    'Requirements',
                    'Risk Analysis',
                    'Usability',
                    'Misusability',
                    'Associations',
                    'Threat and Vulnerability Types',
                    'Domain Values',
                    'Threat and Vulnerability Directory',
                    'Security Pattern',
                    'Architectural Pattern',
                    'Attack Pattern',
                    'Synopses',
                    'Assets',
                    'Processes',
                    'Locations',
                    'Dataflows',
                    'Attack Tree (Dot)',
                    'diagrams.net (Data Flow Diagram)',
                    'diagrams.net (Asset Model)',
                    'Persona characteristics (Workbook)',
                    'User goals (Workbook)'],
      theImportFile : '',
      theModelContent : '',
      theEnvironment : '',
      theContributor : 'Unknown'
    }
  },
  methods : {
    onImport(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        if (this.theModelType == 'Model Package'  || this.theModelType == 'Persona characteristics (Workbook)' || this.theModelType == 'User goals (Workbook)') {
          this.importBinary();
        }
        else {
          this.importFile();
        }
      }
    },
    checkForm() {
      this.errors = []
      if (this.theImportFile.length == 0) {
        this.errors.push('Import file name is required');
      }
      if (this.theModelType == 'Attack Tree (Dot)') {
        if (this.theEnvironment.length == 0) {
          this.errors.push("Environment not defined");
        }
        if (this.theContributor.length == 0) {
          this.errors.push("Contributor not defined");
        }
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    },
    importBinary() {
      this.isLoading = true;
      const fd = new FormData();
      fd.append('file',this.theImportFile)
      const url = this.$store.state.url + (this.theModelType == 'Model Package' ? '/api/import/package' : (this.theModelType == 'Persona characteristics (Workbook)' ? '/api/import/file/persona_characteristics' : '/api/import/file/user_goals'))  + '?session_id=' + this.$store.state.session;
      axios.post(url, fd)
      .then(response => {
        EventBus.$emit('operation-success',response.data.message);
        this.isLoading = false;
        this.$router.push({ name: 'home'})
      })
      .catch((error) => {
        this.isLoading = false;
        EventBus.$emit('operation-failure',error.response.data.message);
      });
    },
    importFile() {
      let reader = new FileReader();
      reader.onload = e => {
        this.isLoading = true;
        this.theModelContent = e.target.result;
        const importObjt = {'urlenc_file_contents' : this.theModelContent,'overwrite' : this.overwriteFlag, 'type': this.theModelType, 'environment' : this.theEnvironment, 'contributor' : this.theContributor};
        const importUrl = this.$store.state.url + '/api/import/text';
        axios.post(importUrl,{
          session_id : store.state.session,
          object : importObjt
        })
        .then(response => {
          EventBus.$emit('operation-success',response.data.message);
          this.isLoading = false;
          this.$router.push({ name: 'home'})
        })
        .catch((error) => {
          this.isLoading = false;
          EventBus.$emit('operation-failure',error.response.data.message);
        });
      }
      reader.readAsText(this.theImportFile);
    },
    onCancel(evt) {
      evt.preventDefault();
      this.isLoading = false;
      this.$router.push({ name: 'home'})
    },
    environmentSelected(item) {
      if (item != undefined) {
        this.theEnvironment = item;
      }
    },
    environmentsLoaded(item) {
      this.theEnvironment = item;
    }
  }
}
</script>