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

  <div class="exportview">
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
          <b-form-group label="Model" label-class="text-md-left" label-cols="3" horizontal label-for="theModelRadio">
            <b-form-radio-group id="theModelRadio" v-model="theModelType">
              <b-form-radio value="Model">Model</b-form-radio>
              <b-form-radio value="GRL">GRL</b-form-radio>
              <b-form-radio value="Architectural Pattern">Architectural Pattern</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group v-if="theModelType == 'Architectural Pattern'" label="Architectural Pattern" label-class="text-md-left" label-cols="3" horizontal label-for="thePatternSelect">
            <dimension-select ref="patternSelect" id="patternSelect" dimension="component_view" v-on:dimension-select-change="patternSelected" />
          </b-form-group>
          <b-container fluid v-if="theModelType == 'GRL'">
            <b-row>
              <b-col md="4">
                <b-form-group label="Environment" label-class="text-md-left" label-cols="3" horizontal label-for="theEnvironmentSelect">
                  <dimension-select ref="environmentSelect" id="environmentSelect" dimension="environment" v-on:dimension-select-change="environmentSelected" />
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Task" label-class="text-md-left" label-cols="3" horizontal label-for="theTaskSelect">
                  <dimension-select ref="taskSelect" id="taskSelect" dimension="task" v-on:dimension-select-change="taskSelected" />
                </b-form-group>
              </b-col>

            </b-row>
          </b-container>
          <b-form-group label="File name" label-class="text-md-left" label-cols="3" horizontal label-for="theFileName">
            <b-form-input id="theModelFile" v-model="theExportParameters.filename" type="text" required>
            </b-form-input>
          </b-form-group>

        </b-card>
      </b-container> 
      <b-container fluid>
        <b-form-row>
          <b-col md="4" offset-md="5" >
            <b-button type="submit" variant="primary" @click="onExport">Export</b-button>
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
import DimensionSelect from '@/components/DimensionSelect.vue'
import EventBus from '../utils/event-bus';

export default {
  computed : {
    bcItems() {
     return [{text: 'Home', to: {name: 'home'}},{text: 'Export', to: {name: 'export'}}]
    },
    exportURL() {
      return this.theModelType == 'Model' ? '/api/export/file' : (this.theModelType == 'Architectural Pattern' ? '/api/export/file/architectural_pattern/' + this.theArchitecturalPatternName : '/api/export/file/grl/task/' + this.theTaskName + '/persona/' + this.thePersonaName + '/environment/' + this.theEnvironmentName);
    }
  },
  components : {
    Loading,
    DimensionSelect
  },
  data() {
    return {
      errors : [],
      isLoading : false,
      theModelType : 'Model',
      theExportURL : '/api/export/file',
      theArchitecturalPatternName : '',
      theEnvironmentName : '',
      theTaskName : '',
      thePersonaName : '',
      theExportParameters : {
        session_id : this.$store.state.session,
        filename : 'model.xml'
      },
      theExportHeaders : {'Content-Type' : 'application/xml'}
    }
  },
  methods : {
    checkForm() {
      this.errors = []

      if (this.theExportParameters.filename.length == 0) {
        this.errors.push('File name is required');
      }

      if (this.theModelType == 'Architectural Pattern') {
        if (this.theArchitecturalPatternName.length == 0) {
          this.errors.push('Architectural pattern is required');
        }
      }
      else if (this.theModelType == 'GRL') {
        if (this.theEnvironmentName.length == 0) {
          this.errors.push('Environment is required');
        }
        if (this.theTaskName.length == 0) {
          this.errors.push('Task is required');
        }
        if (this.thePersonaName.length == 0) {
          this.errors.push('Persona is required');
        }
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    },
    onExport(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        axios.get(this.exportURL,{
          responseType : 'arraybuffer',
          headers : this.theExportHeaders,
          baseURL : this.$store.state.url,
          params : this.theExportParameters
         })
        .then(response => {
          let blob = new Blob([response.data],{type: 'application/xml' });
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = this.theExportParameters.filename;
          link.click();
        })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        });
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.isLoading = false;
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