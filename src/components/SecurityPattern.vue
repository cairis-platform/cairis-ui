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

  <div class="securitypattern">
    <component-association-modal ref="assocDialog" :componentAssociation="selectedAssociation" :isArchitecturalPattern='false' v-on:association-update="updateStructure"/> 
    <dimension-modal ref="reqDialog" label="Template requirement" dimension="template_requirement" :existing="requirementNames" v-on:dimension-modal-update="addPatternRequirement"/> 
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <b-form>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Summary" active>
            <b-card bg-variant="light">
              <b-row>
                <b-col md="12">
                  <b-form-group label="Name" label-class="font-weight-bold text-md-left" label-for="theNameInput">
                    <b-form-input id="theNameInput" v-model="objt.theName" type="text" required />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group label="Context" label-class="font-weight-bold text-md-left" label-for="theContextText">
                    <b-form-textarea id="theContextText" v-model="objt.theContext" type="text" :rows=4 :max-rows=4 required />
                  </b-form-group>
                </b-col>
                <b-col md="12">
                  <b-form-group label="Problem" label-class="font-weight-bold text-md-left" label-for="theProblemText">
                    <b-form-textarea id="theProblemText" v-model="objt.theProblem" type="text" :rows=4 :max-rows=4 required />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group label="Solution" label-class="font-weight-bold text-md-left" label-for="theSolutionText">
                    <b-form-textarea id="theSolutionText" v-model="objt.theSolution" type="text" :rows=4 :max-rows=4 required />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card> 
          </b-tab>
          <b-tab title="Structure">
            <b-card bg-variant="light" no-body>
              <b-container fluid>
                <b-row>
                  <b-col md="12">
                    <b-table striped bordered small hover :items="objt.theConcernAssociations" :fields=structureTableFields @row-clicked="viewStructure">
                      <!-- eslint-disable-next-line -->
                      <template v-slot:head(structureactions)="data"> 
                        <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addStructure"/> 
                      </template>
                      <template v-slot:cell(structureactions)="row">
                        <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteStructure(row.index)"/>
                      </template>
                    </b-table>
                  </b-col>
                </b-row>
              </b-container> 
            </b-card>
          </b-tab>
          <b-tab title="Requirements">
            <b-card bg-variant="light" no-body>
              <b-container fluid>
                <b-row>
                  <b-col md="12">
                    <b-table striped bordered small hover :items="objt.theRequirements" :fields=requirementTableFields >
                      <!-- eslint-disable-next-line -->
                      <template v-slot:head(requirementactions)="data"> 
                        <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addRequirement"/> 
                      </template>
                      <template v-slot:cell(requirementactions)="row">
                        <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteRequirement(row.index)"/>
                      </template>
                    </b-table>
                  </b-col>
                </b-row>
              </b-container>
            </b-card>
          </b-tab>
        </b-tabs>
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

import axios from 'axios';
import EventBus from '../utils/event-bus';
import ComponentAssociationModal from './ComponentAssociationModal';
import DimensionModal from './DimensionModal';

export default {
  props : {
    object : Object,
    label : String
  },
  watch : {
    object: 'setObject'
  },
  components : {
    ComponentAssociationModal,
    DimensionModal
  },
  computed : {
    requirementNames() {
      return this.objt != undefined && this.objt.theRequirements.length > 0 ? this.objt.theRequirements.map(r => r.theName) : [];
    }
  },
  data() {
    return {
      objt : this.object,
      commitLabel : this.label,
      envPropIndex : 0,
      errors : [],
      requirementTableFields : [
        {key: 'requirementactions', label : ''},
        {key: 'theName', label : 'Name'}
      ],
      structureTableFields : [
        {key: 'structureactions', label: ''},
        {key: 'theHeadAsset', label: 'Head Asset'},
        {key: 'theHeadAdornment', label: 'Type'},
        {key: 'theHeadNry',label: 'Nry'},
        {key: 'theHeadRole', label: 'Role'},
        {key: 'theTailRole', label: 'Tail Role'},
        {key: 'theTailNry', label: 'Nry'},
        {key: 'theTailAdornment', label: 'Type'},
        {key: 'theTailAsset', label: 'Tail Asset'}
      ],
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
      }
    }
  }, 
  methods: {
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0) {
        this.errors.push('Name is required');
      }
      const resChars = /[<>‘'`"\\:%/_*?#£$&]/ ;
      const res = this.objt.theName.match(resChars);
      if (res != null) {
        this.errors.push('Character ' + res['index'] + ' in ' + this.objt.theName + ' is a reserved character.');
      }
      if (this.objt.theContext.length == 0) {
        this.errors.push('Context is required');
      }
      if (this.objt.theProblem.length == 0) {
        this.errors.push('Problem is required');
      }
      if (this.objt.theConcernAssociations.length == 0) {
        this.errors.push('Structure is required');
      }
      if (this.objt.theRequirements.length == 0) {
        this.errors.push('One ore more requirements are required');
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
      this.$router.push({ name: 'objectsview', params: {dimension: 'securitypattern'}});
    },
    deleteRequirement(index) {
      this.objt.theRequirements.splice(index,1);
    },
    addRequirement() {
      this.$refs.reqDialog.show();  
    },
    addPatternRequirement(reqName) {
      axios.get('/api/template_requirements/name/' + reqName,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        let req = response.data;
        req['theAsset'] = req['theAssetName'];
        delete req['theAssetName'];
        this.objt.theRequirements.push(req);
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });
    },
    addStructure() {
      this.selectedAssociation['association'] = {theHeadAsset: '', theHeadNav : 0, theHeadAdornment : 'Association', theHeadNry : '*', theHeadRole: '', theTailRole : '', theTailNry : '*', theTailNav : 0, theTailAdornment : 'Association', theTailAsset : ''};
      this.selectedAssociation['update'] = false;
      this.$refs.assocDialog.show();  
    },
    deleteStructure(index) {
      this.objt.theConcernAssociations.splice(index,1);
    },
    updateStructure : function(updAssoc) {
      if (updAssoc.update) {
        this.$set(this.objt.theConcernAssociations,updAssoc.index,updAssoc.association);
      }
      else {
        this.objt.theConcernAssociations.push(updAssoc.association);
      }
    },
    viewStructure(data,index) {
      this.selectedAssociation['index'] = index
      this.selectedAssociation['association'] = JSON.parse(JSON.stringify(data));
      this.selectedAssociation['update'] = true;
      this.$refs.assocDialog.show();  
    },
  }
}
</script>