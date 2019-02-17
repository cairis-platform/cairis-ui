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

  <b-modal ref="excDialog" :title="this.dialogTitle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-container fluid>
      <b-row>
        <b-col md="12">
          <b-form-group label="Name" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theExcNameInput">
            <b-form-input id="theExcNameInput" v-model="objt.theName" type="text" required>
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-form-group label="Type" label-class="font-weight-bold text-sm-left" label-cols="4" label-for="theDimensionTypeRadio" >
            <b-form-radio-group id="theDimensionTypeRadio" v-model="objt.theDimensionType" stacked>
              <b-form-radio value='none'>None</b-form-radio>
              <b-form-radio value='goal'>Goal</b-form-radio>
              <b-form-radio value='requirement'>Requirement</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <dimension-select v-if="objt.theDimensionType != 'none'" id="theDimensionSelect" ref="dimensionSelect" :environment='environment' :dimensionUrl='objtUrl' :initial="objt.theDimensionValue" v-on:dimension-select-change="dimensionSelected" />
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-form-group label="Category" label-class="font-weight-bold text-sm-left" label-cols="4" label-for="theCategorySelect" >
            <b-form-select id="theCategoryName" v-model="objt.theCategoryName" :options="categoryTypes" class="mb-3" required>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-form-group label="Description" label-class="font-weight-bold text-sm-left" label-cols="4" label-for="theExceptionDescription" >
            <b-form-textarea id="theExceptionDescription" v-model="objt.theDescription" type="text" :rows=2 :max-rows=4 required>
            </b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
  </b-modal> 
</template>

<script>

import DimensionSelect from '@/components/DimensionSelect.vue'

  export default {
    name : 'exception-modal',
    props : {
      stepException : Object,
      environment : String,
      usecase : String
    },
    watch : {
      stepException: {
        handler() {
          this.objt = this.stepException.exception;
        },
        deep: true
      }
    },
    data () {
      return {
        objt: this.stepException.exception,
        errors : [],
        categoryTypes : ['Confidentiality Threat','Integrity Threat','Availability Threat','Accountability Threat','Anonymity Threat','Pseudonymity Threat','Unlinkability Threat','Unobservability Threat','Threat','Vulnerability','Duration','Frequency','Demands','Goal Support']
      }
    },
    components : {
      DimensionSelect
    },
    computed : {
      dialogTitle() {
        return (this.stepException.update ? "Update" : "Add") + " Exception";
      },
      objtUrl() {
        return this.objt.theDimensionType == 'goal' ? '/api/usecases/name/' + this.usecase + '/environment/' + this.environment + '/goals' : '/api/usecases/name/' + this.usecase + '/requirements' ;
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.objt.theName.length == 0) {
          this.errors.push('Name is required');
        }
        if (this.objt.theDimensionType.length == 0) {
          this.errors.push('Dimension Type is required');
        }
        if (this.objt.theDimensionType != 'none' && this.objt.theDimensionValue.length == 0) {
          this.errors.push('Dimension Value is required');
        }
        if (this.objt.theCategoryName.length == 0) {
          this.errors.push('Category Name is required');
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
      show() {
        this.$refs.excDialog.show();
      },
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('exception-update',{exception : this.objt , update : this.stepException.update,index: this.stepException.update ? this.stepException.index : -1});
          this.$refs.excDialog.hide();
        }
      },
      dimensionSelected(item) {
        if (item != undefined) {
          this.objt.theDimensionValue = item;
        }
      }
    }
  }
</script>