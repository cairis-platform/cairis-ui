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

  <b-modal ref="waDialog" @ok="onOk" title="Weakness Analysis">
    <b-container v-if="objt != undefined" fluid>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Threats" active>
            <b-card bg-variant="light">
              <b-row>
                <b-col md="12">
                  <b-table bordered small :items="threats" :fields="threatTableFields" />
                </b-col>
              </b-row>
            </b-card>
          </b-tab>
          <b-tab title="Vulnerabilities">
            <b-card bg-variant="light">
              <b-row>
                <b-col md="12">
                  <b-table bordered small :items="vulnerabilities" :fields="vulTableFields" />
                </b-col>
              </b-row>
            </b-card>
          </b-tab>
          <b-tab title="Persona Impact">
            <b-card bg-variant="light">
              <b-row>
                <b-col md="12">
                  <b-table bordered small :items="personaImpact" :fields="paTableFields" />
                </b-col>
              </b-row>
            </b-card>
          </b-tab>
          <b-tab title="Obstacles">
            <b-card bg-variant="light">
              <b-row>
                <b-col md="12">
                  <b-table bordered small :items="obstacles" :fields="obsTableFields" />
                </b-col>
              </b-row>
            </b-card>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </b-modal>
</template>

<script>

import axios from 'axios';
import EventBus from '../utils/event-bus';

  export default {
    name: 'weakness-analysis-modal',
    props : {
      architecturalPattern : String,
      environment: String
    },
    data() {
      return {
        objt : undefined,
        threatTableFields : {
          theTarget : {label : 'Target'},
          theComponent : {label: 'Component'},
          theAssets : {label: 'Assets'}
        },
        vulTableFields : {
          theTarget : {label : 'Target'},
          theComponent : {label: 'Component'},
          theAssets : {label: 'Assets'}
        },
        paTableFields : {
          thePersonaName : {label: 'Persona', sortable: true},
          theImpactScore : {label: 'Score', sortable: true}
        },
        obsTableFields : {
          theGoalName : {label: 'Goal', sortable: true},
          theObstacleName : {label: 'Obstacle', sortable: true}
        }
      }
    },
    watch : {
      environment : 'getAnalysis'
    },
    computed : {
      threats() {
        return this.objt != undefined ? this.objt.theThreatWeaknesses.map(tw => ({theComponent : tw.theComponents.join(), theTarget : tw.theTargetName, theAssets : tw.theAssets.join()})) : [];
      },
      vulnerabilities() {
        return this.objt != undefined ? this.objt.theVulnerabilityWeaknesses.map(vw => ({theComponent : vw.theComponents.join(), theTarget : vw.theTargetName, theAssets : vw.theAssets.join()})) : [];
      },
      personaImpact() {
        return this.objt != undefined ? this.objt.thePersonaImpact : [];
      },
      obstacles() {
        return this.objt != undefined ? this.objt.theCandidateGoals : [];
      }
    },
    methods : {
      show() {
        this.$refs.waDialog.show()
      },
      getAnalysis() {
        if (this.architecturalPattern != '' && this.environment != '') {
          const waUrl = this.$store.state.url + '/api/architectural_patterns/name/' + this.architecturalPattern + '/environment/' + this.environment + '/weakness_analysis';
          axios.get(waUrl,{
            params : {'session_id' : this.$store.state.session}
          })
          .then(response => {
            this.objt = response.data;
          })
          .catch((error) => {
            EventBus.$emit('operation-failure',error)
          });
        }
      },
      onOk() {
        this.$emit('weakness-analysis-confirm');
        this.$refs.waDialog.hide();
      }
    }
  };
</script>