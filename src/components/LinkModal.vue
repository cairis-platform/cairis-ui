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

  <b-modal ref="linkDialog" title="Add link"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card>
      <b-container fluid>
        <b-row>
          <b-form-select id="theLinkSelect" v-model="theLink" :options="locations" class="mb-3" required />
        </b-row>
      </b-container>
    </b-card>
  </b-modal> 
</template>

<script>

  export default {
    name : 'link-modal',
    props : {
      locations : Array
    },
    data () {
      return {
        theLink : '',
        errors : []
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.theLink.length == 0) {
          this.errors.push('Link name is required');
        }
        if (!this.errors.length) {
          return true;
        }
        else {
          return false;
        }
      },
      show() {
        this.$refs.linkDialog.show();
      },
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('link-update',this.theLink);
          this.$refs.linkDialog.hide();
        }
      }
    }
  }
</script>