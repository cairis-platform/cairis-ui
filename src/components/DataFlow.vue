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
  <div class="dataflow">
    <dimension-modal v-if="objt.theEnvironmentName != ''" ref="assetDialog" dimension="asset" :environment="objt.theEnvironmentName" :existing="objt.theAssets" v-on:dimension-modal-update="addDataFlowAsset"/> 
    <dimension-modal v-if="objt.theEnvironmentName != ''" ref="obstacleDialog" dimension="obstacle" :environment="objt.theEnvironmentName" :existing="objt.theObstacles" v-on:dimension-modal-update="addDataFlowObstacle"/> 
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
            <b-container v-if="objt != undefined" fluid>
              <b-row>
                <b-col md="6">
                  <b-form-group label="Dataflow" label-class="font-weight-bold text-md-left" label-for="theDataflowInput" >
                    <b-form-input id="theDataFlowInput" v-model="objt.theName" type="text" required />
                  </b-form-group>
                </b-col>
                <b-col md="3">
                  <b-form-group label="Environment" label-class="font-weight-bold text-md-left" label-for="theEnvironmentSelect" >
                    <dimension-select id="theEnvironmentSelect" ref="theEnvironmentSelect" dimension='environment' :initial="objt.theEnvironmentName" v-on:dimension-select-change="environmentSelected" v-on:dimension-items-updated="environmentsLoaded" />
                  </b-form-group>
                </b-col>
                <b-col md="3">
                  <b-form-group label="Type" label-class="font-weight-bold text-md-left" label-for="theTypeSelect" >
                    <b-form-select id="theType" v-model="objt.theType" :options="typeOptions" class="mb-3" required></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="4">
                  <b-form-group label="From" label-class="font-weight-bold text-md-left" label-for="theFromRadio" >
                    <b-form-radio-group v-model="theFromType">
                      <b-form-radio value='entity'>Entity</b-form-radio>
                      <b-form-radio value='datastore'>Datastore</b-form-radio>
                      <b-form-radio value='process'>Process</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
                <b-col md="8">
                  <dimension-select id="theFromSelect" ref="theFromSelect" :environment='objt.theEnvironmentName' :dimension='objt.theFromType' :initial="objt.theFromName" v-on:dimension-select-change="fromNameSelected" v-on:dimension-items-updated="fromNamesLoaded" />
                </b-col>
              </b-row>
              <b-row>
                <b-col md="4">
                  <b-form-group label="To" label-class="font-weight-bold text-md-left" label-for="theToRadio" >
                    <b-form-radio-group id="theToRadio" v-model="objt.theToType" :options="toTypeOptions" class="mb-3" required name="theToRadio">
                    </b-form-radio-group>
                  </b-form-group>
                </b-col>
                <b-col md="8">
                  <dimension-select id="theToSelect" ref="theToSelect" :environment='objt.theEnvironmentName' :dimension='objt.theToType' :initial="objt.theToName" v-on:dimension-select-change="toNameSelected" v-on:dimension-items-updated="toNamesLoaded" />
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-table striped bordered small :fields="assetTableFields" :items="dataFlowAssets">
                    <!-- eslint-disable-next-line -->
                    <template v-slot:head(assetactions)="data"> 
                      <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addAsset"/> 
                    </template>
                    <template v-slot:cell(assetactions)="row">
                      <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteAsset(row.index)"/>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-table striped bordered small :fields="obstacleTableFields" :items="dataFlowObstacles">
                    <!-- eslint-disable-next-line -->
                    <template v-slot:head(obstacleactions)="data"> 
                      <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addObstacle"/> 
                    </template>
                    <template v-slot:cell(obstacleactions)="row">
                      <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteObstacle(row.index)"/>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group label="Tags" label-class="font-weight-bold text-md-left" label-for="theTagsInput">
                    <b-form-tags id="theTagsInput" v-model="objt.theTags" separator="," placeholder="Enter new tags separated by comma" remove-on-delete tag-variant="primary" tag-pills class="md-8"></b-form-tags>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-container>
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
import DimensionModal from './DimensionModal';
import DimensionSelect from '@/components/DimensionSelect.vue';

