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

  <b-modal ref="assocDialog" :title="this.dialogTitle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card>
      <b-container fluid>
        <b-row>
          <b-col md="12">
            <b-form-group label="Goal" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theGoalSelect" >
              <b-form-select id="theGoalSelect" v-model="association.association.theGoalName" :options="goals" class="mb-3" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Refinement" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theRefinementSelect" >
              <b-form-select id="theRefinementSelect" v-model="association.association.theRefType" :options="refTypeValues" class="mb-3" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Sub goal" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theSubGoalSelect" >
              <b-form-select id="theSubGoalSelect" v-model="association.association.theSubGoalName" :options="goals" class="mb-3" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Rationale" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theRationaleInput" >
              <b-form-input id="theRationaleInput" v-model="association.association.theRationale" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </b-modal> 
</template>

<script>

  export default {
    name : 'component-goal-association-modal',
    props : {
      goals : Array,
      goalAssociation : Object
    },
    data () {
      return {
        association: this.goalAssociation,
        errors : [],
        refTypeValues : ['and','or']
      }
    },
    computed : {
      dialogTitle() {
        return (this.goalAssociation.update ? "Update " : "Add ") + "Component goal association";
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.association.association.theGoalName.length == 0) {
          this.errors.push('Goal is required');
        }
        if (this.association.association.theRefType.length == 0) {
          this.errors.push('Ref type is required');
        }
        if (this.association.association.theSubGoalName.length == 0) {
          this.errors.push('Subgoal is required');
        }
        if (this.association.association.theRationale.length == 0) {
          this.errors.push('Rationale is required');
        }
        if (!this.errors.length) {
          return true;
        }
        else {
          return false;
        }
      },
      show() {
        this.$refs.assocDialog.show();
      },
      goalSelected(item) {
        this.association.association.theGoalName = item;
      },
      subGoalSelected(item) {
        this.association.association.theSubGoalName = item;
      },
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('component-goal-association-update',{association : this.association.association,update : this.goalAssociation.update,index: this.goalAssociation.update ? this.association.index : -1});
          this.$refs.assocDialog.hide();
        }
      }
    }
  }
</script>