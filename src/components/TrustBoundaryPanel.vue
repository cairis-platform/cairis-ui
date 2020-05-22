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

  <div class="trustboundarypanel">
    <b-container v-if="panelObject != undefined">
      <b-form-group label="Type" label-class="font-weight-bold text-md-left" label-for="theTypeInput" >
        <b-form-input readonly id="theType" v-model="panelObject.theType" />
      </b-form-group>
      <b-form-group label="Privilege" label-class="font-weight-bold text-sm-left" label-for="thePrivilege" >
        <b-form-input readonly id="thePrivilege" v-model="privilege" />
      </b-form-group>
      <b-form-group label="Description" label-class="font-weight-bold text-sm-left" label-for="theDescripton" >
        <b-form-textarea id="theDescription" v-model="panelObject.theDescription" type="text" :rows=2 :max-rows="4" readonly />
      </b-form-group>
      <b-table bordered small :items="components" :fields="componentTableFields" />
    </b-container>
  </div>
</template>

<script>

  export default {
    name: 'trust-boundary-panel',
    props : {
      panelParameters : Object,
      panelObject : Object
    },
    data() {
      return {
        componentTableFields : [
          {key: 'name', label : 'Component'},
          {key: 'type', label : 'Type'}
        ]
      }
    },
    computed : {
      components() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theComponents.map(c => ({name : c.theName, type: c.theType})): [];
      },
      privilege() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].thePrivilege : '';
      }
    }
  };
</script>