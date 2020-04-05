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

  <div class="threat">
    <dimension-modal ref="environmentDialog" dimension="environment" :existing="environmentNames" v-on:dimension-modal-update="addThreatEnvironmentProperty"/> 
    <dimension-modal ref="assetDialog" dimension="asset" :environment="environmentName" :existing="assetNames" v-on:dimension-modal-update="addThreatAsset"/> 
    <dimension-modal ref="attackerDialog" dimension="attacker" :environment="environmentName" :existing="attackerNames" v-on:dimension-modal-update="addThreatAttacker"/> 
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
            <b-col md="6">
              <b-form-group label="Threat" label-class="font-weight-bold text-md-left" label-for="theThreatInput">
                <b-form-input id="theThreatInput" v-model="objt.theName" type="text" required />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Type" label-class="font-weight-bold text-md-left" label-for="theThreatType">
                <dimension-select id="theThreatType" dimension='threat_type' :initial="this.objt.theType" v-on:dimension-select-change="threatTypeSelected" v-on:dimension-items-updated="threatTypesLoaded" />
              </b-form-group>
            </b-col>
          </b-row>
        <b-form-group label="Method" label-class="font-weight-bold text-md-left" label-for="theMethodInput">
          <b-form-textarea id="theMethodInput" v-model="objt.theMethod" type="text" rows=2 max-rows=4 required />
        </b-form-group>
        <b-form-group label="Tags" label-class="font-weight-bold text-md-left" label-for="theTagsInput">
          <b-form-tags v-model="objt.theTags" separator="," placeholder="Enter new tags separated by comma" remove-on-delete tag-variant="primary" tag-pills class="md-8"></b-form-tags>
        </b-form-group>
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
              <b-form-group label="Likelihood" label-class="font-weight-bold text-md-left" label-for="theLikelihood">
                <b-form-select id="theLikelihood" v-model="likelihood" :options="likelihoodTypes" class="mb-3" required />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-if="this.objt.theEnvironmentProperties.length">
            <b-col sm="4">
              <b-table striped bordered small :fields="attackerTableFields" :items="environmentAttackers">
                <!-- eslint-disable-next-line -->
                <template v-slot:head(attackeractions)="data"> 
                  <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addAttacker"/> 
                </template>
                <template v-slot:cell(attackeractions)="row">
                  <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteAttacker(row.index)"/>
                </template>
              </b-table>
            </b-col>
            <b-col sm="4">
              <b-table striped bordered small :fields="assetTableFields" :items="environmentAssets">
                <!-- eslint-disable-next-line -->
                <template v-slot:head(assetactions)="data"> 
                  <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addAsset"/> 
                </template>
                <template v-slot:cell(assetactions)="row">
                  <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteAsset(row.index)"/>
                </template>
              </b-table>
            </b-col>
            <b-col sm="4">
              <b-table striped bordered small hover :items="notNone" :fields=propTableFields @row-clicked="viewProperty">
                <!-- eslint-disable-next-line -->
                <template v-slot:head(propactions)="data"> 
                  <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addProperty"/> 
                </template> 
                <template v-slot:cell(propactions)="row">
                  <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="clearProperty(row.item)"/>
                </template> 
              </b-table>
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

