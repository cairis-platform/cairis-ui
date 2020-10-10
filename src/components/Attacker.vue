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
  <div class="attacker">
    <dimension-modal ref="environmentDialog" dimension="environment" :existing="environmentNames" v-on:dimension-modal-update="addAttackerEnvironmentProperty"/> 
    <dimension-modal ref="roleDialog" dimension="role" :existing="environmentRoleNames" v-on:dimension-modal-update="addAttackerRole"/> 
    <dimension-modal ref="motiveDialog" dimension="motivation" :existing="environmentMotives" v-on:dimension-modal-update="addAttackerMotive"/> 
    <capability-modal ref="capabilityDialog" :existing="capabilityNames" v-on:capability-modal-update="addAttackerCapability"/> 
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
          <b-col md=2>
            <b-img :src="attackerImage" rounded center fluid-grow @click="imageClicked" /> 
            <p><input type="file" ref="attackerimageupload" style="display: none" @change="imageSelected"></p>
          </b-col>
          <b-col md=10>
            <b-container fluid>
              <b-form-group label="Attacker" label-class="font-weight-bold text-md-left" label-for="theAttackerInput">
                <b-form-input id="theAttackerInput" v-model="objt.theName" type="text" required />
              </b-form-group>
              <b-form-group label="Tags" label-class="font-weight-bold text-md-left" label-for="theTagsInput">
                <b-form-tags id="theTagsInput" v-model="objt.theTags" separator="," placeholder="Enter new tags separated by comma" remove-on-delete tag-variant="primary" tag-pills class="md-8"></b-form-tags>
              </b-form-group>
              <b-form-group label="Description" label-class="font-weight-bold text-md-left" label-for="theDescription">
                <b-form-textarea id="theDescriptionInput" v-model="objt.theDescription" type="text" :rows=5 :max-rows=7 required />
              </b-form-group>
            </b-container>
          </b-col>
        </b-row>
        <b-row>
          <b-container fluid>
            <b-card header="Environments" no-body class="text-left">
              <template slot="header">
                <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addEnvironment"/> Environment
              </template> 
              <b-row>
                <b-col sm="12">
                  <b-tabs pills v-model="envPropIndex">
                    <b-tab v-for="envProp in objt.theEnvironmentProperties" :key="envProp.theEnvironmentName" :title=envProp.theName>
                      <template slot="title">
                        <font-awesome-icon icon="minus" :style="{color: 'red'}" @click="deleteEnvironment(envProp.theEnvironmentName)"/>  {{envProp.theEnvironmentName}}
                      </template> 
                    </b-tab>
                  </b-tabs>
                </b-col>
              </b-row>
              <b-row v-show="this.objt.theEnvironmentProperties.length">
                <b-col sm="4">
                  <b-table striped small bordered :fields="roleTableFields" :items="environmentRoles">
                    <!-- eslint-disable-next-line -->
                    <template v-slot:head(roleactions)="data"> 
                      <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addRole"/> 
                    </template>
                    <template v-slot:cell(roleactions)="row">
                      <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteRole(row.item)"/>
                    </template>
                  </b-table>
                </b-col>
                <b-col sm="4">
                  <b-table striped small bordered :fields="motiveTableFields" :items="environmentMotives">
                    <!-- eslint-disable-next-line -->
                    <template v-slot:head(motiveactions)="data"> 
                      <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addMotive"/> 
                    </template>
                    <template v-slot:cell(motiveactions)="row">
                      <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteMotive(row.item)"/>
                    </template>
                  </b-table>
                </b-col>
                <b-col sm="4">
                  <b-table striped small bordered :fields="capabilityTableFields" :items="environmentCapabilities">
                    <!-- eslint-disable-next-line -->
                    <template v-slot:head(capabilityactions)="data"> 
                      <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addCapability"/> 
                    </template>
                    <template v-slot:cell(capabilityactions)="row">
                      <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteCapability(row.item)"/>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
            </b-card>
          </b-container>
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

import DimensionModal from '@/components/DimensionModal.vue'
import CapabilityModal from '@/components/CapabilityModal.vue'
import environmentMixin from '../mixins/environmentMixin'
import objectMixin from '../mixins/objectMixin'
import axios from 'axios'
import EventBus from '../utils/event-bus';
const mime = require('mime-types');
const randomstring = require('randomstring');

