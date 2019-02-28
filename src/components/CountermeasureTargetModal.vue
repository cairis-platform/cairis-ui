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

  <b-modal ref="targetDialog" :title="this.dialogTitle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card>
      <b-form-group label="Target" label-class="font-weight-bold text-sm-left" label-for="theTargetSelect" >
        <dimension-select v-if="countermeasureTargetUrl != ''" :dimensionUrl="countermeasureTargetUrl" :initial="this.countermeasureTarget.target.theName" v-on:dimension-select-change="targetSelected" />
      </b-form-group>
      <b-form-group label="Effectiveness" label-class="font-weight-bold text-sm-left" label-for="theEffectivenessRadio" >
        <b-form-radio-group id="theEffectivenessRadio" v-model="objt.theEffectiveness">
          <b-form-radio value="None">None</b-form-radio>
          <b-form-radio value="Low">Low</b-form-radio>
          <b-form-radio value="Medium">Medium</b-form-radio>
          <b-form-radio value="High">High</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <b-form-group label="Rationale" label-class="font-weight-bold text-sm-left" label-for="theRationaleText" >
        <b-form-textarea id="theRationaleText" v-model="objt.theRationale" type="text" rows="3" max-rows="3" required />
      </b-form-group>
    </b-card>
  </b-modal> 
</template>

<script>

import DimensionSelect from '@/components/DimensionSelect.vue'

  export default {
    name : 'countermeasure-target-modal',
    props : {
      countermeasureTarget : Object,
      environment : String,
      requirements : Array
    },
    watch : {
      countermeasureTarget : {
        handler : function() {
          this.objt = this.countermeasureTarget.target;
        },
        deep: true
      }
    },
    components : {
      DimensionSelect
    },
    data () {
      return {
        objt: this.countermeasureTarget.target,
        errors : [],
      }
    },
    computed : {
      dialogTitle() {
        return (this.countermeasureTarget.update ? "Update" : "Add") + " Countermeasure Target";
      },
      countermeasureTargetUrl() {
        return this.requirements.length > 0 && this.environment.length > 0 ? '/api/countermeasures/targets/environment/' + this.environment + '?' + this.requirements.map(r => 'requirement=' + r).join('&') : '';
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.objt.theName.length == 0) {
          this.errors.push('Name is required');
        }
        if (this.objt.theEffectiveness.length == 0) {
          this.errors.push('Effectiveness is required');
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
      show() {
        this.$refs.targetDialog.show();
      },
      targetSelected(tName) {
        this.objt.theName = tName;
      },
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('countermeasure-target-update',{target : this.objt,update : this.countermeasureTarget.update,index: this.countermeasureTarget.update ? this.countermeasureTarget.index : -1});
          this.$refs.targetDialog.hide();
        }
      }
    }
  }
</script>