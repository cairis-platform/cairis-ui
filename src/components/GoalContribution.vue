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
  <div class="goal_contribution">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <b-form>
      <b-container fluid>
      <b-card no body bg-variant="light">
        <b-form-group label="Source Type" label-class="font-weigh-bold text-md-left" label-for="theSourceTypeRadio">
          <b-form-radio-group id="theSourceTypeRadio" v-model="objt.theSourceType">
            <b-form-radio value="document_reference">Document</b-form-radio>
            <b-form-radio value="persona_characteristic">Persona</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="Source" label-class="font-weight-bold text-sm-left" label-for="theSourceSelect" >
          <dimension-select id="theSourceSelect" :dimension='sourceType' :initial="object.theSource" v-on:dimension-select-change="sourceSelected" v-on:dimension-items-updated="sourcesLoaded" />
        </b-form-group>
        <b-form-group label="Destination Type" label-class="font-weigh-bold text-md-left" label-for="theDestinationTypeRadio">
          <b-form-radio-group id="theDestinationTypeRadio" v-model="objt.theDestinationType">
            <b-form-radio value="document_reference">Document</b-form-radio>
            <b-form-radio value="persona_characteristic">Persona</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="Destination" label-class="font-weight-bold text-sm-left" label-for="theDestinationSelect" >
          <dimension-select id="theDestinationSelect" :dimension='destinationType' :initial="object.theDestination" v-on:dimension-select-change="destinationSelected" v-on:dimension-items-updated="destinationsLoaded" />
        </b-form-group>
        <b-form-group label="Means/End" label-class="font-weigh-bold text-md-left" label-for="theMeansEndRadio">
          <b-form-radio-group id="theMeansEndRadio" v-model="objt.theMeansEnd">
            <b-form-radio value="means">Means</b-form-radio>
            <b-form-radio value="end">End</b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="Contribution" label-class="font-weigh-bold text-md-left" label-for="theContribution">
          <b-form-select id="theContributionSelect" v-model="objt.theContribution" :options="contributionNames" required />
        </b-form-group>
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

import DimensionSelect from '@/components/DimensionSelect.vue'

export default {
  props : {
    object : Object,
    label : String
  },
  watch : {
    object: 'setObject'
  },
  computed : {
    sourceType() {
      return this.objt.theSourceType + '_synopsis';
    },
    destinationType() {
      return this.objt.theDestinationType + '_synopsis';
    }
  },
  data() {
    return {
      errors : [],
      objt : this.object,
      commitLabel : this.label,
      contributionNames : ['Make','SomePositive','Help','Hurt','SomeNegative','Break']
    }
  },
  components : {
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
        this.$emit('goal-contribution-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'objectsview', params: {dimension: 'goal_contribution'}});
    },
    sourceSelected(refName) {
      this.objt.theSource = refName;
    },
    sourcesLoaded(refName) {
      this.objt.theSource = refName;
    },
    destinationSelected(refName) {
      this.objt.theDestination = refName;
    },
    destinationsLoaded(refName) {
      this.objt.theDestination = refName;
    },
    checkForm() {
      this.errors = []
      if (this.objt.theSourceType.length == 0) {
        this.errors.push('Source type is required');
      }
      if (this.objt.theSource.length == 0) {
        this.errors.push('Source is required');
      }
      if (this.objt.theDestinationType.length == 0) {
        this.errors.push('Destination type is required');
      }
      if (this.objt.theDestination.length == 0) {
        this.errors.push('Destination is required');
      }
      if (this.objt.theMeansEnd.length == 0) {
        this.errors.push('Means/End is required');
      }
      if (this.objt.theContribution.length == 0) {
        this.errors.push('Contribution is required');
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    }
  }
}
</script>