/*  Licensed to the Apache Software Foundation (ASF) under one
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

    Authors: Shamal Faily */

import axios from 'axios';
import EventBus from '../utils/event-bus';

export default {

  methods : {
    commitObject(updateUrl,createUrl,dimRoute,defaultParameters,dimParameter) {
      if (typeof defaultParameters == 'undefined') {
        defaultParameters = {post : {}, put: {}}
      }
      if (this.commitLabel == 'Update') {
        axios.put(updateUrl,{
          session_id : this.$store.state.session,
          object : this.objt
        })
        .then(response => {
          EventBus.$emit('operation-success',response.data.message);
          if (dimParameter != undefined) {
            this.$router.push({ name: dimRoute,params : {dimension : dimParameter}});
          }
          else {
            this.$router.push({ name: dimRoute});
          }
        })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        })
      }
      else {
        axios.post(createUrl,{
          session_id : this.$store.state.session,
          object : this.objt
        },
        {
          params : defaultParameters['post']
        })
        .then(response => {
          EventBus.$emit('operation-success',response.data.message);
          if (dimParameter != undefined) {
            this.$router.push({ name: dimRoute,params : {dimension : dimParameter}});
          }
          else {
            this.$router.push({ name: dimRoute});
          }
        })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        })
      }
    }
  },
  postImage(formData) {
    const url = '/api/upload/image?session_id=' + this.$store.state.session
    axios.post(url, formData)
    .then(response => {
      EventBus.$emit('operation-success',response.data.message)
    })
    .catch((error) => {
      EventBus.$emit('operation-failure',error)
    })
  }
}