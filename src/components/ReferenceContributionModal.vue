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

  <b-modal ref="rcModal" :title="this.dialogTitle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card bg-variant="light">
      <b-container fluid>
      <b-row>
        <b-col md="12">
          <b-form-group label="Contributes to" label-class="font-weight-bold text-md-left" label-for="theContributesToSelect">
            <dimension-select id="theContributesToSelect" dimension="persona_characteristic_synopsis" :initial="referenceContribution.referenceContribution.theContributionTo" v-on:dimension-select-change="contributesToSelected" v-on:dimension-items-updated="contributesToLoaded" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-form-group label="Contribution" label-class="font-weight-bold text-md-left" label-for="theMeansEndRadio">
            <b-form-radio-group id="theMeansEndRadio" v-model="objt.theReferenceContribution.theMeansEnd">
              <b-form-radio value="means">Means</b-form-radio>
              <b-form-radio value="end">End</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-form-select id="theContributionSelect" v-model="objt.theReferenceContribution.theContribution" :options="contributionTypes" class="md-3" required />
        </b-col>
      </b-row>
      </b-container>
    </b-card> 
  </b-modal> 
</template>

<script>

  export default {
    name : 'reference-contribution-modal',
    props : {
      referenceContribution : Object
    },
    watch : {
      referenceContribution: {
        handler() {
          this.objt = this.referenceContribution.referenceContribution;
        },
        deep: true
      }
    },
    data () {
      return {
        objt: this.referenceContribution.referenceContribution,
        errors : [],
        contributionTypes : ['Make','SomePositive','Help','Hurt','SomeNegative','Break']
      }
    },
    components : {
      DimensionSelect : () => import('@/components/DimensionSelect'),
    },
    computed : {
      dialogTitle() {
        return (this.referenceContribution.update ? "Update" : "Add") + " Reference contribution";
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.objt.theContributionTo.length == 0) {
          this.errors.push('Contribution to is required');
        }
        if (this.objt.theReferenceContribution.theMeansEnd.length == 0) {
          this.errors.push('Means/End is required');
        }
        if (this.objt.theReferenceContribution.theContribution.length == 0) {
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
        this.$refs.rcModal.show();
      },
      contributesToSelected(item) {
        this.objt.theContributionTo = item;
      },
      contributesToLoaded(item) {
        this.objt.theContributionTo = item;
      },
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('reference-contribution-update',{referenceContribution : this.objt,update : this.referenceContribution.update,index: this.referenceContribution.update ? this.referenceContribution.index : -1});
          this.$refs.rcModal.hide();
        } 
      }
    }
  }
</script>