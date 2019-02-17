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
    <asset-modal v-if="theEnvironmentName != ''" ref="assetDialog" :environment="this.theEnvironmentName" :asset="this.theSelectedObject"/> 
    <domain-property-modal v-if="theEnvironmentName !=''" ref="dpDialog" :environment="this.theEnvironmentName" :domainproperty="this.theSelectedObject"/> 
    <goal-modal v-if="theEnvironmentName != ''" ref="goalDialog" :environment="this.theEnvironmentName" :goal="this.theSelectedObject"/> 
    <obstacle-modal v-if="theEnvironmentName !=''" ref="obsDialog" :environment="this.theEnvironmentName" :obstacle="this.theSelectedObject"/> 
    <requirement-modal v-if="theEnvironmentName != ''" ref="reqDialog" :requirement="this.theSelectedObject"/> 
    <role-modal v-if="theEnvironmentName != ''" ref="roleDialog" :environment="this.theEnvironmentName" :role="this.theSelectedObject"/> 
    <task-modal v-if="theEnvironmentName != ''" ref="taskDialog" :environment="this.theEnvironmentName" :task="this.theSelectedObject"/> 
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Environment" label-for="responsibilityModelEnvironment" :label-cols="4" >
            <dimension-select id="responsibilityModelEnvironment" ref="responsibilityModelEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" />
          </b-form-group>
        </b-col>
        <b-col v-if="theEnvironmentName != ''">
          <b-form-group label="Role" label-for="responsibilityModelRole" :label-cols="2" >
            <dimension-select id="responsibilityModelRole" ref="responsibilityModelRole" dimension="role" :environment="theEnvironmentName" initial="all" includeall v-on:dimension-select-change="roleSelected" />
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
import GraphicalModel from '@/components/GraphicalModel.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'
import AssetModal from '@/components/AssetModal.vue'
import DomainPropertyModal from '@/components/DomainPropertyModal.vue'
import GoalModal from '@/components/GoalModal.vue'
import ObstacleModal from '@/components/ObstacleModal.vue'
import RequirementModal from '@/components/RequirementModal.vue'
import RoleModal from '@/components/RoleModal.vue'
import TaskModal from '@/components/TaskModal.vue'
import EventBus from '../utils/event-bus';

export default {
  computed : {
    responsibilityModelURI() {
      return "/api/responsibility/model/environment/" + this.theEnvironmentName + "/role/" + this.theRoleName;
    }
  },
  data() {
    return {
      theEnvironmentName : '',
      theRoleName : 'all',
      theSelectedObject: null
    }
  },
  components : {
    AssetModal,
    DimensionSelect,
    DomainPropertyModal,
    GoalModal,
    GraphicalModel,
    ObstacleModal,
    RequirementModal,
    RoleModal,
    TaskModal
  },
  methods : {
    nodeClicked(url) {
      const dimName = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      if (['goals','assets','obstacles','domainproperties','requirements','roles','tasks'].indexOf(dimName) == -1) {
        return;
      }
      axios.get(url,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        this.theSelectedObject = response.data;
        if (dimName == 'goals') {
          this.$refs.goalDialog.show();  
        }
        else if (dimName == 'assets') {
          this.$refs.assetDialog.show();  
        }
        else if (dimName == 'obstacles') {
          this.$refs.obsDialog.show();  
        }
        else if (dimName == 'domainproperties') {
          this.$refs.dpDialog.show();  
        }
        else if (dimName == 'requirements') {
          this.$refs.reqDialog.show();  
        }
        else if (dimName == 'roles') {
          this.$refs.roleDialog.show();  
        }
        else if (dimName == 'tasks') {
          this.$refs.taskDialog.show();  
        }
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
    roleSelected(roleName) {
      this.theRoleName = roleName
    }
  }
}
</script>
