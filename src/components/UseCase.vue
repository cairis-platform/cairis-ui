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

  <div class="usecase">
    <dimension-modal ref="environmentDialog" dimension="environment" :existing="environmentNames" v-on:dimension-modal-update="addUseCaseEnvironmentProperty"/> 
    <dimension-modal ref="actorDialog" dimension="role" :existing="actorNames" v-on:dimension-modal-update="addUseCaseActor"/> 
    <step-modal v-if="objt.theEnvironmentProperties.length" ref="stepDialog" :usecaseStep="selectedStep" :usecaseActors="actorNames" :environment="environmentName" v-on:step-update="updateStep"/> 
    <exception-modal v-if="objt.theEnvironmentProperties.length" ref="excDialog" :stepException="selectedException" :usecase="objt.theName" :environment="environmentName" v-on:exception-update="updateException"/> 
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <b-form>
      <b-container fluid>
        <b-card bg-variant="light">
          <b-row>
            <b-col md="5">
              <b-form-group label="Use Case" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theUseCaseInput">
                <b-form-input id="theUseCaseInput" v-model="objt.theName" type="text" required>
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Short Code" label-class="font-weight-bold text-md-left" label-cols="4" label-for="theShortCodeInput">
                <b-form-input id="theShortCodeInput" v-model="objt.theCode" type="text" required>
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group label="Author" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theAuthorInput">
                <b-form-input id="theAuthorInput" v-model="objt.theAuthor" type="text" required>
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-table striped bordered small hover :items="actors" :fields=actorTableFields>
                <!-- eslint-disable-next-line -->
                <template slot="HEAD_actorsactions" slot-scope="data"> 
                  <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addActor"/> 
                </template> 
                <template slot="actorsactions" slot-scope="row">
                  <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteActor(row.item)"/>
                </template> 
              </b-table>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Objective" label-class="font-weight-bold text-md-left" label-for="theDescriptionInput">
                <b-form-textarea id="theDescriptionInput" v-model="objt.theDescription" type="text" :rows=2 :max-rows=4 required>
                </b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Tags" label-class="font-weight-bold text-md-left" label-cols="1" label-for="theTagsInput">
                <b-form-input id="theTagsInput" v-model="objt.theTags" type="text">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-container>
      <b-container fluid>
        <b-card header="Environments" class="text-left">
          <template slot="header">
            <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addEnvironment"/> Environment
          </template> 
          <b-row>
            <b-col sm="12">
              <b-tabs pills v-model="envPropIndex">
                <b-tab v-for="envProp in this.objt.theEnvironmentProperties" :key="envProp.theEnvironmentName" :title=envProp.theName>
                  <template slot="title">
                    <font-awesome-icon icon="minus" :style="{color: 'red'}" @click="deleteEnvironment(envProp.theEnvironmentName)"/>  {{envProp.theEnvironmentName}}
                  </template> 
                </b-tab> 
               </b-tabs>
             </b-col> 
          </b-row>
          <b-row v-if="this.objt.theEnvironmentProperties.length">
            <b-container fluid>
            <b-tabs no-body>
              <b-tab title="Preconditions">
                <b-form-textarea id="thePreconditionsInput" v-model="preconditions" type="text" :rows=4 :max-rows=4 required>
                </b-form-textarea>
              </b-tab>
              <b-tab title="Steps">
                <b-container fluid>
                  <b-row>
                  <b-col md="8">
                    <b-table striped bordered small hover :items="steps" :fields=stepTableFields @row-clicked="viewStep">
                      <!-- eslint-disable-next-line -->
                      <template slot="HEAD_stepsactions" slot-scope="data"> 
                        <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addStep"/> 
                      </template> 
                      <template slot="stepsactions" slot-scope="row">
                        <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteStep(row.item)"/>
                      </template> 
                    </b-table>
                  </b-col>
                  <b-col md="4">
                    <div v-if="theStepIndex != -1"><p><b>Step {{theStepIndex + 1}}</b></p></div>
                    <b-table v-if="theStepIndex != -1 && updating == true" striped bordered small hover :items="exceptions" :fields=exceptionTableFields @row-clicked="viewException">
                      <!-- eslint-disable-next-line -->
                      <template slot="HEAD_exceptionsactions" slot-scope="data"> 
                        <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addException"/> 
                      </template> 
                      <template slot="exceptionsactions" slot-scope="row">
                        <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteException(row.item)"/>
                      </template> 
                      <template slot="excobsactions" slot-scope="row">
                        <font-awesome-icon icon="bolt" :style="{color: 'blue'}" @click.stop="generateObstacle(row.item)"/>
                      </template> 
                    </b-table>
                    <b-table v-if="theStepIndex != -1 && updating == false" striped bordered small hover :items="exceptions" :fields=nonUpdatingExceptionTableFields @row-clicked="viewException">
                      <!-- eslint-disable-next-line -->
                      <template slot="HEAD_exceptionsactions" slot-scope="data"> 
                        <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addException"/> 
                      </template> 
                      <template slot="exceptionsactions" slot-scope="row">
                        <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteException(row.item)"/>
                      </template> 
                    </b-table>
                  </b-col>
                  </b-row>
                </b-container>
              </b-tab>
              <b-tab title="Postconditions">
                <b-form-textarea id="thePostconditionsInput" v-model="postconditions" type="text" :rows=4 :max-rows=4 required>
                </b-form-textarea>
              </b-tab>
            </b-tabs>
            </b-container>
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

