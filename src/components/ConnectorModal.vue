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

  <b-modal ref="connectorDialog" :title="this.dialogTitle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card>
      <b-container fluid>
        <b-row>
          <b-col md="12">
            <b-form-group label="Name" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theNameInput" >
              <b-form-input id="theNameInput" v-model="connector.connector.theConnectorName" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6">
            <b-form-group label="From" label-class="font-weight-bold text-md-left" label-for="theFromComponentSelect" >
              <b-form-select id="theFromComponentSelect" v-model="connector.connector.theFromComponent" :options="componentValues" class="mb-3" required />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Interface" label-class="font-weight-bold text-md-left" label-for="theFromInterfaceSelect" >
              <b-form-select id="theFromInterfaceSelect" v-model="connector.connector.theFromInterface" :options="fromInterfaces" class="mb-3" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Role" label-class="font-weight-bold text-md-left" label-cols="2" label-for="theFromRoleInput" >
              <b-form-input id="theFromRoleInput" v-model="connector.connector.theFromRole" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6">
            <b-form-group label="To" label-class="font-weight-bold text-md-left" label-for="theToComponentSelect" >
              <b-form-select id="theToComponentSelect" v-model="connector.connector.theToComponent" :options="componentValues" class="mb-3" required />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Interface" label-class="font-weight-bold text-md-left" label-for="theToInterfaceSelect" >
              <b-form-select id="theToInterfaceSelect" v-model="connector.connector.theToInterface" :options="toInterfaces" class="mb-3" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Role" label-class="font-weight-bold text-md-left" label-cols="2" label-for="theToRoleInput" >
              <b-form-input id="theToRoleInput" v-model="connector.connector.theToRole" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Asset" label-class="font-weight-bold text-md-left" label-cols="2" label-for="theAssetSelect" >
              <b-form-select id="theAssetSelect" v-model="connector.connector.theAssetName" :options="componentAssets" class="mb-3" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Protocol" label-class="font-weight-bold text-md-left" label-for="theProtocolSelect" >
              <dimension-select id="theProtocolSelect" dimension='protocol' :initial="connector.connector.theProtocol" v-on:dimension-select-change="protocolSelected" v-on:dimension-items-updated="protocolsLoaded" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Access Right" label-class="font-weight-bold text-md-left" label-for="theAccessRightSelect" >
              <dimension-select id="theAccessRightSelect" dimension='access_right' :initial="connector.connector.theAccessRight" v-on:dimension-select-change="accessRightSelected" v-on:dimension-items-updated="accessRightsLoaded" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </b-modal> 
</template>

<script>

  export default {
    name : 'connector-modal',
    props : {
      patternConnector : Object,
      components : Array
    },
    data () {
      return {
        connector: this.patternConnector,
        errors : []
      }
    },
    components : {
      DimensionSelect : () => import('@/components/DimensionSelect.vue')
    },
    computed : {
      dialogTitle() {
        return (this.patternConnector.update ? "Update " : "Add ") + "Connector";
      },
      componentValues() {
        return this.components.map(c => c.theName);
      },
      fromInterfaces() {
        return this.connector != undefined && this.connector.connector.theFromComponent.length > 0 ? this.components.filter(c => c.theName == this.connector.connector.theFromComponent)[0].theInterfaces.map(i => i.theName) : [];
      },
      toInterfaces() {
        return this.connector != undefined && this.connector.connector.theToComponent.length > 0 ? this.components.filter(c => c.theName == this.connector.connector.theToComponent)[0].theInterfaces.map(i => i.theName) : [];
      },
      fromAssets() {
        return this.connector != undefined && this.connector.connector.theFromComponent.length > 0 ? Array.from(new Set(this.components.filter(c => c.theName == this.connector.connector.theFromComponent)[0].theStructure.map(assoc => assoc.theHeadAsset).concat(this.components.filter(c => c.theName == this.connector.connector.theFromComponent)[0].theStructure.map(assoc => assoc.theTailAsset)))) : [];
      },
      toAssets() {
        return this.connector != undefined && this.connector.connector.theToComponent.length > 0 ? Array.from(new Set(this.components.filter(c => c.theName == this.connector.connector.theToComponent)[0].theStructure.map(assoc => assoc.theHeadAsset).concat(this.components.filter(c => c.theName == this.connector.connector.theToComponent)[0].theStructure.map(assoc => assoc.theTailAsset)))) : [];
      },
      componentAssets() {
        return this.connector != undefined && this.connector.connector.theFromComponent.length > 0 && this.connector.connector.theToComponent.length > 0 ? this.fromAssets.filter(a => this.toAssets.includes(a)) : [];
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.connector.connector.theConnectorName.length == 0) {
          this.errors.push('Name is required');
        }
        if (this.connector.connector.theFromComponent.length == 0) {
          this.errors.push('From component is required');
        }
        if (this.connector.connector.theFromRole.length == 0) {
          this.errors.push('From role is required');
        }
        if (this.connector.connector.theFromInterface.length == 0) {
          this.errors.push('From interface is required');
        }
        if (this.connector.connector.theToComponent.length == 0) {
          this.errors.push('To component is required');
        }
        if (this.connector.connector.theToRole.length == 0) {
          this.errors.push('To role is required');
        }
        if (this.connector.connector.theToInterface.length == 0) {
          this.errors.push('To interface is required');
        }
        if (this.connector.connector.theAssetName.length == 0) {
          this.errors.push('Asset is required');
        }
        if (this.connector.connector.theProtocol.length == 0) {
          this.errors.push('Protocol is required');
        }
        if (this.connector.connector.theAccessRight.length == 0) {
          this.errors.push('Access right is required');
        }
        if (!this.errors.length) {
          return true;
        }
        else {
          return false;
        }
      },
      show() {
        this.$refs.connectorDialog.show();
      },
      protocolSelected(item) {
        this.connector.connector.theProtocol = item;
      },
      protocolsLoaded(item) {
        this.connector.connector.theProtocol = item;
      },
      accessRightSelected(item) {
        this.connector.connector.theAccessRight = item;
      },
      accessRightsLoaded(item) {
        this.connector.connector.theAccessRight = item;
      },
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('connector-update',{connector : this.connector.connector,update : this.patternConnector.update,index: this.patternConnector.update ? this.connector.index : -1});
          this.$refs.connectorDialog.hide();
        }
      }
    }
  }
</script>