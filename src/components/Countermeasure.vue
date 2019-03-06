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

  <div class="countermeasure">
    <dimension-modal ref="environmentDialog" dimension="environment" :existing="environmentNames" v-on:dimension-modal-update="addCountermeasureEnvironmentProperty"/> 
    <dimension-modal ref="roleDialog" dimension="role" :existing="roleNames" v-on:dimension-modal-update="addObjectRole"/> 
    <dimension-modal ref="reqDialog" dimension="requirement" :existing="requirementNames" v-on:dimension-modal-update="addCountermeasureRequirement"/> 
    <countermeasure-participant-modal v-if="objt.theEnvironmentProperties.length" ref="participantDialog" :taskParticipant="selectedParticipant" v-on:countermeasure-participant-update="updateParticipant"/> 
    <countermeasure-target-modal v-if="objt.theEnvironmentProperties.length" ref="targetDialog" :countermeasureTarget="selectedTarget" :environment="environmentName" :requirements="requirementNames" v-on:countermeasure-target-update="updateTarget"/> 
    <property-modal ref="propertyDialog" :securityProperty="selectedProperty" v-on:property-update="updateProperty"/> 
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
              <b-form-group label="Countermeasure" label-class="font-weight-bold text-md-left" label-for="theCountermeasureInput">
                <b-form-input id="theCountermeasureInput" v-model="objt.theName" type="text" required />
              </b-form-group>
            </b-col>
            <b-col md="3">
              <b-form-group label="Type" label-class="font-weight-bold text-md-left" label-for="theCountermeasureTypeSelect">
                <b-form-select id="theCountermeasureTypeSelect" v-model="objt.theType" :options="countermeasureTypes" class="mb-3" required />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Description" label-class="font-weight-bold text-md-left" label-for="theDescription">
                <b-form-textarea id="theDescriptionText" v-model="objt.theDescription" type="text" rows="2" max-rows="4" required />
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
            <b-col md="12">
              <b-form-group label="Cost" label-class="font-weight-bold text-sm-left" label-for="theCountermeasureCostRadio" >
                <b-form-radio-group id="theCountermeasureCostRadio" v-model="cost">
                  <b-form-radio value="Low">Low</b-form-radio>
                  <b-form-radio value="Medium">Medium</b-form-radio>
                  <b-form-radio value="High">High</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-tabs>
                <b-tab title="Security" active>
                  <b-container fluid>
                    <b-row>
                      <b-col md="4">
                        <b-table striped bordered small hover :items="requirements" :fields=requirementTableFields>
                           <!-- eslint-disable-next-line -->
                          <template slot="HEAD_requirementsactions" slot-scope="data"> 
                            <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addRequirement"/> 
                          </template> 
                          <template slot="requirementsactions" slot-scope="row">
                            <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteRequirement(row.index)"/>
                          </template> 
                        </b-table>
                      </b-col>
                      <b-col md="4">
                        <b-table striped bordered small hover :items="targets" :fields=targetTableFields @row-clicked="viewTarget">
                           <!-- eslint-disable-next-line -->
                          <template slot="HEAD_targetsactions" slot-scope="data"> 
                            <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addTarget"/> 
                          </template> 
                          <template slot="targetsactions" slot-scope="row">
                            <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteTarget(row.item)"/>
                          </template> 
                        </b-table>
                      </b-col>
                      <b-col md="4">
                        <b-table striped bordered small hover :items="notNone" :fields=propTableFields @row-clicked="viewProperty">
                          <!-- eslint-disable-next-line -->
                          <template slot="HEAD_propactions" slot-scope="data"> 
                            <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addProperty"/> 
                          </template> 
                          <template slot="propactions" slot-scope="row">
                            <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="clearProperty(row.item)"/>
                          </template> 
                        </b-table>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-tab>
                <b-tab title="Usability">
                  <b-container fluid>
                    <b-row>
                      <b-col md="3">
                        <b-table striped small bordered :fields="roleTableFields" :items="roles">
                          <template slot="HEAD_roleactions" slot-scope="data"> 
                            <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addRole(data)"/> 
                          </template>
                          <template slot="roleactions" slot-scope="row">
                            <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteRole(row.item)"/>
                          </template>
                        </b-table>
                      </b-col>
                      <b-col md="9">
                        <b-table striped bordered small hover :items="participants" :fields=participantTableFields @row-clicked="viewParticipant" />
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
import propertiesMixin from '../mixins/propertiesMixin';
import environmentMixin from '../mixins/environmentMixin';
import axios from 'axios';
import EventBus from '../utils/event-bus';

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
    propertiesMixin
  ],
  computed : {
    participants() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].thePersonas : [];
    },
    requirements() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theRequirements.map(r => ({name: r})) : [];
    },
    requirementNames() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theRequirements : [];
    },
    targets() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theTargets : [];
    },
    roles() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theRoles.map(r => ({name : r})) : [];
    },
    roleNames() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theRoles : [];
    },
    cost : {
      get : function() {
        return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theCost : ''
      },
      set : function(value) {
        this.objt.theEnvironmentProperties[this.envPropIndex].theCost = value;
      }
    }
  },
  components : {
    CountermeasureParticipantModal : () => import('@/components/CountermeasureParticipantModal'),
    CountermeasureTargetModal : () => import('@/components/CountermeasureTargetModal'),
    DimensionModal : () => import('@/components/DimensionModal'),
    PropertyModal : () => import('@/components/PropertyModal')
  },
  data() {
    return {
      objt : this.object,
      commitLabel : this.label,
      envPropIndex : 0,
      errors : [],
      countermeasureTypes: ['Hardware','Information','People','Systems','Software'],
      requirementTableFields : {
        requirementsactions : {label : ''},
        name : {label : 'Requirement'}
      },
      roleTableFields : {
        roleactions : {label : ''},
        name : {label : 'Role'}
      },
      targetTableFields : {
        targetsactions : {label : ''},
        theName : {label : 'Name'},
        theEffectiveness : {label : 'Effectiveness'},
        theRationale : {label : 'Rationale'},
      },
      participantTableFields : {
        participantsactions : {label : ''},
        theTask : {label : 'Task'},
        thePersona : {label : 'Persona'},
        theDuration : {label : 'Duration'},
        theFrequency : {label : 'Frequency'},
        theDemands : {label : 'Demands'},
        theGoalConflict : {label : 'Goal Conflict'}
      },
      selectedParticipant : {
        participant : {
          theTask : '', 
          thePersona : '', 
          theDuration : '', 
          theFrequency : '', 
          theDemands : '', 
          theGoalConflict : '' 
         }
      },
      selectedTarget : {
        environment : '',
        update : false,
        target : {
          theName : '', 
          theEffectiveness : 'None', 
          theRationale : ''
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
      if (this.objt.theType.length == 0) {
        this.errors.push('Type is required');
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
        this.$emit('countermeasure-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'objectsview', params: {dimension: 'countermeasure'}});
    },
    addCountermeasureEnvironmentProperty : function(envName) {
      this.addEnvironmentProperty({
        theEnvironmentName : envName,
        theCost : 'Low',
        thePersonas : [],
        theProperties : [],
        theRequirements : [],
        theRoles : [],
        theTargets : []
      });
    },
    viewParticipant(data,index) {
      this.selectedParticipant['index'] = index
      this.selectedParticipant['participant'] = JSON.parse(JSON.stringify(data));
      this.$refs.participantDialog.show();  
    },
    updateParticipant : function(updPart) {
      this.$set(this.objt.theEnvironmentProperties[this.envPropIndex].thePersonas,updPart.index,updPart.participant);
    },
    addRequirement() {
      this.$refs.reqDialog.show();  
    },
    addCountermeasureRequirement(data) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theRequirements.push(data);
    },
    deleteRequirement(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theRequirements.splice(index,1);
    },
    addTarget() {
      if (this.objt.theEnvironmentProperties[this.envPropIndex].theRequirements.length > 0) {
        this.selectedTarget['environment'] = this.objt.theEnvironmentProperties[this.envPropIndex].theEnvironmentName
        this.selectedTarget['target'] = {theName : '', theEffectiveness : 'None', theRationale : ''};
        this.selectedTarget['update'] = false;
        this.$refs.targetDialog.show();  
      }
      else {
        alert("No requirements set");
      }
    },
    viewTarget(data,index) {
      this.selectedTarget['index'] = index
      this.selectedTarget['environment'] = this.objt.theEnvironmentProperties[this.envPropIndex].theEnvironmentName
      this.selectedTarget['target'] = JSON.parse(JSON.stringify(data));
      this.selectedTarget['update'] = true;
      this.$refs.targetDialog.show();  
    },
    updateTarget : function(updTarget) {
      if (updTarget.update) {
        this.$set(this.objt.theEnvironmentProperties[this.envPropIndex].theTargets,updTarget.index,updTarget.target);
      }
      else {
        this.objt.theEnvironmentProperties[this.envPropIndex].theTargets.push(updTarget.target);
      }
    },
    deleteTarget(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theTargets.splice(index,1);
    },
    addRole() {
      this.$refs.roleDialog.show();  
    },
    addObjectRole(data) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theRoles.push(data);
      this.updateParticipants();
    },
    deleteRole(item) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theRoles = this.objt.theEnvironmentProperties[this.envPropIndex].theRoles.filter(role => (role != item.name));
      this.updateParticipants();
    },
    updateParticipants() {
      const cpUrl = '/api/countermeasures/tasks/environment/' + this.environmentName + '?' + this.objt.theEnvironmentProperties[this.envPropIndex].theRoles.map(r => 'role=' + r).join('&');
      axios.get(cpUrl,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        this.objt.theEnvironmentProperties[this.envPropIndex].thePersonas = response.data;
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });
    }
  }
}
</script>