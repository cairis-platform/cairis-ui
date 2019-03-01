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

  <div class="findmodel">
    <b-card bg-variant="light">
      <b-container fluid>
      <b-row>
        <b-col md="12">
          <b-table striped small bordered :fields="findTableFields" :items="findResults" @row-clicked="viewObject">
          </b-table>
        </b-col>
      </b-row>
    </b-container>
    </b-card>
  </div>
</template>

<script>

import axios from 'axios';
import EventBus from '../utils/event-bus';

export default {
  props : {
    searchString : String
  },
  watch : {
    searchString: {
      handler() {
        const findUrl = '/api/find/' + this.searchString;
        axios.get(findUrl,{
          baseURL : this.$store.state.url,
          params : {'session_id' : this.$store.state.session}
        })
        .then(response => {
          this.findResults = response.data;
        })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        });
      }
    }
  },
  data() {
    return {
      findResults : [],
      findTableFields : {
        theEnvironment : {label : 'Environment'},
        theDimension : {label : 'Dimension'},
        theObject : {label : 'Object'},
      }
    }
  },
  methods : {
    viewObject(data) {
      const dimRoute = data.theDimension.replace(" ","").toLowerCase();
      const objtName = data.theObject;
      this.$router.push({ name: dimRoute, params : {objectName: objtName}});
    }
  }
}
</script>
