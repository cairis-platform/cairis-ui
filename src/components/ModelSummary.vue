<template>
  <div class="modelsummary">
    <b-card>
      <b-form-group id="modelSummaryToolbar" horizontal label="Environments" label-for="modelSummaryEnvironments">
        <b-form-select v-model="selectedEnvironment" :options="environments" />
      </b-form-group>
      <b-tabs pill card>
        <b-tab title="Summary" active>
        </b-tab>
        <b-tab title="Threat Model">
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'ModelSummary',
  data() {
    return {
      selectedEnvironment : null,
      environments : ['Core Technology','Psychosis','Stroke']
    }
  }
}
</script>
