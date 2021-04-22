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
  <div class="policy_statement">
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
            <b-container fluid>
              <b-form-group label="Environment" label-class="font-weigh-bold text-md-left" label-for="theEnvironmentSelect">
                <dimension-select id="theEnvironmentSelect" dimension='environment' :initial="this.objt.theEnvironmentName" v-on:dimension-select-change="environmentSelected" v-on:dimension-items-updated="environmentsLoaded" />
              </b-form-group>
            </b-container>
          </b-col>
        </b-row>
        <b-row>
          <b-col md=12>
            <b-container fluid>
              <b-form-group label="Goal" label-class="font-weigh-bold text-md-left" label-for="theGoalSelect">
                <dimension-select id="theGoalSelect" :dimensionUrl='npgUrl' :initial="this.objt.theGoalName" v-on:dimension-select-change="goalSelected" v-on:dimension-items-updated="goalsLoaded" />
              </b-form-group>
            </b-container>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3">
            <b-form-group label="Subject" label-class="font-weigh-bold text-md-left" label-for="theSubjectSelect">
              <dimension-select id="theSubjectSelect" :dimensionUrl='gcUrl' :initial="this.objt.theSubject" v-on:dimension-select-change="subjectSelected" v-on:dimension-items-updated="subjectsLoaded" />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Access Type" label-class="font-weight-bold text-md-left" label-for="theAccessTypeSelect" >
              <b-form-select id="theAccessTypeSelect" v-model="objt.theAccessType" :options="accessTypes" class="mb-3" required />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Resource" label-class="font-weigh-bold text-md-left" label-for="theResourceSelect">
              <dimension-select id="theResourceSelect" :dimensionUrl='gcUrl' :initial="this.objt.theResource" v-on:dimension-select-change="resourceSelected" v-on:dimension-items-updated="resourcesLoaded" />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Permission" label-class="font-weight-bold text-md-left" label-for="thePermissionSelect" >
              <b-form-select id="thePermissionSelect" v-model="objt.thePermission" :options="permissionTypes" class="mb-3" required />
            </b-form-group>
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
  name : 'policy_statement',
  props : {
    object : Object,
    label : String
  },
  watch : {
    object: 'setObject'
  },
  mixins : [
    objectMixin
  ],
  components : {
    DimensionSelect
  },
  data() {
    return {
      errors : [],
      objt : this.object,
      accessTypes: ['read','write','interact'],
      permissionTypes: ['allow','deny'],
      commitLabel : this.label
    }
  },
  computed : {
    gcUrl() {
      return this.objt.theEnvironmentName.length > 0 && this.objt.theGoalName.length > 0 ? '/api/goals/name/' + this.objt.theGoalName + '/environment/' + this.objt.theEnvironmentName + '/concerns' : '';
    },
    npgUrl() {
      return this.objt.theEnvironmentName.length > 0 ? '/api/dimensions/table/nonpolicy_goal/environment/' + this.objt.theEnvironmentName : '';
    }
  },
  methods : {
    setObject() {
      this.objt = this.object;
      this.commitLabel = this.label;
    },
    onCommit(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        this.$emit('policy-statement-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'objectsview', params: {dimension: 'policy_statement'}});
    },
    checkForm() {
      this.errors = []
      if (this.objt.theEnvironmentName.length == 0) {
        this.errors.push('Environment is required');
      }
      if (this.objt.theGoalName.length == 0) {
        this.errors.push('Goal is required');
      }
      if (this.objt.theSubject.length == 0) {
        this.errors.push('Subject is required');
      }
      if (this.objt.theResource.length == 0) {
        this.errors.push('Resource is required');
      }
      if (this.objt.theSubject == this.objt.theResource) {
        this.errors.push('Subject and resource must be different');
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    },
    environmentSelected(item) {
      this.objt.theEnvironmentName = item;
    },
    environmentsLoaded(item) {
      this.objt.theEnvironmentName = item;
    },
    goalSelected(item) {
      this.objt.theGoalName = item;
    },
    goalsLoaded(item) {
      this.objt.theGoalName = item;
    },
    subjectSelected(item) {
      this.objt.theSubject = item;
    },
    subjectsLoaded(item) {
      this.objt.theSubject = item;
    },
    resourceSelected(item) {
      this.objt.theResource = item;
    },
    resourcesLoaded(item) {
      this.objt.theResource = item;
    }
  }
}
</script>