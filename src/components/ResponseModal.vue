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

  <b-modal ref="responseDialog" ok-only :title="dialogTitle">
    <b-container v-if="objt != undefined">
      <b-container v-if="objt.theResponseType == 'Accept'">
        <b-form-group label="<b>Risk</b>" label-class="text-sm-left" label-cols="3" label-for="theRisk" >
          <b-form-input readonly id="theRisk" v-model="objt.theRisk"></b-form-input>
        </b-form-group>
        <b-form-group label="<b>Risk</b>" label-class="text-sm-left" label-cols="3" label-for="theRisk" >
          <b-form-input readonly id="theRisk" v-model="objt.theRisk"></b-form-input>
        </b-form-group>
        <b-form-group label="<b>Cost</b>" label-class="text-sm-left" label-cols="3" label-for="theCost" >
          <b-form-input readonly id="theCost" v-model="cost"></b-form-input>
        </b-form-group>
        <b-form-group label="<b>Rationale</b>" label-class="text-sm-left" label-cols="3" label-for="theRationale" >
          <b-form-textarea id="theRationale" v-model="acceptRationale" type="text" :rows=2 :max-rows="4" readonly>
          </b-form-textarea>
        </b-form-group>
      </b-container>
      <b-container v-if="objt.theResponseType == 'Transfer'">
        <b-form-group label="<b>Risk</b>" label-class="text-sm-left" label-cols="3" label-for="theRisk" >
          <b-form-input readonly id="theRisk" v-model="objt.theRisk"></b-form-input>
        </b-form-group>
        <b-table bordered small :items="roles" :fields="roleTableFields">
        </b-table>
        <b-form-group label="<b>Rationale</b>" label-class="text-sm-left" label-cols="3" label-for="theRationale" >
          <b-form-textarea id="theRationale" v-model="transferRationale" type="text" :rows=2 :max-rows="4" readonly>
          </b-form-textarea>
        </b-form-group>
      </b-container>
      <b-container v-if="objt.theResponseType == 'Prevent'">
        <b-form-group label="<b>Risk</b>" label-class="text-sm-left" label-cols="3" label-for="theRisk" >
          <b-form-input readonly id="theRisk" v-model="objt.theRisk"></b-form-input>
        </b-form-group>
      </b-container>
    </b-container>
  </b-modal>
</template>

<script>

  export default {
    name: 'response-modal',
    props : {
      environment : String,
      response : Object
    },
    data() {
      return {
        theEnvironmentName : this.environment,
        objt : this.response,
        roleTableFields : {
          roleName : {label : 'Role'},
          cost : {label : 'Cost'}
        },
      }
    },
    watch : {
      response : 'updateData'
    },
    computed : {
      dialogTitle() {
        return (this.objt != undefined ? this.objt.theName : '') + ' Response';
      },
      cost() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.accept.length > 0 ? this.objt.theEnvironmentProperties.accept.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theCost : '';
      },
      acceptRationale() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.accept.length > 0 ? this.objt.theEnvironmentProperties.accept.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theRationale : '';
      },
      transferRationale() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.transfer.length > 0 ? this.objt.theEnvironmentProperties.transfer.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theRationale : '';
      },
      roles() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.transfer.length > 0 ? this.objt.theEnvironmentProperties.transfer.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theRoles : [];
      },
    },
    methods : {
      show() {
        this.$refs.responseDialog.show();
      },
      updateData() {
        this.objt = this.response
        this.theEnvironmentName = this.environment
      }
    }
  };
</script>