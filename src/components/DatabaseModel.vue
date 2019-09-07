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
    <new-id-modal ref="newIdDialog" v-on:new-id-modal-update="grantPermissionToId"/> 
      <b-form class="vld-parent"> 
      <loading :active.sync="isLoading" is-full-page /> 
      <b-container fluid>
      <b-card bg-variant="light">
        <b-row>
          <b-col md="12">
            <b-table striped hover small bordered :fields="dbTableFields" :items="theDatabases" @row-clicked="openDatabase">
              <!-- eslint-disable-next-line -->
              <template slot="HEAD_dbactions" slot-scope="data"> 
                <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addDatabase"/> 
              </template>
              <!-- eslint-disable-next-line -->
              <template slot="dbactions" slot-scope="row">
                <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="deleteDatabase(row)"/>
              </template>
              <!-- eslint-disable-next-line -->
              <template slot="permissions" slot-scope="row">
                  <b-button size="sm" v-if="row.item.permissioned == 'Y'" @click="showPermissions(row)" class="mr-2">
                    {{ row.detailsShowing ? 'Hide' : 'Show'}} Permissions
                  </b-button>
              </template>
              <!-- eslint-disable-next-line -->
              <template slot="row-details" slot-scope="row">
                <b-card>
                  <b-row class="mb-12">
                    <b-table striped hover small bordered :fields="permissionTableFields" :items="ids">
                      <!-- eslint-disable-next-line -->
                      <template slot="HEAD_permittedactions" slot-scope="data"> 
                        <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="grantPermission"/> 
                      </template>
                      <!-- eslint-disable-next-line -->
                      <template slot="permittedactions" slot-scope="row">
                        <font-awesome-icon icon="minus" :style="{color: 'red'}" @click.stop="revokePermission(row)"/>
                      </template>
                    </b-table>
                  </b-row>
                </b-card>
              </template>
            </b-table>
          </b-col>
        </b-row>
      </b-card>
      </b-container>
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
import NewIdModal from './NewIdModal'
import store from '../store'

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
    ids() {
      return this.thePermittedIds.length > 0 ? this.thePermittedIds.map(id => ({name : id})) : [];
    }
  },
  components : {
    Loading,
    NewDatabaseModal,
    NewIdModal
  },
  data() {
    return {
      isLoading : false,
      theDatabases : this.databases,
      theCurrentDatabase : '',
      dbTableFields : {
        dbactions : {label : ''},
        database : {label : 'Database', sortable: true},
        permissions : {label: ''}
      },
      thePermittedIds : [],
      permissionTableFields : {
        permittedactions : {label : ''},
        name : {label : 'Account', sortable: true},
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
      const clearUrl = this.$store.state.url + '/api/settings/database/' + item.database + '/open';
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
    deleteDatabase(row) {
      const delUrl = this.$store.state.url + '/api/settings/database/' + row.item.database + '/delete';
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
    },
    showPermissions(row) {
      const url = '/api/permissions/database/' + row.item.database;
      this.theCurrentDatabase = row.item.database;
      axios.get(url,{
        baseURL : store.state.url,
        params : {'session_id' : store.state.session}
      })
      .then(response => {
        this.thePermittedIds = response.data;
        row.toggleDetails();
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error.response.data.message);
      });
    },
    grantPermission() {
      this.$refs.newIdDialog.show();  
    },
    grantPermissionToId(userId) {
      this.changePermission(userId,'grant');
    },
    revokePermission(row) {
      this.changePermission(row.item.name,'revoke');
    },
    changePermission(userId,permission) {
      const revokeUrl = this.$store.state.url + '/api/permissions/database/' + this.theCurrentDatabase + '/user/' + userId + '/permission/' + permission;
      this.isLoading = true;
      axios.post(revokeUrl,{
        session_id : this.$store.state.session,
      })
      .then(response => {
        if (permission == 'grant') {
          this.thePermittedIds.push(userId);
        }
        else {
          this.thePermittedIds.splice(userId);
        }
        this.isLoading = false;
        EventBus.$emit('operation-success',response.data.message);
      })
      .catch((error) => {
        this.isLoading = false;
        EventBus.$emit('operation-failure',error.response.data.message);
      });
    }
  }
}
</script>