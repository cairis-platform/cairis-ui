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
    <object-dependency-modal ref="depDialog" :dependencies="objectDependencies" v-on:object-dependency-ok="commitDelete" />
    <b-card no-body>
    <b-table b-table striped small hover :fields="objectsFields" :items="items" @row-clicked="objectClicked" >
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
    ObjectDependencyModal
  },
  data() {
    return {
      bcItems : this.breadCrumbItems,
      items: [],
      objectsFields : this.fieldList,
      objectDependencies : [],
      selectedObject : '',
      selectedIndex : -1
    }
  }, 
  methods : {
    objectClicked(row) {
      if (this.dimName != 'vulnerability') {
        this.$router.push({ name: this.dimName, params : {objectName: row.theName}});
      }
      else {
        this.$router.push({ name: this.dimName, params : {objectName: row.theVulnerabilityName}});
      }
    },
    addObject() {
      this.$router.push({ name: this.dimName, params : {objectName: 'New ' + this.dimName}});
    },
    deleteObject(index) {
      if (this.dimName != 'vulnerability') {
        this.selectedObject = this.items[index].theName;
      }
      else {
        this.selectedObject = this.items[index].theVulnerabilityName;
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
    }
  },
  mounted() {
    axios.get(this.getUrl,{
      baseURL : this.$store.state.url,
      params : {'session_id' : this.$store.state.session}
     })
    .then(response => {
      this.items = response.data;
     })
    .catch((error) => console.log(error))
  }
}
</script>