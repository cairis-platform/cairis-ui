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

  <div class="threatpanel">
    <b-container v-if="panelObject != undefined">
      <b-form-group label="Type" label-class="font-weight-bold text-sm-left" label-for="theType" >
        <b-form-input readonly id="theType" v-model="panelObject.theType" />
      </b-form-group>
      <b-form-group label="Method" label-class="font-weight-bold text-sm-left" label-for="theMethod" >
        <b-form-textarea id="theDescription" v-model="panelObject.theMethod" type="text" :rows=2 :max-rows="4" readonly />
      </b-form-group>
      <b-form-group label="Likelihood" label-class="font-weight-bold text-sm-left" label-for="theLikelihood" >
        <b-form-input readonly id="theLikelihood" v-model="likelihood" />
      </b-form-group>
      <b-table bordered small :items="attackers" :fields="attackerTableFields" />
      <b-table bordered small :items="assets" :fields="assetTableFields" />
      <b-table bordered small :items="notNone" :fields="propTableFields" />
    </b-container>
  </div>
</template>

<script>

  export default {
    name: 'threat-panel',
    props : {
      panelParameters : Object,
      panelObject : Object
    },
    data() {
      return {
        assetTableFields : [
          {key: 'name', label : 'Asset'}
        ],
        attackerTableFields : [
          {key: 'name', label : 'Attacker'}
        ],
        propTableFields : [
          {key: 'name', label : 'Property'},
          {key: 'value', label : 'Value'},
          {key: 'rationale', label : 'Rationale'} 
        ]
      }
    },
    computed : {
      assets() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theAssets.map(asset => ({name : asset})): []
      },
      attackers() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theAttackers.map(attacker => ({name : attacker})): []
      },
      likelihood() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theLikelihood : ''
      },
      notNone() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theProperties.filter(prop => prop.value != 'None') : [];
      }
    }
  };
</script>