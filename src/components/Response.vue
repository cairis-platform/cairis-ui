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

  <div class="response">
    <dimension-modal ref="environmentDialog" :dimensionUrl="riskEnvironmentsURI" label="Environment" :existing="environmentNames" v-on:dimension-modal-update="addResponseEnvironmentProperty"/> 
    <role-cost-modal ref="rcDialog" :existing="transferRoleNames" v-on:role-cost-modal-update="addRoleCost"/> 
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
            <b-col md="4">
              <b-form-group v-if="newObject" label="Type" label-class="font-weight-bold text-sm-left" label-for="theResponseTypeRadio" >
                <b-form-radio-group id="theResponseTypeRadio" v-model="objt.theResponseType" :options="responseTypeOptions">
                </b-form-radio-group>
              </b-form-group>
              <b-form-group v-if="newObject == false" label="Type" label-class="font-weight-bold text-sm-left" label-for="theResponseTypeRadio" >
                <b-form-radio-group id="theResponseTypeRadio" v-model="objt.theResponseType" :options="[{text : objt.theResponseType,label : objt.theResponseType}]" disabled>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Risk" label-class="font-weight-bold text-md-left" label-for="theRiskSelect">
                <dimension-select id="theRiskSelect" dimension='risk' :initial="objt.theRisk" v-on:dimension-select-change="riskSelected" v-on:dimension-items-updated="risksLoaded" /> 
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Response" label-class="font-weight-bold text-md-left" label-for="theResponseInput">
                <b-form-input id="theResponseInput" v-model="objt.theName" type="text" readonly />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form-group label="Tags" label-class="font-weight-bold text-md-left" label-for="theTagsInput">
                <b-form-input id="theTagsInput" v-model="objt.theTags" type="text" />
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
          <b-container v-if="this.objt.theResponseType == 'Accept'" fluid>
            <b-row>
              <b-col sm="12">
                <b-tabs pills v-model="envPropIndex">
                  <b-tab v-for="envProp in this.objt.theEnvironmentProperties.accept" :key="envProp.theEnvironmentName" :title=envProp.theName>
                    <template slot="title">
                      <font-awesome-icon icon="minus" :style="{color: 'red'}" @click="deleteEnvironment(envPropIndex)"/>  {{envProp.theEnvironmentName}}
                    </template> 
                  </b-tab> 
                 </b-tabs>
               </b-col> 
            </b-row>
            <b-row v-if="this.objt.theEnvironmentProperties.accept.length > 0">
              <b-col sm="12">
                <b-form-group label="Cost" label-class="font-weight-bold text-sm-left" label-for="theAcceptCostRadio" >
                  <b-form-radio-group id="theAcceptCostRadio" v-model="cost">
                    <b-form-radio value="Low">Low</b-form-radio>
                    <b-form-radio value="Medium">Medium</b-form-radio>
                    <b-form-radio value="High">High</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="this.objt.theEnvironmentProperties.accept.length > 0">
              <b-col md="12">
                <b-form-group label="Rationale" label-class="font-weight-bold text-md-left" label-for="theAcceptRationaleInput">
                  <b-form-textarea id="theAcceptRationaleInput" v-model="acceptRationale" type="text" :rows=4 :max-rows=4 required />
                </b-form-group>
              </b-col>
            </b-row> 
          </b-container>
          <b-container v-if="this.objt.theResponseType == 'Transfer'" fluid>
            <b-row>
              <b-col sm="12">
                <b-tabs pills v-model="envPropIndex">
                  <b-tab v-for="envProp in this.objt.theEnvironmentProperties.transfer" :key="envProp.theEnvironmentName" :title=envProp.theName>
                    <template slot="title">
                      <font-awesome-icon icon="minus" :style="{color: 'red'}" @click="deleteEnvironment(envPropIndex)"/>  {{envProp.theEnvironmentName}}
                    </template> 
                  </b-tab> 
                 </b-tabs>
               </b-col> 
            </b-row>
            <b-row v-if="this.objt.theEnvironmentProperties.transfer.length > 0">
              <b-col md="12">
                <b-table striped small bordered :fields="roleTableFields" :items="transferRoles">
                  <!-- eslint-disable-next-line -->
                  <template v-slot:head(roleactions)="data"> 
                    <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addRole"/> 
                  </template>
                  <template v-slot:cell(roleactions)="row">
                    <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteRole(row.index)"/>
                  </template>
                </b-table>
              </b-col>
            </b-row>
            <b-row v-if="this.objt.theEnvironmentProperties.transfer.length > 0">
              <b-col md="12">
                <b-form-group label="Rationale" label-class="font-weight-bold text-md-left" label-for="theTransferRationaleInput">
                  <b-form-textarea id="theTransferRationaleInput" v-model="transferRationale" type="text" :rows=4 :max-rows=4 required>
                  </b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
          </b-container>
          <b-container v-if="mitigateTypeResponse" fluid>
            <b-row>
              <b-col sm="12">
                <b-tabs pills v-model="envPropIndex">
                  <b-tab v-for="envProp in this.objt.theEnvironmentProperties.mitigate" :key="envProp.theEnvironmentName" :title=envProp.theName>
                    <template slot="title">
                      <font-awesome-icon icon="minus" :style="{color: 'red'}" @click="deleteEnvironment(envPropIndex)"/>  {{envProp.theEnvironmentName}}
                    </template> 
                  </b-tab> 
                 </b-tabs>
               </b-col> 
            </b-row>
            <b-row v-if="this.objt.theEnvironmentProperties.mitigate.length > 0">
              <b-col md="12">
                <b-form-group label="Type" label-class="font-weight-bold text-sm-left" label-for="thePreventRadio" >
                  <b-form-radio-group id="thePreventTypeRadio" v-model="mitigateType">
                    <b-form-radio value="Prevent">Prevent</b-form-radio>
                    <b-form-radio value="Deter">Deter</b-form-radio>
                    <b-form-radio value="Detect">Detect</b-form-radio>
                    <b-form-radio value="React">React</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="detectResponse && this.objt.theEnvironmentProperties.mitigate.length > 0">
              <b-col md="12">
                <b-form-group label="Detection Point" label-class="font-weight-bold text-sm-left" label-for="theDetectionPointRadio" >
                  <b-form-radio-group id="theDetectionPointRadio" v-model="detectionPoint">
                    <b-form-radio value="Before">Before</b-form-radio>
                    <b-form-radio value="At">At</b-form-radio>
                    <b-form-radio value="After">After</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="reactResponse && this.objt.theEnvironmentProperties.mitigate.length > 0">
              <b-col md="12">
                <b-form-group label="Detection Mechanism" label-class="font-weight-bold text-sm-left" label-for="theDetectionMechanismSelect" >
                  <dimension-select id="theDetectionMechanismSelect" dimension='detection_mechanism' :initial="objt.theRisk" v-on:dimension-select-change="detectionMechanismSelected" /> 
                </b-form-group>
              </b-col>
            </b-row>
          </b-container>
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
import RoleCostModal from './RoleCostModal';
import DimensionSelect from './DimensionSelect';

