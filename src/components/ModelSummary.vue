<template>
  <div class="modelsummary">
    <b-card>
      <b-form-group id="modelSummaryToolbar" horizontal :label-cols="2" label="Environments" label-for="modelSummaryEnvironments">
        <dimension-select id="modelSummaryEnvironment" dimension= "environment" v-on:dimension-select-change="onEnvironmentSelected" />
      </b-form-group>
      <b-tabs pill card>
        <b-tab title="Summary" active>
          <b-row>
            <b-col sm="4">
              <div v-if="selectedEnvironment != ''">
                <pie-chart :chart-data="this.vulnerabilitySummaryView"></pie-chart>
                <p><b>Vulnerability Summary</b></p>
              </div>
            </b-col>
            <b-col sm="4">
              <div v-if="selectedEnvironment != ''">
                <pie-chart :chart-data="this.threatSummaryView"></pie-chart>
                <p><b>Threat Summary</b></p>
              </div>
            </b-col>
            <b-col sm="4">
              <div v-if="selectedEnvironment != ''">
                <pie-chart :chart-data="this.riskSummaryView"></pie-chart>
                <p><b>Risk Summary</b></p>
              </div>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Threat Model">
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>

import DimensionSelect from '@/components/DimensionSelect.vue'
import PieChart from '@/components/PieChart.js'
import axios from 'axios'

export default {
  name: 'ModelSummary',
  components : {
    DimensionSelect,
    PieChart
  },
  computed : {
    vulnerabilitySummaryView() {
      return {'labels' : this.theVulnerabilitySummary.map(vs => vs.theLabel), 
              'datasets' : [
                { data : this.theVulnerabilitySummary.map(vs => vs.theValue),
                  backgroundColor : this.theVulnerabilitySummary.map(vs => this.backgroundColor[vs.theLabel])}
               ]}
    },
    threatSummaryView() {
      return {'labels' : this.theThreatSummary.map(ts => ts.theLabel), 
              'datasets' : [
                { data : this.theThreatSummary.map(ts => ts.theValue),
                  backgroundColor : this.theThreatSummary.map(ts => this.backgroundColor[ts.theLabel])}
               ]}
    },
    riskSummaryView() {
      return {'labels' : this.theRiskSummary.map(rs => rs.theLabel), 
              'datasets' : [
                { data : this.theRiskSummary.map(rs => rs.theValue),
                  backgroundColor : this.theRiskSummary.map(rs => this.backgroundColor[rs.theLabel])}
               ]}
    },
  },
  data() {
    return {
      selectedEnvironment : '',
      theVulnerabilitySummary : [],
      theThreatSummary : [],
      theRiskSummary : [],
      backgroundColor : {
        'Negligible' : '#ffe5e5',
        'Marginal' : '#ffb2b2',
        'Critical' : '#ff7f7f',
        'Catastrophic' : '#ff4c4c',
        'Tolerable' : '#ffb2b2',
        'Undesirable' : '#ff7f7f',
        'Intolerable' : '#ff4c4c',
        'Incredible' : '#ffffff',
        'Improbable' : '#ffcccc',
        'Remote' : '#ff9999',
        'Occasional' : '#ff6666',
        'Probable' : '#ff3232',
        'Frequent' : '#ff0000'
      }
    }
  },
  watch : {
    selectedEnvironment : 'reloadModels'
  },
  methods : {
    onEnvironmentSelected(item) {
      this.selectedEnvironment = item;
    },
    reloadModels() {
      const vsUrl = "/api/summary/dimension/vulnerability/environment/" + this.selectedEnvironment;
      axios.get(vsUrl,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        this.theVulnerabilitySummary = response.data;
        const tsUrl = "/api/summary/dimension/threat/environment/" + this.selectedEnvironment;
        axios.get(tsUrl,{
          baseURL : this.$store.state.url,
          params : {'session_id' : this.$store.state.session}
        })
        .then(response => {
          this.theThreatSummary = response.data;
          const rsUrl = "/api/summary/dimension/risk/environment/" + this.selectedEnvironment;
          axios.get(rsUrl,{
            baseURL : this.$store.state.url,
            params : {'session_id' : this.$store.state.session}
          })
          .then(response => {
            this.theRiskSummary = response.data;
          })
          .catch((error) => console.log(error))
        })
        .catch((error) => console.log(error))
      })
      .catch((error) => console.log(error))
    }
  }
}
</script>

<style scoped>

p {
  text-align: center;
}
</style>
