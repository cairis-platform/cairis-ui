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

  <SvgPanZoom
    style="width: 100%; height: 800px; border:1px solid black;"
    :zoomEnabled="true"
    :controlIconsEnabled="true"
    :fit="true"
    :center="true"> 
    <svg width="100%" height="800" v-html="theSvgData" v-on:click="onClick($event)"></svg> 
  </SvgPanZoom> 
</template>

<script>
  import SvgPanZoom from 'vue-svg-pan-zoom';
  import axios from 'axios';
  import EventBus from '../utils/event-bus';

  export default {
    name: 'graphical-model',
    props : {
      api : String,
      parameters : {
        type : String,
        default : ''
      }
    },
    components : {
      SvgPanZoom
    },
    data() {
      return {
        theSvgData : null
      }
    },
    methods : {
      onClick(event) {
        event.preventDefault();
        var url = event.target.parentElement.href.baseVal;
        if (url != undefined) {
          this.$emit('graphical-model-url',url);
        }
      },
      loadModel() {
        var url = this.$store.state.url +  this.api + "?session_id=" + this.$store.state.session
        if (this.parameters != '') {
          url += this.parameters;
        }
        axios.get(url)
        .then(response => {
          this.theSvgData = response.data;
         })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        })
      }
    },
    watch : {
      api : 'loadModel',
      parameters : 'loadModel'
    },
    mounted() {
      this.loadModel(); 
    }
  };
</script>
