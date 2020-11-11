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

  <div class="templateasset">
    <property-modal ref="propertyDialog" :securityProperty="selectedProperty" v-on:property-update="updateProperty"/> 
    <asset-interface-modal ref="assetInterfaceDialog" :assetInterface="selectedInterface" v-on:interface-update="updateAssetInterface"/> 
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <b-form v-on:property-update="updateProperty">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Summary" active>
            <b-card bg-variant="light">
              <b-row>
                <b-col md="6">
                  <b-form-group label="Asset" label-class="font-weight-bold text-md-left" label-for="theAssetInput">
                    <b-form-input id="theAssetInput" v-model="objt.theName" type="text" required />
                  </b-form-group>
                </b-col>
                <b-col md="2">
                  <b-form-group label="Shortcode" label-class="font-weight-bold text-md-left" label-for="theShortCodeInput">
                    <b-form-input id="theShortCodeInput" v-model="objt.theShortCode" type="text" required />
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group label="Type" label-class="font-weight-bold text-md-left" label-for="theTypeInput">
                    <b-form-select id="theTypeInput" v-model="objt.theType" :options="assetTypes" class="mb-3" required />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-group label="Description" label-class="font-weight-bold text-md-left" label-for="theDescriptionInput">
                    <b-form-textarea id="theDescription" v-model="objt.theDescription" type="text" :rows=4 :max-rows=4 required />
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Significance" label-class="font-weight-bold text-md-left" label-for="theSignificanceInput">
                    <b-form-textarea id="theSignificance" v-model="objt.theSignificance" type="text" :rows=4 :max-rows=4 required />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-group label="Surface Type" label-class="font-weight-bold text-md-left" label-for="theSurfaceTypeSelect">
                    <dimension-select id="theSurfaceTypeSelect" dimension='surface_type' :initial="objt.theSurfaceType" v-on:dimension-select-change="surfaceTypeSelected" v-on:dimension-items-updated="surfaceTypesLoaded" />
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Access Right" label-class="font-weight-bold text-md-left" label-for="theAccessRightSelect">
                    <dimension-select id="theAccessRightSelect" dimension='access_right' :initial="objt.theAccessRight" v-on:dimension-select-change="accessRightSelected" v-on:dimension-items-updated="accessRightsLoaded" />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group label="Tags" label-class="font-weight-bold text-md-left" label-cols="1" label-for="theTagsInput">
                    <b-form-tags v-model="objt.theTags" separator="," placeholder="Enter new tags separated by comma" remove-on-delete tag-variant="primary" tag-pills class="md-8"></b-form-tags>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card> 
          </b-tab>
          <b-tab title="Interfaces">
            <b-card bg-variant="light">
              <b-table striped small hover :items="objt.theInterfaces" :fields=interfaceTableFields @row-clicked="viewInterface">
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
        </b-tabs>
        <b-container fluid>
          <b-table striped small hover :items="notNone" :fields=propTableFields @row-clicked="viewProperty">
            <!-- eslint-disable-next-line -->
            <template v-slot:head(propactions)="data"> 
              <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addProperty"/> 
            </template> 
            <template v-slot:cell(propactions)="row">
              <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="clearProperty(row.item)"/>
            </template> 
          </b-table>
        </b-container>
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

import objectMixin from '../mixins/objectMixin';
import propertiesMixin from '../mixins/propertiesMixin';
import PropertyModal from '@/components/PropertyModal';
import DimensionSelect from '@/components/DimensionSelect';
import AssetInterfaceModal from '@/components/AssetInterfaceModal';

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
    propertiesMixin
  ],
  computed : {
    unusedProperties() {
      return this.objt.theProperties.filter(prop => (prop.value == 'None')).map(prop => prop.name);
    }
  },
  components : {
    PropertyModal,
    DimensionSelect,
    AssetInterfaceModal
  },
  data() {
    return {
      objt : this.object,
      commitLabel : this.label,
      envPropIndex : 0,
      errors : [],
      selectedInterface : {
        update : false,
        assetinterface : {
          theInterfaceName : '',
          theInterfaceType : '',
          theAccessRight : '',
          thePrivilege : ''
        }
      },
      assetTypes: ['Hardware','Information','People','Software','Systems','Systems - General','System of Systems'],
      interfaceTableFields : [
        {key: 'intactions', label : ''},
        {key: 'theInterfaceName', label : 'Interface'},
        {key: 'theInterfaceType', label : 'Type'},
        {key: 'theAccessRight', label : 'Access Right'},
        {key: 'thePrivilege', label : 'Privilege'} 
      ]
    }
  }, 
  methods: {
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0 || this.objt.theName.trim().length == 0) {
        this.errors.push('Asset name is required');
      }
      const resChars = /[<>‘'`"\\:%/_*?#£$&]/ ;
      const res = this.objt.theName.match(resChars);
      if (res != null) {
        this.errors.push('Character ' + res['index'] + ' in ' + this.objt.theName + ' is a reserved character.');
      }
      if (this.objt.theShortCode.length == 0) {
        this.errors.push('Short code is required');
      }
      if (this.objt.theType.length == 0) {
        this.errors.push('Asset type is required');
      }
      if (this.objt.theDescription.length == 0) {
        this.errors.push('Description is required');
      }
      if (this.objt.theSignificance.length == 0) {
        this.errors.push('Significance is required');
      }
      if (this.objt.theSurfaceType.length == 0) {
        this.errors.push('Surface type is required');
      }
      if (this.objt.theAccessRight.length == 0) {
        this.errors.push('Access right is required');
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    },
    accessRightSelected(item) {
      if (item != undefined) {
        this.objt.theAccessRight = item;
      }
    },
    accessRightsLoaded(item) {
      this.objt.theAccessRight = item;
    },
    surfaceTypeSelected(item) {
      if (item != undefined) {
        this.objt.theSurfaceType = item;
      }
    },
    surfaceTypesLoaded(item) {
      this.objt.theSurfaceType = item;
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
      this.$router.push({ name: 'objectsview', params: {dimension: 'asset'}});
    },
    addInterface() {
      this.selectedInterface['assetinterface'] = {theInterfaceName : '', theInterfaceType : '', theAccessRight : '', thePrivilege: ''};
      this.selectedInterface['update'] = false;
      this.$refs.assetInterfaceDialog.show();  
    },
    deleteInterface(index) {
      this.objt.theInterfaces.splice(index,1);
    },
    viewInterface(data,index) {
      this.selectedInterface['index'] = index
      this.selectedInterface['assetinterface'] = JSON.parse(JSON.stringify(data));
      this.selectedInterface['update'] = true;
      this.$refs.assetInterfaceDialog.show();  
    },
    updateAssetInterface : function(updIf) {
      if (updIf.update) {
        this.$set(this.objt.theInterfaces,updIf.index,updIf.interface);
      }
      else {
        this.objt.theInterfaces.push(updIf.interface);
      }
    }
  }
}
</script>