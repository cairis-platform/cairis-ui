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
    <b-breadcrumb :items="bcItems" /> 
    <dimension-modal ref="environmentDialog" dimension="environment" :existing="environmentNames" v-on:dimension-modal-update="addAttackerEnvironmentProperty"/> 
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <b-form>
      <b-container fluid>
      <b-card no body>
        <b-row v-align="start">
          <b-col md=2>
            <b-img :src="attackerImage" fluid-grow /> 
          </b-col>
          <b-col md=10>
            <b-container fluid>
              <b-form-group label="<b>Attacker</b>" label-class="text-md-left" label-for="theAttackerInput">
                <b-form-input id="theAttackerInput" v-model="objt.theName" type="text" required>
                </b-form-input>
              </b-form-group>
              <b-form-group label="<b>Tags</b>" label-class="text-md-left" label-for="theTagsInput">
                <b-form-input id="theTagsInput" v-model="objt.theTags" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="<b>Description</b>" label-class="text-md-left" label-for="theDescription">
                <b-form-textarea id="theDescriptionInput" v-model="objt.theDescription" type="text" :rows=5 :max-rows=7 required>
                </b-form-textarea>
              </b-form-group>
            </b-container>
          </b-col>
        </b-row>
        <b-row>
          <b-container fluid>
            <b-card header="<b>Environments</b>" no-body class="text-left">
              <template slot="header">
                <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addEnvironment"/> Environment
              </template> 
              <b-row class="jusfify-content-md-left" align-content>
                <b-col sm="12">
                  <b-tabs v-model="envPropIndex">
                    <b-tab v-for="envProp in objt.theEnvironmentProperties" :key="envProp.theEnvironmentName" :title=envProp.theName>
                      <template slot="title">
                        <font-awesome-icon icon="minus" :style="{color: 'red'}" @click="deleteEnvironment(envProp.theEnvironmentName)"/>  {{envProp.theEnvironmentName}}
                      </template> 
                    </b-tab>
                  </b-tabs>
                </b-col>
              </b-row>
              <b-row class="justify-content-md-left" v-show="this.objt.theEnvironmentProperties.length">
                <b-col sm="4">
                  <b-table striped bordered :fields="roleTableFields" :items="objt.theEnvironmentProperties[envPropIndex].theRoles.map(role => ({name : role}))">
                    <template slot="HEAD_roleactions" slot-scope="data"> 
                      <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addRole(data)"/> 
                    </template>
                    <template slot="roleactions" slot-scope="row">
                      <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteRole(row.item)"/>
                    </template>
                  </b-table>
                </b-col>
                <b-col sm="4">
                  <b-table striped bordered :fields="motiveTableFields" :items="objt.theEnvironmentProperties[envPropIndex].theMotives.map(motive => ({name : motive}))">
                    <template slot="HEAD_motiveactions" slot-scope="data"> 
                      <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addMotive(data)"/> 
                    </template>
                    <template slot="motiveactions" slot-scope="row">
                      <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteMotive(row.item)"/>
                    </template>
                  </b-table>
                </b-col>
                <b-col sm="4">
                  <b-table striped bordered :fields="capabilityTableFields" :items="objt.theEnvironmentProperties[envPropIndex].theCapabilities">
                    <template slot="HEAD_capabilityactions" slot-scope="data"> 
                      <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addCapability(data)"/> 
                    </template>
                    <template slot="capabilityactions" slot-scope="row">
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
import axios from 'axios';
import store from '../store'
import EventBus from '../utils/event-bus';
import objectMixin from '../mixins/objectMixin'

export default {
  props : {
    objectName : String
  },
  mixins : [
    objectMixin
  ],
  computed : {
    bcItems() {
     return [{text: 'Home', to: {name: 'home'}},{text: 'Attackers', to: {name: 'attackers'}},{text: this.objt.theName, to : {name: 'attacker'}}]
    },
    attackerImage() {
      return this.objt.theImage != '' ? this.$store.state.url + '/images/' + this.objt.theImage : this.$store.state.url + '/assets/default-avatar.png'
    }
  },
  components : {
    DimensionModal
  },
  data() {
    return {
      errors : [],
      envPropIndex : 0,
      commitLabel : 'Create',
      roleTableFields : {
        roleactions : {label : ''},
        name : {label : 'Role'}
      },
      motiveTableFields : {
        motiveactions : {label : ''},
        name : {label : 'Motivation'}
      },
      capabilityTableFields : {
        capabilityactions : {label : ''},
        name : {label : 'Capability'},
        value : {label : 'Value'}
      },
      objt : {
        theName : '',
        theTags : [],
        theDescription : '',
        theImage : '',
        theEnvironmentProperties : []
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.objectName == 'New attacker') {
      next();
    }
    else {
      var url = "/api/attackers/name/" + to.params.objectName
      axios.get(url,{
        baseURL : store.state.url,
        params : {'session_id' : store.state.session}
      })
      .then(response => {
        next(vm => {
          vm.commitLabel = 'Update';
          vm.objt = response.data;
        })
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    }
  },
  methods : {
    onCommit(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'attackers'})
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'attackers'})
    },
    addAttackerEnvironmentProperty : function(envName) {
      this.addEnvironmentProperty({
        theEnvironmentName : envName,
        theRoles : [],
        theMotives : [],
        theCapabilities : []
      });
    },
    addRole(data) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theRoles.push('new role');
    },
    deleteRole(item) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theRoles = this.objt.theEnvironmentProperties[this.envPropIndex].theRoles.filter(role => (role != item.name));
    },
    addMotive(data) {
      console.log('adding motive');
    },
    deleteMotive(item) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theMotives = this.objt.theEnvironmentProperties[this.envPropIndex].theMotives.filter(motive => (motive != item.name));
    },
    addCapability(data) {
      console.log('adding capability');
    },
    deleteCapability(item) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theCapabilities = this.objt.theEnvironmentProperties[this.envPropIndex].theCapabilities.filter(cap => (cap.name != item.name));
    }
  }

}
</script>