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

  <b-modal ref="interfaceDialog" :title="this.dialogTitle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card>
      <b-form-group label="Interface" label-class="text-sm-left" label-cols="3" label-for="theComponentInterfaceInput" >
        <b-form-input id="theComponentInterfaceInput" v-model="componentinterface.componentinterface.theName" type="text" required />
      </b-form-group>
      <b-form-group label="Type" label-class="text-sm-left" label-cols="3" label-for="theType" >
        <b-form-select id="theType" v-model="componentinterface.componentinterface.theType" :options="typeValues" class="mb-3" required></b-form-select>
      </b-form-group>
      <b-form-group label="Access Right" label-class="text-sm-left" label-cols="3" label-for="theAccessRight" >
        <dimension-select id="theAccessRight" dimension='access_right' :initial="this.componentinterface.componentinterface.theAccessRight" v-on:dimension-select-change="accessRightSelected" v-on:dimension-items-updated="accessRightsLoaded" required />
      </b-form-group>
      <b-form-group label="Privilege" label-class="text-sm-left" label-cols="3" label-for="thePrivilege" >
        <dimension-select id="thePrivilege" dimension='privilege' :initial="this.componentinterface.componentinterface.thePrivilege" v-on:dimension-select-change="privilegeSelected" v-on:dimension-items-updated="privilegesLoaded" required />
      </b-form-group>
    </b-card>
  </b-modal> 
</template>

<script>

import DimensionSelect from '@/components/DimensionSelect.vue'

  export default {
    name : 'component-interface-modal',
    props : {
      componentInterface : Object
    },
    data () {
      return {
        componentinterface: this.componentInterface,
        errors : [],
        typeValues : ['provided','required']
      }
    },
    components : {
      DimensionSelect
    },
    computed : {
      dialogTitle() {
        return (this.componentInterface.update ? "Update" : "Add") + " Component interface";
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.componentinterface.componentinterface.theName.length == 0) {
          this.errors.push('Interface name is required');
        }
        if (this.componentinterface.componentinterface.theType.length == 0) {
          this.errors.push('Interface type is required');
        }
        if (this.componentinterface.componentinterface.theAccessRight.length == 0) {
          this.errors.push('Access right is required');
        }
        if (this.componentinterface.componentinterface.thePrivilege.length == 0) {
          this.errors.push('Privilege is required');
        }
        if (!this.errors.length) {
          return true;
        }
        else {
          return false;
        }
      },
      show() {
        this.$refs.interfaceDialog.show();
      },
      accessRightSelected(item) {
        this.componentinterface.componentinterface.theAccessRight = item;
      },
      accessRightsLoaded(item) {
        this.componentinterface.componentinterface.theAccessRight = item;
      },
      privilegeSelected(item) {
        this.componentinterface.componentinterface.thePrivilege = item;
      },
      privilegesLoaded(item) {
        this.componentinterface.componentinterface.thePrivilege = item;
      },
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('interface-update',{interface : this.componentinterface.componentinterface, update : this.componentInterface.update,index: this.componentInterface.update ? this.componentinterface.index : -1});
          this.$refs.interfaceDialog.hide();
        }
      }
    }
  }
</script>