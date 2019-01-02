<template>
  <div class="modelsummary">
    <b-card>
      <b-form-group id="modelSummaryToolbar" horizontal :label-cols="2" label="Environments" label-for="modelSummaryEnvironments">
        <dimension-select id="modelSummaryEnvironment" dimension= "environment" v-on:dimension-select-change="onEnvironmentSelected" />
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

import DimensionSelect from '@/components/DimensionSelect.vue'

export default {
  name: 'ModelSummary',
  components : {
    DimensionSelect
  },
  data() {
    return {
      selectedEnvironment : ''
    }
  },
  methods : {
    onEnvironmentSelected(item) {
      this.selectedEnvironment = item;
    }
  }
}
</script>
