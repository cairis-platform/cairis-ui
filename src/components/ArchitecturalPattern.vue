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

  <div class="architecturalpattern">
    <component-interface-modal ref="componentInterfaceDialog" :componentInterface="selectedInterface" v-on:interface-update="updateComponentInterface"/> 
    <component-association-modal ref="componentAssociationDialog" :componentAssociation="selectedAssociation" v-on:association-update="updateComponentAssociation"/> 
    <dimension-modal v-if="objt != undefined && this.objt.theComponents.length > 0" ref="reqDialog" dimension="template_requirement" :existing="objt.theComponents[this.componentIndex].theRequirements" v-on:dimension-modal-update="addComponentRequirement"/> 
    <dimension-modal v-if="objt != undefined && this.objt.theComponents.length > 0" ref="goalDialog" dimension="template_goal" :existing="objt.theComponents[this.componentIndex].theGoals" v-on:dimension-modal-update="addComponentGoal"/> 
    <component-goal-association-modal v-if="objt != undefined && this.objt.theComponents.length > 0" ref="goalAssocDialog" :goals="goalNames" :goalAssociation="selectedAssociation"  v-on:component-goal-association-update="updateComponentGoalAssociation"/> 
    <connector-modal v-if="objt != undefined" ref="connectorDialog" :patternConnector="selectedConnector" :components="this.objt.theComponents"  v-on:connector-update="updateConnector"/> 
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
            <b-col md="12">
              <b-form-group label="Architectural Pattern" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theArchitecturalPatternInput">
                 <b-form-input id="theArchitecturalPatternInput" v-model="objt.theName" type="text" required />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Synopsis" label-class="font-weight-bold text-md-left" label-for="theSynopsisText">
                <b-form-textarea id="theSynopsisText" v-model="objt.theSynopsis" type="text" :rows=2 :max-rows=4 required />
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-container>
      <b-container fluid>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Components" active>
            <template slot="title">
              <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addComponent"/> Component 
            </template> 
              <b-container fluid v-if="objt.theComponents.length > 0">
                <b-row md="12">
                  <b-container fluid>
                  <b-card no-body>
                    <b-tabs card v-model="componentIndex">
                      <b-tab v-for="comp in this.objt.theComponents" :key="comp.theName" :title=comp.theName>
                        <template slot="title">
                          <font-awesome-icon icon="minus" :style="{color: 'red'}" @click="deleteComponent(comp.theName)"/>  {{comp.theName}}
                        </template> 
                        <b-tabs>
                          <b-tab title="Summary" active>
                            <b-card bg-variant="light">
                              <b-row>
                                <b-col md="12">
                                  <b-form-group label="Name" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theComponentNameInput">
                                    <b-form-input id="theComponentNameInput" v-model="objt.theComponents[componentIndex].theName" type="text" required />
                                  </b-form-group>
                                </b-col>
                              </b-row>
                              <b-row>
                                <b-col md="12">
                                  <b-form-group label="Description" label-class="font-weight-bold text-md-left" label-for="theComponentDescriptionText">
                                    <b-form-textarea id="theComponentDescriptionText" v-model="objt.theComponents[componentIndex].theDescription" type="text" :rows=2 :max-rows=4 required />
                                  </b-form-group>
                                </b-col>
                              </b-row>
                            </b-card>
                          </b-tab>
                          <b-tab title="Interfaces">
                            <b-card bg-variant="light">
                              <b-table striped small hover :items="objt.theComponents[componentIndex].theInterfaces" :fields=interfaceTableFields @row-clicked="viewInterface">
                                <!-- eslint-disable-next-line -->
                                <template v-slot:head(intactions)="data"> 
                                  <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addInterface"/> 
                                </template>
                                <template v-slot:cell(intactions)="row">
                                  <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteInterface(row.index)"/>
                                </template>
                              </b-table>
                            </b-card>
                          </b-tab>
                          <b-tab title="Structure">
                            <b-card bg-variant="light">
                              <b-table striped small hover :items="objt.theComponents[componentIndex].theStructure" :fields="structureTableFields" @row-clicked="viewComponentAssociation">
                                <!-- eslint-disable-next-line -->
                                <template v-slot:head(structureactions)="data">
                                  <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addComponentAssociation"/> 
                                </template>
                                <template v-slot:cell(structureactions)="row">
                                  <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteComponentAssociation(row.index)"/>
                                </template>
                              </b-table> 
                            </b-card>
                          </b-tab>
                          <b-tab title="Requirements">
                            <b-card bg-variant="light">
                              <b-table striped small hover :items="requirements" :fields="requirementTableFields">
                                <!-- eslint-disable-next-line -->
                                <template v-slot:head(requirementactions)="data">
                                  <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addRequirement"/> 
                                </template>
                                <template v-slot:cell(requirementactions)="row">
                                  <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteComponentRequirement(row.index)"/>
                                </template>
                              </b-table> 
                            </b-card>
                          </b-tab>
                          <b-tab title="Goals">
                            <b-card bg-variant="light">
                              <b-table striped small hover :items="goals" :fields="goalTableFields">
                                <!-- eslint-disable-next-line -->
                                <template v-slot:head(goalactions)="data">
                                  <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addGoal"/> 
                                </template>
                                <template v-slot:cell(goalactions)="row">
                                  <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteComponentGoal(row.index)"/>
                                </template>
                              </b-table> 
                            </b-card>
                          </b-tab>
                          <b-tab title="Goal associations">
                            <b-card bg-variant="light">
                              <b-table striped small hover :items="goalAssociations" :fields="goalAssociationTableFields" @row-clicked="viewComponentGoalAssociation">
                                <!-- eslint-disable-next-line -->
                                <template v-slot:head(goalassociationactions)="data">
                                  <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addComponentGoalAssociation"/> 
                                </template>
                                <template v-slot:cell(goalassociationactions)="row">
                                  <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteComponentGoalAssociation(row.index)"/>
                                </template>
                              </b-table> 
                            </b-card>
                          </b-tab>
                        </b-tabs>
                      </b-tab>
                    </b-tabs>
                  </b-card>
                  </b-container>
                </b-row>
              </b-container>
            </b-tab>
            <b-tab title="Connectors">
              <b-container fluid>
                <b-card bg-variant="light">
                  <b-table striped small hover :items="this.objt.theConnectors" :fields="connectorTableFields" @row-clicked="viewConnector">
                    <!-- eslint-disable-next-line -->
                    <template v-slot:head(connectoractions)="data">
                      <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addConnector"/> 
                    </template>
                    <template v-slot:cell(connectoractions)="row">
                      <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteConnector(row.index)"/>
                    </template>
                  </b-table> 
                </b-card>
              </b-container>
            </b-tab>
          </b-tabs>
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
import ComponentInterfaceModal from './ComponentInterfaceModal'
import ComponentAssociationModal from './ComponentAssociationModal'
import ComponentGoalAssociationModal from './ComponentGoalAssociationModal'
import ConnectorModal from './ConnectorModal'
import DimensionModal from './DimensionModal'

