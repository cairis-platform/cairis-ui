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

  <div class="validationmodel">
    <b-card bg-variant="light">
      <b-container fluid>
      <b-row>
        <b-col md="12">
          <b-form-group label="Environment" label-for="validationModelEnvironment" :label-cols="4" >
            <dimension-select id="validationModelEnvironment" ref="validationModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" v-on:dimension-items-updated="environmentsLoaded" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-table v-if="theEnvironmentName != ''" striped bordered :fields="validationTableFields" :items="validationResults">
          </b-table>
        </b-col>
      </b-row>
    </b-container>
    </b-card>
  </div>
</template>

<script>

import axios from 'axios';
import DimensionSelect from '@/components/DimensionSelect.vue'
import EventBus from '../utils/event-bus';

export default {
  computed : {
    validationModelURI() {
      return "/api/validation/environment/" + this.theEnvironmentName;
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      validationResults : [],
      validationTableFields : [
        {key: 'theLabel', label : 'Type'},
        {key: 'theMessage', label : 'Description'},
      ]
    }
  },
  components : {
    DimensionSelect
  },
  methods : {
    environmentChanged(envName) {
      this.theEnvironmentName = envName;
      axios.get(this.validationModelURI,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        this.validationResults = response.data;
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error.response.data);
      });
    },
    environmentSelected(envName) {
      this.environmentChanged(envName);
    },
    environmentsLoaded(envName) {
      this.environmentChanged(envName);
    }
  }
}
</script>
