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

  <b-modal ref="cmDialog" ok-only :title="dialogTitle">
    <b-container v-if="objt != undefined">
      <b-form-group label="<b>Description</b>" label-class="text-sm-left" label-cols="3" label-for="theDescription" >
        <b-form-textarea id="theDescription" v-model="objt.theDescription" type="text" :rows=4 :max-rows="6" readonly>
        </b-form-textarea>
      </b-form-group>
      <b-form-group label="<b>Cost</b>" label-class="text-sm-left" label-cols="3" label-for="theCost" >
        <b-form-input readonly id="theCost" v-model="cost"></b-form-input>
      </b-form-group>
      <b-table bordered small :items="requirements" :fields="reqTableFields">
      </b-table>
      <b-table bordered small :items="targets" :fields="targetTableFields">
      </b-table>
      <b-table bordered small :items="notNone" :fields="propTableFields">
      </b-table>
      <b-table bordered small :items="roles" :fields="roleTableFields">
      </b-table>
      <b-table bordered small :items="personas" :fields="personaTableFields">
      </b-table> 
    </b-container>
  </b-modal>
</template>

<script>

  export default {
    name: 'countermeasure-modal',
    props : {
      environment : String,
      countermeasure : Object
    },
    data() {
      return {
        theEnvironmentName : this.environment,
        objt : this.countermeasure,
        roleTableFields : {
          name : {label : 'Role'}
        },
        reqTableFields : {
          name : {label : 'Requirement'}
        },
        propTableFields : {
          name : {label : 'Property'},
          value : {label : 'Value'},
          rationale : {label : 'Rationale'} 
        },
        targetTableFields : {
          theName : {label : 'Target'},
          theEffectiveness : {label : 'Effectiveness'},
          theRationale : {label : 'Rationale'} 
        },
        personaTableFields : {
          theTask : {label : 'Task'},
          thePersona : {label : 'Persona'},
          theDuration : {label : 'Duration'},
          theFrequency : {label : 'Frequency'},
          theDemands : {label : 'Demands'},
          theGoalConflict : {label : 'Goal Conflict'}
        },
      }
    },
    watch : {
      countermeasure: 'updateData'
    },
    computed : {
      dialogTitle() {
        return (this.objt != undefined ? this.objt.theName : '') + ' Countermeasure';
      },
      cost() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theCost : [];
      },
      roles() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theRoles.map(role => ({name : role})) : []
      },
      requirements() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theRequirements.map(req => ({name : req})) : []
      },
      targets() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theTargets : []
      },
      notNone() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theProperties.filter(prop => prop.value != 'None') : [];
      },
      personas() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].thePersonas : [];
      }
    },
    methods : {
      show() {
        this.$refs.cmDialog.show();
      },
      updateData() {
        this.objt = this.countermeasure
        this.theEnvironmentName = this.environment
      }
    }
  };
</script>