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

  <div class="locations">
    <instance-modal ref="objtDialog" instanceType="asset" :locationInstance="selectedAssetInstance" v-on:instance-update="updateObject"/> 
    <instance-modal ref="personDialog" instanceType="persona" :locationInstance="selectedPersonaInstance" v-on:instance-update="updatePerson"/> 
    <link-modal ref="linkDialog" :locations="locationNames" v-on:link-update="addLocationLink" />
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
              <b-form-group label="Name" label-class="font-weight-bold text-md-left" label-for="theNameInput">
                 <b-form-input id="theNameInput" v-model="objt.theName" type="text" required />
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
        <b-container fluid>
          <b-card header="Location" no-body class="text-left">
            <template slot="header">
              <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addLocation"/> Location
            </template> 
            <b-container fluid v-if="objt.theLocations.length > 0">
              <b-row md="12">
                <b-container fluid>
                  <b-tabs card v-model="locationIndex">
                    <b-tab v-for="loc in objt.theLocations" :key="loc.theName" :title=loc.theName>
                      <template slot="title">
                        <font-awesome-icon icon="minus" :style="{color: 'red'}" @click="deleteLocation(loc.theName)"/>  {{loc.theName}}
                      </template> 
                      <b-row md="12">
                        <b-container fluid>
                        <b-form-group label="Name" label-class="font-weight-bold text-md-left" label-for="theLocationNameInput">
                          <b-form-input id="theLocationNameInput" v-model="objt.theLocations[locationIndex].theName" type="text" required />
                        </b-form-group>
                        </b-container>
                      </b-row>
                      <b-row md="12">
                        <b-container fluid>
                        <b-tabs>
                          <b-tab title="Objects" active>
                            <b-card bg-variant="light">
                              <b-row>
                                <b-col md="12">
                                  <b-table striped bordered small hover :items="objects" :fields="objectTableFields" @row-clicked="viewObject">
                                    <!-- eslint-disable-next-line -->
                                    <template v-slot:head(objectactions)="data">
                                      <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addObject"/> 
                                    </template>
                                    <template v-slot:cell(objectactions)="row">
                                      <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteObject(row.index)"/>
                                    </template>
                                  </b-table> 
                                </b-col>
                              </b-row>
                            </b-card>
                          </b-tab>
                          <b-tab title="People">
                            <b-card bg-variant="light">
                              <b-row>
                                <b-col md="12">
                                  <b-table striped bordered small hover :items="people" :fields="personTableFields" @row-clicked="viewPerson">
                                    <!-- eslint-disable-next-line -->
                                    <template v-slot:head(personactions)="data">
                                      <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addPerson"/> 
                                    </template>
                                    <template v-slot:cell(personactions)="row">
                                      <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deletePerson(row.index)"/>
                                    </template>
                                  </b-table> 
                                </b-col>
                              </b-row>
                            </b-card>
                          </b-tab>
                          <b-tab title="Links">
                            <b-card bg-variant="light">
                              <b-row>
                                <b-col md="12">
                                  <b-table striped bordered small hover :items="links" :fields="linkTableFields">
                                    <!-- eslint-disable-next-line -->
                                    <template v-slot:head(linkactions)="data">
                                      <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addLink"/> 
                                    </template>
                                    <template v-slot:cell(linkactions)="row">
                                      <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteLink(row.index)"/>
                                    </template>
                                  </b-table> 
                                </b-col>
                              </b-row>
                            </b-card>
                          </b-tab>
                        </b-tabs>
                        </b-container>
                      </b-row>
                    </b-tab>
                  </b-tabs>
                </b-container>
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
      </b-container>
    </b-form>
  </div>
</template>

<script>

import InstanceModal from '@/components/InstanceModal'
import LinkModal from '@/components/LinkModal'

