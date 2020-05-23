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

  <b-modal ref="obstacleDialog" title="Select dataflow obstacle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card>
      <b-form-group label="Obstacle" label-for="obstacleSelect">
        <dimension-select id="obstacleSelect" :environment="this.selectedObject.environment" dimension="obstacle" :existing="this.existing" :initial="this.selectedObject.dataFlowObstacle.theObstacleName" v-on:dimension-select-change="obstacleSelected" v-on:dimension-items-updated="obstaclesLoaded" />
      </b-form-group>
      <b-form-group label="Keyword" label-for="keywordSelect">
        <b-form-select id="keywordSelect" ref="keywordSelect" v-model="object.dataFlowObstacle.theKeyword" :options="keywordValues" class="mb-3" required />
      </b-form-group>
      <b-form-group label="Context" label-for="contextInput">
        <b-form-textarea id="contextInput" v-model="object.dataFlowObstacle.theContext" type="text" :rows=2 :max-rows=2 required />
      </b-form-group>
    </b-card>
  </b-modal>
</template>

<script>

import DimensionSelect from '@/components/DimensionSelect.vue'

  export default {
    name : 'dataflow-obstacle-modal',
    props : {
      existing : Array,
      selectedObject: Object
    },
    data () {
      return {
        object : this.selectedObject,
        keywordValues : ['does not provide','provides','provides too early','provides too late','provides out of order','stopped too soon','applied too long','not applicable'],
        errors : []
      }
    },
    components : {
      DimensionSelect
    },
    methods : {
      show() {
        this.$refs.obstacleDialog.show();
      },
      obstacleSelected(item) {
        this.object.dataFlowObstacle.theObstacleName = item;
      },
      obstaclesLoaded(item) {
        this.object.dataFlowObstacle.theObstacleName = item;
      },
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('dataflow-obstacle-modal-update',{object : this.object.dataFlowObstacle, update : this.selectedObject.update, index: this.selectedObject.update ? this.selectedObject.index : -1});
          this.$refs.obstacleDialog.hide();
        }
      },
      checkForm() {
        this.errors = []
        if (this.object.dataFlowObstacle.theObstacleName.length == 0) {
          this.errors.push('Obstacle is required');
        }
        if (this.object.dataFlowObstacle.theKeyword.length == 0) {
          this.errors.push('Keyword is required');
        }
        if (this.object.dataFlowObstacle.theContext.length == 0) {
          this.errors.push('Context is required');
        }  
        if (!this.errors.length) {
          return true;
        }
        else {
          return false;
        }
      }
    }
  }

</script>