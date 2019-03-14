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

  <div class="componentgoalmodel">
    <template-goal-modal v-if="theComponentName != ''" ref="templateGoalDialog" :goal="this.theSelectedObject"/> 
    <role-modal ref="roleDialog" :role="this.theSelectedObject"/> 
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Component" label-for="componentGoalModelComponent" :label-cols="4" >
            <dimension-select id="componentGoalModelComponent" dimension="component" v-on:dimension-select-change="componentSelected" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    </b-card>
    <b-container fluid>
      <graphical-model v-if="theComponentName != ''" :api="componentGoalModelURI" v-on:graphical-model-url="nodeClicked"/>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
import GraphicalModel from '@/components/GraphicalModel.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'
import TemplateGoalModal from '@/components/TemplateGoalModal.vue'
import RoleModal from '@/components/RoleModal.vue'
import EventBus from '../utils/event-bus';
export default {
  computed : {
    componentGoalModelURI() {
      return "/api/architectural_patterns/component/goal/model/" + this.theComponentName ;
    }
  },
  data() {
    return {
      theComponentName : '',
      theSelectedObject: null
    }
  },
  components : {
    GraphicalModel,
    DimensionSelect,
    TemplateGoalModal,
    RoleModal
  },
  methods : {
    nodeClicked(url) {
      const dimName = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      if (['template_goals','roles'].indexOf(dimName) == -1) {
        return;
      }
      axios.get(url,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        this.theSelectedObject = response.data;
        if (dimName == 'template_goals') {
          this.$refs.templateGoalDialog.show();  
        }
        else if (dimName == 'roles') {
          this.$refs.roleDialog.show();  
        }
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error);
      })
    },
    componentSelected(cName) {
      this.theComponentName = cName;
    }
  }
}
</script>
