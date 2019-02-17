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
  <div class="propertiesmodel">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <revision-modal ref="revisionDialog" v-on:revision-update="updateRevision"/> 
    <contributor-modal ref="contributorDialog" :contributor="selectedContributor" v-on:contributor-update="updateContributor"/> 
    <naming-convention-modal ref="ncDialog" :definition="selectedDefinition" v-on:naming-convention-update="updateDefinition"/> 
    <b-form>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Background" active>
            <b-container fluid>
              <b-row>
                <b-col md="12">
                  <b-form-group label="Project" label-class="font-weight-bold text-md-left" label-cols="1" label-for="theProjectInput">
                    <b-form-input id="theProjectInput" v-model="objt.projectName" type="text" required>
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group label="Background" label-class="font-weight-bold text-md-left" label-for="theBackgroundInput">
                    <b-form-textarea id="theBackgroundInput" v-model="objt.projectBackground" type="text" :rows=10 :max-rows=12 required>
                    </b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-container>
          </b-tab>
          <b-tab title="Goals">
            <b-container fluid>
              <b-form-textarea id="theProjectGoalsInput" v-model="objt.projectGoals" type="text" :rows=10 :max-rows=12 required>
              </b-form-textarea>
            </b-container>
          </b-tab>
          <b-tab title="Scope">
            <b-container fluid>
              <b-form-textarea id="theProjectScopeInput" v-model="objt.projectScope" type="text" :rows=10 :max-rows=12 required>
              </b-form-textarea>
            </b-container>
          </b-tab>
          <b-tab title="Rich Picture">
            <b-container fluid>
              <b-img :src="richPictureImage" rounded center fluid-grow @click="imageClicked" /> 
              <p><input type="file" ref="richpictureupload" style="display: none" @change="imageSelected"></p>
            </b-container>
          </b-tab>
          <b-tab title="Naming Conventions">
            <b-container fluid>
              <b-table striped small bordered :fields="conventionTableFields" :items="objt.definitions" @row-clicked="viewDefinition">
                <!-- eslint-disable-next-line -->
                <template slot="HEAD_conventionactions" slot-scope="data"> 
                  <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addDefinition"/> 
                </template>
                <template slot="conventionactions" slot-scope="row">
                  <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteDefinition(row.item)"/>
                </template>
              </b-table>
            </b-container>
          </b-tab>
          <b-tab title="Contributors">
            <b-container fluid>
              <b-table striped small bordered :fields="contributorTableFields" :items="objt.contributions" @row-clicked="viewContributor">
                <!-- eslint-disable-next-line -->
                <template slot="HEAD_contributionactions" slot-scope="data"> 
                  <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addContributor"/> 
                </template>
                <template slot="contributionactions" slot-scope="row">
                  <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteContributor(row.item)"/>
                </template>
              </b-table>
            </b-container>
          </b-tab>
          <b-tab title="Revisions">
            <b-container fluid>
              <b-table striped small bordered :fields="revisionTableFields" :items="objt.revisions">
                <!-- eslint-disable-next-line -->
                <template slot="HEAD_revisionactions" slot-scope="data"> 
                  <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addRevision"/> 
                </template>
              </b-table>
            </b-container>
          </b-tab>
        </b-tabs>
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

import axios from 'axios'
import EventBus from '../utils/event-bus';

export default {
  props : {
    object : Object
  },
  watch : {
    object: 'setObject'
  },
  computed : {
    richPictureImage() {
      return this.objt.richPicture != '' ? this.$store.state.url + '/images/' + this.objt.richPicture : this.$store.state.url + '/assets/default-avatar.png'
    }
  },
  components : {
    RevisionModal : () => import('@/components/RevisionModal.vue'),
    ContributorModal : () => import('@/components/ContributorModal.vue'),
    NamingConventionModal : () => import('@/components/NamingConventionModal.vue')
  },
  data() {
    return {
      errors : [],
      objt : this.object,
      commitLabel : 'Update',
      conventionTableFields : {
        conventionactions : {label : ''},
        name : {label : 'Name', sortable: true},
        value : {label : 'Definition'}
      },
      contributorTableFields : {
        contributionactions : {label : ''},
        firstName : {label : 'Firstname', sortable: true},
        surname : {label : 'Surname', sortable: true},
        affiliation : {label : 'Affiliation', sortable: true},
        role : {label : 'Role', sortable: true}
      },
      revisionTableFields : {
        revisionactions : {label : ''},
        id : {label : 'Version', sortable: true},
        date : {label : 'Date'},
        description : {label : 'Description'}
      },
      selectedDefinition : {
        update : false,
        definition : {
          name : '',
          value : ''
        } 
      },
      selectedContributor : {
        update : false,
        contributor : {
          firstName : '',
          surname : '',
          affiliation : '',
          role : ''
        }
      }
    }
  },
  methods : {
    setObject() {
      this.objt = this.object;
    },
    onCommit(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        this.$emit('properties-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'home'});
    },
    addDefinition() {
      this.selectedDefinition['definition'] = {name : '', value : ''};
      this.selectedDefinition['update'] = false;
      this.$refs.ncDialog.show();  
    },
    viewDefinition(item,index) {
      this.selectedDefinition['index'] = index
      this.selectedDefinition['definition'] = JSON.parse(JSON.stringify(item));
      this.selectedDefinition['update'] = true;
      this.$refs.ncDialog.show();  
    },
    updateDefinition(updDef) {
      if (updDef.update) {
        this.$set(this.objt.definitions,updDef.index,updDef.definition);
      }
      else {
        this.objt.definitions.push(updDef.definition);
      }
    },
    deleteDefinition(item) {
      this.objt.definitions = this.objt.definitions.filter(defn => (defn.name != item.name && defn.value != item.value));
    },
    addContributor() {
      this.selectedContributor['contributor'] = {firstName : '', surname : '', affiliation : '', role : 'Participant'};
      this.selectedContributor['update'] = false;
      this.$refs.contributorDialog.show();  
    },
    viewContributor(item,index) {
      this.selectedContributor['index'] = index
      this.selectedContributor['contributor'] = JSON.parse(JSON.stringify(item));
      this.selectedContributor['update'] = true;
      this.$refs.contributorDialog.show();  
    },
    deleteContributor(item) {
      this.objt.contributions = this.objt.contributions.filter(cont => (cont.firstName != item.firstName && cont.surname != item.surname));
    },
    updateContributor(updCont) {
      if (updCont.update) {
        this.$set(this.objt.contributions,updCont.index,updCont.contributor);
      }
      else {
        this.objt.contributions.push(updCont.contributor);
      }
    },
    addRevision() {
      this.$refs.revisionDialog.show();
    },
    updateRevision(revTxt) {
      const revId = this.objt.revisions.length == 0 ? 1 : this.objt.revisions.length + 1;
      const revDate = new Date().toISOString();
      this.objt.revisions.push({'id' : revId, 'date' : revDate, 'description' : revTxt});
    },
    imageClicked() {
      this.$refs.richpictureupload.click();
    },
    imageSelected(evt) {
      evt.preventDefault();
      const fd = new FormData();
      fd.append('file',this.$refs.richpictureimageupload.files[0])
      const url = this.$store.state.url + '/api/upload/image?session_id=' + this.$store.state.session
      axios.post(url, fd)
      .then(response => {
        this.objt.theImage = response.data.filename;
        EventBus.$emit('operation-success',response.data.message)
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
        console.log(error)
      })
    },
    checkForm() {
      this.errors = []
      if (this.objt.projectName.length == 0) {
        this.errors.push('Project name is required');
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    }
  }
}
</script>