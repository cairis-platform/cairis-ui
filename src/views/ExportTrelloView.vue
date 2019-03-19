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

  <div class="totrello">
    <b-form class="vld-parent">
      <loading :active.sync="isLoading" is-full-page></loading>
      <b-breadcrumb :items="bcItems" /> 
      <b-container fluid>
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </p>
        <b-card bg-variant="light">
          <b-form-group label="Board" label-class="text-md-left" label-cols="3" label-for="theBoardInput">
            <b-form-input id="theBoardInput" v-model="theBoardName" type="text" required />
          </b-form-group>
        </b-card>
      </b-container> 
      <b-container fluid>
        <b-form-row>
          <b-col md="4" offset-md="5" >
            <b-button type="submit" variant="primary" @click="onExport">Export</b-button>
            <b-button type="submit" variant="secondary" @click="onCancel">Cancel</b-button>
          </b-col>
        </b-form-row>
      </b-container> 
    </b-form>

  </div>
</template>


<script>

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios';
import EventBus from '../utils/event-bus';

function RateLimit(fn, delay, context) {
  var queue = [], timer = null;

  function processQueue() {
    var item = queue.shift();
    if (item) {
      fn.apply(item.context, item.arguments);
    }
    if (queue.length === 0) {
      clearInterval(timer), timer = null;
    }
  }

  return function limited() {
    queue.push({
      context: context || this,
      arguments: [].slice.call(arguments)
    });
    if (!timer) {
      processQueue();
      timer = setInterval(processQueue, delay);
    }
  }
}

export default {
  computed : {
    bcItems() {
     return [{text: 'Home', to: {name: 'home'}},{text: 'Trello Export', to: {name: 'totrello'}}]
    },
  },
  components : {
    Loading
  },
  data() {
    return {
      errors : [],
      isLoading : false,
      theBoardName : ''
    }
  },
  methods : {
    checkForm() {
      this.errors = []

      if (this.theBoardName.length == 0) {
        this.errors.push('Board name is required');
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    },
    onExport(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        this.isLoading = true;
        let that = this;
        // eslint-disable-next-line
        Trello.authorize({
          type: 'popup',
          name: 'CAIRIS',
          scope: {read: 'true', write: 'true'},
          expiration: 'never',
          success: function() {
            that.exportBoard();
          },
          error: function() {
            EventBus.$emit('operation-failure','Authentication failed')
          }
        });
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.isLoading = false;
      this.$router.push({ name: 'home'})
    },
    exportBoard() {
      const that = this;
      // eslint-disable-next-line
      Trello.post('/boards/',{name: this.theBoardName},function(createBoardData) {
        const boardId = createBoardData.id;

        // eslint-disable-next-line
        Trello.post('/boards/' + boardId + '/labels',{name: 'grounds', color: 'green'},function(){});
        // eslint-disable-next-line
        Trello.post('/boards/' + boardId + '/labels',{name: 'warrant', color: 'blue'},function(){});
        // eslint-disable-next-line
        Trello.post('/boards/' + boardId + '/labels',{name: 'rebuttal', color: 'red'},function(){});

        const newList = {name : 'Uncategorised Factoids', defaultLists: false};

        // eslint-disable-next-line
        Trello.post('/boards/' + boardId + '/lists',newList,function(createListData) {
          const listId = createListData.id;
          axios.get('/api/document_references',{
            baseURL : that.$store.state.url,
            params : {'session_id' : that.$store.state.session}
          })
          .then(response => {
            let rlPost = RateLimit(that.postReference,100);
            response.data.forEach(function(dr) {
              rlPost(dr,listId);            
            });
            that.isLoading = false;
            EventBus.$emit('operation-success','Document references exported');
          })
          .catch((error) => {
            that.isLoading = false;
            EventBus.$emit('operation-failure',error)
          });
        });
      });
    },
    postReference(dr,listId) {
      const newCard = {name: dr.theName, desc: dr.theExcerpt, due: null};
      // eslint-disable-next-line
      Trello.post('/lists/' + listId + '/cards',newCard,function() {});
    }
  }
}
</script>