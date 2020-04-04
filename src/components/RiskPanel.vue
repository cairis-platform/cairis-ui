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

  <div class="riskpanel">
    <b-container v-if="panelObject != undefined">
      <b-tabs>
        <b-tab title="Impact" active>
          <b-form-group label="Threat" label-class="font-weight-bold text-sm-left" label-for="theThreat" >
            <b-form-input readonly id="theThreat" v-model="panelObject.theThreatName" />
          </b-form-group>
          <b-form-group label="Vulnerability" label-class="font-weight-bold text-sm-left" label-for="theVulnerability" >
            <b-form-input readonly id="theVulnerability" v-model="panelObject.theVulnerabilityName" />
          </b-form-group>
          <b-form-group label="Risk Rating" label-class="font-weight-bold text-sm-left" label-for="theRiskRating" >
            <b-form-input readonly id="theRiskRating" v-model="riskrating" />
          </b-form-group>
          <b-table bordered small :items="this.panelParameters.responses" :fields="responseTableFields" />
        </b-tab>
        <b-tab title="Misuse Case">
          <b-form-textarea id="theNarrative" v-model="narrative" type="text" rows=10 readonly />
        </b-tab>
      </b-tabs>
    </b-container>
  </div>
</template>

<script>


export default {
  name: 'risk-panel',
  props : {
    panelParameters : Object,
    panelObject : Object
  },
  data() {
    return {
      responseTableFields : [
        {key: 'responseName', label : 'Response'},
        {key: 'unmitScore', label : 'Unmitigated Score'},
        {key: 'mitScore', label : 'Mitigated Score'}
      ]
    }
  },
  computed : {
    riskrating() {
      return this.panelObject != undefined && this.panelObject.theMisuseCase != undefined && this.panelObject.theMisuseCase.theEnvironmentProperties.length > 0 ? this.panelObject.theMisuseCase.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theRiskRating.rating : '';
    },
    narrative() {
      return this.panelObject != undefined && this.panelObject.theMisuseCase != undefined && this.panelObject.theMisuseCase.theEnvironmentProperties.length > 0 ? this.panelObject.theMisuseCase.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theDescription : '';
    }
  }
};
</script>