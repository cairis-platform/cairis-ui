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
  <div class="externaldocument">
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
          <b-col md=12>
            <b-container fluid>
              <b-form-group label="Name" label-class="font-weight-bold text-md-left" label-for="theNameInput">
                <b-form-input id="theNameInput" v-model="objt.theName" type="text" required>
                </b-form-input>
              </b-form-group>
              <b-form-group label="Authors" label-class="font-weight-bold text-md-left" label-for="theAuthorsInput">
                <b-form-input id="theAuthorsInput" v-model="objt.theAuthors" type="text" required>
                </b-form-input>
              </b-form-group>
              <b-form-group label="Version" label-class="font-weight-bold text-md-left" label-for="theVersion">
                <b-form-input id="theVersionInput" v-model="objt.theVersion" type="text" required>
                </b-form-input>
              </b-form-group>
              <b-form-group label="Publication Date" label-class="font-weight-bold text-md-left" label-for="thePublicationDateInput">
                <b-form-input id="thePublicationDateInput" v-model="objt.thePublicationDate" type="text" required>
                </b-form-input>
              </b-form-group>
              <b-form-group label="Description" label-class="font-weight-bold text-md-left" label-for="theDescriptionInput">
                <b-form-textarea id="theDescriptionInput" v-model="objt.theDescription" type="text" :rows=4 :max-rows=6 required>
                </b-form-textarea>
              </b-form-group>
            </b-container>
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
  name : 'external-document',
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
      commitLabel : this.label
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
      this.$router.push({ name: 'objectsview', params: {dimension: 'externaldocument'}});
    },
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0 || this.objt.theName.trim().length == 0) {
        this.errors.push('External Document name is required');
      }
      const resChars = /[<>‘'`"\\:%/_*?#£$&]/ ;
      const res = this.objt.theName.match(resChars);
      if (res != null) {
        this.errors.push('Character ' + res['index'] + ' in ' + this.objt.theName + ' is a reserved character.');
      }
      if (this.objt.theAuthors.length == 0) {
        this.errors.push('Authors are required');
      }
      if (this.objt.theVersion.length == 0) {
        this.errors.push('Version is required');
      }
      if (this.objt.thePublicationDate.length == 0) {
        this.errors.push('Publication Date is required');
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