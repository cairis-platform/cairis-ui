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
  <div class="attacker">
    <dimension-modal v-if="objt.theEnvironmentProperties" ref="environmentDialog" dimension="environment" :existing="environmentNames" v-on:dimension-modal-update="addGoalEnvironmentProperty"/> 
    <dimension-modal v-if="objt.theEnvironmentProperties.length" ref="assetDialog" dimension="asset" :environment="environmentName" :existing="concernNames" v-on:dimension-modal-update="addGoalConcern"/> 
    <kaos-refinement-modal v-if="selectedAssociation.environment != ''" ref="goalRefinementDialog" :goalAssociation="selectedAssociation" refinementType="Goal" v-on:kaos-refinement-update="updateGoalRefinement"/> 
    <kaos-refinement-modal v-if="selectedAssociation.environment != ''" ref="subGoalRefinementDialog" :goalAssociation="selectedAssociation" refinementType="Sub-Goal" v-on:kaos-refinement-update="updateSubGoalRefinement"/> 
    <concern-association-modal v-if="objt.theEnvironmentProperties.length" ref="concernAssociationDialog" :concernAssociation="selectedConcernAssociation" :concerns="concernNames" v-on:concern-association-update="updateConcernAssociation"/> 
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
              <b-form-group label="<b>Goal</b>" label-class="text-md-left" label-for="theGoalInput">
                <b-form-input id="theGoalInput" v-model="objt.theName" type="text" required>
                </b-form-input>
              </b-form-group>
              <b-form-group label="<b>Tags</b>" label-class="text-md-left" label-for="theTagsInput">
                <b-form-input id="theTagsInput" v-model="objt.theTags" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="<b>Originator</b>" label-class="text-md-left" label-for="theOriginator">
                <b-form-input id="theOriginatorInput" v-model="objt.theOriginator" type="text" required>
                </b-form-input>
              </b-form-group>
            </b-container>
          </b-col>
        </b-row>
        <b-row>
          <b-container fluid>
            <b-card header="<b>Environments</b>" no-body class="text-left">
              <template slot="header">
                <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addEnvironment"/> Environment
              </template> 
              <b-row>
                <b-col sm="12">
                  <b-tabs pills v-model="envPropIndex">
                    <b-tab v-for="envProp in objt.theEnvironmentProperties" :key="envProp.theEnvironmentName" :title=envProp.theName>
                      <template slot="title">
                        <font-awesome-icon icon="minus" :style="{color: 'red'}" @click="deleteEnvironment(envProp.theEnvironmentName)"/>  {{envProp.theEnvironmentName}}
                      </template> 
                    </b-tab>
                  </b-tabs>
                </b-col>
              </b-row>
              <b-row v-show="this.objt.theEnvironmentProperties.length">
                <b-col sm="12">
                  <b-card no-body bg-variant="light">
                  <b-tabs tab>
                    <b-tab title="Definition" active>
                      <b-row>
                        <b-col md="6">
                          <b-form-group label="<b>Category</b>" label-class="text-md-left" label-cols="2" label-for="theCategorySelect">
                            <b-form-select id="theCategorySelect" v-model="category" :options="goalCategories" class="mb-3" required>
                            </b-form-select>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group label="<b>Priority</b>" label-class="text-md-left" label-cols="2" label-for="theType">
                            <b-form-radio-group v-model="priority">
                              <b-form-radio value="Low">Low</b-form-radio>
                              <b-form-radio value="Medium">Medium</b-form-radio>
                              <b-form-radio value="High">High</b-form-radio>
                            </b-form-radio-group>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6">
                          <b-form-group label="<b>Definition</b>" label-class="text-md-left" label-cols="2" label-for="theDefinitionInput">
                            <b-form-textarea id="theDefinition" v-model="definition" type="text" :rows=2 :max-rows=4 required>
                            </b-form-textarea>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group label="<b>Fit Criterion</b>" label-class="text-md-left" label-cols="3" label-for="theFitCriterionInput">
                            <b-form-textarea id="theFitCriterionInput" v-model="fitCriterion" type="text" :rows=2 :max-rows=4 required>
                            </b-form-textarea>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="12">
                          <b-form-group label="<b>Issue</b>" label-class="text-md-left" label-cols="3" label-for="theIssueInput">
                            <b-form-textarea id="theIssueInput" v-model="issue" type="text" :rows=2 :max-rows=4 required>
                            </b-form-textarea>
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </b-tab>
                    <b-tab title="Goals" active>
                      <b-container fluid>
                        <b-row>
                          <b-col md="12">
                            <b-table striped bordered small hover :items="goalRefinements" :fields=goalRefinementTableFields @row-clicked="viewGoalRefinement">
                              <template slot="HEAD_goalrefinementactions" slot-scope="data"> 
                                <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addGoalRefinement"/> 
                              </template> 
                              <template slot="goalrefinementactions" slot-scope="row">
                                <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteGoalRefinement(row.item)"/>
                              </template> 
                            </b-table>
                          </b-col>
                        </b-row>
                      </b-container>
                    </b-tab>
                    <b-tab title="Sub-Goals" active>
                      <b-container fluid>
                        <b-row>
                          <b-col md="12">
                            <b-table striped bordered small hover :items="subGoalRefinements" :fields=subGoalRefinementTableFields @row-clicked="viewSubGoalRefinement">
                              <template slot="HEAD_subgoalrefinementactions" slot-scope="data"> 
                                <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addSubGoalRefinement"/> 
                              </template> 
                              <template slot="subgoalrefinementactions" slot-scope="row">
                                <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteSubGoalRefinement(row.item)"/>
                              </template> 
                            </b-table>
                          </b-col>
                        </b-row>
                      </b-container>
                    </b-tab>
                    <b-tab title="Concerns" active>
                      <b-container fluid>
                        <b-row>
                          <b-col md="4">
                            <b-table striped bordered small hover :items="concerns" :fields=concernTableFields>
                              <template slot="HEAD_concernactions" slot-scope="data"> 
                                <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addConcern(data)"/> 
                              </template> 
                              <template slot="concernactions" slot-scope="row">
                                <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteConcern(row.item)"/>
                              </template> 
                            </b-table>
                          </b-col>
                          <b-col md="8">
                            <b-table striped bordered small hover :items="concernAssociations" :fields=concernAssociationTableFields @row-clicked="viewConcernAssociation">
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
                  </b-card>
                </b-col>
              </b-row>
            </b-card>
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

