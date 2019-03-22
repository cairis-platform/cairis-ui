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

  <b-modal ref="assocDialog" ok-only :title="dialogTitle">
    <b-container v-if="objt != undefined">
      <b-form-group label="Rationale" label-class="font-weight-bold text-sm-left" label-for="theRationale" >
        <b-form-textarea id="theRationale" v-model="objt.theRationale" type="text" :rows=2 :max-rows="4" readonly />
      </b-form-group>
    </b-container>
  </b-modal>
</template>

<script>

  export default {
    name: 'goal-association-modal',
    props : {
      association : Object
    },
    data() {
      return {
        objt : this.association,
      }
    },
    watch : {
      association: 'updateData'
    },
    computed : {
      dialogTitle() {
        return (this.objt != undefined ? this.objt.theEnvironmentName +'/' + this.objt.theGoal + '/' + this.objt.theSubGoal : '') + ' association';
      },
    },
    methods : {
      show() {
        this.$refs.assocDialog.show();
      },
      updateData() {
        this.objt = this.association;
      }
    }
  };
</script>