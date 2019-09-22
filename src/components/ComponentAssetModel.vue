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

  <div class="componentassetmodel">
    <template-asset-modal v-if="theComponentName != ''" ref="templateAssetDialog" :asset="this.theSelectedObject"/> 
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Component" label-for="componentAssetModelComponent" :label-cols="4" >
            <dimension-select id="componentAssetModelComponent" dimension="component" v-on:dimension-select-change="componentSelected" v-on:dimension-items-updated="componentsLoaded" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    </b-card>
    <b-container fluid>
      <graphical-model v-if="theComponentName != ''" :api="componentAssetModelURI" v-on:graphical-model-url="nodeClicked"/>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
import GraphicalModel from '@/components/GraphicalModel.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'
import TemplateAssetModal from '@/components/TemplateAssetModal.vue'
import EventBus from '../utils/event-bus';
export default {
  computed : {
    componentAssetModelURI() {
      return "/api/architectural_patterns/component/asset/model/" + this.theComponentName ;
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
    TemplateAssetModal
  },
  methods : {
    nodeClicked(url) {
      const dimName = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      if (['template_assets'].indexOf(dimName) == -1) {
        return;
      }
      axios.get(url,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        this.theSelectedObject = response.data;
        if (dimName == 'template_assets') {
          this.$refs.templateAssetDialog.show();  
        }
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    },
    componentSelected(cName) {
      this.theComponentName = cName
    },
    componentsLoaded(cName) {
      this.theComponentName = cName
    }
  }
}
</script>
