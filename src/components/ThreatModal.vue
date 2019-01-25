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

  <b-modal ref="threatDialog" ok-only :title="dialogTitle">
    <b-container v-if="objt != undefined">
      <b-form-group label="<b>Type</b>" label-class="text-sm-left" label-cols="3" label-for="theType" >
        <b-form-input readonly id="theType" v-model="objt.theType"></b-form-input>
      </b-form-group>
      <b-form-group label="<b>Method</b>" label-class="text-sm-left" label-cols="3" label-for="theMethod" >
        <b-form-textarea id="theDescription" v-model="objt.theMethod" type="text" :rows=2 :max-rows="4" readonly>
        </b-form-textarea>
      </b-form-group>
      <b-form-group label="<b>Likelihood</b>" label-class="text-sm-left" label-cols="3" label-for="theLikelihood" >
        <b-form-input readonly id="theLikelihood" v-model="likelihood"></b-form-input>
      </b-form-group>
      <b-table bordered small :items="attackers" :fields="attackerTableFields">
      </b-table>
      <b-table bordered small :items="assets" :fields="assetTableFields">
      </b-table>
      <b-table bordered small :items="notNone" :fields="propTableFields">
      </b-table>
    </b-container>
  </b-modal>
</template>

<script>

  export default {
    name: 'threat-modal',
    props : {
      environment : String,
      threat : Object
    },
    data() {
      return {
        theEnvironmentName : this.environment,
        objt : this.threat,
        assetTableFields : {
          name : {label : 'Asset'}
        },
        attackerTableFields : {
          name : {label : 'Attacker'}
        },
        propTableFields : {
          name : {label : 'Property'},
          value : {label : 'Value'},
          rationale : {label : 'Rationale'} 
        }
      }
    },
    watch : {
      threat: 'updateData'
    },
    computed : {
      dialogTitle() {
        return (this.objt != undefined ? this.objt.theThreatName : '') + ' Threat';
      },
      assets() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theAssets.map(asset => ({name : asset})): []
      },
      attackers() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theAttackers.map(attacker => ({name : attacker})): []
      },
      likelihood() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theLikelihood : ''
      },
      notNone() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theProperties.filter(prop => prop.value != 'None') : [];
      }
    },
    methods : {
      show() {
        this.$refs.threatDialog.show();
      },
      updateData() {
        this.objt = this.threat
        this.theEnvironmentName = this.environment
      }
    }
  };
</script>