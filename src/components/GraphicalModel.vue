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
  import requirementsMixin from '../mixins/requirementsMixin'

  export default {
    name: 'graphical-model',
    props : {
      api : String,
      parameters : {
        type : String,
        default : ''
      },
      jsonParameters : {
        type : Object,
        default : function() {
          return {}
        }
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
        var url = this.api + "?session_id=" + this.$store.state.session
        if (this.parameters != '') {
          url += this.parameters;
        }
        var getParameters = {'session_id' : this.$store.state.session}
        Object.assign(getParameters,this.jsonParameters)
        axios.get(url,{
          baseURL : this.$store.state.url,
          params : getParameters
        })
        .then(response => {
          this.theSvgData = response.data.substring(0,5) + `id="svg-id" ` + response.data.slice(5);
         })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        })
      },
      displayModel() {
        if (this.theSvgData != null) {
          svg_pan_zoom('#svg-id', {
            zoomEnabled: true,
            controlIconsEnabled: true,
            fit: true,
            center: true,
            minZoom: 0.2});
        }
      }
    },
    watch : {
      api : 'loadModel',
      parameters : 'loadModel',
      jsonParameters : {
        handler : 'loadModel',
        deep : true
      }
    },
    mixins : [
      requirementsMixin
    ],
    mounted() {
      this.loadModel(); 
    },
    updated() {
      if (this.api.indexOf('api/risks/model')) {
        this.updateRequirementsNodes();
      }
      else {
        this.displayModel();
      }
    }
  };
</script>