<template>
  <div class="goalmodel">
    <b-breadcrumb :items="bcItems" />
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
    bcItems() {
      return [{text: 'Home', to: {name: 'home'}},{text: 'Goal Model', to: {name: 'goalmodel'}}]
    },
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
      alert('clicked ' + url)
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