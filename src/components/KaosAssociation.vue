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
  <div class="kaosassociation">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <b-form>
      <b-container fluid>
      <b-card bg-variant="light" no body> 
        <b-row>
          <b-col md=12>
            <b-container v-if="objt != undefined" fluid>
              <b-row>
                <b-col md="12">
                  <b-form-group label="Environment" label-class="font-weight-bold text-sm-left" label-cols="2" label-for="theEnvironmentSelect" >
                    <dimension-select id="theEnvironmentSelect" dimension='environment' :is_disabled="disable" :initial="objt.theEnvironmentName" v-on:dimension-select-change="environmentSelected" />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="8">
                  <b-form-group label="Head" label-class="font-weight-bold text-sm-left" label-cols="1" label-for="theGoalRadio" >
                    <b-form-radio-group :disabled="disable" buttons button-variant="outline-primary" size="sm" id="theGoalRadio" v-model="theGoalType" :options="goalTypeOptions" class="mb-3" required name="theGoalRadio">
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <dimension-select id="theGoalSelect" display_size="sm" :is_disabled="disable" :environment='objt.theEnvironmentName' :dimension='theGoalType' :initial="objt.theGoal" v-on:dimension-select-change="goalSelected" />
                </b-col>
              </b-row>
              <b-row>
                <b-col md="8">
                  <b-form-group label="Tail" label-class="font-weight-bold text-sm-left" label-cols="1" label-for="theSubGoalRadio" >
                    <b-form-radio-group :disabled="disable" buttons button-variant="outline-primary" size="sm" id="theSubGoalRadio" v-model="theSubGoalType" :options="subGoalTypeOptions" class="mb-3" required name="theSubGoalRadio">
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <dimension-select id="theSubGoalSelect" display_size="sm" :is_disabled="disable" :environment='objt.theEnvironmentName' :dimension='objt.theSubGoalDimension' :initial="objt.theSubGoal" v-on:dimension-select-change="subGoalSelected" />
                </b-col>
              </b-row>
              <b-row>
                <b-col md="2">
                  <b-form-group label="Association" label-class="font-weight-bold text-sm-left" label-for="theAssociationRadio" >
                    <b-form-radio-group buttons button-variant="outline-primary" size="sm" id="theAssociationRadio" v-model="objt.theAssociationType" :options="refTypeOptions" class="mb-3" required name="theAssociationRadio">
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
                <b-col md="2">
                  <b-form-group label="Alternative" label-class="font-weight-bold text-sm-left" label-for="theHeadNryInput" >
                    <b-form-radio-group buttons button-variant="outline-primary" size="sm" v-model="objt.theAlternativeId">
                      <b-form-radio value=0>No</b-form-radio>
                      <b-form-radio value=1>Yes</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
                <b-col md="8">
                  <b-form-group label="Rationale" label-class="font-weight-bold text-sm-left" label-for="theRationaleInput" >
                    <b-form-input id="theRationaleInput" size="sm" v-model="objt.theRationale"></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-container>
          </b-col>
        </b-row>
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

import objectMixin from '../mixins/objectMixin'
import DimensionSelect from '@/components/DimensionSelect.vue'

