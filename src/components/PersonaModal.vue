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

  <b-modal ref="personaDialog" ok-only :title="dialogTitle">
    <b-container v-if="objt != undefined">
      <b-tabs>
        <b-tab title="Activities" active>
          <b-form-textarea v-model="objt.theActivities" type="text" :rows=4 :max-rows=8 required>
          </b-form-textarea>
        </b-tab>
        <b-tab title="Attitudes">
          <b-form-textarea v-model="objt.theAttitudes" type="text" :rows=4 :max-rows=8 required>
          </b-form-textarea>
        </b-tab>
        <b-tab title="Aptitudes">
          <b-form-textarea v-model="objt.theAptitudes" type="text" :rows=4 :max-rows=8 required>
          </b-form-textarea>
        </b-tab>
        <b-tab title="Motivations">
          <b-form-textarea v-model="objt.theMotivations" type="text" :rows=4 :max-rows=8 required>
          </b-form-textarea>
        </b-tab>
        <b-tab title="Skills">
          <b-form-textarea v-model="objt.theSkills" type="text" :rows=4 :max-rows=8 required>
          </b-form-textarea>
        </b-tab>
        <b-tab title="Narrative">
          <b-form-textarea v-model="narrative" type="text" :rows=4 :max-rows=8 required>
          </b-form-textarea>
        </b-tab>
      </b-tabs>
    </b-container>
  </b-modal>
</template>

<script>

  export default {
    name: 'persona-modal',
    props : {
      environment : String,
      persona : Object
    },
    data() {
      return {
        theEnvironmentName : this.environment,
        objt : this.persona
      }
    },
    watch : {
      persona: 'updateData'
    },
    computed : {
      dialogTitle() {
        return (this.objt != undefined ? this.objt.theName : '') + ' Persona';
      },
      narrative() {
        return this.objt != undefined ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theNarrative : ""
      }
    },
    methods : {
      show() {
        this.$refs.personaDialog.show();
      },
      updateData() {
        this.objt = this.persona
        this.theEnvironmentName = this.environment
      }
    }
  };
</script>