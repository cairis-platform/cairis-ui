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
  <div id="graphicalmodel" class="vld-parent">
    <loading :active.sync="isLoading" is-full-page></loading>
    <div id="svgViewer" style="height: 100%; width: 100%;" v-html="theSvgData" v-on:click="onClick($event)">
    </div> 
  </div>
</template>

<script>
  import axios from 'axios';
  import EventBus from '../utils/event-bus';
  import svg_pan_zoom from 'svg-pan-zoom';
  import requirementsMixin from '../mixins/requirementsMixin'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

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
    components : {
      Loading
    },
    data() {
      return {
        isLoading : false,
        theSvgData : null
      }
    },
    methods : {
      onClick(event) {
        event.preventDefault();
        if (event.target.parentElement.href != undefined) {
          const url = event.target.parentElement.href.baseVal;
          if (url != undefined) {
            this.$emit('graphical-model-url',url);
          }
        }
        else {
          console.log('undefined href');
        }
      },
      loadModel() {
        this.isLoading = true;
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
          EventBus.$emit('operation-failure',error.response.data.message)
        })
      },
      displayModel() {
        if (this.theSvgData != null) {
          let dp = new DOMParser();
          let doc = dp.parseFromString(this.theSvgData,'image/svg+xml');
          doc.getElementById('svg-id').setAttribute('height','100vh');
          doc.getElementById('svg-id').setAttribute('width','100%');
          doc.getElementById('svg-id').setAttribute('preserveAspectRatio','none');
          let xp = new XMLSerializer();
          this.theSvgData = xp.serializeToString(doc);
          svg_pan_zoom('#svg-id', {
            zoomEnabled: true,
            controlIconsEnabled: true,
            fit: true,
            center: true,
            contain: true,
            minZoom: 0.2});
        }
      },
      updateModel() {
        if ((this.api.indexOf('api/risks/model') >= 0) || (this.api.indexOf('api/requirements/model') >= 0)) {
          this.updateRequirementsNodes();
        }
        else {
          this.displayModel();
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
      this.updateModel();
      this.isLoading = false;
    }
  };
</script>