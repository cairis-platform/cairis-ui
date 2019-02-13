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

  <b-modal ref="stepDialog" :title="this.dialogTitle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Step" active>
          <b-form-textarea id="theStep" v-model="objt.theStepText" type="text" :rows=2 :max-rows=4 required>
          </b-form-textarea>
        </b-tab>
        <b-tab title="Intentional Elements">
          <b-container fluid>
            <b-row>
              <b-col md="12">
                <b-form-group label="<b>Intention</b>" label-class="text-md-left" label-cols="3" label-for="theIntentionInput">
                  <b-form-input id="theIntentionInput" v-model="objt.theSynopsis" type="text" required>
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="<b>Actor</b>" label-class="text-sm-left" label-cols="4" horizontal label-for="theActorTypeRadio" >
                  <b-form-radio-group id="theActorTypeRadio" v-model="objt.theActorType" stacked>
                    <b-form-radio value='asset'>Asset</b-form-radio>
                    <b-form-radio value='role'>Role</b-form-radio>
                    <b-form-radio value='component'>Component</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <dimension-select id="theActorTypeSelect" :environment='environment' :dimension='objt.theActorType' :initial="objt.theActor" v-on:dimension-select-change="actorSelected" />
              </b-col>
            </b-row>
          </b-container>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-modal> 
</template>

<script>

import DimensionSelect from '@/components/DimensionSelect.vue'

  export default {
    name : 'step-modal',
    props : {
      usecaseStep : Object,
      usecaseActors : Array,
      environment : String
    },
    watch : {
      usecaseStep: 'updateData'
    },
    data () {
      return {
        objt: this.usecaseStep.step,
        errors : [],
      }
    },
    components : {
      DimensionSelect
    },
    computed : {
      dialogTitle() {
        return (this.usecaseStep.update ? "Update" : "Add") + " Step";
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.objt.theStepText.length == 0) {
          this.errors.push('Step text is required');
        }
        if (!this.errors.length) {
          return true;
        }
        else {
          return false;
        }
      },
      show() {
        this.$refs.stepDialog.show();
      },
      onOk(evt) {
        evt.preventDefault();
        if (this.checkForm()) {
          this.$emit('step-update',{step : this.objt , update : this.usecaseStep.update,index: this.usecaseStep.update ? this.usecaseStep.index : -1});
          this.$refs.stepDialog.hide();
        }
      },
      actorSelected(item) {
        if (item != undefined) {
          this.objt.theActor = item;
        }
      },
      updateData() {
        this.objt = this.usecaseStep.step;
      }
    }
  }
</script>