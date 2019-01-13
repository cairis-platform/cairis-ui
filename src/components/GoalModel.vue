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

  <div class="goalmodel">
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Environment" label-for="goalModelEnvironment" :label-cols="4" horizontal>
            <dimension-select id="goalModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Goal" label-for="goalModelGoal" :label-cols="2" horizontal>
            <dimension-select id="goalModelGoal" dimension="goal" :environment="theEnvironmentName" all="true" v-on:dimension-select-change="goalSelected" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Use Case" label-form="goaModelUseCase" :label-cols="4" horizontal>
            <dimension-select id="goalModelUseCase" dimension="usecase" :environment="theEnvironmentName" all="true" v-on:dimension-select-change="useCaseSelected" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    </b-card>
    <graphical-model v-if="theEnvironmentName != ''" :api="goalModelURI" v-on:graphical-model-url="nodeClicked"/>
  </div>
</template>

<script>

import GraphicalModel from '@/components/GraphicalModel.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'

export default {
  computed : {
    goalModelURI() {
      return "/api/goals/model/environment/" + this.theEnvironmentName + "/goal/" + this.theGoalName + "/usecase/" + this.theUseCaseName;
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      theGoalName : 'all',
      theUseCaseName : 'all'
    }
  },
  components : {
    GraphicalModel,
    DimensionSelect
  },
  methods : {
    nodeClicked(url) {
      const dimName = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      if (dimName == 'goals') {
        alert('goal modal')
      }
      else if (dimName == 'requirements') {
        alert('requirement modal')
      }
    },
    environmentSelected(envName) {
      this.theEnvironmentName = envName
      this.theGoalName = 'all'
      this.theUseCaseName = 'all'
      this.$refs.goalModelGoal.$emit('dimension-select-change',this.theGoalName);
      this.$refs.goalModelUseCase.$emit('dimension-select-change',this.theUseCaseName);
    },
    goalSelected(goalName) {
      this.theGoalName = goalName
    },
    useCaseSelected(ucName) {
      this.theUseCaseName = ucName
    }
  }
}
</script>
