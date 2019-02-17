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

  <b-modal ref="contributorModal" :title="this.dialogTitle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card no-body>
      <b-form-group label="First name" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theFirstNameInput">
        <b-form-input id="theFirstNameInput" v-model="objt.firstName" type="text" required>
        </b-form-input>
      </b-form-group>
      <b-form-group label="Surname" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theSurnameInput">
        <b-form-input id="theSurnameInput" v-model="objt.surname" type="text" required>
        </b-form-input>
      </b-form-group>
      <b-form-group label="Affiliation" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theAffiliationInput">
        <b-form-input id="theAffiliationInput" v-model="objt.affiliation" type="text" required>
        </b-form-input>
      </b-form-group>
      <b-form-group label="Role" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theRoleRadio">
        <b-form-radio-group id="theRoleRadio" v-model="objt.role">
          <b-form-radio value="Participant">Participant</b-form-radio>
          <b-form-radio value="Facilitator">Facilitator</b-form-radio>
          <b-form-radio value="Scribe">Scribe</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </b-card> 
  </b-modal> 
</template>

<script>

  export default {
    name : 'contributor-modal',
    props : {
      contributor : Object
    },
    watch : {
      contributor: {
        handler() {
          this.objt = this.contributor.contributor;
        },
        deep: true
      }
    },
    data () {
      return {
        objt: this.contributor.contributor,
        errors : [],
      }
    },
    computed : {
      dialogTitle() {
        return (this.contributor.update ? "Update" : "Add") + " Contributor";
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.objt.firstName.length == 0) {
          this.errors.push('First name is required');
        }
        if (this.objt.surname.length == 0) {
          this.errors.push('Surname is required');
        }
        if (this.objt.affiliation.length == 0) {
          this.errors.push('Affiliation is required');
        }
        if (this.objt.role.length == 0) {
          this.errors.push('Role is required');
        }
        if (!this.errors.length) {
          return true;
        }
        else {
          return false;
        }
      },
      show() {
        this.$refs.contributorModal.show();
      },
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('contributor-update',{contributor : this.objt,update : this.contributor.update,index: this.contributor.update ? this.contributor.index : -1});
          this.$refs.contributorModal.hide();
        } 
      }
    }
  }
</script>