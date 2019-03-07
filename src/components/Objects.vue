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
    <object-dependency-modal ref="depDialog" :dependencies="objectDependencies" v-on:object-dependency-ok="deleteDependencies" />
    <add-trace-modal v-if="selectedTraceabilityObject != ''" ref="traceDialog" :dimension="dimension" :tobject="selectedTraceabilityObject" :isFrom="isPostTraceability" />
    <b-card no-body>
      <b-container v-if="dimension == 'requirement'" fluid>
        <b-row>
          <b-col>
            <b-form-group label="Asset" label-for="reqAsset" :label-cols="5" >
              <dimension-select ref="assetFilter" id="assetEnvironment" dimension="asset" v-on:dimension-select-change="assetSelected" />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Environment" label-for="reqEnvironment" :label-cols="5" >
              <dimension-select ref="envFilter" id="reqEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
      <b-container v-if="environmentSpecificValueType" fluid>
        <b-row>
          <b-col>
            <b-form-group label="Environment" label-for="reqEnvironment" :label-cols="5" >
              <dimension-select ref="envFilter" id="vtEnvironment" dimension="environment" v-on:dimension-select-change="vtEnvironmentSelected" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
      <b-table b-table striped small hover :fields="fieldList" :items="items" @row-clicked="objectClicked">
        <!-- eslint-disable-next-line -->
        <template slot="HEAD_objectsactions" slot-scope="data">
          <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addObject"/> 
        </template>
        <template slot="objectsactions" slot-scope="row">
          <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteObject(row.index)"/>
        </template>
        <template slot="pretaction" slot-scope="row">
          <font-awesome-icon icon="arrow-left" :style="{color: 'green'}" @click.stop="addPreTraceabilityLink(row.index)"/>
        </template>
        <template slot="generategoalaction" slot-scope="row">
          <font-awesome-icon icon="angle-down" :style="{color: 'green'}" @click.stop="generateGoal(row.index)"/>
        </template>
        <template slot="postaction" slot-scope="row">
          <font-awesome-icon icon="arrow-right" :style="{color: 'green'}" @click.stop="addPostTraceabilityLink(row.index)"/>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>

import axios from 'axios';
import EventBus from '../utils/event-bus';
import DimensionSelect from '@/components/DimensionSelect.vue'
import ObjectDependencyModal from '@/components/ObjectDependencyModal.vue'
import AddTraceModal from '@/components/AddTraceModal.vue'
import objectViewParametersFactory from '../utils/objectViewParametersFactory';

