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
  <div class="valuetype">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <b-form>
      <b-card bg-variant="light" no body> 
        <b-row v-if="objt.theDimension == 'asset_value'">
          <b-col md="12">
            <b-form-group label="Environment" label-class="font-weight-bold text-md-left" label-for="theValueTypeEnvironmentInput">
              <b-form-input id="theValueTypeNameInput" v-model="objt.theEnvironmentName" type="text" readonly />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Name" label-class="font-weight-bold text-md-left" label-for="theValueTypeNameInput">
              <b-form-input id="theValueTypeNameInput" v-model="objt.theName" type="text" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Description" label-class="font-weight-bold text-md-left" label-for="theDescriptionInput">
              <b-form-textarea id="theDescription" v-model="objt.theDescription" type="text" rows="4" max-rows="4" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if="componentValueType">
          <b-col md="6">
            <b-form-group label="Score" label-class="font-weight-bold text-md-left" label-for="theValueTypeScoreInput">
              <b-form-input id="theValueTypeScoreInput" v-model="objt.theScore" type="number" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if="componentValueType">
          <b-col md="12">
            <b-form-group label="Rationale" label-class="font-weight-bold text-md-left" label-for="theValueTypeRationaleText">
              <b-form-textarea id="theValueTypeRationaleText" v-model="objt.theRationale" type="text" rows="2" max-rows="2" required />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card> 
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
  name : 'value-type',
  props : {
    object : Object,
    label : String,
    dimName : String,
    envName : String
  },
  computed : {
    componentValueType() {
      return this.objt.theType == 'access_right' || this.objt.theType == 'protocol' || this.objt.theType == 'privilege' || this.objt.theType == 'surface_type' ? true : false;
    }
  },
  watch : {
    object: 'setObject'
  },
  mixins : [
    objectMixin
  ],
  data() {
    return {
      errors : [],
      objt : this.object,
      commitLabel : 'Create'
    }
  },
  methods : {
    setObject() {
      this.objt = this.object;
      this.commitLabel = this.label;
    },
    onCommit(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        this.$emit('valuetype-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({name: 'valuetypes', params: {dimension : this.objt.theType}});
    },
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0) {
        this.errors.push('Name is required');
      }
      if (this.objt.theDescription.length == 0) {
        this.errors.push('Description is required');
      }
      if (this.componentTypeValue && this.objt.theScore < 0) {
        this.errors.push('Valid score is required');
      }
      if (this.componentTypeValue && this.objt.theRationale.length <= 0) {
        this.errors.push('Rationale is required');
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
