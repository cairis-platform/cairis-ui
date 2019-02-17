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

  <b-modal ref="obstacleDialog" ok-only :title="dialogTitle">
    <b-container v-if="objt != undefined">
      <b-form-group label="Name" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theName" >
        <b-form-input readonly id="theName" v-model="objt.theName"></b-form-input>
      </b-form-group>
      <b-form-group label="Originator" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theOriginator" >
        <b-form-input readonly id="theOriginator" v-model="objt.theOriginator"></b-form-input>
      </b-form-group>
      <b-form-group label="Category" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theCategory" >
        <b-form-input readonly id="theCategory" v-model="category"></b-form-input>
      </b-form-group>
      <b-form-group label="Definition" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theDefinition" >
        <b-form-textarea id="theDefinition" v-model="definition" type="text" :rows=2 :max-rows="4" readonly>
        </b-form-textarea>
      </b-form-group>
      <b-form-group label="Probability" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theProbability" >
        <b-form-input readonly id="theProbability" v-model="probability"></b-form-input>
      </b-form-group>
      <b-form-group label="Rationale" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theProbabilityRationale" >
        <b-form-textarea id="theProbabilityRationale" v-model="rationale" type="text" :rows=2 :max-rows="4" readonly>
        </b-form-textarea>
      </b-form-group>
      <b-table bordered small :items="concerns" :fields="concernTableFields">
      </b-table> 
    </b-container>
  </b-modal>
</template>

<script>

  export default {
    name: 'obstacle-modal',
    props : {
      environment : String,
      obstacle : Object
    },
    data() {
      return {
        theEnvironmentName : this.environment,
        objt : this.obstacle,
        concernTableFields : {
          concern : {label : 'Concern'}
        }
      }
    },
    watch : {
      obstacle: 'updateData'
    },
    computed : {
      dialogTitle() {
        return (this.objt != undefined ? this.objt.theName : '') + ' Obstacle';
      },
      definition() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theDefinition : '';
      },
      category() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theCategory : '';
      },
      fitCriterion() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theFitCriterion : '';
      },
      probability() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theProbability : '';
      },
      rationale() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theProbabilityRationale : '';
      },
      concerns() {
        return this.objt != undefined && this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.filter(env => env.theEnvironmentName == this.theEnvironmentName)[0].theConcerns.map(concern => ({'concern' : concern})) : []
      }
    },
    methods : {
      show() {
        this.$refs.obstacleDialog.show()
      },
      updateData() {
        this.objt = this.obstacle
        this.theEnvironmentName = this.environment
      }
    }
  };
</script>