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
  <div class="conceptreference">
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
              <b-form-group label="Dimension" label-class="font-weigh-bold text-md-left" label-for="theDimensionRadio">
                <b-form-radio-group id="theDimensionRadio" v-model="objt.theDimName">
                  <b-form-radio value="persona">Persona</b-form-radio>
                  <b-form-radio value="requirement">Requirement</b-form-radio>
                  <b-form-radio value="task">Task</b-form-radio>
                  <b-form-radio value="usecase">Use Case</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
              <b-form-group label="Object" label-class="font-weigh-bold text-md-left" label-for="theObjectSelect">
                <dimension-select id="theObjectSelect" ref="theObjectSelect" :dimension='objt.theDimName' :initial="objt.theObjtName" v-on:dimension-select-change="objectNameSelected" />
              </b-form-group>
              <b-form-group label="Description" label-class="font-weight-bold text-md-left" label-for="theDescriptionText">
                <b-form-textarea id="theDescriptionText" v-model="objt.theDescription" type="text" rows="4" max-rows="6" required />
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
  name : 'concept-reference',
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
      commitLabel : 'Create'
    }
  },
  methods : {
    setObject() {
      this.objt = this.object;
      this.$refs.theObjectSelect.selected = this.objt.theObjtName;
      this.commitLabel = this.label;
    },
    onCommit(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        this.$emit('conceptreference-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'objectsview', params: {dimension: 'conceptreference'}});
    },
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0) {
        this.errors.push('Concept Reference name is required');
      }
      if (this.objt.theDimName.length == 0) {
        this.errors.push('Dimenstion is required');
      }
      if (this.objt.theObjtName.length == 0) {
        this.errors.push('Object is required');
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
    },
    objectNameSelected(item) {
      this.objt.theObjtName = item;
    }
  }
}
</script>