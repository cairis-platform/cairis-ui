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
      <b-form-group label="Task" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theTaskInput" >
        <b-form-input readonly id="theTaskInput" v-model="objt.theTask" />
      </b-form-group>
      <b-form-group label="Persona" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="thePersonaSelect" >
        <b-form-input readonly id="thePersonaInput" v-model="objt.thePersona" />
      </b-form-group>
      <b-form-group label="Duration" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theDurationSelect" >
        <b-form-select id="theDurationSelect" v-model="objt.theDuration" :options="selectOptions" class="mb-3" required />
      </b-form-group>
      <b-form-group label="Frequency" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theFrequencySelect" >
        <b-form-select id="theFrequencySelect" v-model="objt.theFrequency" :options="selectOptions" class="mb-3" required />
      </b-form-group>
      <b-form-group label="Demands" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theDemandsSelect" >
        <b-form-select id="theDemandsSelect" v-model="objt.theDemands" :options="selectOptions" class="mb-3" required />
      </b-form-group>
      <b-form-group label="Goal Conflict" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theGoalConflictSelect">
        <b-form-select id="theGoalConflictSelect" v-model="objt.theGoalConflict" :options="selectOptions" class="mb-3" required />
      </b-form-group>
    </b-card>
  </b-modal> 
</template>

<script>

  export default {
    name : 'countermeasure-participant-modal',
    props : {
      taskParticipant : Object
    },
    watch : {
      taskParticipant : {
        handler : function() {
          this.objt = this.taskParticipant.participant;
        },
        deep: true
      }
    },
    data () {
      return {
        objt: this.taskParticipant.participant,
        errors : [],
        selectOptions : ['High Help','Medium Help','Low Help','None','Low Hindrance','Medium Hindrance','High Hindrance']
      }
    },
    computed : {
      dialogTitle() {
        return "Update Countermeasure Task Participation";
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.objt.theDuration.length == 0) {
          this.errors.push('Duration is required');
        }
        if (this.objt.theFrequency.length == 0) {
          this.errors.push('Frequency is required');
        }
        if (this.objt.theDemands.length == 0) {
          this.errors.push('Demands is required');
        }
        if (this.objt.theGoalConflict.length == 0) {
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
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('countermeasure-participant-update',{participant : this.objt,index: this.taskParticipant.index});
          this.$refs.participantDialog.hide();
        }
      }
    }
  }
</script>