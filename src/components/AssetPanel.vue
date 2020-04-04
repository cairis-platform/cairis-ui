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

  <div class="assetpanel">
    <b-container v-if="panelObject != undefined">
      <b-form-group label="Type" label-class="font-weight-bold text-sm-left" label-for="theType" >
        <b-form-input readonly id="theType" v-model="panelObject.theType" />
      </b-form-group>
      <b-form-group label="Description" label-class="font-weight-bold text-sm-left" label-for="theDescription" >
        <b-form-textarea id="theDescription" v-model="panelObject.theDescription" type="text" :rows=2 :max-rows="4" readonly />
      </b-form-group>
      <b-form-group label="Significance" label-class="font-weight-bold text-sm-left" label-for="theSignificance" >
        <b-form-textarea id="theSignificance" v-model="panelObject.theSignificance" type="text" :rows=2 :max-rows="4" readonly />
      </b-form-group>
      <b-table bordered small :items="notNone" :fields="propTableFields" />
    </b-container>
  </div>
</template>

<script>

  export default {
    name: 'asset-panel',
    props : {
      panelParameters : Object,
      panelObject : Object
    },
    data() {
      return {
        propTableFields : [
          {key: 'name', label : 'Property'},
          {key: 'value', label : 'Value'},
          {key: 'rationale', label : 'Rationale'} 
        ]
      }
    },
    computed : {
      notNone() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 && this.panelObject.theEnvironmentProperties[0].theProperties != undefined ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theProperties.filter(prop => prop.value != 'None') : [];
      }
    }
  };
</script>