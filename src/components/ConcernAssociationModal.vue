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

  <b-modal ref="concernAssocDialog" :title="this.dialogTitle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card>
      <b-form-group label="Source" label-class="text-sm-left" label-cols="3" horizontal label-for="theSourceSelect" >
        <b-form-select id="theSourceSelect" v-model="association.association.theSource" :options="concerns" class="mb-3" required></b-form-select>
      </b-form-group>
      <b-form-group label="n" label-class="text-sm-left" label-cols="3" horizontal label-for="theSourceNryRadio" >
        <b-form-radio-group v-model="association.association.theSourceNry">
          <b-form-radio value="1">1</b-form-radio>
          <b-form-radio value="*">*</b-form-radio>
          <b-form-radio value="1..*">1..*</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <b-form-group label="<b>Link</b>" label-class="text-md-left" label-for="theLinkVerbInput">
        <b-form-input id="theLinkVerbInput" v-model="association.association.theLinkVerb" type="text" required>
        </b-form-input>
      </b-form-group>
      <b-form-group label="n" label-class="text-sm-left" label-cols="3" horizontal label-for="theTargetNryRadio" >
        <b-form-radio-group v-model="association.association.theTargetNry">
          <b-form-radio value="1">1</b-form-radio>
          <b-form-radio value="*">*</b-form-radio>
          <b-form-radio value="1..*">1..*</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <b-form-group label="Target" label-class="text-sm-left" label-cols="3" horizontal label-for="theTargetSelect" >
        <b-form-select id="theTargetSelect" v-model="association.association.theTarget" :options="concerns" class="mb-3" required></b-form-select>
      </b-form-group>
    </b-card>
  </b-modal> 
</template>

<script>

  export default {
    name : 'concern-association-modal',
    props : {
      concerns : Array,
      concernAssociation : Object
    },
    data () {
      return {
        association: this.concernAssociation,
        errors : []
      }
    },
    computed : {
      dialogTitle() {
        return (this.concernAssociation.update ? "Update " : "Add ") + " Concern Association";
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.association.association.theSource.length == 0) {
          this.errors.push('Source is required');
        }
        if (this.association.association.theSourceNry.length == 0) {
          this.errors.push('Source multiplicity is required');
        }
        if (this.association.association.theTargetNry.length == 0) {
          this.errors.push('Target multiplicity is required');
        }
        if (this.association.association.theTarget.length == 0) {
          this.errors.push('Target is required');
        }
        if (!this.errors.length) {
          return true;
        }
        else {
          return false;
        }
      },
      show() {
        this.$refs.concernAssocDialog.show();
      },
      onOk(evt) {
        evt.preventDefault();
        if (this.checkForm()) {
          this.$emit('concern-association-update',{association : this.association.association,update : this.concernAssociation.update,index: this.concernAssociation.update ? this.association.index : -1});

          this.$refs.concernAssocDialog.hide();
        }
      }
    }
  }
</script>