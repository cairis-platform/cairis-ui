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

  <div class="templaterequirement">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <b-form>
      <b-container fluid>
        <b-card bg-variant="light">
          <b-row>
            <b-col md="4">
              <b-form-group label="Name" label-class="font-weight-bold text-md-left" label-for="theNameInput">
                <b-form-input id="theNameInput" v-model="objt.theName" type="text" required>
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Type" label-class="font-weight-bold text-md-left" label-for="theType">
                <b-form-select id="theTypeInput" v-model="objt.theType" :options="reqTypes" class="mb-3" required>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Asset" label-class="font-weight-bold text-md-left">
                <dimension-select dimension="template_asset" :initial="objt.theAssetName" v-on:dimension-select-change="assetSelected" v-on:dimension-items-updated="assetsLoaded" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Specification" label-class="font-weight-bold text-md-left" label-for="theDescriptionInput">
                <b-form-textarea id="theDescriptionInput" v-model="objt.theDescription" type="text" rows="2" max-rows="4" required />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Fit Criterion" label-class="font-weight-bold text-md-left" label-for="theFitCriterionInput">
                <b-form-textarea id="theFitCriterionInput" v-model="objt.theFitCriterion" type="text" rows="2" max-rows="4" required />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Rationale" label-class="font-weight-bold text-md-left" label-for="theRationaleInput">
                <b-form-textarea id="theRationaleInput" v-model="objt.theRationale" type="text" rows="2" max-rows="4" required />
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
import DimensionSelect from '@/components/DimensionSelect.vue'

export default {
  props : {
    object : Object,
    label : String,
    domain : Object
  },
  watch : {
    object: 'setObject'
  },
  components : {
    DimensionSelect
  },
  mixins : [
    objectMixin
  ],
  data() {
    return {
      objt : this.object,
      commitLabel : this.label,
      errors : [],
      reqTypes: ['Functional','Data','Look and Feel','Usability','Performance','Operational','Maintainability','Portability','Security','Cultural and Political','Legal','Privacy']
    }
  }, 
  methods: {
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0 || this.objt.theName.trim().length == 0) {
        this.errors.push('Name is required');
      }
      const resChars = /[<>‘'`"\\:%/_*?#£$&]/ ;
      const res = this.objt.theName.match(resChars);
      if (res != null) {
        this.errors.push('Character ' + res['index'] + ' in ' + this.objt.theName + ' is a reserved character.');
      }
      if (this.objt.theType.length == 0) {
        this.errors.push('Type is required');
      }
      if (this.objt.theDescription.length == 0) {
        this.errors.push('Description is required');
      }
      if (this.objt.theAssetName.length == 0) {
        this.errors.push('Asset is required');
      }
      if (this.objt.theFitCriterion.length == 0) {
        this.errors.push('Fit Criterion is required');
      }
      if (this.objt.theRationale.length == 0) {
        this.errors.push('Rationale is required');
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    },
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
      this.$router.push({ name: 'objectsview', params: {dimension: 'templaterequirement'}});
    },
    assetSelected(assetName) {
      this.objt.theAssetName = assetName
    },
    assetsLoaded(assetName) {
      this.objt.theAssetName = assetName
    }
  }
}
</script>