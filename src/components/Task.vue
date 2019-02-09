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

  <div class="task">
    <dimension-modal ref="environmentDialog" dimension="environment" :existing="environmentNames" v-on:dimension-modal-update="addTaskEnvironmentProperty"/> 
    <dimension-modal v-if="objt.theEnvironmentProperties.length" ref="assetDialog" dimension="asset" :environment="environmentName" :existing="concernNames" v-on:dimension-modal-update="addTaskConcern"/> 
    <concern-association-modal v-if="objt.theEnvironmentProperties.length" ref="concernAssociationDialog" :concernAssociation="selectedConcernAssociation" :concerns="concernNames" v-on:concern-association-update="updateConcernAssociation"/> 
    <participant-modal v-if="objt.theEnvironmentProperties.length" ref="participantDialog" :taskParticipant="selectedParticipant" :taskParticipants="participantNames" v-on:participant-update="updateParticipant"/>
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
            <b-col md="9">
              <b-form-group label="<b>Task</b>" label-class="text-md-left" label-cols="3" label-for="theTaskInput">
                <b-form-input id="theTaskInput" v-model="objt.theName" type="text" required>
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group label="<b>Author</b>" label-class="text-md-left" label-cols="3" label-for="theAuthorInput">
                <b-form-input id="theAuthorInput" v-model="objt.theAuthor" type="text" required>
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="<b>Short Code</b>" label-class="text-md-left" label-cols="3" label-for="theShortCodeInput">
                <b-form-input id="theShortCodeInput" v-model="objt.theShortCode" type="text" required>
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="<b>Objective</b>" label-class="text-md-left" label-cols="3" label-for="theObjectiveInput">
                <b-form-textarea id="theObjectiveInput" v-model="objt.theObjective" type="text" :rows=2 :max-rows=4 required>
                </b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="<b>Tags</b>" label-class="text-md-left" label-cols="1" horizontal label-for="theTagsInput">
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
            <b-col sm="12">
                <b-tabs >
                  <b-tab title="Narrative" active>
                     <b-form-textarea id="theNarrative" v-model="objt.theEnvironmentProperties[envPropIndex].theNarrative" type="text" :rows=6 :max-rows=8 required>
                     </b-form-textarea>
                  </b-tab>
                  <b-tab title="Participants">
                    <b-row>
                      <b-col md="12">
                        <b-table striped bordered small hover :items="participants" :fields=participantTableFields @row-clicked="viewParticipant">
                           <!-- eslint-disable-next-line -->
                          <template slot="HEAD_participantsactions" slot-scope="data"> 
                            <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addParticipant"/> 
                          </template> 
                          <template slot="participantsactions" slot-scope="row">
                            <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteParticipant(row.item)"/>
                          </template> 
                        </b-table>
                      </b-col>
                    </b-row>
                  </b-tab>
                  <b-tab title="Dependencies">
                     <b-form-textarea id="theDependencies" v-model="objt.theEnvironmentProperties[envPropIndex].theDependencies" type="text" :rows=6 :max-rows=8 required>
                     </b-form-textarea>
                  </b-tab>
                  <b-tab title="Consequences">
                     <b-form-textarea id="theConsequences" v-model="objt.theEnvironmentProperties[envPropIndex].theConsequences" type="text" :rows=6 :max-rows=8 required>
                     </b-form-textarea>
                  </b-tab>
                  <b-tab title="Benefits">
                     <b-form-textarea id="theBenefits" v-model="objt.theEnvironmentProperties[envPropIndex].theBenefits" type="text" :rows=6 :max-rows=8 required>
                     </b-form-textarea>
                  </b-tab>
                  <b-tab title="Concerns">
                    <b-container fluid>
                      <b-row>
                        <b-col md="4">
                          <b-table striped bordered small hover :items="concerns" :fields=concernTableFields>
                            <!-- eslint-disable-next-line -->
                            <template slot="HEAD_concernactions" slot-scope="data"> 
                              <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addConcern"/> 
                            </template> 
                            <template slot="concernactions" slot-scope="row">
                              <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteConcern(row.item)"/>
                            </template> 
                          </b-table>
                        </b-col>
                        <b-col md="8">
                          <b-table striped bordered small hover :items="concernAssociations" :fields=concernAssociationTableFields @row-clicked="viewConcernAssociation">
                            <!-- eslint-disable-next-line -->
                            <template slot="HEAD_concernassociationactions" slot-scope="data"> 
                              <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addConcernAssociation"/> 
                            </template> 
                            <template slot="concernassociationactions" slot-scope="row">
                              <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteConcernAssociation(row.item)"/>
                            </template> 
                          </b-table>
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-tab>
                </b-tabs>
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

