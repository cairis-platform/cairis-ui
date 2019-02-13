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

  <div class="modelsummary">
    <b-card>
      <b-form-group id="modelSummaryToolbar" horizontal :label-cols="2" label="Environments" label-for="modelSummary">
        <dimension-select ref="modelSummaryEnvironment" id="modelSummary" dimension= "environment" v-on:dimension-select-change="onEnvironmentSelected" />
      </b-form-group>
      <b-tabs pill card>
        <b-card no-body>
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
        </b-card>
        <b-card no-body>
        <b-tab title="Threat Model">
          <b-row>
            <b-col sm="12">
              <b-table b-table striped bordered :items="this.entityTable">
              </b-table>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-table b-table striped bordered :items="this.processTable">
              </b-table>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-table b-table striped bordered :items="this.datastoreTable">
              </b-table>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-table b-table striped bordered :items="this.dataflowTable">
              </b-table>
            </b-col>
          </b-row>
        </b-tab>
        </b-card>
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
    processTable() {
      return this.theProcesses.map(row => {
        const r = {}
        r['Process'] = row.theElement
        row.theProperties.map( col => {
          r[col.theProperty] = col.theThreats.toString()
        })
        return r
      }) 
    },
    entityTable() {
      return this.theEntities.map(row => {
        const r = {}
        r['Entity'] = row.theElement
        row.theProperties.map( col => {
          r[col.theProperty] = col.theThreats.toString()
        })
        return r
      }) 
    },
    datastoreTable() {
      return this.theDatastores.map(row => {
        const r = {}
        r['Datastore'] = row.theElement
        row.theProperties.map( col => {
          r[col.theProperty] = col.theThreats.toString()
        })
        return r
      }) 
    },
    dataflowTable() {
      return this.theDataflows.map(row => {
        const r = {}
        r['Dataflow'] = row.theElement
        row.theProperties.map( col => {
          r[col.theProperty] = col.theThreats.toString()
        })
        return r
      }) 
    }
  },
  data() {
    return {
      selectedEnvironment : '',
      theVulnerabilitySummary : [],
      theThreatSummary : [],
      theDataflows : [],
      theProcesses : [],
      theDatastores : [],
      theEntities : [],
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
  mounted() {
    let that = this;
    axios.get('/api/dimensions/table/environment',{
      baseURL : this.$store.state.url,
      params : {'session_id' : this.$store.state.session}
    })
    .then(response => {
      const firstEnvName = response.data[0];
      that.$refs.modelSummaryEnvironment.selected = firstEnvName;
      this.selectedEnvironment = firstEnvName;
    })
    .catch((error) => {
      console.log(error)
    });
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
            const tmUrl = "/api/threats/model/environment/" + this.selectedEnvironment;
            axios.get(tmUrl,{
              baseURL : this.$store.state.url,
              params : {'session_id' : this.$store.state.session}
            })
            .then(response => {
              this.theDataflows = response.data.theDataflows;
              this.theProcesses = response.data.theProcesses;
              this.theDatastores = response.data.theDatastores;
              this.theEntities = response.data.theEntities;
            })
            .catch((error) => {
              console.log(error)
            })
          })
          .catch((error) => {
            console.log(error)
          })
        })
        .catch((error) => {
          console.log(error)
        })
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

p {
  text-align: center;
}
</style>
