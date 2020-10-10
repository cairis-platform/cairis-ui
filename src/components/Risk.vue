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

  <div class="risk">
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
            <b-col md="8">
              <b-form-group label="Risk" label-class="font-weight-bold text-md-left" label-for="theRiskInput">
                <b-form-input id="theRiskInput" v-model="objt.theName" type="text" />
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group label="Tags" label-class="font-weight-bold text-md-left" label-for="theTagsInput">
                <b-form-tags v-model="objt.theTags" separator="," placeholder="Enter new tags separated by comma" remove-on-delete tag-variant="primary" tag-pills class="md-8"></b-form-tags>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="6">
              <b-form-group label="Threat" label-class="font-weight-bold text-md-left" label-for="theThreatSelect">
                <dimension-select id="theThreatSelect" dimension='threat' :initial="objt.theThreatName" v-on:dimension-select-change="threatSelected" v-on:dimension-items-updated="threatsLoaded" />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Vulnerability" label-class="font-weight-bold text-md-left" label-for="theVulnerabilitySelect">
                <dimension-select id="theVulnerabilitySelect" dimension='vulnerability' :initial="objt.theVulnerabilityName" v-on:dimension-select-change="vulnerabilitySelected" v-on:dimension-items-updated="vulnerabilitiesLoaded" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-container>

      <b-container fluid>
        <b-card header="Environments" class="text-left">
          <b-row v-if="this.objt.theMisuseCase.theEnvironmentProperties.length">
            <b-col md="12">
              <b-tabs pills v-model="envPropIndex" >
                <b-tab v-for="envProp in misuseCaseEnvironments" :key="envProp.theEnvironmentName" :title="envProp.theEnvironmentName" />
              </b-tabs>
            </b-col> 
          </b-row>
          <b-row v-if="this.objt.theMisuseCase.theEnvironmentProperties.length">
            <b-col md="12">
              <b-tabs>
                <b-tab title="Impact" active>
                  <b-container fluid>
                    <b-row>
                      <b-col md="12">
                        <b-form-group label="Rating" label-class="font-weight-bold text-md-left" label-for="theRiskRating">
                          <b-form-input readonly id="theRiskRating" :value="riskrating"></b-form-input>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="12">
                        <b-table striped bordered small :fields="responseTableFields" :items="responses">
                          <template v-slot:cell(show_details)="row">
                            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                              {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                            </b-button>
                          </template>
                          <template slot="row-details" slot-scope="row">
                            <b-card>
                              <b-row class="mb-12">
                                <b-form-textarea id="theRiskDetailsText" v-model="row.item.details" type="text" rows="10" readonly />
                              </b-row>
                            </b-card>
                          </template>
                        </b-table>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-tab>
                <b-tab title="Misuse Case">
                  <b-container fluid>
                    <b-row>
                      <b-col md="6">
                        <b-form-group label="Attackers" label-class="font-weight-bold text-md-left" label-for="theAttackers">
                          <b-form-input readonly id="theAttackers" :value="attackers"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Assets" label-class="font-weight-bold text-md-left" label-for="theAssets">
                          <b-form-input readonly id="theAssets" :value="assets"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Objective" label-class="font-weight-bold text-md-left" label-for="theObjective">
                          <b-form-input readonly id="theObjective" :value="objective"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Likelihood" label-class="font-weight-bold text-md-left" label-for="theLikelihood">
                          <b-form-input readonly id="theLikelihood" :value="likelihood"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Severity" label-class="font-weight-bold text-md-left" label-for="theSeverity">
                          <b-form-input readonly id="theSeverity" :value="severity"></b-form-input>
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group label="Narrative" label-class="font-weight-bold text-md-left" label-for="theNarrativeInput">
                          <b-form-textarea id="theNarrativeInput" v-model="misuseCaseNarrative" type="text" :rows=16 required />
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-tab>
              </b-tabs>
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

import axios from 'axios';
import objectMixin from '../mixins/objectMixin'
import DimensionSelect from './DimensionSelect'
import EventBus from '../utils/event-bus';

export default {
  props : {
    object : Object,
    label : String
  },
  watch : {
    object: 'setObject',
    envUrl : 'getRiskImpact'
  },
  mixins : [
    objectMixin
  ],
  computed : {
    envUrl : {
      get : function() {
        return this.objt.theThreatName != '' && this.objt.theVulnerabilityName != '' ? '/api/environments/threat/' + this.objt.theThreatName + '/vulnerability/' + this.objt.theVulnerabilityName + '/names' : '';
      }
    },
    responses() {
      return this.theRiskImpact[this.environmentName] != undefined && this.envPropIndex != -1 ? this.theRiskImpact[this.environmentName] : [];
    },
    misuseCaseEnvironments() {
      return this.objt.theMisuseCase.theEnvironmentProperties;
    },
    riskrating : {
      get : function() {
        return this.objt.theMisuseCase.theEnvironmentProperties.length > 0 && this.envPropIndex != -1 ? this.objt.theMisuseCase.theEnvironmentProperties[this.envPropIndex].theRiskRating.rating : ''
      }
    },
    attackers : {
      get : function() {
        return this.objt.theMisuseCase.theEnvironmentProperties.length > 0 && this.envPropIndex != -1 ? this.objt.theMisuseCase.theEnvironmentProperties[this.envPropIndex].theAttackers.join(',') : ''
      }
    },
    assets : {
      get : function() {
        return this.objt.theMisuseCase.theEnvironmentProperties.length > 0 && this.envPropIndex != -1 ? this.objt.theMisuseCase.theEnvironmentProperties[this.envPropIndex].theAssets.join(',') : ''
      }
    },
    objective : {
      get : function() {
        return this.objt.theMisuseCase.theEnvironmentProperties.length > 0 && this.envPropIndex != -1 ? this.objt.theMisuseCase.theEnvironmentProperties[this.envPropIndex].theObjective : ''
      }
    },
    likelihood : {
      get : function() {
        return this.objt.theMisuseCase.theEnvironmentProperties.length > 0 && this.envPropIndex != -1 ? this.objt.theMisuseCase.theEnvironmentProperties[this.envPropIndex].theLikelihood : ''
      }
    },
    severity : {
      get : function() {
        return this.objt.theMisuseCase.theEnvironmentProperties.length > 0 && this.envPropIndex != -1 ? this.objt.theMisuseCase.theEnvironmentProperties[this.envPropIndex].theSeverity : ''
      }
    },
    environmentName : {
      get : function() {
        return this.objt.theMisuseCase.theEnvironmentProperties.length > 0 && this.envPropIndex != -1 ? this.objt.theMisuseCase.theEnvironmentProperties[this.envPropIndex].theEnvironmentName : ''
      }
    },
    misuseCaseNarrative : {
      get : function() {
        return this.objt.theMisuseCase.theEnvironmentProperties.length > 0 && this.envPropIndex != -1 ? this.objt.theMisuseCase.theEnvironmentProperties[this.envPropIndex].theDescription : '';
      },
      set : function(v) {
        this.objt.theMisuseCase.theEnvironmentProperties[this.envPropIndex].theDescription = v;
      }
    }
  },
  components : {
    DimensionSelect
  },
  data() {
    return {
      objt : this.object,
      theRiskImpact : {},
      commitLabel : this.label,
      envPropIndex : 0,
      errors : [],
      responseTableFields : [
        {key: 'responseName', label: 'Name'},
        {key: 'unmitScore', label: 'Score (Pre Mitigation)'},
        {key: 'mitScore', label: 'Score (Post Mitigation)'},
        {key: 'show_details', label: ''}
      ]
    }
  },
  methods: {
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0) {
        this.errors.push('Risk is required');
      }
      const resChars = /[<>‘'`"\\:%/_*?#£$&]/ ;
      const res = this.objt.theName.match(resChars);
      if (res != null) {
        this.errors.push('Character ' + res['index'] + ' in ' + this.objt.theName + ' is a reserved character.');
      }
      if (this.objt.theThreatName.length == 0) {
        this.errors.push('Threat is required');
      }
      if (this.objt.theVulnerabilityName.length == 0) {
        this.errors.push('Vulnerability is required');
      }
      for (let i = 0; i < this.objt.theMisuseCase.theEnvironmentProperties.length; i++) {
        const envProps = this.objt.theMisuseCase.theEnvironmentProperties[i];
        if (envProps.theDescription.length == 0) {
          this.errors.push('No misuse case defined for environment ' + envProps.theEnvironmentName);
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
        this.objt.theRiskName = this.objt.theName;
        this.objt.theMisuseCase.theName = 'Exploit ' + this.objt.theName;
        this.objt.theMisuseCase.theRiskName = this.objt.theName;
        this.$emit('object-commit',this.objt);
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'objectsview', params: {dimension: 'risk'}});
    },
    threatSelected(item) {
      this.objt.theThreatName = item;
      this.getRiskImpact();
    },
    threatsLoaded(item) {
      this.objt.theThreatName = item;
    },
    vulnerabilitySelected(item) {
      this.objt.theVulnerabilityName = item;
      this.getRiskImpact();
    },
    vulnerabilitiesLoaded(item) {
      this.objt.theVulnerabilityName = item;
    },
    getRiskImpact() {
      if (this.envUrl == '') {
        return;
      }
      let that = this;
      axios.get(this.envUrl,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
       })
      .then(response => {
        that.theRiskImpact = {};
        that.objt.theMisuseCase = {'theName' : '','theRiskName' : '','theThreatName' : '','theVulnerabilityName' : '','theEnvironmentProperties' : []};
        for (let environmentName of response.data) {
          const responseUrl = '/api/risks/name/' + (this.objt.theName.length > 0 ? this.objt.theName : 'Unknown') + '/threat/' + this.objt.theThreatName + '/vulnerability/' + this.objt.theVulnerabilityName + '/environment/' + environmentName;
          axios.get(responseUrl,{
            baseURL : this.$store.state.url,
            params : {'session_id' : this.$store.state.session}
           })
          .then(response => {
            that.theRiskImpact[environmentName] = [];
            for (let envProps of response.data) {
              that.theRiskImpact[environmentName].push(envProps);
            }
            that.setMisuseCase();
          })
          .catch((error) => {
            EventBus.$emit('operation-failure',error)
          })
        }
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    },
    setMisuseCase() {
      const mcUrl = '/api/misusecases/threat/' + this.objt.theThreatName + '/vulnerability/' + this.objt.theVulnerabilityName;
      let that = this;
      axios.get(mcUrl,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
       })
      .then(response => {
        that.objt.theMisuseCase = response.data;
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    }
  },
  mounted() {
    if (this.objt.theThreatName != '' && this.objt.theVulnerabilityName != '') {
      this.getRiskImpact();
    }
  }
}
</script>