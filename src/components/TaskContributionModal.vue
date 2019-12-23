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

  <b-modal ref="tcDialog" :title="this.dialogTitle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card>
      <b-form-group label="User goal" label-class="font-weight-bold text-sm-left" label-for="theUserGoalSelect" >
        <dimension-select id="theUserGoalSelect" dimension='user_goal' :existing="taskContributions" :initial="this.taskContribution.contribution.theDestination" v-on:dimension-select-change="userGoalSelected" v-on:dimension-items-updated="userGoalsLoaded" />
      </b-form-group>
      <b-form-group label="Contribution" label-class="font-weight-bold text-md-left" label-for="theContributionSelect">
        <b-form-select id="theContributionSelect" v-model="contribution.contribution.theContribution" :options="contributionTypes" class="mb-3" required />
      </b-form-group>
    </b-card>
  </b-modal> 
</template>

<script>

import DimensionSelect from '@/components/DimensionSelect.vue'

  export default {
    name : 'task-contribution-modal',
    props : {
      taskContribution : Object,
      taskContributions : Array
    },
    data () {
      return {
        contribution: this.taskContribution,
        contributionTypes : ['Make','SomePositive','Help','Hurt','SomeNegative','Break'],
        errors : [],
      }
    },
    components : {
      DimensionSelect
    },
    computed : {
      dialogTitle() {
        return (this.taskContribution.update ? "Update" : "Add") + " Task Contribution";
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.contribution.contribution.theDestination.length == 0) {
          this.errors.push('User goal is required');
        }
        if (this.contribution.contribution.theContribution.length == 0) {
          this.errors.push('Contribution is required');
        }
        if (!this.errors.length) {
          return true;
        }
        else {
          return false;
        }
      },
      show() {
        this.$refs.tcDialog.show();
      },
      userGoalSelected(item) {
        this.contribution.contribution.theDestination = item;
      },
      userGoalsLoaded(item) {
        this.contribution.contribution.theDestination = item;
      },
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('task-contribution-update',{contribution : this.contribution.contribution,update : this.taskContribution.update,index: this.taskContribution.update ? this.contribution.index : -1});
          this.$refs.tcDialog.hide();
        }
      }
    }
  }
</script>