import objectMixin from '../mixins/objectMixin'
import environmentMixin from '../mixins/environmentMixin'

export default {
  props : {
    object : Object,
    label : String
  },
  watch : {
    object: 'setObject'
  },
  components : {
    DimensionModal : () => import('@/components/DimensionModal.vue'),
    KaosRefinementModal : () => import('@/components/KaosRefinementModal.vue'),
    ConcernAssociationModal : () => import('@/components/ConcernAssociationModal')
  },
  mixins : [
    objectMixin,
    environmentMixin
  ],
  computed : {
    concernNames() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theConcerns : [] ;
    },
    category : {
      get : function() {
        return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theCategory : ''
      },
      set : function(value) {
        this.objt.theEnvironmentProperties[this.envPropIndex].theCategory = value;
      }
    },
    priority : {
      get : function() {
        return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].thePriority : ''
      },
      set : function(value) {
        this.objt.theEnvironmentProperties[this.envPropIndex].thePriority = value;
      }
    },
    definition : {
      get : function() {
        return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theDefinition : ''
      },
      set : function(value) {
        this.objt.theEnvironmentProperties[this.envPropIndex].theDefinition = value;
      }
    },
    issue : {
      get : function() {
        return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theIssue : ''
      },
      set : function(value) {
        this.objt.theEnvironmentProperties[this.envPropIndex].theIssue = value;
      }
    },
    fitCriterion : {
      get : function() {
        return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theFitCriterion : ''
      },
      set : function(value) {
        this.objt.theEnvironmentProperties[this.envPropIndex].theFitCriterion = value;
      }
    },
    concerns() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theConcerns.map(concern => ({name : concern})): []
    },
    goalRefinements() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theGoalRefinements : [] 
    },
    subGoalRefinements() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theSubGoalRefinements : [] 
    },
    concernAssociations() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theConcernAssociations : [] 
    },
  },
  data() {
    return {
      errors : [],
      objt : this.object,
      envPropIndex : 0,
      commitLabel : 'Create',
      concernTableFields : {
        concernactions : {label : ''},
        name : {label : 'Concern'}
      },
      goalRefinementTableFields : {
        goalrefinementactions : {label : ''},
        theEndType : {label : 'Type'},
        theEndName : {label : 'Goal'},
        theRefType : {label : 'Refinement'},
        isAlternate : {label : 'Alternate'},
        theRationale : {label : 'Rationale'}
      },
      subGoalRefinementTableFields : {
        subgoalrefinementactions : {label : ''},
        theEndType : {label : 'Type'},
        theEndName : {label : 'Sub-Goal'},
        theRefType : {label : 'Refinement'},
        isAlternate : {label : 'Alternate'},
        theRationale : {label : 'Rationale'}
      },
      concernAssociationTableFields : {
        concernassociationactions : {label : ''},
        theSource : {label : 'Source'},
        theSourceNry : {label : 'n'},
        theLinkVerb : {label : 'Link Verb'},
        theTargetNry : {label : 'n'},
        theTarget : {label : 'Target'}
      },
      goalCategories : ['Maintain','Achieve','Avoid','Improve','Increase','Maximise','Minimise'],
      selectedAssociation : {
        environment : '',
        update : false,
        association : {
          theEndName : '', 
          theEndType : '', 
          theRefType : 'and', 
          isAlternate: 'No', 
          theRationale : ''
         }
      },
      selectedConcernAssociation : {
        update : false,
        association : {
          theSource : '',
          theSourceNry : '1',
          theLinkVerb : '',
          theTargetNry : '1',
          theTarget : ''
        }
      }
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
        if (this.objt.theTags != '') {
          this.objt.theTags = this.objt.theTags.split(',').map(t => t.trim());
        }
        this.$emit('goal-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'goals'})
    },
    addGoalEnvironmentProperty : function(envName) {
      this.addEnvironmentProperty({
        theEnvironmentName : envName,
        theConcerns : [],
        theConcernAssociations : [],
        theDefinition : '',
        theFitCriterion : '',
        theIssue : '',
        thePriority : 'High',
        theCategory : 'Maintain',
        theGoalRefinements : [],
        theSubGoalRefinements : []
      });
    },
    viewGoalRefinement(data,index) {
      this.selectedAssociation['index'] = index
      this.selectedAssociation['association'] = JSON.parse(JSON.stringify(data));
      this.selectedAssociation['environment'] = this.objt.theEnvironmentProperties[this.envPropIndex].theEnvironmentName;
      this.selectedAssociation['update'] = true;
      this.$refs.goalRefinementDialog.show();  
    },
    addGoalRefinement() {
      this.selectedAssociation['association'] = {theEndName : '', theEndType : '', theRefType : 'and', isAlternate: 'No', theRationale : ''};
      this.selectedAssociation['environment'] = this.objt.theEnvironmentProperties[this.envPropIndex].theEnvironmentName;
      this.selectedAssociation['update'] = false;
      this.$refs.goalRefinementDialog.show();  
    },
    deleteGoalRefinement(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theGoalRefinements.splice(index,1);
    },
    viewSubGoalRefinement(data,index) {
      this.selectedAssociation['index'] = index
      this.selectedAssociation['association'] = JSON.parse(JSON.stringify(data));
      this.selectedAssociation['environment'] = this.objt.theEnvironmentProperties[this.envPropIndex].theEnvironmentName;
      this.selectedAssociation['update'] = true;
      this.$refs.subGoalRefinementDialog.show();  
    },
    addSubGoalRefinement() {
      this.selectedAssociation['association'] = {theEndName : '', theEndType : '', theRefType : 'and', isAlternate: 'No', theRationale : ''};
      this.selectedAssociation['update'] = false;
      this.$refs.subGoalRefinementDialog.show();  
    },
    updateGoalRefinement : function(updAssoc) {
      if (updAssoc.update) {
        this.$set(this.objt.theEnvironmentProperties[this.envPropIndex].theGoalRefinements,updAssoc.index,updAssoc.association);
      }
      else {
        this.objt.theEnvironmentProperties[this.envPropIndex].theGoalRefinements.push(updAssoc.association);
      }
    },
    updateSubGoalRefinement : function(updAssoc) {
      if (updAssoc.update) {
        this.$set(this.objt.theEnvironmentProperties[this.envPropIndex].theSubGoalRefinements,updAssoc.index,updAssoc.association);
      }
      else {
        this.objt.theEnvironmentProperties[this.envPropIndex].theSubGoalRefinements.push(updAssoc.association);
      }
    },
    deleteSubGoalRefinement(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theSubGoalRefinements.splice(index,1);
    },
    addConcern() {
      this.showAssetDialog = true;
      this.$refs.assetDialog.show();  
    },
    addGoalConcern(data) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theConcerns.push(data);
    },
    deleteConcern(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theConcerns.splice(index,1);
    },
    viewConcernAssociation(data,index) {
      this.selectedConcernAssociation['index'] = index;
      this.selectedConcernAssociation['association'] = JSON.parse(JSON.stringify(data));
      this.selectedConcernAssociation['update'] = true;
      this.$refs.concernAssociationDialog.show();  
    },
    addConcernAssociation() {
      this.selectedConcernAssociation['association'] = {theSource : '', theSourceNry : '', theLinkVerb : '', theTargetNry: '', theTarget : ''};
      this.selectedConcernAssociation['update'] = false;
      this.$refs.concernAssociationDialog.show();  
    },
    updateConcernAssociation : function(updAssoc) {
      if (updAssoc.update) {
        this.$set(this.objt.theEnvironmentProperties[this.envPropIndex].theConcernAssociations,updAssoc.index,updAssoc.association);
      }
      else {
        this.objt.theEnvironmentProperties[this.envPropIndex].theConcernAssociations.push(updAssoc.association);
      }
    },
    deleteConcernAssociation(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theConcernAssociations.splice(index,1);
    },
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0) {
        this.errors.push('Goal name is required');
      }
      if (this.objt.theOriginator.length == 0) {
        this.errors.push('Originator is required');
      }
      if (this.objt.theEnvironmentProperties.length == 0) {
        this.errors.push('No environment properties have been defined')
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    }
  }
}
</script>