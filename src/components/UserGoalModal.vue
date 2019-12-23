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

  <b-modal ref="ugDialog" ok-only :title="dialogTitle">
    <b-container v-if="objt != undefined">
      <b-form-group label="Persona" label-class="font-weight-bold text-sm-left" label-for="thePersona" >
        <b-form-input readonly id="thePersona" v-model="objt.theActor"></b-form-input>
      </b-form-group>
      <b-form-group label="Reference" label-class="font-weight-bold text-sm-left" label-for="theReference" >
        <b-form-input readonly id="theReference" v-model="objt.theReference"></b-form-input>
      </b-form-group>
    </b-container>
  </b-modal>
</template>

<script>

  export default {
    name: 'user-goal-modal',
    props : {
      userGoal : Object
    },
    data() {
      return {
        objt : this.userGoal
      }
    },
    watch : {
      userGoal : 'updateData'
    },
    computed : {
      dialogTitle() {
        return (this.objt != undefined ? this.objt.theSynopsis : '') + ' User Goal';
      }
    },
    methods : {
      show() {
        if (this.$refs.ugDialog != undefined) {
          this.$refs.ugDialog.show();
        }
      },
      updateData() {
        this.objt = this.userGoal;
      }
    }
  };
</script>