export default {
  props : {
    object : Object,
    label : String
  },
  watch : {
    object: 'setObject',
    mitigateType : 'updateResponseName',
  },
  mixins : [
    objectMixin
  ],
  computed : {
    newObject() {
      return this.label == 'Create' ? true : false;
    },
    riskEnvironmentsURI() {
      return this.objt.theRisk.length > 0 ? '/api/environments/risk/' + this.objt.theRisk + '/names' : '';
    },
    transferRoles() {
      return this.objt.theEnvironmentProperties.transfer != undefined && this.objt.theEnvironmentProperties.transfer.length > 0 ? this.objt.theEnvironmentProperties.transfer[this.envPropIndex].theRoles : [];
    },
    transferRoleNames() {
      return this.objt.theEnvironmentProperties.transfer != undefined && this.objt.theEnvironmentProperties.transfer.length > 0 ? this.objt.theEnvironmentProperties.transfer[this.envPropIndex].theRoles.map(r => r.roleName) : [];
    },
    environmentNames() {
      return this.objt.theEnvironmentProperties.accept != undefined && this.objt.theEnvironmentProperties.accept.length > 0 ? this.objt.theEnvironmentProperties.accept.map(prop => prop.theEnvironmentName) 
        : ( this.objt.theEnvironmentProperties.transfer != undefined && this.objt.theEnvironmentProperties.transfer.length > 0 ? this.objt.theEnvironmentProperties.transfer.map(prop => prop.theEnvironmentName)
             : ( this.objt.theEnvironmentProperties.mitigate != undefined && this.objt.theEnvironmentProperties.mitigate.length > 0 ? this.objt.theEnvironmentProperties.mitigate.map(prop => prop.theEnvironmentName) : [] )
        )
    },
    environmentName() {
      return this.objt.theEnvironmentProperties.accept != undefined && this.objt.theEnvironmentProperties.accept.length > 0 ? this.objt.theEnvironmentProperties.accept[this.envPropIndex].theEnvironmentName
        : ( this.objt.theEnvironmentProperties.transfer != undefined && this.objt.theEnvironmentProperties.transfer.length > 0 ? this.objt.theEnvironmentProperties.transfer[this.envPropIndex].theEnvironmentName
             : ( this.objt.theEnvironmentProperties.mitigate != undefined && this.objt.theEnvironmentProperties.mitigate.length > 0 ? this.objt.theEnvironmentProperties.mitigate[this.envPropIndex].theEnvironmentName : [] )
        )
    },
    cost : {
      get : function() {
        return this.objt.theEnvironmentProperties.cost != undefined && this.objt.theEnvironmentProperties.accept.length > 0 ? this.objt.theEnvironmentProperties.accept[this.envPropIndex].theCost : ''
      },
      set : function(value) {
        this.objt.theEnvironmentProperties.accept[this.envPropIndex].theCost = value;
      }
    },
    acceptRationale : {
      get : function() {
        return this.objt.theEnvironmentProperties.accept != undefined && this.objt.theEnvironmentProperties.accept.length > 0 ? this.objt.theEnvironmentProperties.accept[this.envPropIndex].theRationale : ''
      },
      set : function(value) {
        this.objt.theEnvironmentProperties.accept[this.envPropIndex].theRationale = value;
      }
    },
    transferRationale : {
      get : function() {
        return this.objt.theEnvironmentProperties.transfer != undefined && this.objt.theEnvironmentProperties.transfer.length > 0 ? this.objt.theEnvironmentProperties.transfer[this.envPropIndex].theRationale : ''
      },
      set : function(value) {
        this.objt.theEnvironmentProperties.transfer[this.envPropIndex].theRationale = value;
      }
    },
    mitigateType : {
      get : function() {
        return this.objt.theEnvironmentProperties.mitigate != undefined && this.objt.theEnvironmentProperties.mitigate.length > 0 ? this.objt.theEnvironmentProperties.mitigate[this.envPropIndex].theType : 'Mitigate';
      },
      set : function(v) {
        if (this.objt.theEnvironmentProperties.mitigate != undefined && this.objt.theEnvironmentProperties.mitigate.length > 0) {
          this.objt.theEnvironmentProperties.mitigate[this.envPropIndex].theType = v;
        }
      }
    },
    detectionPoint : {
      get : function() {
        return this.objt.theEnvironmentProperties.mitigate != undefined && this.objt.theEnvironmentProperties.mitigate.length > 0 ? this.objt.theEnvironmentProperties.mitigate[this.envPropIndex].theDetectionPoint : '';
      },
      set : function(v) {
        if (this.objt.theEnvironmentProperties.mitigate != undefined && this.objt.theEnvironmentProperties.mitigate.length > 0) {
          this.objt.theEnvironmentProperties.mitigate[this.envPropIndex].theDetectionPoint = v;
        }
      }
    },
    preventResponse() {
      return this.objt.theEnvironmentProperties.mitigate != undefined && this.objt.theEnvironmentProperties.mitigate.length > 0 && this.objt.theEnvironmentProperties.mitigate[this.envPropIndex].theType == 'Prevent' ? true: false;
    },
    detectResponse() {
      return this.objt.theEnvironmentProperties.mitigate != undefined && this.objt.theEnvironmentProperties.mitigate.length > 0 && this.objt.theEnvironmentProperties.mitigate[this.envPropIndex].theType == 'Detect' ? true : false;
    },
    deterResponse() {
      return this.objt.theEnvironmentProperties.mitigate != undefined && this.objt.theEnvironmentProperties.mitigate.length > 0 && this.objt.theEnvironmentProperties.mitigate[this.envPropIndex].theType == 'Deter' ? true : false;
    },
    reactResponse() {
      return this.objt.theEnvironmentProperties.mitigate != undefined && this.objt.theEnvironmentProperties.mitigate.length > 0 && this.objt.theEnvironmentProperties.mitigate[this.envPropIndex].theType == 'React' ? true : false;
    },
    mitigateTypeResponse() {
      return  this.preventResponse || this.detectResponse || this.deterResponse || this.reactResponse ? true : false;
    }
  },
  components : {
    DimensionModal,
    DimensionSelect,
    RoleCostModal
  },
  data() {
    return {
      objt : this.object,
      commitLabel : this.label,
      envPropIndex : 0,
      errors : [],
      responseTypeOptions : [
        {text : 'Accept', value : 'Accept'},
        {text : 'Transfer', value : 'Transfer'},
        {text : 'Mitigate', value : 'Mitigate'}
      ],
      roleTableFields : [
        {key: 'roleactions', label : ''},
        {key: 'roleName', label : 'Role'},
        {key: 'cost', label : 'Cost'}
      ]
    }
  }, 
  methods: {
    checkForm() {
      this.errors = []
      if (this.objt.theResponseType.length == 0) {
        this.errors.push('Response Type is required');
      }
      if (this.objt.theRisk.length == 0) {
        this.errors.push('Risk is required');
      }
      if (this.objt.theName.length == 0) {
        this.errors.push('Response Name is required');
      }
      if (this.objt.theResponseType == 'Accept' && this.objt.theEnvironmentProperties.accept.length == 0) {
        this.errors.push('No environment properties have been defined')
      }
      if (this.objt.theResponseType == 'Transfer' && this.objt.theEnvironmentProperties.transfer.length == 0) {
        this.errors.push('No environment properties have been defined')
      }
      if (this.objt.theResponseType == 'Mitigate' && this.objt.theEnvironmentProperties.mitigate.length == 0) {
        this.errors.push('No environment properties have been defined')
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
    updateResponseName() {
      if (this.objt.theResponseType.length > 0 && this.objt.theRisk.length > 0) {
        this.objt.theName = (this.objt.theResponseType == 'Mitigate' ? this.mitigateType : this.objt.theResponseType) + ' ' + this.objt.theRisk;
      }
    },
    onCommit(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        if (this.objt.theTags != '') {
          this.objt.theTags = this.objt.theTags.split(',').map(t => t.trim());
        }
        this.$emit('object-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'objectsview', params: {dimension: 'response'}});
    },
    addEnvironment(evt) {
      evt.preventDefault();
      this.$refs.environmentDialog.show();  
    },
    addResponseEnvironmentProperty : function(envName) {
      if (this.objt.theResponseType == 'Accept') {
        this.objt.theEnvironmentProperties.accept.push({theEnvironmentName : envName, theCost : 'Low', theRationale : ''});
        this.envPropIndex = this.objt.theEnvironmentProperties.accept.length - 1;
      }
      else if (this.objt.theResponseType == 'Transfer') {
        this.objt.theEnvironmentProperties.transfer.push({theEnvironmentName : envName, theRoles : [], theRationale : ''});
        this.envPropIndex = this.objt.theEnvironmentProperties.transfer.length - 1;
      }
      else {
        this.objt.theEnvironmentProperties.mitigate.push({theEnvironmentName : envName, theType : 'Prevent', theDetectionMechanisms : [], theDetectionPoint : ''});
        this.envPropIndex = this.objt.theEnvironmentProperties.mitigate.length - 1;
      }
    },
    riskSelected(rName) {
      if (rName != undefined) {
        this.objt.theRisk = rName;
        this.updateResponseName();
      }
    },
    risksLoaded(rName) {
      if (rName != undefined) {
        this.objt.theRisk = rName;
        this.updateResponseName();
      }
    },
    detectionMechanismSelected(dmName) {
      this.objt.theEnvironmentProperties.mitigate[this.envPropIndex].theDetectionMechanisms = [dmName];
    },
    deleteEnvironment(idx) {
      if (this.theResponseType == 'Accept') {
        this.objt.theEnvironmentProperties.accept.splice(idx,1);
      }
      else if (this.theResponseType == 'Transfer') {
        this.objt.theEnvironmentProperties.transfer.splice(idx,1);
      }
      else {
        this.objt.theEnvironmentProperties.mitigate.splice(idx,1);
      }
    },
    addRoleCost(data) {
      this.objt.theEnvironmentProperties.transfer[this.envPropIndex].theRoles.push(data);
    },
    deleteRole(index) {
      this.objt.theEnvironmentProperties.transfer[this.envPropIndex].theRoles.splice(index,1);
    },
    addRole() {
      this.$refs.rcDialog.show();  
    }
  }
}
</script>