import objectMixin from '../mixins/objectMixin'
import propertiesMixin from '../mixins/propertiesMixin'
import environmentMixin from '../mixins/environmentMixin'
import DimensionModal from './DimensionModal'
import PropertyModal from './PropertyModal'
import DimensionSelect from './DimensionSelect'

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
    likelihood : {
      get : function() {
        return this.objt.theEnvironmentProperties.length > 0 && this.envPropIndex >= 0 && this.objt.theEnvironmentProperties[this.envPropIndex] != undefined ? this.objt.theEnvironmentProperties[this.envPropIndex].theLikelihood : ''
      },
      set : function(value) {
        if (this.objt.theEnvironmentProperties[this.envPropIndex] != undefined) {
          this.objt.theEnvironmentProperties[this.envPropIndex].theLikelihood = value;
        }
      }
    },
    assetNames() {
      return this.objt.theEnvironmentProperties.length > 0 && this.envPropIndex >= 0 && this.objt.theEnvironmentProperties[this.envPropIndex] != undefined ? this.objt.theEnvironmentProperties[this.envPropIndex].theAssets : [] ;
    },
    attackerNames() {
      return this.objt.theEnvironmentProperties.length > 0 && this.envPropIndex >= 0 && this.objt.theEnvironmentProperties[this.envPropIndex] != undefined ? this.objt.theEnvironmentProperties[this.envPropIndex].theAttackers : [] ;
    },
    environmentAssets() {
      return this.objt.theEnvironmentProperties.length > 0 && this.envPropIndex >= 0 && this.objt.theEnvironmentProperties[this.envPropIndex] != undefined ? this.objt.theEnvironmentProperties[this.envPropIndex].theAssets.map(asset => ({name : asset})) : []
    },
    environmentAttackers() {
      return this.objt.theEnvironmentProperties.length > 0 && this.envPropIndex >= 0 && this.objt.theEnvironmentProperties[this.envPropIndex] != undefined ? this.objt.theEnvironmentProperties[this.envPropIndex].theAttackers.map(attacker => ({name : attacker})) : []
    },
  },
  components : {
    DimensionModal,
    DimensionSelect,
    PropertyModal,
  },
  data() {
    return {
      objt : this.object,
      commitLabel : this.label,
      envPropIndex : 0,
      errors : [],
      likelihoodTypes: ['Incredible','Improbable','Remote','Occasional','Probable','Frequent'],
      envFields : [
        {key: 'envactions', label : ''},
        {key: 'theName', label : 'Environment'}
      ],
      assetTableFields : [
        {key: 'assetactions', label : ''},
        {key: 'name', label : 'Asset'}
      ],
      attackerTableFields : [
        {key: 'attackeractions', label : ''},
        {key: 'name', label : 'Attacker'}
      ],
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
      if (this.objt.theMethod.length == 0) {
        this.errors.push('Method is required');
      }
      if (this.objt.theEnvironmentProperties.length == 0) {
        this.errors.push('No environment properties have been defined')
      }
      for (let i = 0; i < this.objt.theEnvironmentProperties.length; i++) {
        const envProps = this.objt.theEnvironmentProperties[i];
        if (envProps.theLikelihood.length == 0) {
          this.errors.push('No likelihood set for environment ' + envProps.theEnvironmentName);
        }
        if (envProps.theAttackers.length == 0) {
          this.errors.push('No attackers set for environment ' + envProps.theEnvironmentName);
        }
        if (envProps.theAssets.length == 0) {
          this.errors.push('No assets set for environment ' + envProps.theEnvironmentName);
        }
        if (envProps.theProperties.filter(p => p.value != 'None').length ==0) {
          this.errors.push('At least one property should be not None in environment ' + envProps.theEnvironmentName);
        }
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
      this.$router.push({ name: 'objectsview', params: {dimension: 'threat'}});
    },
    deleteAsset(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theAssets.splice(index,1);
    },
    deleteAttacker(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theAttackers.splice(index,1);
    },
    addEnvironment(evt) {
      evt.preventDefault();
      this.$refs.environmentDialog.show();  
    },
    addAsset(evt) {
      evt.preventDefault();
      this.$refs.assetDialog.show();  
    },
    addAttacker(evt) {
      evt.preventDefault();
      this.$refs.attackerDialog.show();  
    },
    addThreatEnvironmentProperty : function(envName) {
      this.addEnvironmentProperty({
        theEnvironmentName : envName,
        theAssets : [],
        theLikelihood : '',
        theAttackers : [],
        theProperties : this.defaultProperties()
      });
    },
    addThreatAsset : function(assetName) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theAssets.push(assetName);
    },
    addThreatAttacker : function(attackerName) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theAttackers.push(attackerName);
    },
    threatTypeSelected(tType) {
      this.objt.theType = tType;
    },
    threatTypesLoaded(tType) {
      this.objt.theType = tType;
    }
  }
}
</script>