export default {
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
  computed : {
    goals() {
      return this.objt != undefined && this.objt.theComponents.length > 0 ? this.objt.theComponents[this.componentIndex].theGoals.map(g => ({name : g})) : [];
    },
    goalNames() {
      return this.objt != undefined && this.objt.theComponents.length > 0 ? this.objt.theComponents[this.componentIndex].theGoals : [];
    },
    requirements() {
      return this.objt != undefined && this.objt.theComponents.length > 0 ? this.objt.theComponents[this.componentIndex].theRequirements.map(r => ({name : r})) : [];
    },
    goalAssociations() {
      return this.objt != undefined && this.objt.theComponents.length > 0 ? this.objt.theComponents[this.componentIndex].theGoalAssociations : [];
    }
  },
  components : {
    ComponentInterfaceModal,
    ComponentAssociationModal,
    ComponentGoalAssociationModal,
    DimensionModal,
    ConnectorModal
  },
  data() {
    return {
      objt : this.object,
      commitLabel : this.label,
      componentIndex : 0,
      errors : [],
      selectedInterface : {
        update : false,
        componentinterface : {
          theName : '',
          theType : '',
          theAccessRight : '',
          thePrivilege : ''
        }
      },
      selectedAssociation : {
        update : false,
        association : {
          theHeadAsset : '', 
          theHeadAdornment : 'Association', 
          theHeadNav : 0, 
          theHeadNry : '*', 
          theHeadRole: '', 
          theTailRole : '', 
          theTailNry : '*', 
          theTailNav : 0, 
          theTailAdornment : 'Association',
          theTailAsset : ''
         }
      },
      selectedGoalAssociation : {
        update : false,
        association : {
          theGoalName : '',
          theRefType : 'and',
          theSubGoalName : '',
          theRationale : ''
        }
      },
      selectedConnector : {
        update : false,
        connector : {
          theConnectorName : '',
          theFromComponent : '',
          theFromRole : '',
          theFromInterface : '',
          theToComponent : '',
          theToRole : '',
          theAssetName : '',
          theProtocol : '',
          theAccessRight : ''
        }
      },
      interfaceTableFields : [
        {key: 'intactions', label : ''},
        {key: 'theName', label : 'Interface', sortable: true},
        {key: 'theType', label : 'Type', sortable: true},
        {key: 'theAccessRight', label : 'Access Right', sortable: true},
        {key: 'thePrivilege', label : 'Privilege', sortable: true} 
      ],
      structureTableFields : [
        {key: 'structureactions', label: ''},
        {key: 'theHeadAsset', label: 'Head Asset'},
        {key: 'theHeadAdornment', label: 'Type'},
        {key: 'theHeadNav', label: 'Nav'},
        {key: 'theHeadNry',label: 'Nry'},
        {key: 'theHeadRole', label: 'Role'},
        {key: 'theTailRole', label: 'Tail Role'},
        {key: 'theTailNry', label: 'Nry'},
        {key: 'theTailNav', label: 'Nav'},
        {key: 'theTailAdornment', label: 'Type'},
        {key: 'theTailAsset', label: 'Tail Asset'}
      ],
      requirementTableFields : [
        {key: 'requirementactions', label : ''},
        {key: 'name',  label : 'Requirement', sortable: true}
      ],
      goalTableFields : [
        {key: 'goalactions', label : ''},
        {key: 'name', label : 'Goal', sortable: true}
      ],
      goalAssociationTableFields : [
        {key: 'goalassociationactions', label : ''},
        {key: 'theGoalName', label : 'Goal', sortable: true},
        {key: 'theRefType', label: 'Ref Type', sortable: true},
        {key: 'theSubGoalName', label: 'Sub goal', sortable: true},
        {key: 'theRationale', label: 'Rationale', sortable: true}
      ],
      connectorTableFields : [
        {key: 'connectoractions', label : ''},
        {key: 'theConnectorName', label: 'Name', sortable: true},
        {key: 'theFromComponent', label: 'From', sortable: true},
        {key: 'theFromRole', label: 'Role', sortable: true},
        {key: 'theFromInterface', label: 'Interface', sortable: true},
        {key: 'theToComponent', label: 'To', sortable: true},
        {key: 'theToRole', label: 'Role', sortable: true},
        {key: 'theToInterface', label: 'Interface', sortable: true},
        {key: 'theAssetName', label: 'Asset', sortable: true},
        {key: 'theProtocol', label: 'Protocol', sortable: true},
        {key: 'theAccessRight', label: 'Access Right', sortable: true}
      ]
    }
  }, 
  methods: {
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0 || this.objt.theName.trim().length == 0) {
        this.errors.push('Name is required');
      }
      const resChars = /[<>‘'`"\\:%/_*?#£$&]/ ;
      const res = this.objt.theName.match(resChars);
      if (res != null) {
        this.errors.push('Character ' + res['index'] + ' in ' + this.objt.theName + ' is a reserved character.');
      }
      if (this.objt.theSynopsis.length == 0) {
        this.errors.push('Synopsis is required');
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
        this.$emit('object-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'objectsview', params: {dimension: 'architecturalpattern'}});
    },
    deleteComponent(compName) {
      this.objt.theComponents = this.objt.theComponents.filter(c => (c.theName != compName));
    },
    addComponent(evt) {
      evt.preventDefault();
      this.objt.theComponents.push({
        theName : 'New component',
        theDescription : '',
        theInterfaces : [],
        theStructure : [],
        theRequirements : [],
        theGoals : [],
        theGoalAssociations : []
      });
    },
    addInterface() {
      this.selectedInterface['componentinterface'] = {theName : '', theType : '', theAccessRight : '', thePrivilege: ''};
      this.selectedInterface['update'] = false;
      this.$refs.componentInterfaceDialog.show();  
    },
    deleteInterface(index) {
      this.objt.theComponents[this.componentIndex].theInterfaces.splice(index,1);
    },
    viewInterface(data,index) {
      this.selectedInterface['index'] = index
      this.selectedInterface['componentinterface'] = JSON.parse(JSON.stringify(data));
      this.selectedInterface['update'] = true;
      this.$refs.componentInterfaceDialog.show();  
    },
    updateComponentInterface : function(updIf) {
      if (updIf.update) {
        this.$set(this.objt.theComponents[this.componentIndex].theInterfaces,updIf.index,updIf.interface);
      }
      else {
        this.objt.theComponents[this.componentIndex].theInterfaces.push(updIf.interface);
      }
    },
    addComponentAssociation() {
      this.selectedAssociation['association'] = {theHeadAsset: '', theHeadNav : 0, theHeadAdornment : 'Association', theHeadNry : '*', theHeadRole: '', theTailRole : '', theTailNry : '*', theTailNav : 0, theTailAdornment : 'Association', theTailAsset : ''};
      this.selectedAssociation['update'] = false;
      this.$refs.componentAssociationDialog.show();  
    },
    deleteComponentAssociation(index) {
      this.objt.theComponents[this.componentIndex].theStructure.splice(index,1);
    },
    updateComponentAssociation : function(updAssoc) {
      if (updAssoc.update) {
        this.$set(this.objt.theComponents[this.componentIndex].theStructure,updAssoc.index,updAssoc.association);
      }
      else {
        this.objt.theComponents[this.componentIndex].theStructure.push(updAssoc.association);
      }
    },
    viewComponentAssociation(data,index) {
      this.selectedAssociation['index'] = index
      this.selectedAssociation['association'] = JSON.parse(JSON.stringify(data));
      this.selectedAssociation['update'] = true;
      this.$refs.componentAssociationDialog.show();  
    },
    addRequirement() {
      this.$refs.reqDialog.show();  
    },
    addComponentRequirement(data) {
      this.objt.theComponents[this.componentIndex].theRequirements.push(data);
    },
    deleteComponentRequirement(index) {
      this.objt.theComponents[this.componentIndex].theRequirements.splice(index,1);
    },
    addGoal() {
      this.$refs.goalDialog.show();  
    },
    addComponentGoal(data) {
      this.objt.theComponents[this.componentIndex].theGoals.push(data);
    },
    deleteComponentGoal(index) {
      this.objt.theComponents[this.componentIndex].theGoals.splice(index,1);
    },
    addComponentGoalAssociation() {
      this.selectedAssociation['association'] = {theGoalName: '', theRefType : 'and', theSubGoalName : '', theRationale : ''};
      this.selectedAssociation['update'] = false;
      this.$refs.goalAssocDialog.show();  
    },
    deleteComponentGoalAssociation(index) {
      this.objt.theComponents[this.componentIndex].theGoalAssociations.splice(index,1);
    },
    updateComponentGoalAssociation : function(updAssoc) {
      if (updAssoc.update) {
        this.$set(this.objt.theComponents[this.componentIndex].theGoalAssociations,updAssoc.index,updAssoc.association);
      }
      else {
        this.objt.theComponents[this.componentIndex].theGoalAssociations.push(updAssoc.association);
      }
    },
    viewComponentGoalAssociation(data,index) {
      this.selectedAssociation['index'] = index
      this.selectedAssociation['association'] = JSON.parse(JSON.stringify(data));
      this.selectedAssociation['update'] = true;
      this.$refs.goalAssocDialog.show();  
    },
    addConnector() {
      this.selectedConnector['connector'] = {
        theConnectorName : '',
        theFromComponent : '',
        theFromRole : '',
        theFromInterface : '',
        theToComponent : '',
        theToRole : '',
        theAssetName : '',
        theProtocol : '',
        theAccessRight : ''
      };
      this.selectedConnector['update'] = false;
      this.$refs.connectorDialog.show();  
    },
    deleteConnector(index) {
      this.objt.theConnectors.splice(index,1);
    },
    updateConnector : function(updConn) {
      if (updConn.update) {
        this.$set(this.objt.theConnectors,updConn.index,updConn.connector);
      }
      else {
        this.objt.theConnectors.push(updConn.connector);
      }
    },
    viewConnector(data,index) {
      this.selectedConnector['index'] = index
      this.selectedConnector['connector'] = JSON.parse(JSON.stringify(data));
      this.selectedConnector['update'] = true;
      this.$refs.connectorDialog.show();  
    }
  }
}
</script>