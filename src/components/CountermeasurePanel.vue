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

  <div class="countermeasurepanel">
    <b-container v-if="panelObject != undefined">
      <b-form-group label="Description" label-class="font-weight-bold text-sm-left" label-for="theDescription" >
        <b-form-textarea id="theDescription" v-model="panelObject.theDescription" type="text" :rows=4 :max-rows="6" readonly />
      </b-form-group>
      <b-form-group label="Cost" label-class="font-weight-bold text-sm-left" label-for="theCost" >
        <b-form-input readonly id="theCost" v-model="cost" />
      </b-form-group>
      <b-table bordered small :items="requirements" :fields="reqTableFields" />
      <b-table bordered small :items="targets" :fields="targetTableFields" />
      <b-table bordered small :items="notNone" :fields="propTableFields" />
      <b-table bordered small :items="roles" :fields="roleTableFields" />
      <b-table bordered small :items="personas" :fields="personaTableFields" />
    </b-container>
  </div>
</template>

<script>

  export default {
    name: 'countermeasure-panel',
    props : {
      panelParameters : Object,
      panelObject : Object
    },
    data() {
      return {
        roleTableFields : [
          {key: 'name', label : 'Role'}
        ],
        reqTableFields : [
          {key: 'name', label : 'Requirement'}
        ],
        propTableFields : [
          {key: 'name', label : 'Property'},
          {key: 'value', label : 'Value'},
          {key: 'rationale', label : 'Rationale'}
        ],
        targetTableFields : [
          {key: 'theName', label : 'Target'},
          {key: 'theEffectiveness', label : 'Effectiveness'},
          {key: 'theRationale', label : 'Rationale'}
        ],
        personaTableFields : [
          {key: 'theTask', label : 'Task'},
          {key: 'thePersona', label : 'Persona'},
          {key: 'theDuration', label : 'Duration'},
          {key: 'theFrequency', label : 'Frequency'},
          {key: 'theDemands', label : 'Demands'},
          {key: 'theGoalConflict', label : 'Goal Conflict'}
        ]
      }
    },
    computed : {
      cost() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theCost : [];
      },
      roles() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theRoles.map(role => ({name : role})) : [];
      },
      requirements() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theRequirements.map(req => ({name : req})) : [];
      },
      targets() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theTargets : [];
      },
      notNone() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theProperties.filter(prop => prop.value != 'None') : [];
      },
      personas() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].thePersonas : [];
      }
    }
  };
</script>