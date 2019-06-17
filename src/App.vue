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

  <b-container id="app" fluid>
    <div id="content">
    <b-row>
      <b-col>
        <navbar/>
      </b-col>
    </b-row> 
    <b-row>
      <b-col>
        <router-view/>
      </b-col>
    </b-row>
    </div>
    <status-footer/>
  </b-container>
</template>

<script>
import Navbar from './components/Navbar';
import StatusFooter from './components/StatusFooter';
import axios from 'axios';
import EventBus from '@/utils/event-bus';

export default {
  name: 'App',
  props : ['Trello'],
  components: {
    Navbar,
    StatusFooter
  },
  created() {
    if (process.env.VUE_APP_TEST_CAIRIS_SERVER) {
      this.$store.state.url = process.env.VUE_APP_TEST_CAIRIS_SERVER;
    }
    if (process.env.VUE_APP_TEST_SESSION == undefined) {
      let that = this;
      const sessionUrl = this.$store.state.url + '/make_session';
      axios.post(sessionUrl)
      .then(response => {
        that.$store.state.session = response.data['session_id'];
        that.$store.state.user = response.data['user'];
        axios.get('/api/settings',{
          baseURL : this.$store.state.url,
          params : {'session_id' : this.$store.state.session}
         })
        .then(response => {
          document.title = response.data.projectName;
         })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        });
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });
    }
    else {
      this.$store.state.session = process.env.VUE_APP_TEST_SESSION;
    }
  }
}
</script>
<style scoped>
div {
  width: 100%;
}
#app {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
 #nav {
  padding: 30px;
} 

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#content {
  padding-bottom: 30px; 
}

</style>
