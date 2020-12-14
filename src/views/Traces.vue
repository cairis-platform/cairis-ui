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
  <div class="traces">
    <b-breadcrumb :items="bcItems" />
    <b-card no-body>
      <b-container fluid>
        <b-row>
          <b-col>
            <b-form-group label="Environment" label-for="reqEnvironment" :label-cols="5" >
              <dimension-select ref="traceEnvFilter" id="traceEnvironment" dimension="noncomposite_environment" v-on:dimension-select-change="environmentSelected" v-on:dimension-items-updated="environmentsLoaded" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
      <b-table b-table striped small hover :fields="traceFields" :items="traces">
        <template v-slot:cell(traceaction)="row">
          <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteTrace(row.index)"/>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>

import axios from 'axios';
import EventBus from '../utils/event-bus';
import DimensionSelect from '@/components/DimensionSelect.vue'

export default {
  components : {
    DimensionSelect 
  },
  data() {
    return {
      bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Traces', to: {name: 'traces'}}],
      traces: [],
      traceFields : [
        {key: 'traceaction', label : ''},
        {key: 'theFromObject', label : 'From', sortable: true},
        {key: 'theFromName', label : 'Name', sortable: true},
        {key: 'theToObject', label : 'To', sortable: true},
        {key: 'theToName', label : 'Name', sortable: true},
        {key: 'theLabel', label: 'Label', sortable: true}
      ]
    }
  },
  methods : {
    loadTraces(envName) {
      const traceUrl = '/api/traces/environment/' + envName;
      axios.get(traceUrl,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
       })
      .then(response => {
        this.traces = response.data;
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });

    },
    environmentSelected(envName) {
      this.loadTraces(envName);
    },
    environmentsLoaded(envName) {
      this.loadTraces(envName);
    },
    deleteTrace(idx) {
      const traceObjt = this.traces[idx];
      const deleteUrl = this.$store.state.url + '/api/traces/from_type/' + traceObjt.theFromObject + '/from_name/' + traceObjt.theFromName + '/to_type/' + traceObjt.theToObject + '/to_name/' + traceObjt.theToName;
      axios.delete(deleteUrl,{
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        this.traces.splice(idx,1);
        EventBus.$emit('operation-success',response.data.message)
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });
    }
  }
}
</script>