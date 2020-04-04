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

  <div class="goalpanel">
    <b-container v-if="panelObject != undefined">
      <b-form-group label="Name" label-class="font-weight-bold text-sm-left" label-for="theName" >
        <b-form-input readonly id="theName" v-model="panelObject.theName"></b-form-input>
      </b-form-group>
      <b-form-group label="Originator" label-class="font-weight-bold text-sm-left" label-for="theOriginator" >
        <b-form-input readonly id="theOriginator" v-model="panelObject.theOriginator"></b-form-input>
      </b-form-group>
      <b-form-group label="Category" label-class="font-weight-bold text-sm-left" label-for="theCategory" >
        <b-form-input readonly id="theCategory" v-model="category"></b-form-input>
      </b-form-group>
      <b-form-group label="Priority" label-class="font-weight-bold text-sm-left" label-for="thePriority" >
        <b-form-input readonly id="thePriority" v-model="priority"></b-form-input>
      </b-form-group>
      <b-form-group label="Definition" label-class="font-weight-bold text-sm-left" label-for="theDefinition" >
        <b-form-textarea id="theDefinition" v-model="definition" type="text" :rows=2 :max-rows="4" readonly>
        </b-form-textarea>
      </b-form-group>
      <b-form-group label="Fit Criterion" label-class="font-weight-bold text-sm-left" label-for="theFitCriterion" >
        <b-form-textarea id="theFitCriterion" v-model="fitCriterion" type="text" :rows=2 :max-rows="4" readonly>
        </b-form-textarea>
      </b-form-group>
      <b-table bordered small :items="concerns" :fields="concernTableFields">
      </b-table> 
    </b-container>
  </div>
</template>

<script>

  export default {
    name: 'goal-panel',
    props : {
      panelParameters : Object,
      panelObject : Object
    },
    data() {
      return {
        concernTableFields : [
          {key: 'concern', label : 'Concern'}
        ]
      }
    },
    computed : {
      definition() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theDefinition : '';
      },
      category() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theCategory : '';
      },
      fitCriterion() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theFitCriterion : '';
      },
      priority() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].thePriority : '';
      },
      concerns() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theConcerns.map(concern => ({'concern' : concern})) : []
      }
    }
  };
</script>