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
  <div class="domainproperty">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <b-form>
      <b-card bg-variant="light" no body> 
        <b-row>
          <b-col md="4">
            <b-form-group label="Domain Property" label-class="font-weight-bold text-md-left" label-for="theDomainPropertyInput">
              <b-form-input id="theDomainPropertyInput" v-model="objt.theName" type="text" required />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group label="Type" label-class="font-weight-bold text-md-left" label-for="theType">
              <b-form-select id="theTypeInput" v-model="objt.theType" :options="dpTypes" class="mb-3" required />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group label="Originator" label-class="font-weight-bold text-md-left" label-for="theOriginator">
              <b-form-input id="theOriginatorInput" v-model="objt.theOriginator" type="text" required />
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
        <b-row>
          <b-col md="12">
            <b-form-group label="Tags" label-class="font-weight-bold text-md-left" label-for="theTagsInput">
              <b-form-tags id="theTagsInput" v-model="objt.theTags" separator="," placeholder="Enter new tags separated by comma" remove-on-delete tag-variant="primary" tag-pills class="md-8"></b-form-tags>
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
  name : 'domain-property',
  props : {
    object : Object,
    label : String
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
      commitLabel : this.label,
      dpTypes: ['Hypothesis','Invariant']
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
        this.$emit('object-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'objectsview', params: {dimension: 'domainproperty'}});
    },
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0) {
        this.errors.push('Name is required');
      }
      if (this.objt.theType.length == 0) {
        this.errors.push('Type is required');
      }
      if (this.objt.theOriginator.length == 0) {
        this.errors.push('Originator is required');
      }
      if (this.objt.theDescription.length == 0) {
        this.errors.push('Description is required');
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