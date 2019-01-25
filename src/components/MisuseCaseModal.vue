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

  <b-modal ref="mcDialog" ok-only :title="dialogTitle">
    <b-container v-if="objt != undefined">
      <b-form-textarea id="theNarrative" v-model="objt.theDescription" type="text" :rows=10 :max-rows="14" readonly>
      </b-form-textarea>
    </b-container>
  </b-modal>
</template>

<script>

  export default {
    name: 'misuse-case-modal',
    props : {
      environment : String,
      misusecase : Object
    },
    data() {
      return {
        theEnvironmentName : this.environment,
        objt : this.misusecase
      }
    },
    watch : {
      misusecase: 'updateData'
    },
    computed : {
      dialogTitle() {
        return (this.objt != undefined ? this.objt.theName : '') + ' Misuse Case';
      }
    },
    methods : {
      show() {
        this.$refs.mcDialog.show();
      },
      updateData() {
        this.objt = this.misusecase
        this.theEnvironmentName = this.environment
      }
    }
  };
</script>