import axios from 'axios';
import EventBus from '../utils/event-bus';
import objectMixin from '../mixins/objectMixin';
import environmentMixin from '../mixins/environmentMixin';

export default {
  props : {
    object : Object,
    label : String
  },
  watch : {
    object: 'setObject'
  },
  mixins : [
    objectMixin,
    environmentMixin
  ],
  computed : {
    updating() {
      return this.label == 'Update' ? true : false;
    },
    actorNames() {
      return this.objt != undefined ? this.objt.theActors : [] ;
    },
    actors() {
      return this.objt != undefined ? this.objt.theActors.map(actor => ({name : actor})) : [];
    },
    steps() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theSteps.map((step,idx) => ({'theIndex' : idx, 'theStepText' : step.theStepText})): []
    },
    exceptions() {
      return this.objt.theEnvironmentProperties.length > 0 && this.objt.theEnvironmentProperties[this.envPropIndex].theSteps.length > 0 && this.theStepIndex != -1 ? this.objt.theEnvironmentProperties[this.envPropIndex].theSteps[this.theStepIndex].theExceptions.map((exc,idx) => ({theIndex : idx, theName : exc.theName, theCategory : exc.theCategory, theDescription : exc.theDescription,  })): [];
    },
    preconditions : {
      get : function() {
        return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].thePreCond : ''
      },
      set : function(value) {
        this.objt.theEnvironmentProperties[this.envPropIndex].thePreCond = value;
      }
    },
    postconditions : {
      get : function() {
        return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].thePostCond : ''
      },
      set : function(value) {
        this.objt.theEnvironmentProperties[this.envPropIndex].thePostCond = value;
      }
    }
  },
  components : {
    DimensionModal : () => import('@/components/DimensionModal'),
    StepModal : () => import('@/components/StepModal'),
    ExceptionModal : () => import('@/components/ExceptionModal')
  },
  data() {
    return {
      objt : this.object,
      commitLabel : this.label,
      envPropIndex : 0,
      theStepIndex : -1,
      errors : [],
      actorTableFields : {
        actorsactions : {label : ''},
        name : {label : 'Actor'},
      },
      stepTableFields : {
        stepsactions : {label : ''},
        theStepText : {label: 'Step'}
      },
      exceptionTableFields : {
        exceptionsactions : {label : ''},
        theName : {label: 'Exception'},
        excobsactions : {label : ''}
      },
      nonUpdatingExceptionTableFields : {
        exceptionsactions : {label : ''},
        theName : {label: 'Exception'}
      },
      selectedStep : {
        update : false,
        step : {
          theStepText : '',
          theSynopsis : '',
          theActor : '',
          theActorType : 'asset',
          theExceptions : []
         }
      },
      selectedException : {
        update : false,
        exception : {
          theName : '',
          theCategoryName : '',
          theDescription : '',
          theDimensionType : 'none',
          theDimensionValue : ''
        }
      }
    }
  }, 
  methods: {
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0) {
        this.errors.push('Name is required');
      }
      if (this.objt.theCode.length == 0) {
        this.errors.push('Short Code is required');
      }
      if (this.objt.theAuthor.length == 0) {
        this.errors.push('Author is required');
      }
      if (this.objt.theActors.length == 0) {
        this.errors.push('Actor or Actors are required');
      }
      if (this.objt.theDescription.length == 0) {
        this.errors.push('Description is required');
      }
      if (this.objt.theEnvironmentProperties.length == 0) {
        this.errors.push('No environment properties have been defined');
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    },
    setObject() {
      this.objt = this.object;
      this.commitLabel = this.label;
    },
    onCommit(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        if (this.objt.theTags != '') {
          this.objt.theTags = this.objt.theTags.split(',').map(t => t.trim());
        }
        this.$emit('usecase-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'objectsview', params: {dimension: 'usecase'}});
    },
    addUseCaseEnvironmentProperty : function(envName) {
      this.addEnvironmentProperty({
        theEnvironmentName : envName,
        theSteps : [],
        thePreCond : '',
        thePostCond : ''
      });
    },
    addActor() {
      this.$refs.actorDialog.show();  
    },
    addUseCaseActor : function(newActor) {
      this.objt.theActors.push(newActor);
    },
    deleteActor(index) {
      this.objt.theActors.splice(index,1);
    },
    addStep() {
      this.selectedStep['step'] = {theStepText : '',theActor : '',theActorType : '',theSynopsis : '',theExceptions : []};
      this.selectedStep['update'] = false;
      this.$refs.stepDialog.show();  
    },
    viewStep(row) {
      this.selectedStep['index'] = row.theIndex;
      this.theStepIndex = row.theIndex;
      const stepObjt = JSON.parse(JSON.stringify(this.objt.theEnvironmentProperties[this.envPropIndex].theSteps[row.theIndex]));
      this.selectedStep['step'] = stepObjt;
      this.selectedStep['update'] = true;
      this.$refs.stepDialog.show();  
    },
    updateStep : function(updStep) {
      if (updStep.update) {
        this.$set(this.objt.theEnvironmentProperties[this.envPropIndex].theSteps,updStep.index,updStep.step);
      }
      else {
        this.objt.theEnvironmentProperties[this.envPropIndex].theSteps.push(updStep.step);
      }
    },
    deleteStep(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theSteps.splice(index,1);
    },
    addException() {
      this.selectedException['exception'] = {theName : '',theCategoryName : '',theDescription : '',theDimensionType : 'none',theDimensionValue : ''};
      this.selectedException['update'] = false;
      this.$refs.excDialog.show();  
    },
    viewException(row) {
      this.selectedException['index'] = row.theIndex;
      const excObjt = JSON.parse(JSON.stringify(this.objt.theEnvironmentProperties[this.envPropIndex].theSteps[this.theStepIndex].theExceptions[row.theIndex]));
      this.selectedException['exception'] = excObjt;
      this.selectedException['update'] = true;
      this.$refs.excDialog.show();  
    },
    updateException : function(updExc) {
      if (updExc.update) {
        this.$set(this.objt.theEnvironmentProperties[this.envPropIndex].theSteps[this.theStepIndex].theExceptions,updExc.index,updExc.exception);
      }
      else {
        this.objt.theEnvironmentProperties[this.envPropIndex].theSteps[this.theStepIndex].theExceptions.push(updExc.exception);
      }
    },
    deleteException(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theSteps[this.theStepIndex].theExceptions.splice(index,1);
    },
    generateObstacle(row) {
      const goUrl = this.$store.state.url + '/api/usecases/environment/' + this.environmentName + '/step/' + this.objt.theEnvironmentProperties[this.envPropIndex].theSteps[this.theStepIndex].theStepText + '/exception/' + this.objt.theEnvironmentProperties[this.envPropIndex].theSteps[this.theStepIndex].theExceptions[row.theIndex].theName + '/generate_obstacle';
      axios.post(goUrl,{
        session_id : this.$store.state.session,
        object : this.objt
      })
      .then(response => {
        EventBus.$emit('operation-success',response.data.message)
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });
    },
  }
}
</script>