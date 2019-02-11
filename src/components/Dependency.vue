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
  <div class="dependency">
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
            <b-container v-if="objt != undefined" fluid>
              <b-row>
                <b-col md="12">
                  <b-form-group label="<b>Environment<b>" label-class="text-sm-left" label-cols="2" label-for="theEnvironmentSelect" >
                    <dimension-select id="theEnvironmentSelect" dimension='environment' :initial="objt.theEnvironmentName" v-on:dimension-select-change="environmentSelected" />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group label="<b>Depender<b>" label-class="text-sm-left" label-cols="2" label-for="theDependerSelect" >
                    <dimension-select id="theDependerSelect" dimension='role' :initial="objt.theDepender" v-on:dimension-select-change="dependerSelected" />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="4">
                  <b-form-group label="<b>Dependency</b>" label-class="text-sm-left" label-cols="4" horizontal label-for="theDependencyTypeRadio" >
                    <b-form-radio-group buttons button-variant="outline-primary" size="sm" id="theDependencyRadio" v-model="objt.theDependencyType" class="mb-3" required name="theDependencyTypeRadio">
                      <b-form-radio value='asset'>Asset</b-form-radio>
                      <b-form-radio value='goal'>Goal</b-form-radio>
                      <b-form-radio value='task'>Task</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
                <b-col md="8">
                  <dimension-select id="theDependencySelect" :environment='objt.theEnvironmentName' :dimension='objt.theDependencyType' :initial="objt.theDependency" v-on:dimension-select-change="dependencySelected" />
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group label="<b>Dependee<b>" label-class="text-sm-left" label-cols="2" label-for="theDependeeSelect" >
                    <dimension-select id="theDependeeSelect" dimension='role' :initial="objt.theDependee" v-on:dimension-select-change="dependeeSelected" />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group label="<b>Rationale<b>" label-class="text-sm-left" label-cols="3" label-for="theRationaleInput" >
                    <b-form-input id="theRationaleInput" v-model="objt.theRationale"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
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
  name : 'dependency',
  props : {
    object : Object,
    label : String
  },
  watch : {
    object : 'setObject'
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
      this.commitLabel = this.label;
    },
    onCommit(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        this.$emit('dependency-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'dependencies'})
    },
    checkForm() {
      this.errors = []
      if (this.objt.theEnvironmentName.length == 0) {
        this.errors.push('Environment is required');
      }
      if (this.objt.theDepender.length == 0) {
        this.errors.push('Depender is required');
      }
      if (this.objt.theDependencyType.length == 0) {
        this.errors.push('Dependency Type is required');
      }
      if (this.objt.theDependency.length == 0) {
        this.errors.push('Dependency is required');
      }
      if (this.objt.theDependee.length == 0) {
        this.errors.push('Dependee is required');
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
    environmentSelected(item) {
      if (item != undefined) {
        this.objt.theEnvironmentName = item;
      }
    },
    dependerSelected(item) {
      if (item != undefined) {
        this.objt.theDepender = item;
      }
    },
    dependencySelected(item) {
      if (item != undefined) {
        this.objt.theDependency = item;
      }
    },
    dependeeSelected(item) {
      if (item != undefined) {
        this.objt.theDependee = item;
      }
    },
  }
}
</script>