export default {
  props : {
    breadCrumbItems : Array,
    fieldList : Object,
    getUrl: String,
    delUrl: String,
    dimName : String
  },
  components : {
    DimensionSelect,
    ObjectDependencyModal,
    AddTraceModal
  },
  data() {
    return {
      dimension : this.dimName,
      items: [],
      theGetUrl : this.getUrl,
      objectDependencies : [],
      selectedObject : '',
      selectedIndex : -1,
      selectedTraceabilityObject : '',
      isPostTraceability : 1,
      theEnvironmentName : 'all',
      theObjectViewParameters : undefined
    }
  }, 
  watch : {
    getUrl : 'reloadObjects'
  },
  computed : {
    environmentSpecificValueType() {
      return this.dimension == 'asset_value' ? true : false;
    }
  },
  methods : {
    objectClicked(row) {
      if (this.dimName == 'asset_value' || this.dimName == 'asset_type' || this.dimName == 'access_right' || this.dimName == 'protocol' || this.dimName == 'privilege' || this.dimName == 'surface_type' || this.dimName == 'vulnerability_type' || this.dimName == 'severity' || this.dimName == 'capability' || this.dimName == 'motivation' || this.dimName == 'threat_type' || this.dimName == 'likelihood' || this.dimName == 'threat_value') {
        this.$router.push({ name: 'valuetype', params : {objectName: 'New value type', dimName : this.dimName, envName : this.theEnvironmentName}});
      }
      else {
        switch(this.dimension) {
          case 'requirement':
            this.$router.push({ name: this.dimName, params : {objectName: row.theName, domain: this.$refs.assetFilter.selected.length > 0 ? {type: 'asset', name: this.$refs.assetFilter.selected} : {type: 'environment', name: this.$refs.envFilter.selected}}});
            break;
          case 'personacharacteristic':
            this.$router.push({ name: this.dimName, params : {objectName: row.theCharacteristic}});
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
          case 'domainproperty':
          case 'goal':
          case 'obstacle':
          case 'role':
          case 'usecase':
            this.$router.push({ name: 'objectview', params: {dimension: this.dimension, objectName: row.theName, objectsLabel: this.theObjectViewParameters.objectsLabel, componentFile: this.theObjectViewParameters.componentFile, updatePath: this.theObjectViewParameters.updatePath, createPath: this.theObjectViewParameters.createPath}});
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
          case 'domainproperty':
          case 'goal':
          case 'obstacle':
          case 'role':
          case 'usecase':
            this.$router.push({ name: 'objectview', params: {dimension: this.dimension, objectName: 'New ' + this.dimName, objectsLabel: this.theObjectViewParameters.objectsLabel, componentFile: this.theObjectViewParameters.componentFile, updatePath: this.theObjectViewParameters.updatePath, createPath: this.theObjectViewParameters.createPath}});
            break;
          default:
            this.$router.push({ name: this.dimName, params : {objectName: 'New ' + this.dimName, domain : {type : 'asset', name : ''}}});
            break;
        }
      }
    },
    deleteObject(index) {
      if (this.dimName == 'kaosassociation') {
        this.selectedObject = {'envName' : this.items[index].theEnvironmentName,'goal' : this.items[index].theGoal,'subGoal' : this.items[index].theSubGoal};
      }
      else if (this.dimName == 'assetassociation') {
        this.selectedObject = {'envName' : this.items[index].theEnvironmentName,'headName' : this.items[index].theHeadAsset,'tailName' : this.items[index].theTailAsset};
      }
      else if (this.dimName == 'dependency') {
        this.selectedObject = {'envName' : this.items[index].theEnvironmentName,'theDepender' : this.items[index].theDepender,'theDependee' : this.items[index].theDependee, 'theDependency' : this.items[index].theDependency };
      }
      else if (this.dimName == 'personacharacteristic') {
        this.selectedObject = this.items[index].theCharacteristic;
      }
      else {
        this.selectedObject = this.items[index].theName;
      }
      this.selectedIndex = index;
      const that = this;

      if (this.dimension != 'kaosassociation' && this.dimension != 'assetassociation' && this.dimension != 'dependency' && this.dimension != 'dataflow' && this.dimension != 'valuetype') {
        let objectDimension = this.dimension;
        if (objectDimension == 'personacharacteristic') {
          objectDimension = 'persona_characteristic';
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
        })
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
        EventBus.$emit('operation-failure',error)
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
      if (this.theGetUrl != '') {
        axios.get(this.theGetUrl,{
          baseURL : this.$store.state.url,
          params : {'session_id' : this.$store.state.session}
         })
        .then(response => {
          this.items = response.data;
         })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        });
      }
    },
    assetSelected(assetName) {
      if (assetName != null) {
        this.theGetUrl = '/api/requirements/asset/' + assetName
        this.$refs.envFilter.selected = '';
        this.loadObjects();
      }
    },
    environmentSelected(envName) {
      if (envName != null) {
        this.theGetUrl = '/api/requirements/environment/' + envName
        this.$refs.assetFilter.selected = '';
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
        EventBus.$emit('operation-success',response.data.message)
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });
    },
    addPreTraceabilityLink(index) {
      this.selectedTraceabilityObject = (this.dimension == 'vulnerability' ? this.items[index].theVulnerabilityName : this.items[index].theName);
      this.isPostTraceability = 0;
      this.$refs.traceDialog.show();
    },
    addPostTraceabilityLink(index) {
      this.selectedTraceabilityObject = (this.dimension == 'vulnerability' ? this.items[index].theVulnerabilityName : this.items[index].theName);
      this.isPostTraceability = 1;
      this.$refs.traceDialog.show();
    },
    updateDimension() {
      if (this.dimName == 'externaldocument') {
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
    }
  },
  mounted() {
    this.theObjectViewParameters = objectViewParametersFactory[this.dimension];
    this.loadObjects();
    this.updateDimension();
  }
}
</script>