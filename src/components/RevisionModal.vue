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

  <b-modal ref="revisionDialog" :title="this.dialogTitle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card>
      <b-form-group label="Revision comments" label-class="font-weight-bold text-md-left" label-for="theRevisionInput">
        <b-form-textarea id="theRevisionInput" v-model="objt" type="text" :rows=2 :max-rows=4 required>
        </b-form-textarea>
      </b-form-group>
    </b-card> 
  </b-modal> 
</template>

<script>

  export default {
    name : 'revision-modal',
    data () {
      return {
        objt: '',
        dialogTitle : 'Add Revision',
        errors : [],
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.objt.length == 0) {
          this.errors.push('Revision text is required');
        }
        if (!this.errors.length) {
          return true;
        }
        else {
          return false;
        }
      },
      show() {
        this.$refs.revisionDialog.show();
      },
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('revision-update',this.objt);
          this.$refs.revisionDialog.hide();
        }
      }
    }
  }
</script>