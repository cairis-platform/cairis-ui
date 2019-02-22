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

  <b-container class="footer" fluid>
    <transition name="fade">
      <div v-if="isSuccess == 1" style="background-color: green;"><font-awesome-icon icon="check" :style="{color: 'black'}" />  {{theStatusMessage}}</div>
      <div v-if="isSuccess == -1" style="background-color: red;"><font-awesome-icon icon="times" :style="{color: 'black'}" />  {{theStatusMessage}}</div>
    </transition>
  </b-container>

</template>

<script>
  import EventBus from '../utils/event-bus';

  export default {
    name: 'status-footer',
    data() {
      return {
        isSuccess : 0,
        theStatusMessage : ''
      }
    },
    mounted() {
      var ref = this;
      EventBus.$on('operation-success',function(msg) {
        ref.isSuccess = 1;
        ref.theStatusMessage = msg;
        setTimeout(function() {
          ref.isSuccess = 0;
        },3000);
      });
      EventBus.$on('operation-failure',function(msg) {
        console.log(msg)
        ref.isSuccess = -1;
        ref.theStatusMessage = msg;
        setTimeout(function() {
          ref.isSuccess = 0;
        },6000);
      });
    }
  };
</script>

<style>

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 5;
  width: 100%;
  background-color: black;
  text-align: center;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>