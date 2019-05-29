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

  <b-modal ref="attackerDialog" ok-only :title="dialogTitle">
    <b-container v-if="objt != undefined">
      <b-form-group label="Description" label-class="font-weight-bold text-sm-left" label-for="theDescription" >
        <b-form-textarea id="theDescription" v-model="objt.theDescription" type="text" :rows=4 :max-rows="6" readonly>
        </b-form-textarea>
      </b-form-group>
      <b-table bordered small :items="roles" :fields="roleTableFields">
      </b-table>
      <b-table bordered small :items="motives" :fields="motiveTableFields">
      </b-table>
      <b-table bordered small :items="capabilities" :fields="capabilityTableFields">
      </b-table>
    </b-container>
  </b-modal>
</template>

<script>

  export default {
    name: 'attacker-modal',
    props : {
      environment : String,
      attacker : Object
    },
    data() {
      return {
        theEnvironmentName : this.environment,
        objt : this.attacker,
        roleTableFields : {
          name : {label : 'Role'}
        },
        motiveTableFields : {
          name : {label : 'Motivation'}
        },
        capabilityTableFields : {
          name : {label : 'Capability'},
          value : {label : 'Value'}
        }
      }
    },
    watch : {
      attacker: 'updateData'
    },
    computed : {
      dialogTitle() {
        return (this.objt != undefined ? this.objt.theName : '') + ' Attacker';
      },
      roles() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theRoles.map(role => ({name : role})) : []
      },
      motives() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theMotives.map(motive => ({name : motive})): []
      },
      capabilities() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theCapabilities : []
      }
    },
    methods : {
      show() {
        this.$refs.attackerDialog.show();
      },
      updateData() {
        this.objt = this.attacker
        this.theEnvironmentName = this.environment
      }
    }
  };
</script>