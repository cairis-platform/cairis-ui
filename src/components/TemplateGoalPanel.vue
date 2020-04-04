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

  <div class="templategoalpanel">
    <b-container v-if="panelObject != undefined">
      <b-form-group label="Name" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theName" >
        <b-form-input readonly id="theName" v-model="panelObject.theName" />
      </b-form-group>
      <b-form-group label="Definition" label-class="font-weight-bold text-md-left" label-for="theDefinition" >
        <b-form-textarea id="theDefinition" v-model="panelObject.theDefinition" type="text" :rows=2 :max-rows="4" readonly />
      </b-form-group>
      <b-form-group label="Rationale" label-class="font-weight-bold text-md-left" label-for="theFitCriterion" >
        <b-form-textarea id="theFitCriterion" v-model="panelObject.theRationale" type="text" :rows=2 :max-rows="4" readonly />
      </b-form-group>
      <b-table bordered small :items="concerns" :fields="concernTableFields" />
      <b-table bordered small :items="responsibilities" :fields="responsibilityTableFields" />
    </b-container>
  </div>
</template>

<script>

  export default {
    name: 'templategoal-panel',
    props : {
      panelParameters : Object,
      panelObject : Object
    },
    computed : {
      concerns() {
        return this.panelObject != undefined && this.panelObject.theConcerns != undefined ? this.panelObject.theConcerns.map(c => ({name: c})) : [];
      },
      responsibilities() {
        return this.panelObject != undefined && this.panelObject.theResponsibilities != undefined ? this.panelObject.theResponsibilities.map(r => ({name: r})) : [];
      }
    },
    data() {
      return {
        concernTableFields : [
          {key: 'name', label : 'Concern'}
        ],
        responsibilityTableFields : [
          {key: 'name', label : 'Responsibility'}
        ]
      }
    }
  };
</script>