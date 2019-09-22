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

  <div class="objects">
    <b-breadcrumb :items="breadCrumbItems" />
    <dimension-modal v-if="this.dimension == 'architectural_pattern'" ref="environmentDialog" dimension="environment" v-on:dimension-modal-update="viewWeaknessAnalysis"/> 
    <dimension-modal v-if="this.dimension == 'security_pattern'" ref="spEnvDialog" dimension="environment" v-on:dimension-modal-update="applySecurityPattern"/> 
    <dimension-modal v-if="this.dimension == 'countermeasure'" ref="spRmDialog" :dimensionUrl="spRmUrl" label="Situated security pattern" v-on:dimension-modal-update="removeSecurityPattern"/> 
    <object-dependency-modal ref="depDialog" :dependencies="objectDependencies" v-on:object-dependency-ok="deleteDependencies" />
    <add-trace-modal v-if="selectedTraceabilityObject != ''" ref="traceDialog" :dimension="dimension" :tobject="selectedTraceabilityObject" :isFrom="isPostTraceability" />
    <weakness-analysis-modal ref="waDialog" :architecturalPattern="itemName" :environment="thePatternEnvironment" v-on:weakness-analysis-confirm="applyArchitecturalPattern"/>
    <directory-modal ref="dirDialog" v-if="dimension == 'threat' || dimension == 'vulnerability'" :dimension="dimension" v-on:directory-modal-update="addDirectoryEntry"/> 
    <situate-countermeasure-modal ref="scDialog" :countermeasure="itemName" v-on:situate-countermeasure-update="applySituateCountermeasure"/>
    <b-card no-body>
      <b-container v-if="dimension == 'requirement'" fluid>
        <b-row class="justify-content-md-left">
          <b-col md="2">
            <b-form-radio-group buttons size="md" id="theDomainRadio" v-model="$store.state.domain" :options="domainOptions" class="sm-3" required name="theDomainRadio"/>
          </b-col>
          <b-col md="5">
            <dimension-select id="domainFilter" ref="domainFilter" :dimension="$store.state.domain" v-on:dimension-select-change="domainSelected" v-on:dimension-items-updated="itemsUpdated" />
          </b-col> 
        </b-row>
      </b-container>
      <b-container v-if="environmentSpecificValueType" fluid>
        <b-row>
          <b-col>
            <b-form-group label="Environment" label-class="font-weight-bold" label-for="reqEnvironment" >
              <dimension-select ref="envFilter" id="vtEnvironment" dimension="environment" :initial="this.theEnvironnmentName" v-on:dimension-select-change="vtEnvironmentSelected" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
      <b-table b-table striped small hover :fields="fieldList" :items="items" @row-clicked="objectClicked">
        <!-- eslint-disable-next-line -->
        <template v-slot:head(objectsactions)= "data">
          <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addObject"/> 
        </template>
        <template v-slot:cell(objectsactions)="row">
          <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteObject(row)"/>
        </template>
        <template v-slot:cell(pretaction)="row">
          <font-awesome-icon icon="arrow-left" :style="{color: 'green'}" @click.stop="addPreTraceabilityLink(row.index)"/>
        </template>
        <template v-slot:cell(generategoalaction)="row">
          <font-awesome-icon icon="angle-down" :style="{color: 'green'}" @click.stop="generateGoal(row.index)"/>
        </template>
        <template v-slot:cell(postaction)="row">
          <font-awesome-icon icon="arrow-right" :style="{color: 'green'}" @click.stop="addPostTraceabilityLink(row.index)"/>
        </template>
        <template v-slot:cell(sitapaction)="row">
          <font-awesome-icon icon="angle-down" :style="{color: 'green'}" @click.stop="situateArchitecturalPattern(row.index)"/>
        </template>
        <template v-slot:cell(sitspaction)="row">
          <font-awesome-icon icon="angle-down" :style="{color: 'green'}" @click.stop="situateSecurityPattern(row.index)"/>
        </template>
        <template v-slot:cell(rmspaction)="row">
          <font-awesome-icon icon="minus" :style="{color: 'green'}" @click.stop="desituateSecurityPattern(row.index)"/>
        </template>
        <template v-slot:cell(sitcmaction)="row">
          <font-awesome-icon icon="angle-down" :style="{color: 'green'}" @click.stop="situateCountermeasure(row.index)"/>
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:head(introduceaction)="data">
          <font-awesome-icon icon="plus" :style="{color: 'blue'}" @click.stop="introduceDirectoryEntry"/> 
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>