export default {
  props : {
    object : Object,
    label : String
  },
  watch : {
    object: 'setObject'
  },
  computed : {
    objects() {
      return this.objt != undefined && this.objt.theLocations.length > 0 ? this.objt.theLocations[this.locationIndex].theAssetInstances : [];
    },
    people() {
      return this.objt != undefined && this.objt.theLocations.length > 0 ? this.objt.theLocations[this.locationIndex].thePersonaInstances : [];
    },
    links() {
      return this.objt != undefined && this.objt.theLocations.length > 0 ? this.objt.theLocations[this.locationIndex].theLinks.map(l => ({name : l})) : [];
    },
    locationNames() {
      return this.objt != undefined && this.objt.theLocations.length > 0 && this.locationIndex != -1 ? this.objt.theLocations.filter(l => (l.theName != this.objt.theLocations[this.locationIndex].theName)).map(l => l.theName) : [];
    }
  },
  components : {
    InstanceModal,
    LinkModal
  },
  data() {
    return {
      objt : this.object,
      commitLabel : this.label,
      locationIndex : 0,
      errors : [],
      objectTableFields : [
        {key: 'objectactions', label : ''},
        {key: 'theName', label : 'Name', sortable: true},
        {key: 'theAsset', label : 'Asset', sortable: true},
      ],
      personTableFields : [
        {key: 'personactions', label : ''},
        {key: 'theName', label : 'Name', sortable: true},
        {key: 'thePersona', label : 'Persona', sortable: true},
      ],
      linkTableFields : [
        {key: 'linkactions', label : ''},
        {key: 'name', label : 'Link', sortable: true}
      ],
      selectedAssetInstance : {
        update : false,
        instance : {
          theName : '', 
          theAsset : ''
         }
      },
      selectedPersonaInstance : {
        update : false,
        instance : {
          theName : '', 
          thePersona : ''
         }
      },
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
      this.$router.push({ name: 'objectsview', params: {dimension: 'locations'}});
    },
    deleteLocation(locName) {
      this.objt.theLocations = this.objt.theLocations.filter(l => (l.theName != locName));
    },
    addLocation() {
      let l = {theName: 'New location', theAssetInstances: [], thePersonaInstances : [], theLinks : []};
      this.objt.theLocations.push(l);
    },
    addObject() {
      this.selectedAssetInstance['instance'] = {theName: '', theAsset: ''};
      this.selectedAssetInstance['update'] = false;
      this.$refs.objtDialog.show();  
    },
    deleteObject(index) {
      this.objt.theLocations[this.locationIndex].theAssetInstances.splice(index,1);
    },
    viewObject(data,index) {
      this.selectedAssetInstance['index'] = index
      this.selectedAssetInstance['instance'] = JSON.parse(JSON.stringify(data));
      this.selectedAssetInstance['update'] = true;
      this.$refs.objtDialog.show();  
    },
    updateObject : function(updInst) {
      if (updInst.update) {
        this.$set(this.objt.theLocations[this.locationIndex].theAssetInstances,updInst.index,updInst.instance);
      }
      else {
        this.objt.theLocations[this.locationIndex].theAssetInstances.push(updInst.instance);
      }
    },
    addPerson() {
      this.selectedPersonaInstance['instance'] = {theName: '', thePersona: ''};
      this.selectedPersonaInstance['update'] = false;
      this.$refs.personDialog.show();  
    },
    deletePerson(index) {
      this.objt.theLocations[this.locationIndex].thePersonaInstances.splice(index,1);
    },
    viewPerson(data,index) {
      this.selectedPersonaInstance['index'] = index
      this.selectedPersonaInstance['instance'] = JSON.parse(JSON.stringify(data));
      this.selectedPersonaInstance['update'] = true;
      this.$refs.personDialog.show();  
    },
    updatePerson : function(updInst) {
      if (updInst.update) {
        this.$set(this.objt.theLocations[this.locationIndex].thePersonaInstances,updInst.index,updInst.instance);
      }
      else {
        this.objt.theLocations[this.locationIndex].thePersonaInstances.push(updInst.instance);
      }
    },
    addLink() {
      this.$refs.linkDialog.show();  
    },
    deleteLink(index) {
      const originName = this.objt.theLocations[this.locationIndex].theName;
      const linkedName = this.objt.theLocations[this.locationIndex].theLinks[index];
      this.objt.theLocations[this.locationIndex].theLinks.splice(index,1);
      this.objt.theLocations.forEach(loc => {
        if (loc.theName == linkedName) {
          loc.theLinks = loc.theLinks.filter(li => li != originName);
        }
      });
    },
    addLocationLink : function(updLink) {
      const originName = this.objt.theLocations[this.locationIndex].theName;
      this.objt.theLocations[this.locationIndex].theLinks.push(updLink);
      this.objt.theLocations.forEach(loc => {
        if (loc.theName == updLink) {
          loc.theLinks.push(originName);
        }
      });
    }
  }
}
</script>