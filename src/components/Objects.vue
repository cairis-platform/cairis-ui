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
    <b-card no-body>
    <b-table b-table striped hover :fields="objectsFields" :items="items" @row-clicked="objectClicked" >
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

export default {
  props : {
    breadCrumbItems : Array,
    fieldList : Object,
    getUrl: String,
    delUrl: String,
    dimName : String
  },
  data() {
    return {
      bcItems : this.breadCrumbItems,
      items: [],
      objectsFields : this.fieldList,
    }
  },
  methods : {
    objectClicked(row) {
      this.$router.push({ name: this.dimName, params : {objectName: row.theName}});
    },
    addObject() {
      this.$router.push({ name: this.dimName, params : {objectName: 'New ' + this.dimName}});
    },
    deleteObject(index) {
      var objtName = JSON.parse(JSON.stringify(this.items[index].theName));
      axios.delete(this.delUrl + objtName,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
       })
      .then(response => {
        this.items.splice(index,1);
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