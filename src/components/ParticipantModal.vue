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

  <b-modal ref="participantDialog" :title="this.dialogTitle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card>
      <b-form-group label="Persona" label-class="font-weight-bold text-sm-left" label-for="thePersonaSelect" >
        <dimension-select id="thePersonaSelect" dimension='persona' :environment=this.taskParticipant.environment :existing="taskParticipants" :initial="this.taskParticipant.participant.thePersona" v-on:dimension-select-change="personaSelected" v-on:dimension-items-updated="personasLoaded" />
      </b-form-group>
      <b-form-group label="Duration" label-class="font-weight-bold text-sm-left" label-for="theDurationRadio" >
        <b-form-radio-group id="theDurationRadio" v-model="participant.participant.theDuration">
          <b-form-radio value="Low">Seconds</b-form-radio>
          <b-form-radio value="Medium">Minutes</b-form-radio>
          <b-form-radio value="High">Hours or longer</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <b-form-group label="Frequency" label-class="font-weight-bold text-sm-left" label-for="theFrequencyRadio" >
        <b-form-radio-group id="theFrequencyRadio" v-model="participant.participant.theFrequency">
          <b-form-radio value="Low">Hours or more</b-form-radio>
          <b-form-radio value="Medium">Daily-Weekly</b-form-radio>
          <b-form-radio value="High">Monthly or less</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <b-form-group label="Demands" label-class="font-weight-bold text-sm-left" label-for="theDemandsRadio" >
        <b-form-radio-group id="theDemandsRadio" v-model="participant.participant.theDemands">
          <b-form-radio value="None">None</b-form-radio>
          <b-form-radio value="Low">Low</b-form-radio>
          <b-form-radio value="Medium">Medium</b-form-radio>
          <b-form-radio value="High">High</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <b-form-group label="Goal Conflict" label-class="font-weight-bold text-sm-left" label-for="theGoalConflictRadio" >
        <b-form-radio-group id="theGoalConflictRadio" v-model="participant.participant.theGoalConflict">
          <b-form-radio value="None">None</b-form-radio>
          <b-form-radio value="Low">Low</b-form-radio>
          <b-form-radio value="Medium">Medium</b-form-radio>
          <b-form-radio value="High">High</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </b-card>
  </b-modal> 
</template>

<script>

import DimensionSelect from '@/components/DimensionSelect.vue'

  export default {
    name : 'participant-modal',
    props : {
      taskParticipant : Object,
      taskParticipants : Array
    },
    data () {
      return {
        participant: this.taskParticipant,
        errors : [],
      }
    },
    components : {
      DimensionSelect
    },
    computed : {
      dialogTitle() {
        return (this.taskParticipant.update ? "Update" : "Add") + " Task Participation";
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.participant.participant.thePersona.length == 0) {
          this.errors.push('Persona is required');
        }
        if (this.participant.participant.theDuration.length == 0) {
          this.errors.push('Duration is required');
        }
        if (this.participant.participant.theFrequency.length == 0) {
          this.errors.push('Frequency is required');
        }
        if (this.participant.participant.theDemands.length == 0) {
          this.errors.push('Demands is required');
        }
        if (this.participant.participant.theGoalConflict.length == 0) {
          this.errors.push('Goal Conflict is required');
        }
        if (!this.errors.length) {
          return true;
        }
        else {
          return false;
        }
      },
      show() {
        this.$refs.participantDialog.show();
      },
      personaSelected(item) {
        this.participant.participant.thePersona = item;
      },
      personasLoaded(item) {
        this.participant.participant.thePersona = item;
      },
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('participant-update',{participant : this.participant.participant,update : this.taskParticipant.update,index: this.taskParticipant.update ? this.participant.index : -1});
          this.$refs.participantDialog.hide();
        }
      }
    }
  }
</script>