import axios from 'axios';
import EventBus from '../utils/event-bus';
import DimensionSelect from '@/components/DimensionSelect.vue';
import DimensionModal from '@/components/DimensionModal.vue';
import DirectoryModal from '@/components/DirectoryModal.vue';
import WeaknessAnalysisModal from '@/components/WeaknessAnalysisModal.vue';
import SituateCountermeasureModal from '@/components/SituateCountermeasureModal.vue';
import ObjectDependencyModal from '@/components/ObjectDependencyModal.vue';
import AddTraceModal from '@/components/AddTraceModal.vue';
import objectViewParametersFactory from '../utils/objectViewParametersFactory';

export default {
  props : {
    breadCrumbItems : Array,
    fieldList : Array,
    getUrl: String,
    delUrl: String,
    dimName : String
  },
  components : {
    DimensionSelect,
    ObjectDependencyModal,
    AddTraceModal,
    DimensionModal,
    DirectoryModal,
    SituateCountermeasureModal,
    WeaknessAnalysisModal
  },
  data() {
    return {
      dimension : this.dimName,
      items: [],
      theGetUrl : this.getUrl,
      objectDependencies : [],
      selectedObject : '',
      selectedDomain: 'asset',
      selectedIndex : -1,
      selectedTraceabilityObject : '',
      isPostTraceability : 1,
      theEnvironmentName : 'all',
      thePatternEnvironment: '',
      theObjectViewParameters : undefined,
      domainOptions : [
        {text : 'Environment', value : 'environment'},
        {text : 'Asset', value : 'asset'}
      ]
    }
  }, 
  watch : {
    getUrl : 'reloadObjects'
  },
  computed : {
    environmentSpecificValueType() {
      return this.dimension == 'asset_value' ? true : false;
    },
    itemName() {
      return this.selectedIndex != -1 && this.items[this.selectedIndex] != undefined ? this.items[this.selectedIndex].theName : '';
    },
    spRmUrl() {
      return this.selectedIndex != -1 ? '/api/countermeasures/name/' + this.items[this.selectedIndex].theName + '/patterns': '';
    }
  },
  methods : {
    objectClicked(row) {
      if (this.dimName == 'asset_value' || this.dimName == 'asset_type' || this.dimName == 'access_right' || this.dimName == 'protocol' || this.dimName == 'privilege' || this.dimName == 'surface_type' || this.dimName == 'vulnerability_type' || this.dimName == 'severity' || this.dimName == 'capability' || this.dimName == 'motivation' || this.dimName == 'threat_type' || this.dimName == 'likelihood' || this.dimName == 'threat_value') {
        this.$router.push({ name: 'valuetype', params : {objectName: row.theName, dimName : this.dimName, envName : this.theEnvironmentName}});
      }
      else {
        switch(this.dimension) {
          case 'requirement':
            this.$router.push({ name: this.dimName, params : {objectName: row.theName, domain:  {domain: this.$store.state.domain, domainName: this.$store.state.domainName}}});
            break;
          case 'kaosassociation':
            this.$router.push({ name: this.dimName, params : {envName: row.theEnvironmentName,goalName : row.theGoal, subGoalName: row.theSubGoal}});
            break;
          case 'assetassociation':
            this.$router.push({ name: this.dimName, params : {envName: row.theEnvironmentName,headName : row.theHeadAsset, tailName: row.theTailAsset}});
            break;
          case 'dependency':
            this.$router.push({ name: this.dimName, params : {envName: row.theEnvironmentName,depName : row.theDepender, deeName: row.theDependee, dpyName : row.theDependency}});
            break;
          case 'dataflow':
            this.$router.push({ name: this.dimName, params : {objectName: row.theName, envName: row.theEnvironmentName}});
            break;
          case 'asset':
          case 'attacker':
          case 'countermeasure':
          case 'domainproperty':
          case 'environment':
          case 'goal':
          case 'locations':
          case 'obstacle':
          case 'persona':
          case 'personacharacteristic':
          case 'response':
          case 'risk':
          case 'role':
          case 'task':
          case 'taskcharacteristic':
          case 'threat':
          case 'usecase':
          case 'vulnerability':
            this.$router.push({ name: 'objectview', params: {dimension: this.dimension, objectName: row.theName, objectsLabel: this.theObjectViewParameters.objectsLabel, componentFile: this.theObjectViewParameters.componentFile, updatePath: this.theObjectViewParameters.updatePath, createPath: this.theObjectViewParameters.createPath}});
            break;
          case 'architectural_pattern':
          case 'concept_reference':
          case 'document_reference':
          case 'external_document':
          case 'security_pattern':
          case 'template_asset':
          case 'template_goal':
          case 'template_requirement':
          case 'trust_boundary':
            this.$router.push({ name: 'objectview', params: {dimension: this.dimName, objectName: row.theName, objectsLabel: this.theObjectViewParameters.objectsLabel, componentFile: this.theObjectViewParameters.componentFile, updatePath: this.theObjectViewParameters.updatePath, createPath: this.theObjectViewParameters.createPath}});
            break;
          default: 
            this.$router.push({ name: this.dimName, params : {objectName: row.theName}});
            break;
        }
      }
    },
    addObject() {
      if (this.dimName == 'asset_value' || this.dimName == 'asset_type' || this.dimName == 'access_right' || this.dimName == 'protocol' || this.dimName == 'privilege' || this.dimName == 'surface_type' || this.dimName == 'vulnerability_type' || this.dimName == 'severity' || this.dimName == 'capability' || this.dimName == 'motivation' || this.dimName == 'threat_type' || this.dimName == 'likelihood' || this.dimName == 'threat_value') {
        this.$router.push({ name: 'valuetype', params : {objectName: 'New value type', dimName : this.dimName, envName : this.theEnvironmentName}});
      }
      else {
        switch(this.dimension) {
          case 'kaosassociation':
            this.$router.push({ name: this.dimName, params : {envName: 'To set', goalName : 'To set', subGoalName : 'To set'}});
            break;
          case 'assetassociation':
            this.$router.push({ name: this.dimName, params : {envName: 'To set', headName : 'To set', tailName : 'To set'}});
            break;
          case 'dependency':
            this.$router.push({ name: this.dimName, params : {envName: 'To set', depName : 'To set', deeName : 'To set', dpyName : 'To set'}});
            break;
          case 'dataflow':
            this.$router.push({ name: this.dimName, params : {objectName: 'New ' + this.dimName, envName : 'To set'}});
            break;
          case 'asset':
          case 'attacker':
          case 'countermeasure':
          case 'domainproperty':
          case 'environment':
          case 'goal':
          case 'locations':
          case 'obstacle':
          case 'persona':
          case 'personacharacteristic':
          case 'response':
          case 'risk':
          case 'role':
          case 'task':
          case 'taskcharacteristic':
          case 'templateasset':
          case 'threat':
          case 'usecase':
          case 'vulnerability':
            this.$router.push({ name: 'objectview', params: {dimension: this.dimension, objectName: 'New ' + this.dimName, objectsLabel: this.theObjectViewParameters.objectsLabel, componentFile: this.theObjectViewParameters.componentFile, updatePath: this.theObjectViewParameters.updatePath, createPath: this.theObjectViewParameters.createPath}});
            break;
          case 'architectural_pattern':
          case 'concept_reference':
          case 'document_reference':
          case 'external_document':
          case 'security_pattern':
          case 'template_asset':
          case 'template_goal':
          case 'template_requirement':
          case 'trust_boundary':
            this.$router.push({ name: 'objectview', params: {dimension: this.dimName, objectName: 'New ' + this.dimName, objectsLabel: this.theObjectViewParameters.objectsLabel, componentFile: this.theObjectViewParameters.componentFile, updatePath: this.theObjectViewParameters.updatePath, createPath: this.theObjectViewParameters.createPath}});
            break;
          default:
            this.$router.push({ name: this.dimName, params : {objectName: 'New ' + this.dimName, domain : {type : 'asset', name : ''}}});
            break;
        }
      }
    },
    deleteObject(row) {
      if (this.dimName == 'kaosassociation') {
        this.selectedObject = {'envName' : row.item.theEnvironmentName,'goal' : row.item.theGoal,'subGoal' : row.item.theSubGoal};
        this.selectedIndex = this.items.findIndex(o => o.theEnvironmentName == row.item.theEnvironmentName && o.theGoal == row.item.theGoal && o.theSubGoal == row.item.theSubGoal);
      }
      else if (this.dimName == 'assetassociation') {
        this.selectedObject = {'envName' : row.item.theEnvironmentName,'headName' : row.item.theHeadAsset,'tailName' : row.item.theTailAsset};
        this.selectedIndex = this.items.findIndex(o => o.theEnvironmentName == row.item.theEnvironmentName && o.theHeadAsset == row.item.theHeadAsset && o.theTailAsset == row.item.theTailAsset);
      }
      else if (this.dimName == 'dependency') {
        this.selectedObject = {'envName' : row.item.theEnvironmentName,'theDepender' : row.item.theDepender,'theDependee' : row.item.theDependee, 'theDependency' : row.item.theDependency };
        this.selectedIndex = this.items.findIndex(o => o.theEnvironmentName == row.item.theEnvironmentName && o.theDepender == row.item.theDepender && o.theDependee == row.item.theDependee && o.theDependency == row.item.theDependency);
      }
      else if (this.dimName == 'dataflow') {
        this.selectedObject = {'envName' : row.item.theEnvironmentName,'objectName' : row.item.theName};
        this.selectedIndex = this.items.findIndex(o => o.theEnvironmentName == row.item.theEnvironmentName && o.theName == row.item.theName);
      }
      else {
        this.selectedObject = row.item.theName;
        this.selectedIndex = this.items.findIndex(o => o.theName == row.item.theName);
      }
      const that = this;

      if (this.dimension != 'kaosassociation' && this.dimension != 'assetassociation' && this.dimension != 'dependency' && this.dimension != 'dataflow' && this.dimension != 'valuetype') {
        let objectDimension = this.dimension;
        if (objectDimension == 'personacharacteristic') {
          objectDimension = 'persona_characteristic';
        }
        else if (objectDimension == 'taskcharacteristic') {
          objectDimension = 'task_characteristic';
        }
        else if (objectDimension == 'architectural_pattern') {
          objectDimension = 'component_view';
        }
        const odUrl = '/api/object_dependency/dimension/' + objectDimension + '/object/' + this.selectedObject;
        axios.get(odUrl,{
          baseURL : this.$store.state.url,
          params : {'session_id' : this.$store.state.session}
         })
        .then(response => {
          if (response.data.theDependencies.length > 0) {
            that.objectDependencies = response.data.theDependencies;
            that.$refs.depDialog.show();
          }
          else {
            that.commitDelete();
          }
         })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        });
      }
      else {
        this.commitDelete();
      }
    },
    commitDelete() {
      let deleteUrl = this.delUrl;
      switch (this.dimension) {
        case 'kaosassociation':
          deleteUrl += this.selectedObject.envName + '/goal/' + this.selectedObject.goal + '/subgoal/' + this.selectedObject.subGoal;
          break;
        case 'assetassociation':
          deleteUrl += this.selectedObject.envName + '/head/' + this.selectedObject.headName + '/tail/' + this.selectedObject.tailName;
          break;
        case 'dependency':
          deleteUrl += this.selectedObject.envName + '/depender/' + this.selectedObject.theDepender + '/dependee/' + this.selectedObject.theDependee + '/dependency/' + this.selectedObject.theDependency;
          break;
        case 'dataflow':
          deleteUrl += this.selectedObject.objectName + '/environment/' + this.selectedObject.envName;
          break;
        case 'asset_value':
        case 'asset_type':
        case 'access_right':
        case 'protocol':
        case 'privilege':
        case 'surface_type':
        case 'vulnerability_type':
        case 'severity':
        case 'capability':
        case 'motivation':
        case 'threat_type':
        case 'likelihood':
        case 'threat_value':
          deleteUrl += this.theEnvironmentName + '/name/' + this.selectedObject;
          break;
        default: 
          deleteUrl += JSON.parse(JSON.stringify(this.selectedObject));
          break;
      }
      axios.delete(deleteUrl,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
       })
      .then(response => {
        this.items.splice(this.selectedIndex,1);
        EventBus.$emit('operation-success',response.data.message)
       })
      .catch((error) => {
        EventBus.$emit('operation-failure',error.response.data.message)
      });
    },
    deleteDependencies() {
      const odUrl = '/api/object_dependency/dimension/' + this.dimension + '/object/' + this.selectedObject;
      const that = this;
      axios.delete(odUrl,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
       })
      .then( () => {
        that.commitDelete();
       })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    },
    reloadObjects() {
      this.theGetUrl = this.getUrl;
      this.dimension = this.dimName;
      this.theObjectViewParameters = objectViewParametersFactory[this.dimension];
      this.loadObjects();
      this.updateDimension();
    },
    loadObjects() {
      if (this.theGetUrl == '' && this.dimension == 'requirement' && this.$store.state.domainName != '') {
        this.theGetUrl = '/api/requirements/' + this.$store.state.domain + '/' + this.$store.state.domainName;
      } 
      if (this.theGetUrl != '') {
        axios.get(this.theGetUrl,{
          baseURL : this.$store.state.url,
          params : {'session_id' : this.$store.state.session}
         })
        .then(response => {
          if (this.dimension == 'requirement') {
            this.$refs.domainFilter.selected = this.$store.state.domainName;
          }
          this.items = response.data;
        })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        });
      }
    },
    domainSelected(domName) {
      if (domName != null) {
        this.$store.state.domainName = domName;
        this.$refs.domainFilter.selected = domName;
        this.theGetUrl = '/api/requirements/' + this.$store.state.domain + '/' + domName;
        this.loadObjects();
      }
    },
    itemsUpdated(domName) {
      if (this.dimension == 'requirement') {
        this.$store.state.domainName = domName;
        this.theGetUrl = '/api/requirements/' + this.$store.state.domain + '/' + this.$store.state.domainName;
        this.loadObjects();
      }
    },
    vtEnvironmentSelected(envName) {
      if (envName != null) {
        this.theEnvironmentName = envName;
        this.theGetUrl = '/api/value_types/type/' + this.dimension + '/environment/' + this.theEnvironmentName;
        this.loadObjects();
      }
    },
    generateGoal(index) {
      const ggUrl = this.$store.state.url + '/api/responses/name/' + this.items[index].theName + '/generate_goal';
      axios.post(ggUrl,{
        session_id : this.$store.state.session,
        object : this.objt
      })
      .then(response => {
        EventBus.$emit('operation-success',response.data.message);
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error.response.data.message);
      });
    },
    situateArchitecturalPattern(index) {
      this.selectedIndex = index;
      this.$refs.environmentDialog.show();
    },
    situateSecurityPattern(index) {
      this.selectedIndex = index;
      this.$refs.spEnvDialog.show();
    },
    desituateSecurityPattern(index) {
      this.selectedIndex = index;
      this.$refs.spRmDialog.show();
    },
    viewWeaknessAnalysis(envName) {
      this.thePatternEnvironment = envName;
      this.$refs.waDialog.show();
    },
    applyArchitecturalPattern() {
      const apUrl = this.$store.state.url + '/api/architectural_patterns/name/' + this.itemName + '/environment/' + this.thePatternEnvironment + '/situate';
      axios.post(apUrl,{
        session_id : this.$store.state.session
      })
      .then(response => {
        EventBus.$emit('operation-success',response.data.message)
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });
    },
    applySecurityPattern(envName) {
      const spUrl = this.$store.state.url + '/api/security_patterns/name/' + this.itemName + '/environment/' + envName + '/situate';
      axios.post(spUrl,{
        session_id : this.$store.state.session
      })
      .then(response => {
        EventBus.$emit('operation-success',response.data.message)
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });
    },
    removeSecurityPattern(spName) {
      const rmUrl =  '/api/countermeasures/name/' + this.itemName + '/security_pattern/' + spName + '/remove_situated';
      axios.delete(rmUrl,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        EventBus.$emit('operation-success',response.data.message)
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });
    },
    addPreTraceabilityLink(index) {
      this.selectedTraceabilityObject = this.items[index].theName;
      this.isPostTraceability = 0;
      this.$refs.traceDialog.show();
    },
    addPostTraceabilityLink(index) {
      this.selectedTraceabilityObject = this.items[index].theName;
      this.isPostTraceability = 1;
      this.$refs.traceDialog.show();
    },
    updateDimension() {
      if (this.dimName == 'architecturalpattern') {
        this.dimension = 'architectural_pattern';
      }
      else if (this.dimName == 'externaldocument') {
        this.dimension = 'external_document';
      }
      else if (this.dimName == 'documentreference') {
        this.dimension = 'document_reference';
      }
      else if (this.dimName == 'conceptreference') {
        this.dimension = 'concept_reference';
      }
      else if (this.dimName == 'trustboundary') {
        this.dimension = 'trust_boundary';
      }
      else if (this.dimName == 'securitypattern') {
        this.dimension = 'security_pattern';
      }
      else if (this.dimName == 'templateasset') {
        this.dimension = 'template_asset';
      }
      else if (this.dimName == 'templategoal') {
        this.dimension = 'template_goal';
      }
      else if (this.dimName == 'templaterequirement') {
        this.dimension = 'template_requirement';
      }
    },
    introduceDirectoryEntry() {
      this.$refs.dirDialog.show();
    },
    addDirectoryEntry(dirEntry) {
      const newObjt = (this.dimension == 'threat' ? {theThreatName : dirEntry.theLabel,theType : dirEntry.theType, theMethod: dirEntry.theName + ': ' + dirEntry.theDescription + '\nReference: ' + dirEntry.theReference ,theTags : [],theEnvironmentProperties: []} : {theName : dirEntry.theLabel, theType : dirEntry.theType, theDescription : dirEntry.theName + ': ' + dirEntry.theDescription + '\nReference: ' + dirEntry.theReference,theTags : [], theEnvironmentProperties : []});
      this.$router.push({ name: 'objectview', params: {dimension: this.dimension, objectName: dirEntry.theLabel, objectsLabel: this.theObjectViewParameters.objectsLabel, componentFile: this.theObjectViewParameters.componentFile, updatePath: this.theObjectViewParameters.updatePath, createPath: this.theObjectViewParameters.createPath, directoryEntry: newObjt}});
    },
    situateCountermeasure(index) {
      this.selectedIndex = index;
      this.$refs.scDialog.show();
    },
    applySituateCountermeasure(objt) {
      let postUrl = this.$store.state.url + '/api/countermeasures/name/' + this.itemName;

      if (objt.situateType == 'asset') {
        postUrl += '/generate_asset';
      }
      else if (objt.situateType == 'template_asset') {
        postUrl += '/template_asset/' + objt.situateValue + '/generate_asset';
      }
      else if (objt.situateType == 'securitypattern') {
        postUrl += '/security_pattern/' + objt.situateValue + '/situate';
      }
      else if (objt.situateType == 'securitypattern-existing') {
        postUrl += '/security_pattern/' + objt.situateValue + '/associate_situated';
      }

      axios.post(postUrl,{
        session_id : this.$store.state.session,
        object : this.objt
      })
      .then(response => {
        EventBus.$emit('operation-success',response.data.message);
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error.response.data.message);
      });
    },
    applyFilter() {
      if (this.$store.state.domainName != '') {
        this.$refs.domainFilter.selected = this.$store.state.domainName;
      }
    }
  },
  mounted() {
    this.theObjectViewParameters = objectViewParametersFactory[this.dimension];
    if (this.dimension == 'requirement') {
      this.applyFilter();
    }
    this.loadObjects();
    this.updateDimension();
  }
}
</script>