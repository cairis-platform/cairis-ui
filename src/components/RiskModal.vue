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

  <b-modal ref="riskDialog" ok-only :title="dialogTitle">
    <b-container v-if="objt != undefined">
      <b-tabs>
        <b-tab title="Impact" active>
          <b-form-group label="Threat" label-class="font-weight-bold text-sm-left" label-for="theThreat" >
            <b-form-input readonly id="theThreat" v-model="objt.theThreatName"></b-form-input>
          </b-form-group>
          <b-form-group label="Vulnerability" label-class="font-weight-bold text-sm-left" label-for="theVulnerability" >
            <b-form-input readonly id="theVulnerability" v-model="objt.theVulnerabilityName"></b-form-input>
          </b-form-group>
          <b-form-group label="Risk Rating" label-class="font-weight-bold text-sm-left" label-for="theRiskRating" >
            <b-form-input readonly id="theRiskRating" v-model="riskrating"></b-form-input>
          </b-form-group>
          <b-table bordered small :items="responses" :fields="responseTableFields" />
        </b-tab>
        <b-tab title="Misuse Case">
          <b-form-textarea id="theNarrative" v-model="narrative" type="text" rows=10 readonly />
        </b-tab>
      </b-tabs>
    </b-container>
  </b-modal>
</template>

<script>


export default {
  name: 'risk-modal',
  props : {
    environment : String,
    risk : Object,
    responseList : Array
  },
  data() {
    return {
      theEnvironmentName : this.environment,
      objt : this.risk,
      responses : this.responseList,
      responseTableFields : [
        {key: 'responseName', label : 'Response'},
        {key: 'unmitScore', label : 'Unmitigated Score'},
        {key: 'mitScore', label : 'Mitigated Score'}
      ]
    }
  },
  watch : {
    responseList: 'updateData'
  },
  computed : {
    dialogTitle() {
      return (this.objt != undefined ? this.objt.theName : '') + ' Risk';
    },
    riskrating() {
      return this.objt != undefined && this.objt.theMisuseCase.theEnvironmentProperties.length > 0 ? this.objt.theMisuseCase.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theRiskRating.rating : ''
    },
    narrative() {
      return this.objt != undefined && this.objt.theMisuseCase.theEnvironmentProperties.length > 0 ? this.objt.theMisuseCase.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theDescription : ''
    }
  },
  methods : {
    show() {
      if (this.$refs.riskDialog != undefined) {
        this.$refs.riskDialog.show();
      }
    },
    updateData() {
      this.objt = this.risk
      this.theEnvironmentName = this.environment
      this.responses = this.responseList
    }
  }
};
</script>