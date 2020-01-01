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

  <b-modal ref="crModal" :title="this.dialogTitle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card no-body v-if="reference != undefined"> 
      <b-tabs card>
        <b-tab title="Reference" active>
          <b-card bg-variant="light">
            <b-row>
              <b-col md="12">
                <div v-if="this.characteristic_type == 'persona'">
                  <b-form-group label="Reference" label-class="font-weight-bold text-sm-left" label-for="theCReferenceSelect" >
                    <dimension-select id="theCReferenceSelect" :dimension='referenceDimension' :initial="reference.theReferenceName" v-on:dimension-select-change="referenceSelected" v-on:dimension-items-updated="referencesLoaded" />
                  </b-form-group>
                </div>
                <div v-if="this.characteristic_type != 'persona'">
                  <b-form-group label="Dimension" label-class="font-weigh-bold text-md-left" label-for="theDimensionRadio">
                    <b-form-radio-group id="theDimensionRadio" v-model="theConceptReferenceDimension">
                      <b-form-radio value="document">Document</b-form-radio>
                      <b-form-radio value="persona">Persona</b-form-radio>
                      <b-form-radio value="requirement">Requirement</b-form-radio>
                      <b-form-radio value="task">Task</b-form-radio>
                      <b-form-radio value="usecase">Use Case</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                  <b-form-group>
                    <b-form-select id="theConceptReferences" v-model="reference.theReferenceName" :options="theFilteredConceptReferences" class="mb-3" required />
                  </b-form-group>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-form-textarea v-model="reference.theReferenceDescription" type="text" :rows=4 :max-rows=4 readonly />
              </b-col>
            </b-row>
          </b-card>
        </b-tab>
        <b-tab title="GRL Elements" v-if="characteristic_type == 'persona'">
          <b-card bg-variant="light">
            <b-row>
              <b-col md="12">
                <b-form-group label="Characteristic Intention" label-class="font-weight-bold text-md-left" label-for="theCharacteristicInput">
                  <b-form-input id="theCharacteristicInput" v-model="characteristic" type="text" readonly>
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-form-group label="Reference Intention" label-class="font-weight-bold text-md-left" label-for="theSynopsisInput">
                  <b-form-input id="theSynopsisInput" v-model="reference.theReferenceSynopsis.theSynopsis" type="text" >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-form-group label="Element Type" label-class="font-weight-bold text-md-left" label-for="theElementTypeRadio">
                  <b-form-radio-group id="theElementTypeRadio" v-model="reference.theReferenceSynopsis.theDimension">
                    <b-form-radio value="belief">Belief</b-form-radio>
                    <b-form-radio value="goal">Goal</b-form-radio>
                    <b-form-radio value="softgoal">Soft Goal</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-form-group label="Means/End" label-class="font-weight-bold text-md-left" label-for="theMeansEndRadio">
                  <b-form-radio-group id="theMeansEndRadio" v-model="reference.theReferenceContribution.theMeansEnd">
                    <b-form-radio value="means">Means</b-form-radio>
                    <b-form-radio value="end">End</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-form-group label="Contribution" label-class="font-weight-bold text-md-left" label-for="theContributionSelect">
                  <b-form-select id="theContributionSelect" v-model="reference.theReferenceContribution.theContribution" :options="contributionTypes" class="mb-3" required />
                </b-form-group>
              </b-col>
            </b-row>
          </b-card>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-modal> 
</template>

<script>

import axios from 'axios';
import EventBus from '../utils/event-bus';
import DimensionSelect from './DimensionSelect';

  export default {
    name : 'characteristic-reference-modal',
    props : {
      characteristicReference : Object,
      characteristic: String,
      characteristic_type : {
        type: String,
        default: 'persona'
      }
    },
    watch : {
      characteristicReference: {
        handler() {
          this.reference = this.characteristicReference.characteristicReference;
          if (this.reference.theReferenceName != "") {
            this.updateReferenceDescription(this.reference.theReferenceName);
          }
          if (this.characteristic_type != 'document') {
            this.theConceptReferenceDimension = this.reference.theDimensionName;
          }
        },
        deep: true
      },
      theConceptReferenceDimension: {
        handler() {
          this.reference.theDimensionName = this.theConceptReferenceDimension;
          const refUrl = '/api/' + (this.theConceptReferenceDimension == 'document' ? 'document' : 'concept') + '_references';
          axios.get(refUrl,{
            baseURL : this.$store.state.url,
            params : {'session_id' : this.$store.state.session}
          })
          .then(response => {
            if (this.theConceptReferenceDimension == 'document') {
              this.theFilteredConceptReferences = response.data.map(dr => dr.theName);
            }
            else {
              this.theFilteredConceptReferences = response.data.filter(cr => cr.theDimName == this.theConceptReferenceDimension).map(cr => cr.theName);
            }
          })
          .catch((error) => {
            EventBus.$emit('operation-failure',error)
          });
        },
        deep: true
      }
    },
    data () {
      return {
        reference : this.characteristicReference.characteristicReference,
        contributionTypes : ['','Make','SomePositive','Help','Hurt','SomeNegative','Break'],
        errors : [],
        theConceptReferenceDimension : '',
        theFilteredConceptReferences : []
      }
    },
    computed : {
      dialogTitle() {
        return (this.characteristicReference.update ? "Update " : "Add ") + (this.characteristicReference.characteristicReference != undefined ? this.characteristicReference.characteristicReference.theCharacteristicType : '');
      },
      referenceDimension() {
        return this.reference.theDimensionName == 'document' ? 'document_reference' : 'concept_reference';
      }
    },
    components : {
      DimensionSelect
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.reference.theReferenceName.length == 0) {
          this.errors.push('Name is required');
        }
        if (this.reference.theReferenceSynopsis.theSynopsis.length > 0) {
          if (this.reference.theReferenceContribution.theMeansEnd.length == 0) {
            this.errors.push('Means/End is required');
          }
          if (this.reference.theReferenceContribution.theContribution.length == 0) {
            this.errors.push('Contribution is required');
          }
        }
        if (!this.errors.length) {
          return true;
        }
        else {
          return false;
        }
      },
      show() {
        this.$refs.crModal.show();
      },
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('characteristic-reference-modal-update',{reference : this.reference, update : this.characteristicReference.update, index: this.characteristicReference.update ? this.characteristicReference.index : -1});
          this.$refs.crModal.hide();
        }
      },
      referenceSelected(refName) {
        this.reference.theReferenceName = refName;
        this.updateReferenceDescription(refName);
      },
      referencesLoaded(refName) {
        this.reference.theReferenceName = refName;
        this.updateReferenceDescription(refName);
      },
      updateReferenceDescription(refName) {
        const dcUrl = '/api/' + (this.reference.theDimensionName == 'document' ? 'document' : 'concept') + '_references/name/' + refName;
        axios.get(dcUrl,{
          baseURL : this.$store.state.url,
          params : {'session_id' : this.$store.state.session}
         })
        .then(response => {
          if (this.reference.theDimensionName == 'document') {
            this.reference.theReferenceDescription = response.data.theExcerpt;
          }
          else {
            this.reference.theReferenceDescription = response.data.theDescription;
          }
         })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        });
      }
    }
  }
</script>