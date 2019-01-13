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
  <div id="svgViewer" style="height: 100%; width: 100%;" v-html="theSvgData" v-on:click="onClick($event)">
  </div> 
</template>

<script>
  import axios from 'axios';
  import EventBus from '../utils/event-bus';
  import svg_pan_zoom from 'svg-pan-zoom';

  export default {
    name: 'graphical-model',
    props : {
      api : String,
      parameters : {
        type : String,
        default : ''
      }
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
          this.theSvgData = response.data.substring(0,5) + `id="svg-id" ` + response.data.slice(5);
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
    },
    updated() {
      if (this.theSvgData != null) {
        svg_pan_zoom('#svg-id', {
          zoomEnabled: true,
          controlIconsEnabled: true,
          fit: true,
          center: true,
          minZoom: 0.2});
      }

    }
  };
</script>