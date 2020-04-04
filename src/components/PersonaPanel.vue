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

  <div class="personapanel">
    <b-container v-if="panelObject != undefined">
      <b-tabs>
        <b-tab title="Activities" active>
          <b-form-textarea v-model="panelObject.theActivities" type="text" readonly />
        </b-tab>
        <b-tab title="Attitudes">
          <b-form-textarea v-model="panelObject.theAttitudes" type="text" readonly />
        </b-tab>
        <b-tab title="Aptitudes">
          <b-form-textarea v-model="panelObject.theAptitudes" type="text" readonly />
        </b-tab>
        <b-tab title="Motivations">
          <b-form-textarea v-model="panelObject.theMotivations" type="text" readonly />
        </b-tab>
        <b-tab title="Skills">
          <b-form-textarea v-model="panelObject.theSkills" type="text" readonly />
        </b-tab>
        <b-tab title="Narrative">
          <b-form-textarea v-model="narrative" type="text" readonly />
        </b-tab>
      </b-tabs>
    </b-container>
  </div>
</template>

<script>

  export default {
    name: 'persona-panel',
    props : {
      panelParameters : Object,
      panelObject : Object
    },
    computed : {
      narrative() {
        return this.panelObject != undefined ? this.panelObject.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.panelParameters.environment)[0].theNarrative : "";
      }
    }
  };
</script>