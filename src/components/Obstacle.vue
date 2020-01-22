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
  <div class="obstacle">
    <dimension-modal v-if="objt.theEnvironmentProperties" ref="environmentDialog" dimension="environment" :existing="environmentNames" v-on:dimension-modal-update="addObstacleEnvironmentProperty"/> 
    <dimension-modal v-if="objt.theEnvironmentProperties.length" ref="assetDialog" dimension="asset" :environment="environmentName" :existing="concernNames" v-on:dimension-modal-update="addObstacleConcern"/> 
    <kaos-refinement-modal v-if="objt.theEnvironmentProperties.length" ref="obstacleRefinementDialog" :goalAssociation="selectedAssociation" refinementType="Goal" :source="objt.theName" v-on:kaos-refinement-update="updateObstacleRefinement"/> 
    <kaos-refinement-modal v-if="objt.theEnvironmentProperties.length" ref="subObstacleRefinementDialog" :goalAssociation="selectedAssociation" refinementType="Sub-Goal" :source="objt.theName" v-on:kaos-refinement-update="updateSubObstacleRefinement"/> 
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <b-form>
      <b-card bg-variant="light" no body> 
        <b-row>
          <b-col md="6">
            <b-form-group label="Obstacle" label-class="font-weight-bold text-md-left" label-for="theObstacleInput">
              <b-form-input id="theObstacleInput" v-model="objt.theName" type="text" required />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Originator" label-class="font-weight-bold text-md-left" label-for="theOriginator">
              <b-form-input id="theOriginatorInput" v-model="objt.theOriginator" type="text" required />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Tags" label-class="font-weight-bold text-md-left" label-for="theTagsInput">
              <b-form-tags v-model="objt.theTags" separator="," placeholder="Enter new tags separated by comma" remove-on-delete tag-variant="primary" tag-pills class="md-8"></b-form-tags>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-card header="Environments" no-body class="text-left">
        <template slot="header">
          <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addEnvironment"/> Environment
        </template> 
        <b-row>
          <b-col md="12">
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
          <b-col md="12">
            <b-card no-body bg-variant="light">
              <b-tabs tab>
                <b-tab title="Definition" active>
                  <b-container fluid>
                    <b-row>
                      <b-col md="12">
                        <b-form-group label="Category" label-class="font-weight-bold text-md-left" label-for="theCategorySelect">
                          <b-form-select id="theCategorySelect" v-model="category" :options="obstacleCategories" class="mb-3" required />
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <b-form-group label="Definition" label-class="font-weight-bold text-md-left" label-for="theDefinitionInput">
                          <b-form-textarea id="theDefinition" v-model="definition" type="text" rows="2" max-rows="4" required />
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <b-form-group label="Probability" label-class="font-weight-bold text-md-left" label-for="theProbabilityInput">
                          <b-form-input id="theProbabilityInput" v-model="probability" type="number" min="0" max="1" step="0.1" required />
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group label="Reason" label-class="font-weight-bold text-md-left" label-for="theReasonInput">
                          <b-form-input id="theReasonInput" v-model="rationale" type="text" required />
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <b-table striped bordered small hover :items="concerns" :fields=concernTableFields>
                          <!-- eslint-disable-next-line -->
                          <template v-slot:head(concernactions)="data"> 
                            <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addConcern"/> 
                          </template> 
                          <template v-slot:cell(concernactions)="row">
                            <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteConcern(row.index)"/>
                          </template> 
                        </b-table>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-tab>
                <b-tab title="Obstacles">
                  <b-container fluid>
                    <b-row>
                      <b-col md="12">
                        <b-table striped bordered small hover :items="goalRefinements" :fields=goalRefinementTableFields @row-clicked="viewObstacleRefinement">
                          <!-- eslint-disable-next-line -->
                          <template v-slot:head(obstaclerefinementactions)="data"> 
                            <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addObstacleRefinement"/> 
                          </template> 
                          <template v-slot:cell(obstaclerefinementactions)="row">
                            <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteObstacleRefinement(row.index)"/>
                          </template> 
                        </b-table>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-tab>
                <b-tab title="Sub-Obstacles">
                  <b-container fluid>
                    <b-row>
                      <b-col md="12">
                        <b-table striped bordered small hover :items="subGoalRefinements" :fields=subGoalRefinementTableFields @row-clicked="viewSubObstacleRefinement">
                          <!-- eslint-disable-next-line -->
                          <template v-slot:head(subobstaclerefinementactions)="data"> 
                            <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addSubObstacleRefinement"/> 
                          </template> 
                          <template v-slot:cell(subobstaclerefinementactions)="row">
                            <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteSubObstacleRefinement(row.index)"/>
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
    KaosRefinementModal : () => import('@/components/KaosRefinementModal.vue'),
    DimensionModal : () => import('@/components/DimensionModal.vue')
  },
  mixins : [
    objectMixin,
    environmentMixin
  ],
  computed : {
    concernNames() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theConcerns : [] ;
    },
    concerns() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theConcerns.map(concern => ({name : concern})): []
    },
    category : {
      get : function() {
        return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theCategory : ''
      },
      set : function(value) {
        this.objt.theEnvironmentProperties[this.envPropIndex].theCategory = value;
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
    probability : {
      get : function() {
        return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theProbability : 0 
      },
      set : function(value) {
        this.objt.theEnvironmentProperties[this.envPropIndex].theProbability = value;
      }
    },
    rationale : {
      get : function() {
        return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theProbabilityRationale : '' 
      },
      set : function(value) {
        this.objt.theEnvironmentProperties[this.envPropIndex].theProbabilityRationale = value;
      }
    },
    goalRefinements() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theGoalRefinements : [] 
    },
    subGoalRefinements() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theSubGoalRefinements : [] 
    }
  },
  data() {
    return {
      errors : [],
      objt : this.object,
      envPropIndex : 0,
      commitLabel : this.label,
      concernTableFields : [
        {key: 'concernactions', label : ''},
        {key: 'name', label : 'Concern'}
      ],
      goalRefinementTableFields : [
        {key: 'obstaclerefinementactions', label : ''},
        {key: 'theEndType', label : 'Type'},
        {key: 'theEndName', label : 'Goal'},
        {key: 'theRefType', label : 'Refinement'},
        {key: 'isAlternate', label : 'Alternate'},
        {key: 'theRationale', label : 'Rationale'}
      ],
      subGoalRefinementTableFields : [
        {key: 'subobstaclerefinementactions' , label : ''},
        {key: 'theEndType', label : 'Type'},
        {key: 'theEndName', label : 'Sub-Goal'},
        {key: 'theRefType', label : 'Refinement'},
        {key: 'isAlternate', label : 'Alternate'},
        {key: 'theRationale', label : 'Rationale'}
      ],
      selectedAssociation : {
        environment : '',
        update : false,
        association : {
          theEndName : '', 
          theEndType : 'obstacle', 
          theRefType : 'and', 
          isAlternate: 'No', 
          theRationale : ''
         }
      },
      obstacleCategories : ['Confidentiality Threat','Integrity Threat','Availability Threat','Accountability Threat','Anonymity Threat','Pseudonymity Threat','Unlinkability Threat','Unobservability Threat','Threat','Vulnerability','Duration','Frequency','Demands','Goal Support']
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
      this.$router.push({ name: 'objectsview', params: {dimension: 'obstacle'}});
    },
    addObstacleEnvironmentProperty : function(envName) {
      this.addEnvironmentProperty({
        theEnvironmentName : envName,
        theDefinition : '',
        theCategory : 'Threat',
        theGoalRefinements : [],
        theSubGoalRefinements : [],
        theConcerns : [],
        theProbability : 0,
        theProbabilityRationale : ''
      });
    },
    viewObstacleRefinement(data,index) {
      this.selectedAssociation['index'] = index
      this.selectedAssociation['association'] = JSON.parse(JSON.stringify(data));
      this.selectedAssociation['environment'] = this.objt.theEnvironmentProperties[this.envPropIndex].theEnvironmentName;
      this.selectedAssociation['update'] = true;
      this.$refs.obstacleRefinementDialog.show();  
    },
    addObstacleRefinement() {
      this.selectedAssociation['association'] = {theEndName : '', theEndType : 'obstacle', theRefType : 'and', isAlternate: 'No', theRationale : ''};
      this.selectedAssociation['environment'] = this.objt.theEnvironmentProperties[this.envPropIndex].theEnvironmentName;
      this.selectedAssociation['update'] = false;
      this.$refs.obstacleRefinementDialog.show();  
    },
    deleteObstacleRefinement(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theGoalRefinements.splice(index,1);
    },
    viewSubObstacleRefinement(data,index) {
      this.selectedAssociation['index'] = index
      this.selectedAssociation['association'] = JSON.parse(JSON.stringify(data));
      this.selectedAssociation['environment'] = this.objt.theEnvironmentProperties[this.envPropIndex].theEnvironmentName;
      this.selectedAssociation['update'] = true;
      this.$refs.subObstacleRefinementDialog.show();  
    },
    addSubObstacleRefinement() {
      this.selectedAssociation['association'] = {theEndName : '', theEndType : 'obstacle', theRefType : 'and', isAlternate: 'No', theRationale : ''};
      this.selectedAssociation['environment'] = this.objt.theEnvironmentProperties[this.envPropIndex].theEnvironmentName;
      this.selectedAssociation['update'] = false;
      this.$refs.subObstacleRefinementDialog.show();  
    },
    updateObstacleRefinement : function(updAssoc) {
      if (updAssoc.update) {
        this.$set(this.objt.theEnvironmentProperties[this.envPropIndex].theGoalRefinements,updAssoc.index,updAssoc.association);
      }
      else {
        this.objt.theEnvironmentProperties[this.envPropIndex].theGoalRefinements.push(updAssoc.association);
      }
    },
    updateSubObstacleRefinement : function(updAssoc) {
      if (updAssoc.update) {
        this.$set(this.objt.theEnvironmentProperties[this.envPropIndex].theSubGoalRefinements,updAssoc.index,updAssoc.association);
      }
      else {
        this.objt.theEnvironmentProperties[this.envPropIndex].theSubGoalRefinements.push(updAssoc.association);
      }
    },
    deleteSubObstacleRefinement(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theSubGoalRefinements.splice(index,1);
    },
    addConcern() {
      this.showAssetDialog = true;
      this.$refs.assetDialog.show();  
    },
    addObstacleConcern(data) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theConcerns.push(data);
    },
    deleteConcern(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theConcerns.splice(index,1);
    },
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0) {
        this.errors.push('Obstacle name is required');
      }
      if (this.objt.theOriginator.length == 0) {
        this.errors.push('Originator is required');
      }
      if (this.objt.theEnvironmentProperties.length == 0) {
        this.errors.push('No environment properties have been defined')
      }
      for (let i = 0; i < this.objt.theEnvironmentProperties.length; i++) {
        const envProps = this.objt.theEnvironmentProperties[i];
        if (envProps.theDefinition.length == 0) {
          this.errors.push('No definition set for environment ' + envProps.theEnvironmentName);
        }
        if (envProps.theProbability < 0) {
          this.errors.push('Probability set for environment ' + envProps.theEnvironmentName + ' is less than 0');
        }
        if (envProps.theProbability > 1) {
          this.errors.push('Probability set for environment ' + envProps.theEnvironmentName + ' is greater than 1');
        }
        if (isNaN(envProps.theProbability)) {
          this.errors.push('Probability set for environment ' + envProps.theEnvironmentName + ' is not a number');
        }
        if (envProps.theProbability > 0 && envProps.theProbability <= 1 && envProps.theProbabilityRationale.length == 0) {
          this.errors.push('Probability set for environment ' + envProps.theEnvironmentName + ', but no rationale provided');
        }
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