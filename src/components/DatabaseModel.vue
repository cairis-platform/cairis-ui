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
  <div class="databasemodel">
    <new-database-modal ref="newDbDialog" v-on:new-database-modal-update="createDatabase"/> 
    <b-form class="vld-parent">
      <loading :active.sync="isLoading" is-full-page />
      <b-card bg-variant="light">
        <b-row>
          <b-col md="12">
            <b-table striped hover small bordered :fields="dbTableFields" :items="dbs" @row-clicked="openDatabase">
              <!-- eslint-disable-next-line -->
              <template slot="HEAD_dbactions" slot-scope="data"> 
                <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addDatabase"/> 
              </template>
              <template slot="dbactions" slot-scope="row">
                <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteDatabase(row.item)"/>
              </template>
            </b-table>
          </b-col>
        </b-row>
      </b-card>
      <b-container fluid>
        <b-form-row>
          <b-col md="4" offset-md="5" >
            <b-button type="submit" variant="primary" @click="onClear">Clear Current</b-button>
            <b-button type="submit" variant="secondary" @click="onCancel">Cancel</b-button>
          </b-col>
        </b-form-row>
      </b-container> 
    </b-form>
  </div>
</template>

<script>

import axios from 'axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import EventBus from '../utils/event-bus';
import NewDatabaseModal from './NewDatabaseModal'

export default {
  props : {
    databases : Array
  },
  watch : {
    databases : {
      handler() {
        this.theDatabases = this.databases;
      },
      deep: true
    }
  },
  computed : {
    dbs() {
      return this.theDatabases.length > 0 ? this.theDatabases.map(db => ({name : db})) : [];
    }
  },
  components : {
    Loading,
    NewDatabaseModal
  },
  data() {
    return {
      isLoading : false,
      theDatabases : this.databases,
      dbTableFields : {
        dbactions : {label : ''},
        name : {label : 'Database', sortable: true}
      }
    }
  },
  methods : {
    onClear(evt) {
      evt.preventDefault();
      const clearUrl = this.$store.state.url + '/api/settings/clear';
      this.isLoading = true;
      axios.post(clearUrl,{
        session_id : this.$store.state.session,
        object : this.objt
      })
      .then(response => {
        this.isLoading = false;
        EventBus.$emit('operation-success',response.data.message)
        this.$router.push({ name: 'home'});
      })
      .catch((error) => {
        this.isLoading = false;
        EventBus.$emit('operation-failure',error)
      });
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'home'});
    },
    addDatabase() {
      this.$refs.newDbDialog.show();  
    },
    createDatabase(dbName) {
      const createUrl = this.$store.state.url + '/api/settings/database/' + dbName + '/create';
      this.isLoading = true;
      axios.post(createUrl,{
        session_id : this.$store.state.session,
        object : this.objt
      })
      .then(response => {
        this.isLoading = false;
        EventBus.$emit('operation-success',response.data.message)
        this.$router.push({ name: 'home'});
      })
      .catch((error) => {
        this.isLoading = false;
        EventBus.$emit('operation-failure',error)
      });

    },
    openDatabase(item) {
      const clearUrl = this.$store.state.url + '/api/settings/database/' + item.name + '/open';
      this.isLoading = true;
      axios.post(clearUrl,{
        session_id : this.$store.state.session,
        object : this.objt
      })
      .then(response => {
        this.isLoading = false;
        EventBus.$emit('operation-success',response.data.message)
        this.$router.push({ name: 'home'});
      })
      .catch((error) => {
        this.isLoading = false;
        EventBus.$emit('operation-failure',error)
      });
    },
    deleteDatabase(item) {
      const delUrl = this.$store.state.url + '/api/settings/database/' + item.name + '/delete';
      this.isLoading = true;
      axios.post(delUrl,{
        session_id : this.$store.state.session,
        object : this.objt
      })
      .then(response => {
        this.isLoading = false;
        EventBus.$emit('operation-success',response.data.message)
        this.$router.push({ name: 'home'});
      })
      .catch((error) => {
        this.isLoading = false;
        EventBus.$emit('operation-failure',error)
      });
    }
  }
}
</script>