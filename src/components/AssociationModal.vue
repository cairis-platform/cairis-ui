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

  <b-modal ref="associationDialog" :title="this.dialogTitle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card>
      <b-form-group label="Asset" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theHeadAssetInput" >
        <b-form-input readonly id="theHeadAssetInput" v-model="assetAssociation.asset"></b-form-input>
      </b-form-group>
      <b-form-group label="Navigation" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theHeadNavInput" >
        <b-form-select id="theHeadNavInput" v-model="association.association.theHeadNav" :options="navValues" class="mb-3" required></b-form-select>
      </b-form-group>
      <b-form-group label="Adornment" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theHeadAdornmentInput" >
        <b-form-select id="theHeadAdornmentInput" v-model="association.association.theHeadType" :options="typeValues" class="mb-3" required></b-form-select>
      </b-form-group>
      <b-form-group label="nry" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theHeadNryInput" >
        <b-form-select id="theHeadNryInput" v-model="association.association.theHeadMultiplicity" :options="nryValues" class="mb-3" required></b-form-select>
      </b-form-group>
      <b-form-group label="Role" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theHeadRoleInput" >
        <b-form-input id="theHeadRoleInput" v-model="association.association.theHeadRole"></b-form-input>
      </b-form-group>
      <b-form-group label="Role" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theTailRoleInput" >
        <b-form-input id="theTailRoleInput" v-model="association.association.theTailRole"></b-form-input>
      </b-form-group>
      <b-form-group label="nry" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theTailNryInput" >
        <b-form-select id="theTailNryInput" v-model="association.association.theTailMultiplicity" :options="nryValues" class="mb-3" required></b-form-select>
      </b-form-group>
      <b-form-group label="Adornment" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theTailAdornmentInput" >
        <b-form-select id="theTailAdornmentInput" v-model="association.association.theTailType" :options="typeValues" class="mb-3" required></b-form-select>
      </b-form-group>
      <b-form-group label="Navigation" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theTailNavInput" >
        <b-form-select id="theTailNavInput" v-model="association.association.theTailNav" :options="navValues" class="mb-3" required></b-form-select>
      </b-form-group>
      <b-form-group label="Tail" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theTailAssetInput" >
        <dimension-select id="theTailAssetInput" dimension='asset' :environment=this.assetAssociation.environment :existing=this.assetAssociation.assets :initial="this.assetAssociation.initial" v-on:dimension-select-change="tailAssetSelected" v-on:dimension-items-updated="tailAssetsLoaded" /> 
      </b-form-group>
    </b-card>
  </b-modal> 
</template>

<script>

import DimensionSelect from '@/components/DimensionSelect.vue'

  export default {
    name : 'association-modal',
    props : {
      assetAssociation : Object
    },
    data () {
      return {
        association: this.assetAssociation,
        errors : [],
        navValues : ['0','1'],
        typeValues : ['Inheritance','Association','Aggregation','Composition','Dependency'],
        nryValues : ['1','*','1..*']        
      }
    },
    components : {
      DimensionSelect
    },
    computed : {
      dialogTitle() {
        return (this.assetAssociation.update ? "Update" : "Add") + " Asset Association";
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.association.association.theHeadType.length == 0) {
          this.errors.push('Head Adornment is required');
        }
        if (this.association.association.theHeadMultiplicity.length == 0) {
          this.errors.push('Head Multiplicity is required');
        }
        if (this.association.association.theTailMultiplicity.length == 0) {
          this.errors.push('Tail Multiplicity is required');
        }
        if (this.association.association.theTailType.length == 0) {
          this.errors.push('Tail Adornment is required');
        }
        if (this.association.association.theTailName.length == 0) {
          this.errors.push('Tail Asset is required');
        }
        if (!this.errors.length) {
          return true;
        }
        else {
          return false;
        }
      },
      show() {
        this.$refs.associationDialog.show();
      },
      tailAssetSelected(item) {
        if (item != undefined) {
          this.association.association.theTailName = item;
        }
      },
      tailAssetsLoaded(item) {
        this.association.association.theTailName = item;
      },
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('association-update',{association : this.association.association,update : this.assetAssociation.update,index: this.assetAssociation.update ? this.association.index : -1});
          this.$refs.associationDialog.hide();
        }
      }
    }
  }
</script>