export default {
  name : 'kaos-association',
  props : {
    object : Object,
    label : String,
    isUpdating : Boolean
  },
  watch : {
    object : 'setObject',
    theGoalType : 'setSubGoalTypes',
    theSubGoalType : 'setAssociationTypes'
  },
  mixins : [
    objectMixin
  ],
  components : {
    DimensionSelect
  },
  computed : {
    disable() {
      return this.isUpdating == true ? true : false;
    }
  },
  data() {
    return {
      errors : [],
      objt : this.object,
      commitLabel : 'Create',
      theGoalType : 'goal',
      theSubGoalType : 'goal',
      goalTypeOptions : [
        {text : 'Goal', value : 'goal'},
        {text : 'Obstacle', value : 'obstacle'},
        {text : 'Domain Property', value : 'domainproperty'},
        {text : 'Requirement', value : 'requirement'},
        {text : 'Countermeasure', value : 'countermeasure'}
      ],
      subGoalTypeOptions : [
        {text : 'Goal', value : 'goal'},
        {text : 'Obstacle', value : 'obstacle'},
        {text : 'Task', value : 'task'},
        {text : 'Use Case', value : 'usecase'},
        {text : 'Domain Property', value : 'domainproperty'},
        {text : 'Role', value : 'role'},
        {text : 'Requirement', value : 'requirement'}
      ],
      refTypeOptions : [
        {text : 'And', value : 'and'},
        {text : 'Or', value : 'or'}
      ]
    }
  },
  methods : {
    setObject() {
      this.objt = this.object;
      this.theGoalType = this.object.theGoalDimension;
      this.theSubGoalType = this.object.theSubGoalDimension;
      this.commitLabel = this.label;
    },
    setSubGoalTypes() {
      this.objt.theGoalDimension = this.theGoalType;
      if (this.theGoalType == 'goal') {
        this.subGoalTypeOptions = [
          {'text' : 'Goal', 'value' : 'goal'},
          {'text' : 'Obstacle', 'value' : 'obstacle'},
          {'text' : 'Task', 'value' : 'task'},
          {'text' : 'Use Case', 'value' : 'usecase'},
          {'text' : 'Domain Property', 'value' : 'domainproperty'},
          {'text' : 'Role', 'value' : 'role'},
          {'text' : 'Requirement', 'value' : 'requirement'}
        ];
        this.theSubGoalType = 'goal';
      }
      else if (this.theGoalType == 'obstacle') {
        this.subGoalTypeOptions = [
          {'text' : 'Obstacle', 'value' : 'obstacle'},
          {'text' : 'Threat', 'value' : 'threat'},
          {'text' : 'Vulnerability', 'value' : 'vulnerability'},
          {'text' : 'Goal', 'value' : 'goal'},
          {'text' : 'Domain Property', 'value' : 'domainproperty'},
          {'text' : 'Misuse Case', 'value' : 'misusecase'},
          {'text' : 'Task', 'value' : 'task'},
          {'text' : 'Use Case', 'value' : 'usecase'},
          {'text' : 'Requirement', 'value' : 'requirement'},
          {'text' : 'Role', 'value' : 'role'}
        ];
        this.theSubGoalType = 'obstacle';
      }
      else if (this.theGoalType == 'domainproperty') {
        this.subGoalTypeOptions = [
          {'text' : 'Obstacle', 'value' : 'obstacle'}
        ];
        this.theSubGoalType = 'obstacle';
      }
      else if (this.theGoalType == 'requirement') {
        this.subGoalTypeOptions = [
          {'text' : 'Goal', 'value' : 'goal'},
          {'text' : 'Requirement', 'value' : 'requirement'},
          {'text' : 'Role', 'value' : 'role'},
          {'text' : 'Obstacle', 'value' : 'obstacle'}
        ];
        this.theSubGoalType = 'goal';
      }
      else if (this.theGoalType == 'countermeasure') {
        this.subGoalTypeOptions = [
          {'text' : 'Task', 'value' : 'task'},
        ];
        this.theSubGoalType = 'task';
      }
      this.setAssociationTypes();
    },
    setAssociationTypes() {
      this.objt.theSubGoalDimension = this.theSubGoalType;
      if (this.theGoalType == 'goal' && this.theSubGoalType == 'domainproperty') {
        this.refTypeOptions = [
          {'text' : 'And', 'value' : 'and'},
          {'text' : 'Or', 'value' : 'or'}
        ];
        this.objt.theAssociationType = 'and';
      }
      else if (this.theGoalType == 'goal' && this.theSubGoalType == 'goal') {
        this.refTypeOptions = [
          {'text' : 'And', 'value' : 'and'},
          {'text' : 'Or', 'value' : 'or'}
        ];
        this.objt.theAssociationType = 'and';
      }
      else if (this.theGoalType == 'goal' && this.theSubGoalType == 'obstacle') {
        this.refTypeOptions = [
          {'text' : 'Obstruct', 'value' : 'obstruct'}
        ];
        this.objt.theAssociationType = 'obstruct';
      }
      else if (this.theGoalType == 'goal' && this.theSubGoalType == 'requirement') {
        this.refTypeOptions = [
          {'text' : 'And', 'value' : 'and'},
          {'text' : 'Or', 'value' : 'or'}
        ];
        this.objt.theAssociationType = 'and';
      }
      else if (this.theGoalType == 'goal' && this.theSubGoalType == 'role') {
        this.refTypeOptions = [
          {'text' : 'Responsible', 'value' : 'responsible'}
        ];
        this.objt.theAssociationType = 'responsible';
      }
      else if (this.theGoalType == 'goal' && this.theSubGoalType == 'task') {
        this.refTypeOptions = [
          {'text' : 'And', 'value' : 'and'}
        ];
        this.objt.theAssociationType = 'and';
      }
      else if (this.theGoalType == 'goal' && this.theSubGoalType == 'usecase') {
        this.refTypeOptions = [
          {'text' : 'And', 'value' : 'and'}
        ];
        this.objt.theAssociationType = 'and';
      }
      else if (this.theGoalType == 'obstacle' && this.theSubGoalType == 'domainproperty') {
        this.refTypeOptions = [
          {'text' : 'Resolve', 'value' : 'resolve'}
        ];
        this.objt.theAssociationType = 'resolve';
      }
      else if (this.theGoalType == 'obstacle' && this.theSubGoalType == 'goal') {
        this.refTypeOptions = [
          {'text' : 'Resolve', 'value' : 'resolve'}
        ];
        this.objt.theAssociationType = 'resolve';
      }
      else if (this.theGoalType == 'obstacle' && this.theSubGoalType == 'task') {
        this.refTypeOptions = [
          {'text' : 'And', 'value' : 'and'}
        ];
        this.objt.theAssociationType = 'and';
      }
      else if (this.theGoalType == 'obstacle' && this.theSubGoalType == 'misusecase') {
        this.refTypeOptions = [
          {'text' : 'And', 'value' : 'and'}
        ];
        this.objt.theAssociationType = 'and';
      }
      else if (this.theGoalType == 'obstacle' && this.theSubGoalType == 'obstacle') {
        this.refTypeOptions = [
          {'text' : 'And', 'value' : 'and'},
          {'text' : 'Or', 'value' : 'or'}
        ];
        this.objt.theAssociationType = 'and';
      }
      else if (this.theGoalType == 'obstacle' && this.theSubGoalType == 'requirement') {
        this.refTypeOptions = [
          {'text' : 'Resolve', 'value' : 'resolve'}
        ];
        this.objt.theAssociationType = 'resolve';
      }
      else if (this.theGoalType == 'obstacle' && this.theSubGoalType == 'role') {
        this.refTypeOptions = [
          {'text' : 'Responsible', 'value' : 'responsible'}
        ];
        this.objt.theAssociationType = 'responsible';
      }
      else if (this.theGoalType == 'obstacle' && this.theSubGoalType == 'threat') {
        this.refTypeOptions = [
          {'text' : 'And', 'value' : 'and'}
        ];
        this.objt.theAssociationType = 'and';
      }
      else if (this.theGoalType == 'obstacle' && this.theSubGoalType == 'usecase') {
        this.refTypeOptions = [
          {'text' : 'And', 'value' : 'and'}
        ];
        this.objt.theAssociationType = 'and';
      }
      else if (this.theGoalType == 'obstacle' && this.theSubGoalType == 'vulnerability') {
        this.refTypeOptions = [
          {'text' : 'And', 'value' : 'and'}
        ];
        this.objt.theAssociationType = 'and';
      }
      else if (this.theGoalType == 'domainproperty' && this.theSubGoalType == 'obstacle') {
        this.refTypeOptions = [
          {'text' : 'Obstruct', 'value' : 'obstruct'}
        ];
        this.objt.theAssociationType = 'obstruct';
      }
      else if (this.theGoalType == 'requirement' && this.theSubGoalType == 'goal') {
        this.refTypeOptions = [
          {'text' : 'And', 'value' : 'and'},
          {'text' : 'Or', 'value' : 'or'}
        ];
        this.objt.theAssociationType = 'and';
      }
      else if (this.theGoalType == 'requirement' && this.theSubGoalType == 'requirement') {
        this.refTypeOptions = [
          {'text' : 'And', 'value' : 'and'},
          {'text' : 'Or', 'value' : 'or'}
        ];
        this.objt.theAssociationType = 'and';
      }
      else if (this.theGoalType == 'requirement' && this.theSubGoalType == 'role') {
        this.refTypeOptions = [
          {'text' : 'Responsible', 'value' : 'responsible'}
        ];
        this.objt.theAssociationType = 'responsible';
      }
      else if (this.theGoalType == 'requirement' && this.theSubGoalType == 'obstacle') {
        this.refTypeOptions = [
          {'text' : 'Obstruct', 'value' : 'obstruct'}
        ];
        this.objt.theAssociationType = 'obstruct';
      }
      else if (this.theGoalType == 'countermeasure' && this.theSubGoalType == 'task') {
        this.refTypeOptions = [
          {'text' : 'And', 'value' : 'and'}
        ];
        this.objt.theAssociationType = 'and';
      }
    },
    onCommit(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        this.$emit('kaos-association-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'objectsview', params: {dimension: 'kaosassociation'}});
    },
    checkForm() {
      this.errors = []
      if (this.objt.theEnvironmentName.length == 0) {
        this.errors.push('Environment is required');
      }
      if (this.objt.theGoalDimension.length == 0) {
        this.errors.push('Goal Type is required');
      }
      if (this.objt.theGoal.length == 0) {
        this.errors.push('Goal is required');
      }
      if (this.objt.theAssociationType.length == 0) {
        this.errors.push('Association Type is required');
      }
      if (this.objt.theSubGoalDimension.length == 0) {
        this.errors.push('Sub Goal Type is required');
      }
      if (this.objt.theSubGoal.length == 0) {
        this.errors.push('Sub Goal is required');
      }
      if (this.objt.theRationale.length == 0) {
        this.errors.push('Rationale is required');
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    },
    environmentSelected(item) {
      if (item != undefined) {
        this.objt.theEnvironmentName = item;
      }
    },
    goalSelected(item) {
      if (item != undefined) {
        this.objt.theGoal = item;
      }
    },
    subGoalSelected(item) {
      if (item != undefined) {
        this.objt.theSubGoal = item;
      }
    }
  }
}
</script>