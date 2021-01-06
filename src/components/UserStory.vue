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
  <div class="userstory">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <value-modal ref="criteriaDialog" :value="selectedCriteria" v-on:value-update="uac"/> 
    <b-form>
      <b-container fluid>
        <b-card bg-variant="light" no body> 
          <b-row>
            <b-col md="4">
              <b-form-group label="Name" label-class="font-weight-bold text-md-left" label-for="theNameInput">
                <b-form-input id="theNameInput" v-model="objt.theName" type="text" required />
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Author" label-class="font-weight-bold text-md-left" label-for="theAuthorInput">
                <b-form-input id="theAuthorsInput" v-model="objt.theAuthor" type="text" required />
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Tags" label-class="font-weight-bold text-md-left" label-for="theTagsInput">
                <b-form-tags v-model="objt.theTags" separator="," placeholder="Enter new tags separated by comma" remove-on-delete tag-variant="primary" tag-pills class="md-8"></b-form-tags>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="3">
              <b-form-group label="Who" label-class="font-weight-bold text-md-left" label-for="theWhoSelect">
                <dimension-select id="theRoleSelect" dimension='role' :initial="objt.theRole" v-on:dimension-select-change="roleSelected" v-on:dimension-items-updated="rolesLoaded" />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="What" label-class="font-weight-bold text-md-left" label-for="theWhatInput">
                <b-form-input id="theWhatInput" v-model="objt.theDescription" type="text" required />
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group label="Why" label-class="font-weight-bold text-md-left" label-for="theWhySelect">
                <dimension-select :dimensionUrl='ugUrl' v-on:dimension-select-change="whySelected" v-on:dimension-items-updated="whyLoaded" /> 
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="User Story text" label-class="font-weight-bold text-md-left" label-for="theStoryInput">
                <b-form-input id="theStoryInput" v-model="storyText" type="text" readonly />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-table striped bordered small hover :items="acceptanceCriteria" :fields=acceptanceCriteriaTableFields @row-clicked="viewAcceptanceCriteria">
              <!-- eslint-disable-next-line -->
              <template v-slot:head(acceptancecriteriaactions)="data"> 
                <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addAcceptanceCriteria"/> 
              </template> 
              <template v-slot:cell(acceptancecriteriaactions)="row">
                <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteAcceptanceCriteria(row.index)"/>
              </template> 
            </b-table>
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
import DimensionSelect from './DimensionSelect'
import ValueModal from './ValueModal'

export default {
  name : 'userstory',
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
    DimensionSelect,
    ValueModal
  },
  data() {
    return {
      errors : [],
      objt : this.object,
      commitLabel : this.label,
      acceptanceCriteriaTableFields : [
        {key: 'acceptancecriteriaactions', label : ''},
        {key: 'name', label : 'Acceptance criteria'}
      ],
      selectedCriteria : {
        update : false,
        value : '',
        valueType : 'Acceptance criteria'
      }
    }
  },
  computed : {
    ugUrl() {
      return this.objt.theRole.length > 0 ? '/api/user_goals/role/' + this.objt.theRole : '';
    },
    acceptanceCriteria() {
      return this.objt.theAcceptanceCriteria.length > 0 ? this.objt.theAcceptanceCriteria.map(v => ({name: v})) : [];
    },
    storyText() {
      return this.objt.theRole.length > 0 && this.objt.theDescription.length > 0 && this.objt.theUserGoal.length > 0 ? 'As a ' + this.objt.theRole + ', I want to ' + this.objt.theDescription + ', so that ' + this.objt.theUserGoal : '';
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
        this.$emit('object-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'objectsview', params: {dimension: 'userstory'}});
    },
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0 || this.objt.theName.trim().length == 0) {
        this.errors.push('User story name is required');
      }
      const resChars = /[<>‘'`"\\:%/_*?#£$&]/ ;
      const res = this.objt.theName.match(resChars);
      if (res != null) {
        this.errors.push('Character ' + res['index'] + ' in ' + this.objt.theName + ' is a reserved character.');
      }
      if (this.objt.theAuthor.length == 0) {
        this.errors.push('Author is required');
      }
      if (this.objt.theRole.length == 0) {
        this.errors.push('Who is required');
      }
      if (this.objt.theDescription.length == 0) {
        this.errors.push('What is required');
      }
      if (this.objt.theUserGoal.length == 0) {
        this.errors.push('Why is required');
      }
      if (this.objt.theAcceptanceCriteria.length == 0) {
        this.errors.push('Acceptance criteria is required');
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    },
    roleSelected(item) {
      this.objt.theRole = item;
    },
    rolesLoaded(item) {
      this.objt.theRole = item;
    },
    whySelected(item) {
      this.objt.theUserGoal = item;
    },
    whyLoaded(item) {
      this.objt.theUserGoal = item;
    },
    viewAcceptanceCriteria(data,index) {
      this.selectedCriteria['index'] = index;
      this.selectedCriteria['value'] = data.name;
      this.selectedCriteria['update'] = true;
      this.$refs.criteriaDialog.show();  
    },
    addAcceptanceCriteria() {
      this.selectedCriteria['value'] = '';
      this.selectedCriteria['update'] = false;
      this.$refs.criteriaDialog.show();  
    },
    uac : function(updAc) {
      if (updAc.update) {
        this.$set(this.objt.theAcceptanceCriteria,updAc.index,updAc.value);
      }
      else {
        this.objt.theAcceptanceCriteria.push(updAc.value);
      }
    },
    deleteAcceptanceCriteria(index) {
      this.objt.theAcceptanceCriteria.splice(index,1);
    }
  }
}
</script>