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
  <div class="documentreference">
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
                <b-form-input id="theNameInput" v-model="objt.theName" type="text" required />
              </b-form-group>
              <b-form-group label="External Document" label-class="font-weigh-bold text-md-left" label-for="theDocumentSelect">
                <dimension-select id="theDocumentSelect" dimension='external_document' :initial="this.objt.theDocName" v-on:dimension-select-change="docNameSelected" v-on:dimension-items-updated="docNamesLoaded" />
              </b-form-group>
              <b-form-group label="Contributor" label-class="font-weight-bold text-md-left" label-for="theContributorInput">
                <b-form-input id="theContributorInput" v-model="objt.theContributor" type="text" required />
              </b-form-group>
              <b-form-group label="Excerpt" label-class="font-weight-bold text-md-left" label-for="theExcerptInput">
                <b-form-textarea id="theExcerptInput" v-model="objt.theExcerpt" type="text" :rows=4 :max-rows=6 required />
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
import DimensionSelect from '@/components/DimensionSelect.vue'

export default {
  name : 'document-reference',
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
  components : {
    DimensionSelect
  },
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
      this.$router.push({ name: 'objectsview', params: {dimension: 'documentreference'}});
    },
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0) {
        this.errors.push('Document Reference name is required');
      }
      const resChars = /[<>‘'`"\\:%/_*?#£$&]/ ;
      const res = this.objt.theName.match(resChars);
      if (res != null) {
        this.errors.push('Character ' + res['index'] + ' in ' + this.objt.theName + ' is a reserved character.');
      }
      if (this.objt.theDocName.length == 0) {
        this.errors.push('External Document is required');
      }
      if (this.objt.theContributor.length == 0) {
        this.errors.push('Contributor is required');
      }
      if (this.objt.theExcerpt.length == 0) {
        this.errors.push('Excerpt is required');
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    },
    docNameSelected(item) {
      this.objt.theDocName = item;
    },
    docNamesLoaded(item) {
      this.objt.theDocName = item;
    }
  }
}
</script>