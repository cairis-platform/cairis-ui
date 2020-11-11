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
  <div class="persona">
    <dimension-modal ref="environmentDialog" dimension="environment" :existing="environmentNames" v-on:dimension-modal-update="addPersonaEnvironmentProperty"/> 
    <dimension-modal ref="roleDialog" dimension="role" :existing="environmentRoles" v-on:dimension-modal-update="addPersonaRole"/> 
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <b-form>
      <b-container fluid>
        <b-card no-body>
        <b-row>
          <b-col md=2>
            <b-img :src="personaImage" rounded center fluid-grow @click="imageClicked" /> 
            <p><input type="file" ref="personaimageupload" style="display: none" @change="imageSelected"></p>
          </b-col>
          <b-col md=10>
            <b-card bg-variant="light" no-body>
            <b-tabs card>
              <b-tab title="Summary" active>
                <b-card bg-variant="light">
                  <b-row>
                    <b-col md="5">
                      <b-form-group label="Persona" label-class="font-weight-bold text-md-left" label-for="thePersonaInput">
                        <b-form-input id="thePersonaInput" v-model="objt.theName" type="text" required />
                      </b-form-group>
                    </b-col>
                    <b-col md="5">
                      <b-form-group label="Type" label-class="font-weight-bold text-md-left" label-for="theTypeInput">
                        <b-form-select id="theTypeInput" v-model="objt.thePersonaType" :options="personaTypes" class="mb-3" required />
                      </b-form-group>
                    </b-col>
                    <b-col md="2">
                      <b-form-group label="Assumption-based" label-class="font-weight-bold text-md-left" label-for="theAssumptionCheck">
                        <b-form-checkbox id="theAssumptionCheck" v-model="isAssumption" />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-form-group label="Tags" label-class="font-weight-bold text-md-left" label-for="theTagsInput">
                    <b-form-tags v-model="objt.theTags" separator="," placeholder="Enter new tags separated by comma" remove-on-delete tag-variant="primary" tag-pills class="md-8"></b-form-tags>
                  </b-form-group>
                </b-card>
              </b-tab>
              <b-tab title="Activities">
                <b-form-textarea id="theActivities" v-model="objt.theActivities" type="text" rows="10" max-rows="10" required />
              </b-tab>
              <b-tab title="Attitudes">
                <b-form-textarea id="theAttitudes" v-model="objt.theAttitudes" type="text" rows="10" max-rows="10" required />
              </b-tab>
              <b-tab title="Aptitudes">
                <b-form-textarea id="theAptitudes" v-model="objt.theAptitudes" type="text" rows="10" max-rows="10" required />
              </b-tab>
              <b-tab title="Motivations">
                <b-form-textarea id="theMotivations" v-model="objt.theMotivations" type="text" rows="10" max-rows="10" required />
              </b-tab>
              <b-tab title="Skills">
                <b-form-textarea id="theSkills" v-model="objt.theSkills" type="text" rows="10" max-rows="10" required />
              </b-tab>
              <b-tab title="Contextual Trust">
                <b-form-textarea id="theContextual" v-model="objt.theContextual" type="text" rows="10" max-rows="10" required />
              </b-tab>
              <b-tab title="Intrinsic Trust">
                <b-form-textarea id="theIntrinsic" v-model="objt.theIntrinsic" type="text" rows="10" max-rows="10" required />
              </b-tab>
            </b-tabs>
            </b-card>
          </b-col>
        </b-row>
        <b-row><b-container fluid>
          <b-card header="Environments" no-body class="text-left">
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
                 <b-tabs>
                   <b-tab title="Roles" active>
                     <b-row>
                       <b-col sm="2">
                         <b-form-checkbox v-model="directFlag" value="True" unchecked-value="False" >Direct User</b-form-checkbox>
                       </b-col>
                     </b-row>
                     <b-row>
                       <b-col>
                         <b-table striped small bordered :fields="roleTableFields" :items="environmentRoles">
                           <!-- eslint-disable-next-line -->
                           <template v-slot:head(roleactions)="data"> 
                             <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addRole(data)"/> 
                           </template>
                           <template v-slot:cell(roleactions)="row">
                             <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteRole(row.item)"/>
                           </template>
                         </b-table>
                      </b-col>
                     </b-row>
                   </b-tab>
                   <b-tab title="Narrative">
                     <b-form-textarea id="theNarrative" v-model="narrative" type="text" rows="4" max-rows="4" required />
                   </b-tab>
                 </b-tabs>
               </b-col>
             </b-row>
           </b-card></b-container>
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
    object: 'setObject'
  },
  mixins : [
    objectMixin,
    environmentMixin
  ],
  computed : {
    personaImage() {
      return (this.objt.theImage != '' ? this.$store.state.url + '/images/' + this.objt.theImage : this.$store.state.url + '/assets/default-avatar.png') + "?session_id=" + this.$store.state.session;
    },
    environmentRoles() {
      return this.objt.theEnvironmentProperties.length > 0 && this.envPropIndex >= 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theRoles.map(role => ({name : role})) : []
    },
    narrative : {
      get : function() {
        return this.objt.theEnvironmentProperties.length > 0 && this.envPropIndex >= 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theNarrative : ''
      },
      set : function(value) {
        this.objt.theEnvironmentProperties[this.envPropIndex].theNarrative = value;
      }
    },
    directFlag : {
      get : function() {
        return this.objt.theEnvironmentProperties.length > 0 && this.envPropIndex >= 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theDirectFlag : ''
      },
      set : function(value) {
        this.objt.theEnvironmentProperties[this.envPropIndex].theDirectFlag = value;
      }
    },
    isAssumption : {
      get : function() {
        return this.objt.isAssumption == 1 ? true : false; 
      },
      set : function(value) {
        this.objt.isAssumption = (value ? 1 : 0);
      }
    }
  },
  components : {
    DimensionModal
  },
  data() {
    return {
      errors : [],
      objt : this.object,
      envPropIndex : 0,
      commitLabel : this.label,
      personaTypes : [
        "Customer",
        "Negative",
        "Primary",
        "Secondary",
        "Served",
        "Supplemental"
      ],
      roleTableFields : [
        {key: 'roleactions',  label : ''},
        {key: 'name', label : 'Role'}
      ]
    }
  },
  methods : {
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
      this.$router.push({ name: 'objectsview', params: {dimension: 'persona'}});
    },
    addPersonaEnvironmentProperty : function(envName) {
      this.addEnvironmentProperty({
        theEnvironmentName : envName,
        theDirectFlag : false,
        theRoles : [],
        theNarrative : ''
      });
    },
    addRole() {
      this.$refs.roleDialog.show();  
    },
    addPersonaRole(data) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theRoles.push(data);
    },
    deleteRole(item) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theRoles = this.objt.theEnvironmentProperties[this.envPropIndex].theRoles.filter(role => (role != item.name));
    },
    deleteMotive(item) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theMotives = this.objt.theEnvironmentProperties[this.envPropIndex].theMotives.filter(motive => (motive != item.name));
    },
    imageClicked() {
      this.$refs.personaimageupload.click();
    },
    imageSelected(evt) {
      evt.preventDefault();
      let fd = new FormData();
      const imageFile = this.$refs.personaimageupload.files[0];
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
      })
    },
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0 || this.objt.theName.trim().length == 0) {
        this.errors.push('Persona name is required');
      }
      const resChars = /[<>‘'`"\\:%/_*?#£$&]/ ;
      const res = this.objt.theName.match(resChars);
      if (res != null) {
        this.errors.push('Character ' + res['index'] + ' in ' + this.objt.theName + ' is a reserved character.');
      }
      if (this.objt.thePersonaType.length == 0) {
        this.errors.push('Persona type is required');
      }
      if (this.objt.theActivities.length == 0) {
        this.errors.push('Activities is required');
      }
      if (this.objt.theAptitudes.length == 0) {
        this.errors.push('Aptitudes is required');
      }
      if (this.objt.theAttitudes.length == 0) {
        this.errors.push('Attitudes is required');
      }
      if (this.objt.theMotivations.length == 0) {
        this.errors.push('Motivations is required');
      }
      if (this.objt.theSkills.length == 0) {
        this.errors.push('Skills is required');
      }
      if (this.objt.theIntrinsic.length == 0) {
        this.errors.push('Intrinsic trust is required');
      }
      if (this.objt.theContextual.length == 0) {
        this.errors.push('Contextual trust is required');
      }
      if (this.objt.theEnvironmentProperties.length == 0) {
        this.errors.push('No environment properties have been defined')
      }
      for (let i = 0; i < this.objt.theEnvironmentProperties.length; i++) {
        const envProps = this.objt.theEnvironmentProperties[i];
        if (envProps.theRoles.length == 0) {
          this.errors.push('No roles set for environment ' + envProps.theEnvironmentName);
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