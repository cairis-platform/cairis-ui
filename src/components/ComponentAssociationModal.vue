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
      <b-container fluid>
        <b-row>
          <b-col md="12">
            <b-form-group label="Asset" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theHeadAssetSelect" >
              <dimension-select ref="theHeadAssetSelect" id="theHeadAssetSelect" dimension='template_asset' :initial="association.association.theHeadAsset" v-on:dimension-select-change="headAssetSelected" v-on:dimension-items-updated="headAssetsLoaded" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if="isArchitecturalPattern">
          <b-col md="12">
            <b-form-group label="Navigation" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theHeadNavSelect" >
              <b-form-select id="theHeadNavSelect" v-model="association.association.theHeadNav" :options="navValues" class="mb-3" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Adornment" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theHeadAdornmentSelect" >
              <b-form-select id="theHeadAdornmentSelect" v-model="association.association.theHeadAdornment" :options="typeValues" class="mb-3" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Nry" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theHeadNrySelect" >
              <b-form-select id="theHeadNrySelect" v-model="association.association.theHeadNry" :options="nryValues" class="mb-3" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Role" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theHeadRoleInput" >
              <b-form-input id="theHeadRoleInput" v-model="association.association.theHeadRole" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Role" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theTailRoleInput" >
              <b-form-input id="theTailRoleInput" v-model="association.association.theTailRole" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Nry" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theTailNryInput" >
              <b-form-select id="theTailNryInput" v-model="association.association.theTailNry" :options="nryValues" class="mb-3" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Adornment" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theTailAdornmentInput" >
              <b-form-select id="theTailAdornmentInput" v-model="association.association.theTailAdornment" :options="typeValues" class="mb-3" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if="isArchitecturalPattern">
          <b-col md="12">
            <b-form-group label="Navigation" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theTailNavInput" >
              <b-form-select id="theTailNavInput" v-model="association.association.theTailNav" :options="navValues" class="mb-3" required />
           </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group label="Tail" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theTailAssetSelect" >
              <dimension-select id="theTailAssetSelect" ref="theTailAssetSelect" dimension='template_asset' :initial="this.association.association.theTailAsset" v-on:dimension-select-change="tailAssetSelected" v-on:dimension-items-updated="tailAssetsLoaded" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </b-modal> 
</template>

<script>

import DimensionSelect from '@/components/DimensionSelect.vue'

  export default {
    name : 'component-association-modal',
    props : {
      componentAssociation : Object,
      isArchitecturalPattern : {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        association: this.componentAssociation,
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
        return (this.componentAssociation.update ? "Update" : "Add") + " Component association";
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.association.association.theHeadAsset.length == 0) {
          this.errors.push('Head Asset is required');
        }
        if (this.association.association.theHeadAdornment.length == 0) {
          this.errors.push('Head Adornment is required');
        }
        if (this.association.association.theHeadNry.length == 0) {
          this.errors.push('Head Multiplicity is required');
        }
        if (this.association.association.theTailNry.length == 0) {
          this.errors.push('Tail Multiplicity is required');
        }
        if (this.association.association.theTailAdornment.length == 0) {
          this.errors.push('Tail Adornment is required');
        }
        if (this.association.association.theTailAsset.length == 0) {
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
      headAssetSelected(item) {
        this.association.association.theHeadAsset = item;
      },
      headAssetsLoaded(item) {
        this.association.association.theHeadAsset = item;
      },
      tailAssetSelected(item) {
        this.association.association.theTailAsset = item;
      },
      tailAssetsLoaded(item) {
        this.association.association.theTailAsset = item;
      },
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('association-update',{association : this.association.association,update : this.componentAssociation.update,index: this.componentAssociation.update ? this.association.index : -1});
          this.$refs.associationDialog.hide();
        }
      }
    }
  }
</script>