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

  <b-modal ref="refinementDialog" :title="this.dialogTitle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card>
      <b-form-group label="Type" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theEndTypeSelect" >
        <b-form-select id="theEndTypeSelect" v-model="association.association.theEndType" :options="endTypeValues" class="mb-3" required></b-form-select>
      </b-form-group>
      <b-form-group :label="theTargetType" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theObjectSelect" >
        <dimension-select v-if="this.association.environment !=''" id="theObjectSelect" :dimension='association.association.theEndType' :environment="this.association.environment" :initial="association.association.theEndName" :existing="[this.source]" v-on:dimension-select-change="endSelected" />
      </b-form-group>
      <b-form-group label="Refinement" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theRefinementSelect" >
        <b-form-select id="theRefinementSelect" v-model="association.association.theRefType" :options="refTypeValues" class="mb-3" required></b-form-select>
      </b-form-group>
      <b-form-group label="Alternative" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theAlternativeRadio" >
        <b-form-radio-group id="theAlternativeRadio" v-model="association.association.isAlternate">
          <b-form-radio value="Yes">Yes</b-form-radio>
          <b-form-radio value="No">No</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <b-form-group label="Rationale" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theRationaleInput" >
        <b-form-input id="theRationaleInput" v-model="association.association.theRationale"></b-form-input>
      </b-form-group>
    </b-card>
  </b-modal> 
</template>

<script>

  export default {
    name : 'kaos-refinement-modal',
    props : {
      goalAssociation : Object,
      refinementType : String,
      source: String
    },
    data () {
      return {
        theTargetType : this.refinementType,
        association: this.goalAssociation,
        errors : [],
        refTypeValues : ['and','or','responsible','obstruct','resolve'],
        endTypeValues : []
      }
    },
    components : {
      DimensionSelect : () => import('@/components/DimensionSelect.vue')
    },
    computed : {
      dialogTitle() {
        return (this.goalAssociation.update ? "Update " : "Add ") + this.refinementType + " Association";
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.association.association.theEndType.length == 0) {
          this.errors.push('Type is required');
        }
        if (this.association.association.theEndName.length == 0) {
          this.errors.push(this.theTargetType + ' name is required');
        }
        if (this.association.association.theRefType.length == 0) {
          this.errors.push('Refinement is required');
        }
        if (this.association.association.isAlternate.length == 0) {
          this.errors.push('Alternate indication is required');
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
        this.$refs.refinementDialog.show();
      },
      endSelected(item) {
        this.association.association.theEndName = item;
      },
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('kaos-refinement-update',{association : this.association.association,update : this.goalAssociation.update,index: this.goalAssociation.update ? this.association.index : -1});
          this.$refs.refinementDialog.hide();
        }
      }
    },
    mounted() {
      if (this.theTargetType == 'Goal') {
        this.endTypeValues = ['goal','requirement','obstacle']
      }
      else if (this.theTargetType == 'Sub-Goal') {
        this.endTypeValues = ['goal','task','usecase','requirement','obstacle','domainproperty','role']
      }
      else if (this.theTargetType == 'Obstacle') {
        this.endTypeValues = ['goal','requirement','obstacle','domainproperty']
      }
      else if (this.theTargetType == 'Sub-Obstacle') {
        this.endTypeValues = ['goal','task','usecase','requirement','obstacle','domainproperty','threat','vulnerability','role','misusecase']
      }
    }
  }
</script>