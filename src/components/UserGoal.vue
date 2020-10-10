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
  <div class="user_goal">
    <dimension-modal ref="goalDialog" dimension="goal" :existing="objt.theRelatedGoals" v-on:dimension-modal-update="addRelatedGoal"/> 
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <b-form>
      <b-container fluid>
      <b-card no body bg-variant="light">
        <b-form-group label="User Goal" label-class="font-weight-bold text-md-left" label-for="theUserGoalInput">
          <b-form-input id="theUserGoalInput" v-model="objt.theSynopsis" type="text" required />
        </b-form-group>
        <b-form-group label="Persona" label-class="font-weight-bold text-sm-left" label-for="thePersonaSelect" >
          <dimension-select id="theReferenceSelect" dimension='persona' :initial="object.theActor" v-on:dimension-select-change="personaSelected" v-on:dimension-items-updated="personasLoaded" />
        </b-form-group>
        <b-form-group label="Element Type" label-class="font-weight-bold text-md-left" label-for="theElementTypeRadio">
          <b-form-radio-group id="theElementTypeRadio" v-model="objt.theDimension">
            <b-form-radio value="belief">Belief</b-form-radio>
            <b-form-radio value="goal">Goal</b-form-radio>
            <b-form-radio value="softgoal">Soft Goal</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="Reference Type" label-class="font-weigh-bold text-md-left" label-for="theReferenceRadio">
          <b-form-radio-group id="theDimensionRadio" v-model="objt.theSynopsisDimension">
            <b-form-radio value="document_reference">Document</b-form-radio>
            <b-form-radio value="persona_characteristic">Persona</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="Reference" label-class="font-weight-bold text-sm-left" label-for="theReferenceSelect" >
          <dimension-select id="theReferenceSelect" :dimension='objt.theSynopsisDimension' :initial="object.theReference" v-on:dimension-select-change="referenceSelected" v-on:dimension-items-updated="referencesLoaded" />
        </b-form-group>
        <b-form-textarea v-model="theReferenceDescription" type="text" :rows=4 :max-rows=4 readonly />
        <b-form-group label="Initial Satisfaction" label-class="font-weight-bold text-sm-left" label-for="theSatisfactionSelect" >
          <b-form-select id="theSatisfactionSelect" v-model="objt.theInitialSatisfaction" :options="satisfactionValues" class="mb-3" required></b-form-select>
        </b-form-group>
        <b-table striped small bordered :fields="goalTableFields" :items="systemGoals">
          <!-- eslint-disable-next-line -->
          <template v-slot:head(goalactions)="data"> 
            <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addGoal"/> 
          </template>
          <template v-slot:cell(goalactions)="row">
            <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteRelatedGoal(row.item)"/>
          </template>
        </b-table>
      </b-card>
      </b-container>
      <b-container fluid>
        <b-form-row>
          <b-col md="4" offset-md="5" >
            <b-button type="submit" variant="primary" @click="onCommit">{{commitLabel}}</b-button>
            <b-button type="submit" variant="secondary" @click="onCancel">Cancel</b-button>
          </b-col>
        </b-form-row>
      </b-container> 
    </b-form>
  </div>
</template>

<script>

import axios from 'axios';
import EventBus from '../utils/event-bus';
import DimensionSelect from '@/components/DimensionSelect.vue'
import DimensionModal from '@/components/DimensionModal.vue'

export default {
  props : {
    object : Object,
    label : String
  },
  watch : {
    object: 'setObject'
  },
  computed : {
    systemGoals() {
      return this.objt.theRelatedGoals.length > 0 ? this.objt.theRelatedGoals.map(g => ({name : g})): []
    }
  },
  data() {
    return {
      errors : [],
      objt : this.object,
      commitLabel : this.label,
      theReferenceDescription : '',
      satisfactionValues: ['Satisfied','Weakly Satisfied','None','Weakly Denied','Denied'],
      goalTableFields : [
        {key: 'goalactions', label : ''},
        {key: 'name', label : 'System Goal'}
      ]
    }
  },
  components : {
    DimensionModal,
    DimensionSelect
  },
  methods : {
    setObject() {
      this.objt = this.object;
      this.commitLabel = this.label;
    },
    onCommit(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        this.$emit('object-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'objectsview', params: {dimension: 'user_goal'}});
    },
    referenceSelected(refName) {
      this.objt.theReference = refName;
      this.updateReferenceDescription(refName);
    },
    referencesLoaded(refName) {
      this.objt.theReference = refName;
      this.updateReferenceDescription(refName);
    },
    personaSelected(pName) {
      this.objt.theActor = pName;
    },
    personasLoaded(pName) {
      this.objt.theActor = pName;
    },
    updateReferenceDescription(refName) {
      const dcUrl = '/api/' + this.objt.theSynopsisDimension + 's/name/' + refName;
      axios.get(dcUrl,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        this.theReferenceDescription = this.objt.theSynopsisDimension == 'document_reference' ? response.data.theExcerpt : response.data.theName;
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });
    },
    checkForm() {
      this.errors = []
      if (this.objt.theSynopsis.length == 0) {
        this.errors.push('User goal name is required');
      }
      const resChars = /[<>‘'`"\\:%/_*?#£$&]/ ;
      const res = this.objt.theName.match(resChars);
      if (res != null) {
        this.errors.push('Character ' + res['index'] + ' in ' + this.objt.theSynopsis + ' is a reserved character.');
      }
      if (this.objt.theDimension.length == 0) {
        this.errors.push('Element type is required');
      }
      if (this.objt.theSynopsisDimension.length == 0) {
        this.errors.push('Reference type is required');
      }
      if (this.objt.theReference.length == 0) {
        this.errors.push('Reference is required');
      }
      if (this.objt.theInitialSatisfaction.length == 0) {
        this.errors.push('Initial satisfaction is required');
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    },
    addGoal(){
      this.$refs.goalDialog.show();  
    },
    addRelatedGoal(item) {
      this.objt.theRelatedGoals.push(item);
    },
    deleteRelatedGoal(item) {
      this.objt.theRelatedGoals = this.objt.theRelatedGoals.filter(g => (g != item.name));
    }
  }
}
</script>