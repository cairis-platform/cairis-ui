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

  <div class="taskpanel">
    <b-container v-if="panelObject != undefined">
      <b-form-group label="Name" label-class="font-weight-bold text-sm-left" label-for="theName" >
        <b-form-input readonly id="theName" v-model="panelObject.theName" />
      </b-form-group>
      <b-tabs>
        <b-tab title="Summary" active>
          <b-form-group label="Author" label-class="font-weight-bold text-sm-left" label-for="theAuthor" >
            <b-form-input readonly id="theAuthor" v-model="panelObject.theAuthor" />
          </b-form-group>
          <b-form-group label="Objective" label-class="font-weight-bold text-sm-left" label-for="theObjective" >
            <b-form-textarea id="theObjective" v-model="panelObject.theObjective" type="text" :rows=2 :max-rows="4" readonly />
          </b-form-group>
          <b-form-group label="Dependencies" label-class="font-weight-bold text-sm-left" label-for="theDependencies" >
            <b-form-textarea id="theDependencies" v-model="dependencies" type="text" :rows=2 :max-rows="4" readonly />
          </b-form-group>
        </b-tab>
        <b-tab title="Narrative">
          <b-form-textarea id="theNarrative" v-model="narrative" type="text" :rows=4 :max-rows="6" readonly />
        </b-tab>
        <b-tab title="Concerns">
          <b-table bordered small :items="concerns" :fields="concernTableFields" />
        </b-tab>
        <b-tab title="Participants">
          <b-table bordered small :items="participants" :fields="participantTableFields" />
        </b-tab>
      </b-tabs>
    </b-container>
  </div>
</template>

<script>

  export default {
    name: 'task-panel',
    props : {
      panelParameters : Object,
      panelObject : Object
    },
    data() {
      return {
        concernTableFields : [
          {key: 'concerni', label : 'Asset'}
        ],
        participantTableFields : [
          {key: 'thePersona', label : 'Persona'},
          {key: 'theDuration', label : 'Duration'},
          {key: 'theFrequency', label : 'Frequency'},
          {key: 'theDemands', label : 'Demands'},
          {key: 'theGoalConflict', label : 'Goal Conflict'}
        ],
        durationLookup : {
          'Low' : 'Seconds',
          'Medium' : 'Minutes',
          'High' : 'Hours or Longer'
        },
        frequencyLookup : {
          'Low' : 'Hours or more',
          'Medium' : 'Daily - Weekly',
          'High' : 'Monthly or less'
        }
      }
    },
    computed : {
      dependencies() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theDependencies : '';
      },
      narrative() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theNarrative : '';
      },
      concerns() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theAssets.map(concern => ({'concern' : concern})) : []
      },
      participants() {
        return this.panelObject != undefined && this.panelObject.theEnvironmentProperties != undefined && this.panelObject.theEnvironmentProperties.length > 0 ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].thePersonas.map(p => ({'thePersona' : p.thePersona, 'theDuration' : this.durationLookup[p.theDuration], 'theFrequency' : this.frequencyLookup[p.theFrequency], 'theDemands' : p.theDemands, 'theGoalConflict' : p.theGoalConflict})) : []
      }
    }
  };
</script>