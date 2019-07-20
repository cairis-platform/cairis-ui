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

  <div class="documentationview">
    <b-form class="vld-parent">
      <loading :active.sync="isLoading" is-full-page></loading>
      <b-breadcrumb :items="bcItems" /> 
      <b-container fluid>
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </p>
        <b-card bg-variant="light">
          <b-container fluid>
            <b-row>
              <b-col md="3">
                <b-form-group label="Type" label-class="text-md-left" label-cols="3" label-for="theTypeRadio">
                  <b-form-radio-group id="theTypeRadio" v-model="theDocType">
                    <b-form-radio value="Requirements">Requirements</b-form-radio>
                    <b-form-radio value="Personas">Personas</b-form-radio>
                    <b-form-radio value="Data Protection Impact Assessment">Data Protection Impact Assessment</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="File name" label-class="text-md-left" label-cols="3" label-for="theFileName">
                  <b-form-input id="theModelFile" v-model="theExportParameters.filename" type="text" required>
                  </b-form-input>
                 </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group label="Format" label-class="text-md-left" label-for="theFormatRadio">
                  <b-form-radio-group id="theFormatRadio" v-model="theDocFormat">
                    <b-form-radio value="PDF">PDF</b-form-radio>
                    <b-form-radio value="DOCX">Word Document (.docx)</b-form-radio>
                    <b-form-radio value="ODT">OpenDocument Text (.odt)</b-form-radio>
                    <b-form-radio value="RTF">Rich Text Format (.rtf)</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-container> 
      <b-container fluid>
        <b-form-row>
          <b-col md="4" offset-md="5" >
            <b-button type="submit" variant="primary" @click="onGenerate">Generate</b-button>
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
import EventBus from '../utils/event-bus';

export default {
  computed : {
    bcItems() {
     return [{text: 'Home', to: {name: 'home'}},{text: 'Export', to: {name: 'export'}}]
    },
    docURL() {
      return '/api/documentation/type/' + this.theDocType + '/format/' + this.theDocFormat;
    },
    exportHeaders() {
      return {'Content-Type' : 'application/' + this.theDocFormat.toLowerCase()}
    }
  },
  components : {
    Loading
  },
  data() {
    return {
      errors : [],
      isLoading : false,
      theDocType : 'Requirements',
      theDocFormat : 'PDF',
      theExportParameters : {
        session_id : this.$store.state.session,
        filename : 'report'
      }
    }
  },
  methods : {
    checkForm() {
      this.errors = []

      if (this.theExportParameters.filename.length == 0) {
        this.errors.push('File name is required');
      }
      if (this.theDocType.length == 0) {
        this.errors.push('Documentation type is required');
      }
      if (this.theDocFormat.length == 0) {
        this.errors.push('File format is required');
      }

      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    },
    onGenerate(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        this.isLoading = true;
        axios.get(this.docURL,{
          responseType : 'arraybuffer',
          headers : this.exportHeaders,
          baseURL : this.$store.state.url,
          params : this.theExportParameters
         })
        .then(response => {
          let blob = new Blob([response.data],{type: 'application/' + this.theDocFormat.toLowerCase() });
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = this.theExportParameters.filename + '.' + this.theDocFormat.toLowerCase();
          link.click();
          this.isLoading = false;
        })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
          this.isLoading = false;
        });
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'home'})
    },
    patternSelected(patternName) {
      this.theArchitecturalPatternName = patternName;
    },
    environmentSelected(envName) {
      this.theEnvironmentName = envName;
    },
    taskSelected(taskName) {
      this.theTaskName = taskName;
    },
    personaSelected(personaName) {
      this.thePersonaName = personaName;
    }
  }
}
</script>