import objectMixin from '../mixins/objectMixin';
import concernMixin from '../mixins/concernMixin';
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
    environmentMixin,
    concernMixin
  ],
  computed : {
    concernNames() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theAssets : [] ;
    },
    concerns() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theAssets.map(concern => ({name : concern})): []
    },
    participants() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].thePersonas.map(p => ({'thePersona' : p.thePersona, 'theDuration' : this.durationLookup[p.theDuration], 'theFrequency' : this.frequencyLookup[p.theFrequency], 'theDemands' : p.theDemands, 'theGoalConflict' : p.theGoalConflict})) : [];
    },
    participantNames() {
      return this.objt.theEnvironmentProperties.length > 0 ? (this.objt.theEnvironmentProperties[this.envPropIndex].thePersonas.length > 1 ? this.objt.theEnvironmentProperties[this.envPropIndex].thePersonas.map(p => p.thePersona) : []) : [];
    }
  },
  components : {
    ConcernAssociationModal : () => import('@/components/ConcernAssociationModal'),
    ParticipantModal : () => import('@/components/ParticipantModal')
  },
  data() {
    return {
      objt : this.object,
      commitLabel : this.label,
      envPropIndex : 0,
      errors : [],
      participantTableFields : {
        participantsactions : {label : ''},
        thePersona : {label : 'Persona'},
        theDuration : {label : 'Duration'},
        theFrequency : {label : 'Frequency'},
        theDemands : {label : 'Demands'},
        theGoalConflict : {label : 'Goal Conflict'}
      },
      durationLookup : {
        'Low' : 'Seconds',
        'Medium' : 'Minutes',
        'High' : 'Hours or longer'
      },
      reverseDurationLookup : {
        'Seconds' : 'Low',
        'Minutes' : 'Medium',
        'Hours or longer' : 'High'
      },
      frequencyLookup : {
        'Low' : 'Hours or more',
        'Medium' : 'Daily - Weekly',
        'High' : 'Monthly or less'
      },
      reverseFrequencyLookup : {
        'Hours or more' : 'Low',
        'Daily - Weekly' : 'Medium',
        'Monthly or less' : 'High'
      },
      selectedParticipant : {
        environment : '',
        update : false,
        participant : {
          thePersona : '', 
          theDuration : '', 
          theFrequency : '', 
          theDemands : '', 
          theGoalConflict : '' 
         }
      }
    }
  }, 
  methods: {
    addTaskConcern(data) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theAssets.push(data);
    },
    deleteConcern(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theAssets.splice(index,1);
    },
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0) {
        this.errors.push('Name is required');
      }
      if (this.objt.theShortCode.length == 0) {
        this.errors.push('Short Code is required');
      }
      if (this.objt.theObjective.length == 0) {
        this.errors.push('Objective is required');
      }
      if (this.objt.theAuthor.length == 0) {
        this.errors.push('Author is required');
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
        this.$emit('task-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'tasks'});
    },
    addTaskEnvironmentProperty : function(envName) {
      this.addEnvironmentProperty({
        theEnvironmentName : envName,
        theAssets : [],
        theBenefits : '',
        theConcernAssociations : [],
        theConsequences : '',
        theDependencies : '',
        theNarrative : '',
        thePersonas : []
      });
    },
    viewParticipant(data,index) {
      this.selectedParticipant['index'] = index
      this.selectedParticipant['environment'] = this.objt.theEnvironmentProperties[this.envPropIndex].theEnvironmentName
      let pObjt = JSON.parse(JSON.stringify(data));
      pObjt['theDuration'] = this.reverseDurationLookup[pObjt['theDuration']]
      pObjt['theFrequency'] = this.reverseFrequencyLookup[pObjt['theFrequency']]
      this.selectedParticipant['participant'] = pObjt;
      this.selectedParticipant['update'] = true;
      this.$refs.participantDialog.show();  
    },
    addParticipant() {
      this.selectedParticipant['environment'] = this.objt.theEnvironmentProperties[this.envPropIndex].theEnvironmentName;
      this.selectedParticipant['participant'] = {thePersona : '', theDuration : '', theFrequency : '', theDemands : '', theGoalConflict : ''};
      this.selectedParticipant['update'] = false;
      this.$refs.participantDialog.show();  
    },
    updateParticipant : function(updPart) {
      if (updPart.update) {
        this.$set(this.objt.theEnvironmentProperties[this.envPropIndex].thePersonas,updPart.index,updPart.participant);
      }
      else {
        this.objt.theEnvironmentProperties[this.envPropIndex].thePersonas.push(updPart.participant);
      }
    },
    deleteParticipant(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].thePersonas.splice(index,1);
    },
    deleteConcernAssociation(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theConcernAssociations.splice(index,1);
    }
  }
}
</script>