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

  <div class="objectview">
    <b-breadcrumb :items="bcItems" /> 
    <component :is="componentLoader" :object="this.objt" :label="this.commitLabel" v-on:object-commit="commitNamedObject" />
  </div>
</template>

<script>


import axiosMixin from '../mixins/axiosMixin'
import axios from 'axios';
import store from '../store'
import EventBus from '../utils/event-bus';
import defaultObjectFactory from '../utils/defaultObjectFactory';

export default {
  props : {
    dimension: {
      type: String,
      default: () => null
    },
    objectName : {
      type: String
    },
    objectsLabel : {
      type: String
    },
    componentFile: {
      type: String
    },
    updatePath : {
      type: String
    },
    createPath : {
      type: String
    },
    directoryEntry : {
      type: Object,
      default: undefined
    }
  },
  mixins : [
    axiosMixin
  ],
  computed : {
    bcItems() {
      return this.objt != undefined ? [{text: 'Home', to: {name: 'home'}},{text: this.objectsLabel, to: {name: 'objectsview',params: {dimension: this.dimension}}},{text: this.dimension == 'threat' ? this.objt.theThreatName : this.dimension == 'user_goal' ? this.objt.theSynopsis : this.objt.theName, to : {name: 'objectview', params: {dimension: this.dimension, objectName: this.objectName}}}] : [];
    },
    componentLoader() {
      return () => import(`@/components/${this.componentFile}.vue`);
    }
  },
  data() {
    return {
      objt : undefined,
      commitLabel : 'Create'
    }
  }, 
  beforeRouteEnter (to, from, next) {
    if (to.params.objectName == 'New ' + to.params.dimension) {
      next(vm => {
        vm.objt = JSON.parse(JSON.stringify(defaultObjectFactory[vm.dimension]));
      });
    }
    else if (to.params.directoryEntry != undefined) {
      next(vm => {
        vm.objt = to.params.directoryEntry;
      });
    }
    else {
      var url = to.params.updatePath + encodeURIComponent(to.params.objectName)
      axios.get(url,{
        baseURL : store.state.url,
        params : {'session_id' : store.state.session}
      })
      .then(response => {
        next(vm => {
          vm.commitLabel = 'Update';
          vm.objt = response.data;
          if (vm.objt.theTags != undefined) {
            vm.objt.theTags = response.data.theTags.join(', ');
          }
        })
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });
    }
  },
  methods: {
    commitNamedObject(objt) {
      if (this.dimension == 'requirement') {
        this.objt = objt.object;
      }
      else {
        this.objt = objt;
      }
      var updateUrl = this.$store.state.url + this.updatePath + encodeURIComponent(this.objectName) + "?session_id=" + this.$store.state.session;
      var createUrl = this.$store.state.url + this.createPath;
      this.commitObject(updateUrl,createUrl,'objectsview',undefined,this.dimension);
    },
    setData() {
      this.objt = defaultObjectFactory[this.dimension];
    }
  },
  mounted() {
    this.setData();
  }
}
</script>