export default {
  props : {
    object : Object,
    label : String
  },
  watch : {
    object: {
      handler: function() {
        this.objt = this.object;
        this.commitLabel = this.label;
      },
      deep: true
    }
  },
  mixins : [
    environmentMixin,
    objectMixin
  ],
  computed : {
    attackerImage() {
      return (this.objt.theImage != '' ? this.$store.state.url + '/images/' + this.objt.theImage : this.$store.state.url + '/assets/default-avatar.png') + '?session_id=' + this.$store.state.session;
    },
    environmentRoles() {
      return this.objt.theEnvironmentProperties.length > 0 && this.envPropIndex >= 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theRoles.map(r => ({name: r})) : []
    },
    environmentRoleNames() {
      return this.objt.theEnvironmentProperties.length > 0 && this.envPropIndex >= 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theRoles : []
    },
    environmentMotives() {
      return this.objt.theEnvironmentProperties.length > 0 && this.envPropIndex >= 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theMotives.map(motive => ({name : motive})): []
    },
    environmentCapabilities() {
      return this.objt.theEnvironmentProperties.length > 0 && this.envPropIndex >= 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theCapabilities : []
    },
    capabilityNames() {
      return this.objt.theEnvironmentProperties.length > 0 && this.envPropIndex >= 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theCapabilities.map(cap => cap.name) : []
    },
  },
  components : {
    DimensionModal,
    CapabilityModal
  },
  data() {
    return {
      errors : [],
      objt : this.object,
      envPropIndex : 0,
      commitLabel : this.label,
      roleTableFields : [
        {key: 'roleactions', label : ''},
        {key: 'name', label : 'Role'}
      ],
      motiveTableFields : [
        {key: 'motiveactions', label : ''},
        {key: 'name', label : 'Motivation'}
      ],
      capabilityTableFields : [
        {key: 'capabilityactions', label : ''},
        {key: 'name', label : 'Capability'},
        {key: 'value', label : 'Value'}
      ]
    }
  },
  methods : {
    onCommit(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        this.$emit('object-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'objectsview', params: {dimension: 'attacker'}});
    },
    addAttackerEnvironmentProperty : function(envName) {
      this.addEnvironmentProperty({
        theEnvironmentName : envName,
        theRoles : [],
        theMotives : [],
        theCapabilities : []
      });
    },
    addRole() {
      this.$refs.roleDialog.show();  
    },
    addAttackerRole(data) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theRoles.push(data);
    },
    addAttackerMotive(data) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theMotives.push(data);
    },
    addAttackerCapability(data) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theCapabilities.push(data);
    },
    deleteRole(item) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theRoles = this.objt.theEnvironmentProperties[this.envPropIndex].theRoles.filter(role => (role != item.name));
    },
    addMotive() {
      this.$refs.motiveDialog.show();  
    },
    deleteMotive(item) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theMotives = this.objt.theEnvironmentProperties[this.envPropIndex].theMotives.filter(motive => (motive != item.name));
    },
    addCapability() {
      this.$refs.capabilityDialog.show();  
    },
    deleteCapability(item) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theCapabilities = this.objt.theEnvironmentProperties[this.envPropIndex].theCapabilities.filter(cap => (cap.name != item.name));
    },
    imageClicked() {
      this.$refs.attackerimageupload.click();
    },
    imageSelected(evt) {
      evt.preventDefault();
      let fd = new FormData();
      const imageFile = this.$refs.attackerimageupload.files[0];
      const imageName = randomstring.generate() + '.' + mime.extension(imageFile.type);
      fd.append('file',imageFile,imageName);
      const url = this.$store.state.url + '/api/upload/image?session_id=' + this.$store.state.session
      axios.post(url, fd)
      .then(response => {
        this.objt.theImage = imageName;
        EventBus.$emit('operation-success',response.data.message);
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error.response.data.message);
      });
    },
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0) {
        this.errors.push('Attacker name is required');
      }
      const resChars = /[<>‘'`"\\:%/_*?#£$&]/ ;
      const res = this.objt.theName.match(resChars);
      if (res != null) {
        this.errors.push('Character ' + res['index'] + ' in ' + this.objt.theName + ' is a reserved character.');
      }
      if (this.objt.theDescription.length == 0) {
        this.errors.push('Description is required');
      }
      if (this.objt.theEnvironmentProperties.length == 0) {
        this.errors.push('No environment properties have been defined')
      }
      for (let i = 0; i < this.objt.theEnvironmentProperties.length; i++) {
        const envProps = this.objt.theEnvironmentProperties[i];
        if (envProps.theRoles.length == 0) {
          this.errors.push('No roles set for environment ' + envProps.theEnvironmentName);
        }
        if (envProps.theMotives.length == 0) {
          this.errors.push('No motivations set for environment ' + envProps.theEnvironmentName);
        }
        if (envProps.theCapabilities.length == 0) {
          this.errors.push('No capabilities set for environment ' + envProps.theEnvironmentName);
        }
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    },
  }
}
</script>