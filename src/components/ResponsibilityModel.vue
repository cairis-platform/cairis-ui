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

  <div class="responsibilitymodel">
    <side-bar :dimension="theSelectedDimension" :panelParameters="panelParameters" :panelObject="theSelectedObject" />
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Environment" label-for="responsibilityModelEnvironment" :label-cols="4" >
            <dimension-select id="responsibilityModelEnvironment" ref="responsibilityModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" v-on:dimension-items-updated="environmentsLoaded" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Role" label-for="responsibilityModelRole" :label-cols="2" >
            <dimension-select id="responsibilityModelRole" ref="responsibilityModelRole" dimension="role" :environment="theEnvironmentName" initial="all" includeall v-on:dimension-select-change="roleSelected" v-on:dimension-items-updated="rolesLoaded" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    </b-card>
    <graphical-model v-if="theEnvironmentName != ''" :api="responsibilityModelURI" v-on:graphical-model-url="nodeClicked"/>
  </div>
</template>

<script>

import axios from 'axios';
import GraphicalModel from '@/components/GraphicalModel.vue';
import DimensionSelect from '@/components/DimensionSelect.vue';
import SideBar from '@/components/SideBar.vue';
import EventBus from '../utils/event-bus';

export default {
  computed : {
    responsibilityModelURI() {
      return "/api/responsibility/model/environment/" + this.theEnvironmentName + "/role/" + this.theRoleName;
    },
    panelParameters() {
      return this.theEnvironmentName != '' ? {'environment' : this.theEnvironmentName} : undefined;
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      theRoleName : 'all',
      theSelectedObject: null,
      theSelectedDimension : ''
    }
  },
  components : {
    DimensionSelect,
    GraphicalModel,
    SideBar
  },
  methods : {
    nodeClicked(url) {
      this.theSelectedDimension = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      if (['goals','assets','obstacles','domainproperties','requirements','responses','roles','tasks'].indexOf(this.theSelectedDimension) == -1) {
        return;
      }
      axios.get(url,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        this.theSelectedObject = response.data;
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    },
    environmentSelected(envName) {
      this.theEnvironmentName = envName
      if (this.$refs.responsibilityModelRole != undefined) {
        this.theRoleName = 'all'
        this.$refs.responsibilityModelRole.selected = this.theRoleName;
      }
    },
    environmentsLoaded(envName) {
      this.theEnvironmentName = envName
      if (this.$refs.responsibilityModelRole != undefined) {
        this.theRoleName = 'all'
        this.$refs.responsibilityModelRole.selected = this.theRoleName;
      }
    },
    roleSelected(roleName) {
      this.theRoleName = roleName
    },
    rolesLoaded(roleName) {
      this.theRoleName = roleName
    }
  }
}
</script>