export default {
  name : 'data-flow',
  props : {
    object : Object,
    label : String,
    isUpdating : Boolean
  },
  watch : {
    object : 'setObject',
    theFromType : 'setToType'
  },
  mixins : [
    objectMixin
  ],
  components : {
    DimensionModal,
    DimensionSelect
  },
  computed : {
    dataFlowAssets() {
      return this.objt.theAssets.length > 0 ? this.objt.theAssets.map(asset => ({name : asset})) : []
    },
    dataFlowObstacles() {
      return this.objt.theObstacles.length > 0 ? this.objt.theObstacles.map(obs => ({name : obs})) : []
    }
  },
  data() {
    return {
      errors : [],
      objt : this.object,
      commitLabel : 'Create',
      theFromType : 'entity',
      typeOptions : ['Information','Control','Feedback'],
      toTypeOptions : [
        {'text' : 'Process', 'value' : 'process'}
      ],
      assetTableFields : [
        {key: 'assetactions', label : ''},
        {key: 'name', label : 'Asset'}
      ],
      obstacleTableFields : [
        {key: 'obstacleactions', label : ''},
        {key: 'name', label : 'Obstacle'}
      ]
    }
  },
  methods : {
    setObject() {
      this.objt = this.object;
      this.theFromType = this.objt.theFromType;
      this.$refs.theEnvironmentSelect.selected = this.objt.theEnvironmentName;
      this.$refs.theFromSelect.selected = this.objt.theFromName;
      this.$refs.theToSelect.selected = this.objt.theToName;
      this.commitLabel = this.label;
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'objectsview', params: {dimension: 'dataflow'}});
    },
    checkForm() {
      this.errors = []
      if (this.objt.theEnvironmentName.length == 0) {
        this.errors.push('Environment is required');
      }
      if (this.objt.theName.length == 0) {
        this.errors.push('Data flow name is required');
      }
      if (this.objt.theType.length == 0) {
        this.errors.push('Type is required');
      }
      if (this.objt.theFromType.length == 0) {
        this.errors.push('From type is required');
      }
      if (this.objt.theFromName.length == 0) {
        this.errors.push('From name is required');
      }
      if (this.objt.theToType.length == 0) {
        this.errors.push('To type is required');
      }
      if (this.objt.theToName.length == 0) {
        this.errors.push('To name is required');
      }
      if (this.objt.theAssets.length == 0) {
        this.errors.push('At least one asset is required');
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    },
    setToType() {
      this.objt.theFromType = this.theFromType;
      if (this.theFromType == 'entity') {
        this.toTypeOptions = [
          {'text' : 'Process', 'value' : 'process'}
        ];
      }
      else if (this.theFromType == 'process') {
        this.toTypeOptions = [
          {'text' : 'Entity', 'value' : 'entity'},
          {'text' : 'Process', 'value' : 'process'},
          {'text' : 'Datastore', 'value' : 'datastore'}
        ];
      }
      else if (this.theFromType == 'datastore') {
        this.toTypeOptions = [
          {'text' : 'Process', 'value' : 'process'}
        ];
      }
    },
    environmentSelected(item) {
      if (item != undefined) {
        this.objt.theEnvironmentName = item;
      }
    },
    environmentsLoaded(item) {
      this.objt.theEnvironmentName = item;
    },
    goalSelected(item) {
      if (item != undefined) {
        this.objt.theGoal = item;
      }
    },
    fromNameSelected(item) {
      if (item != undefined) {
        this.objt.theFromName = item;
      }
    },
    fromNamesLoaded(item) {
      this.objt.theFromName = item;
    },
    toNameSelected(item) {
      if (item != undefined) {
        this.objt.theToName = item;
      }
    },
    toNamesLoaded(item) {
      this.objt.theToName = item;
    },
    addAsset(evt) {
      evt.preventDefault();
      this.$refs.assetDialog.show();  
    },
    deleteAsset(index) {
      this.objt.theAssets.splice(index,1);
    },
    addDataFlowAsset : function(assetName) {
      this.objt.theAssets.push(assetName);
    },
    addObstacle(evt) {
      evt.preventDefault();
      this.$refs.obstacleDialog.show();  
    },
    deleteObstacle(index) {
      this.objt.theObstacles.splice(index,1);
    },
    addDataFlowObstacle : function(obsName) {
      this.objt.theObstacles.push(obsName);
    },
    onCommit(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        this.$emit('data-flow-commit',this.objt);
      }
    }
  }
}
</script>