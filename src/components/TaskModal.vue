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

  <b-modal ref="taskDialog" ok-only :title="dialogTitle">
    <b-container v-if="objt != undefined">
      <b-form-group label="Name" label-class="font-weight-bold text-sm-left" label-for="theName" >
        <b-form-input readonly id="theName" v-model="objt.theName"></b-form-input>
      </b-form-group>
      <b-tabs>
        <b-tab title="Summary" active>
          <b-form-group label="Author" label-class="font-weight-bold text-sm-left" label-for="theAuthor" >
            <b-form-input readonly id="theAuthor" v-model="objt.theAuthor"></b-form-input>
          </b-form-group>
          <b-form-group label="Objective" label-class="font-weight-bold text-sm-left" label-for="theObjective" >
            <b-form-textarea id="theObjective" v-model="objt.theObjective" type="text" :rows=2 :max-rows="4" readonly>
            </b-form-textarea>
          </b-form-group>
          <b-form-group label="Dependencies" label-class="font-weight-bold text-sm-left" label-for="theDependencies" >
            <b-form-textarea id="theDependencies" v-model="dependencies" type="text" :rows=2 :max-rows="4" readonly>
            </b-form-textarea>
          </b-form-group>
        </b-tab>
        <b-tab title="Narrative">
          <b-form-textarea id="theNarrative" v-model="narrative" type="text" :rows=4 :max-rows="6" readonly>
          </b-form-textarea>
        </b-tab>
        <b-tab title="Concerns">
          <b-table bordered small :items="concerns" :fields="concernTableFields">
          </b-table> 
        </b-tab>
        <b-tab title="Participants">
          <b-table bordered small :items="participants" :fields="participantTableFields">
          </b-table> 
        </b-tab>
      </b-tabs>
    </b-container>
  </b-modal>
</template>

<script>

  export default {
    name: 'task-modal',
    props : {
      environment : String,
      task : Object
    },
    data() {
      return {
        theEnvironmentName : this.environment,
        objt : this.task,
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
    watch : {
      task: 'updateData'
    },
    computed : {
      dialogTitle() {
        return (this.objt != undefined ? this.objt.theName : '') + ' Task';
      },
      dependencies() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theDependencies : '';
      },
      narrative() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theNarrative : '';
      },
      concerns() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theAssets.map(concern => ({'concern' : concern})) : []
      },
      participants() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].thePersonas.map(p => ({'thePersona' : p.thePersona, 'theDuration' : this.durationLookup[p.theDuration], 'theFrequency' : this.frequencyLookup[p.theFrequency], 'theDemands' : p.theDemands, 'theGoalConflict' : p.theGoalConflict})) : []
      }
    },
    methods : {
      show() {
        if (this.$refs.taskDialog != undefined) {
          this.$refs.taskDialog.show();
        }
      },
      updateData() {
        this.objt = this.task
        this.theEnvironmentName = this.environment
      }
    }
  };
</script>