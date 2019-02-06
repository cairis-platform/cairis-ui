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

  <div class="objects">
    <b-breadcrumb :items="bcItems" />
    <object-dependency-modal ref="depDialog" :dependencies="objectDependencies" v-on:object-dependency-ok="deleteDependencies" />
    <b-card no-body>
      <b-container v-if="dimension == 'requirement'" fluid>
        <b-row>
          <b-col>
            <b-form-group label="Asset" label-for="reqAsset" :label-cols="5" horizontal>
              <dimension-select ref="assetFilter" id="assetEnvironment" dimension="asset" v-on:dimension-select-change="assetSelected" />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Environment" label-for="reqEnvironment" :label-cols="5" horizontal>
              <dimension-select ref="envFilter" id="reqEnvironment" dimension="environment" v-on:dimension-select-change="environmentSelected" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
      <b-table b-table striped small hover :fields="objectsFields" :items="items" @row-clicked="objectClicked">
        <!-- eslint-disable-next-line -->
        <template slot="HEAD_objectsactions" slot-scope="data">
          <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addObject"/> 
        </template>
        <template slot="objectsactions" slot-scope="row">
          <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteObject(row.index)"/>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>

import axios from 'axios';
import EventBus from '../utils/event-bus';
import DimensionSelect from '@/components/DimensionSelect.vue'
import ObjectDependencyModal from '@/components/ObjectDependencyModal.vue'

export default {
  props : {
    breadCrumbItems : Array,
    fieldList : Object,
    getUrl: String,
    delUrl: String,
    dimName : String
  },
  components : {
    DimensionSelect,
    ObjectDependencyModal
  },
  data() {
    return {
      bcItems : this.breadCrumbItems,
      dimension : this.dimName,
      items: [],
      theGetUrl : this.getUrl,
      objectsFields : this.fieldList,
      objectDependencies : [],
      selectedObject : '',
      selectedIndex : -1,
    }
  }, 
  watch : {
    theGetUrl : 'loadObjects'
  },
  methods : {
    objectClicked(row) {
      if (this.dimName == 'requirement') {
        this.$router.push({ name: this.dimName, params : {objectName: row.theName, domain: this.$refs.assetFilter.selected.length > 0 ? {type: 'asset', name: this.$refs.assetFilter.selected} : {type: 'environment', name: this.$refs.envFilter.selected}}});
      }
      else if (this.dimName == 'vulnerability') {
        this.$router.push({ name: this.dimName, params : {objectName: row.theVulnerabilityName}});
      }
      else {
        this.$router.push({ name: this.dimName, params : {objectName: row.theName}});
      }
    },
    addObject() {
      this.$router.push({ name: this.dimName, params : {objectName: 'New ' + this.dimName, domain : {type : 'asset', name : ''}}});
    },
    deleteObject(index) {
      if (this.dimName == 'vulnerability') {
        this.selectedObject = this.items[index].theVulnerabilityName;
      }
      else {
        this.selectedObject = this.items[index].theName;
      }
      this.selectedIndex = index;
      var that = this;
      const odUrl = '/api/object_dependency/dimension/' + this.dimName + '/object/' + this.selectedObject;
      axios.get(odUrl,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
       })
      .then(response => {
        if (response.data.theDependencies.length > 0) {
          that.objectDependencies = response.data.theDependencies;
          that.$refs.depDialog.show();
        }
        else {
          that.commitDelete();
        }
       })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    },
    commitDelete() {
      var objtName = JSON.parse(JSON.stringify(this.selectedObject));
      axios.delete(this.delUrl + objtName,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
       })
      .then(response => {
        this.items.splice(this.selectedIndex,1);
        EventBus.$emit('operation-success',response.data.message)
       })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    },
    deleteDependencies() {
      const odUrl = '/api/object_dependency/dimension/' + this.dimName + '/object/' + this.selectedObject;
      var that = this;
      axios.delete(odUrl,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
       })
      .then( () => {
        that.commitDelete();
       })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    },
    loadObjects() {
      if (this.theGetUrl != '') {
        axios.get(this.theGetUrl,{
          baseURL : this.$store.state.url,
          params : {'session_id' : this.$store.state.session}
         })
        .then(response => {
          this.items = response.data;
         })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        })
      }
    },
    assetSelected(assetName) {
      if (assetName != null) {
        this.theGetUrl = '/api/requirements/asset/' + assetName
        this.$refs.envFilter.selected = '';
      }
    },
    environmentSelected(envName) {
      if (envName != null) {
        this.theGetUrl = '/api/requirements/environment/' + envName
        this.$refs.assetFilter.selected = '';
      }
    }
  },
  mounted() {
    this.loadObjects();
  }
}
</script>