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
  <div class="environment">
    <dimension-modal ref="environmentDialog" dimension="noncomposite_environment" :existing="objt.theEnvironments" v-on:dimension-modal-update="addSubEnvironment"/> 
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <b-form>
      <b-container fluid>
      <b-card bg-variant="light" no body> 
        <b-row>
            <b-col md="9">
              <b-form-group label="Environment" label-class="font-weight-bold text-md-left" label-col="3" label-for="theEnvironmentInput">
                <b-form-input id="theEnvironmentInput" v-model="objt.theName" type="text" required />
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group label="Short Code" label-class="font-weight-bold text-md-left" label-col="2" label-for="theShortCode">
                <b-form-input id="theShortCodeInput" v-model="objt.theShortCode" type="text" required />
              </b-form-group>
            </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Description" label-class="font-weight-bold text-md-left" label-for="theDescriptionInput">
              <b-form-textarea id="theDescription" v-model="objt.theDescription" type="text" rows="4" max-rows="8" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6">
            <b-table striped bordered small hover :items="environments" :fields=environmentTableFields>
              <template v-slot:head(environmentactions)="data"> 
                <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addEnvironment(data)"/> 
              </template> 
              <template v-slot:cell(environmentactions)="row">
                <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteEnvironment(row.index)"/>
              </template> 
            </b-table>
          </b-col>
          <b-col md="3" v-if="this.objt.theEnvironments.length > 1">
            <b-form-group label="Strategy" label-class="font-weight-bold text-md-left" label-for="theCompositeStrategy">
              <b-form-radio-group v-model="theCompositeStrategy">
                <b-form-radio value="Maximise">Maximise</b-form-radio>
                <b-form-radio value="Override">Override</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </b-col>
          <b-col md="3" v-if="this.objt.theEnvironments.length > 1 && this.theCompositeStrategy == 'Override'">
            <b-form-group label="Environment" label-class="font-weight-bold text-md-left" label-cols="2" label-for="theEnvironmentSelect">
              <b-form-select id="theEnvironmentSelect" v-model="objt.theOverridingEnvironment" :options="objt.theEnvironments" class="mb-3" />
            </b-form-group>
          </b-col>
        </b-row>

      </b-card> 
      </b-container>
      <b-container fluid>
        <b-form-row>
          <b-col md="4" offset-md="5" >
            <b-button type="submit" variant="primary" @click="onCommit">{{commitLabel}}</b-button>
            <b-button type="submit" variant="secondary" @click="onCancel">Cancel</b-button>
          </b-col>
        </b-form-row>
      </b-container> 
    </b-form>
  </div>
</template>


<script>

import objectMixin from '../mixins/objectMixin'

export default {
  props : {
    object : Object,
    label : String
  },
  components : {
    DimensionModal : () => import('@/components/DimensionModal.vue'),
  },
  mixins : [
    objectMixin
  ],
  computed : {
    environments() {
      return this.objt.theEnvironments.length > 0 ? this.objt.theEnvironments.map(env => ({name : env})): []
    }
  },
  data() {
    return {
      errors : [],
      objt : this.object,
      commitLabel : this.label,
      theCompositeStrategy : 'Maximise',
      environmentTableFields : [
        {key: 'environmentactions', label : ''},
        {key: 'name', label : 'Environment'}
      ]
    }
  },
  watch : {
    object: 'setObject',
    theCompositeStrategy : 'setStrategy'
  },
  methods : {
    setObject() {
      this.objt = this.object;
      this.commitLabel = this.label;
      if (this.objt.theDuplicateProperty != 'None') {
        this.theCompositeStrategy = this.objt.theDuplicateProperty;
      }
    },
    setStrategy() {
      if (this.theCompositeStrategy == 'Maximise') {
        this.objt.theDuplicateProperty = 'Maximise'
        this.objt.theOverridingEnvironment = ''
      }
      else {
        this.objt.theDuplicateProperty = 'Override'
      }
    },
    onCommit(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        this.$emit('object-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'objectsview', params: {dimension: 'environment'}});
    },
    addEnvironment() {
      this.$refs.environmentDialog.show();  
    },
    addSubEnvironment(data) {
      const oldEnvs = this.objt.theEnvironments.length;
      this.objt.theEnvironments.push(data);
      if (oldEnvs == 1) {
        this.objt.theDuplicateProperty = 'Maximise';
      }
    },
    deleteEnvironment(index) {
      this.objt.theEnvironments.splice(index,1);
      if (this.objt.theEnvironments.length < 2) {
        this.objt.theDuplicateProperty = 'None';
        this.objt.theOverridingEnvironment = '';
      }
    },
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0 || this.objt.theName.trim().length == 0) {
        this.errors.push('Environment name is required');
      }
      const resChars = /[<>‘'`"\\:%/_*?#£$&]/ ;
      const res = this.objt.theName.match(resChars);
      if (res != null) {
        this.errors.push('Character ' + res['index'] + ' in ' + this.objt.theName + ' is a reserved character.');
      }
      if (this.objt.theShortCode.length == 0) {
        this.errors.push('Short code is required');
      }
      if (this.objt.theDescription.length == 0) {
        this.errors.push('Description is required');
      }
      if (this.objt.theEnvironments.length == 1) {
        this.errors.push('Composite environments must contain two or more environments');
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    }
  }
}
</script>