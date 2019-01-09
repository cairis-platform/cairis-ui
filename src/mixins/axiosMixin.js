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

export const axiosMixin = {

  methods : {
    commitObject(updateUrl,createUrl,dimRoute) {
      if (this.commitLabel == 'Update') {
        var url = this.$store.state.url + "/api/assets/name/" + this.assetName + "?session_id=" + this.$store.state.session;
        axios.put(updateUrl,{
          session_id : this.$store.state.session,
          object : this.objt
        })
        .then(response => {
          EventBus.$emit('operation-success',this.objt.theName + ' created')
          this.$router.push({ name: dimRoute})
        })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        })
      }
      else {
        var url = this.$store.state.url + "/api/assets";
        axios.post(createUrl,{
          session_id : this.$store.state.session,
          object : this.objt
        })
        .then(response => {
          EventBus.$emit('operation-success',this.objt.theName + ' updated')
          this.$router.push({ name: dimRoute})
        })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        })
      }
    }
  }
}