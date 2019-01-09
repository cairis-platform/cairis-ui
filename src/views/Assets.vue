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

  <div class="assets">
    <b-breadcrumb :items="bcItems" />
    <b-card no-body>
    <b-table b-table striped hover :fields="assetsFields" :items="items" @row-clicked="assetClicked" >
      <template slot="HEAD_assetsactions" slot-scope="data">
        <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addAsset()"/> 
      </template>
      <template slot="assetsactions" slot-scope="row">
        <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteAsset(row.index)"/>
      </template>
    </b-table>
    </b-card>
  </div>
</template>

<script>

import axios from 'axios';
import EventBus from '../utils/event-bus';

export default {
  data() {
    return {
      bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Assets', to: {name: 'assets'}}],
      items: [],
      assetsFields : {
        assetsactions : {label : ''},
        theName : {label : 'Asset', },
        theType : {label : 'Type'}
      }
    }
  },
  methods : {
    assetClicked(row) {
      this.$router.push({ name: 'asset', params : {objectName: row.theName}});
    },
    addAsset() {
      this.$router.push({ name: 'asset', params : {objectName: 'New asset'}});
    },
    deleteAsset(index) {
      const assetName = this.items[index].theName;
      const url = "/api/assets/name/" + assetName;
      axios.delete(url,{
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
    const url = "/api/assets/summary";
    axios.get(url,{
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