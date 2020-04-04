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

  <div class="responsepanel">
    <b-container v-if="panelObject != undefined">
      <b-container v-if="panelObject.theResponseType == 'Accept'">
        <b-form-group label="Risk" label-class="font-weight-bold text-sm-left" label-for="theRisk" >
          <b-form-input readonly id="theRisk" v-model="panelObject.theRisk" />
        </b-form-group>
        <b-form-group label="Risk" label-class="font-weight-bold text-sm-left" label-for="theRisk" >
          <b-form-input readonly id="theRisk" v-model="panelObject.theRisk" />
        </b-form-group>
        <b-form-group label="Cost" label-class="font-weight-bold text-sm-left" label-for="theCost" >
          <b-form-input readonly id="theCost" v-model="cost" />
        </b-form-group>
        <b-form-group label="Rationale" label-class="font-weight-bold text-sm-left" label-for="theRationale" >
          <b-form-textarea id="theRationale" v-model="acceptRationale" type="text" :rows=2 :max-rows="4" readonly />
        </b-form-group>
      </b-container>
      <b-container v-if="panelObject.theResponseType == 'Transfer'">
        <b-form-group label="Risk" label-class="font-weight-bold text-sm-left" label-for="theRisk" >
          <b-form-input readonly id="theRisk" v-model="panelObject.theRisk" />
        </b-form-group>
        <b-table bordered small :items="roles" :fields="roleTableFields" />
        <b-form-group label="Rationale" label-class="font-weight-bold text-sm-left" label-for="theRationale" >
          <b-form-textarea id="theRationale" v-model="transferRationale" type="text" :rows=2 :max-rows="4" readonly />
        </b-form-group>
      </b-container>
      <b-container v-if="panelObject.theResponseType == 'Prevent'">
        <b-form-group label="Risk" label-class="font-weight-bold text-sm-left" label-for="theRisk" >
          <b-form-input readonly id="theRisk" v-model="panelObject.theRisk" />
        </b-form-group>
      </b-container>
    </b-container>
  </div>
</template>

<script>

  export default {
    name: 'response-panel',
    props : {
      panelParameters : Object,
      panelObject : Object
    },
    data() {
      return {
        roleTableFields : [
          {key: 'roleName', label : 'Role'},
          {key: 'cost', label : 'Cost'}
        ]
      }
    },
    computed : {
      cost() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.accept != undefined && this.panelObject.theEnvironmentProperties.accept.length > 0 ? this.panelObject.theEnvironmentProperties.accept.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theCost : '';
      },
      acceptRationale() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.accept != undefined && this.panelObject.theEnvironmentProperties.accept.length > 0 ? this.panelObject.theEnvironmentProperties.accept.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theRationale : '';
      },
      transferRationale() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.transfer != undefined && this.panelObject.theEnvironmentProperties.transfer.length > 0 ? this.panelObject.theEnvironmentProperties.transfer.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theRationale : '';
      },
      roles() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.transfer != undefined && this.panelObject.theEnvironmentProperties.transfer.length > 0 ? this.panelObject.theEnvironmentProperties.transfer.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theRoles : [];
      }
    }
  };
</script>