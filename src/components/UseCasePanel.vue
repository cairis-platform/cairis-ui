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

  <div class="usecasepanel">
    <b-container v-if="panelObject != undefined">
      <b-form-group label="Name" label-class="font-weight-bold text-sm-left" label-for="theName" >
        <b-form-input readonly id="theName" v-model="panelObject.theName" />
      </b-form-group>
      <b-form-group label="Description" label-class="font-weight-bold text-sm-left" label-for="theDescription" >
        <b-form-textarea id="theDescription" v-model="panelObject.theDescription" type="text" :rows=2 :max-rows="4" readonly />
      </b-form-group>
      <b-table bordered small :items="actors" :fields="actorTableFields">
      </b-table>
      <b-form-group label="Preconditions" label-class="font-weight-bold text-sm-left" label-for="thePreconditions" >
        <b-form-textarea id="thePreconditions" v-model="preconditions" type="text" :rows=2 :max-rows="4" readonly />
      </b-form-group>
      <b-table bordered small :items="steps" :fields="stepTableFields">
      </b-table> 
      <b-form-group label="Postconditions" label-class="font-weight-bold text-sm-left" label-for="thePostconditions" >
        <b-form-textarea id="thePostconditions" v-model="postconditions" type="text" :rows=2 :max-rows="4" readonly />
      </b-form-group>
    </b-container>
  </div>
</template>

<script>

  export default {
    name: 'usecase-panel',
    props : {
      panelParameters : Object,
      panelObject : Object
    },
    data() {
      return {
        actorTableFields : [
          {key: 'actor', label : 'Actor'}
        ],
        stepTableFields : [
          {key: 'no', label : 'No'},
          {key: 'step', label : 'Step'}
        ]
      }
    },
    computed : {
      actors() {
        return this.panelObject != undefined && this.panelObject.theActors != undefined ? this.panelObject.theActors.map(actor => ({'actor': actor})) : [];
      },
      preconditions() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 && this.panelObject.theEnvironmentProperties[0].thePreCond != undefined ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].thePreCond : '';
      },
      postconditions() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 && this.panelObject.theEnvironmentProperties[0].thePostCond != undefined ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].thePostCond : '';
      },
      steps() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 && this.panelObject.theEnvironmentProperties[0].theSteps != undefined ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theSteps.map((step,idx) => ({'no' : idx + 1, 'step' : step.theStepText})) : [];
      }
    }
  };
</script>