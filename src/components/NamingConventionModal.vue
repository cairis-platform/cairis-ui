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

  <b-modal ref="ncDialog" :title="this.dialogTitle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card no-body>
      <b-form-group label="Name" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theNCNameInput">
        <b-form-input id="theNCNameInput" v-model="objt.name" type="text" required>
        </b-form-input>
      </b-form-group>
      <b-form-group label="Definition" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theNCValueInput">
        <b-form-input id="theNCValueInput" v-model="objt.value" type="text" required>
        </b-form-input>
      </b-form-group>
    </b-card> 
  </b-modal> 
</template>

<script>

  export default {
    name : 'naming-convention-modal',
    props : {
      definition : Object
    },
    watch : {
      definition: {
        handler() {
          this.objt = this.definition.definition;
        },
        deep: true
      }
    },
    data () {
      return {
        objt: this.definition.definition,
        errors : [],
      }
    },
    computed : {
      dialogTitle() {
        return (this.definition.update ? "Update" : "Add") + " Naming Convention";
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.objt.name.length == 0) {
          this.errors.push('Name is required');
        }
        if (this.objt.value.length == 0) {
          this.errors.push('Definition is required');
        }
        if (!this.errors.length) {
          return true;
        }
        else {
          return false;
        }
      },
      show() {
        this.$refs.ncDialog.show();
      },
      onOk(evt) {
        if (!this.checkForm()) { 
          evt.preventDefault();
        }
        else {
          this.$emit('naming-convention-update',{definition : this.objt, update : this.definition.update, index: this.definition.update ? this.definition.index : -1});
          this.$refs.ncDialog.hide();
        }
      }
    }
  }
</script>