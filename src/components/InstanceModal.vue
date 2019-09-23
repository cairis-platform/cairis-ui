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

  <b-modal ref="instanceDialog" :title="this.dialogTitle"  @ok="onOk">
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
            <b-form-group label="Instance" label-class="font-weight-bold text-md-left" label-for="theInstanceInput" >
              <b-form-input id="theInstanceInput" v-model="instance.instance.theName" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group :label="instanceTypeLabel" label-class="font-weight-bold text-md-left" label-for="theObjectSelect" >
              <dimension-select v-if="instanceType == 'persona'" id="theObjectSelect" ref="theObjectSelect" :dimension='instanceType' :initial="this.instance.instance.thePersona" v-on:dimension-select-change="objectSelected" v-on:dimension-items-updated="objectsLoaded" />
              <dimension-select v-if="instanceType == 'asset'" id="theObjectSelect" ref="theObjectSelect" :dimension='instanceType' :initial="this.instance.instance.theAsset" v-on:dimension-select-change="objectSelected" v-on:dimension-items-updated="objectsLoaded" />
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
    name : 'instance-modal',
    props : {
      instanceType : String,
      locationInstance : Object
    },
    data () {
      return {
        instance : this.locationInstance,
        errors : []
      }
    },
    components : {
      DimensionSelect
    },
    computed : {
      instanceTypeLabel() {
         return this.instanceType[0].toUpperCase() + this.instanceType.substring(1);
      },
      dialogTitle() {
        return (this.locationInstance.update ? "Update " : "Add ") + this.instanceTypeLabel + "  instance";
      }
    },
    methods : {
      checkForm() {
        this.errors = []
        if (this.instance.instance.theName.length == 0) {
          this.errors.push('Instance name is required');
        }
        if (this.instanceType == 'persona' && this.instance.instance.thePersona.length == 0) {
          this.errors.push('Persona is required');
        }
        if (this.instanceType == 'asset' && this.instance.instance.theAsset.length == 0) {
          this.errors.push('Asset is required');
        }

        if (!this.errors.length) {
          return true;
        }
        else {
          return false;
        }
      },
      show() {
        this.$refs.instanceDialog.show();
      },
      objectSelected(item) {
        if (this.instanceType == 'persona') {
          this.instance.instance.thePersona = item;
        }
        else {
          this.instance.instance.theAsset = item;
        }
      },
      objectsLoaded(item) {
        if (this.instanceType == 'persona') {
          this.instance.instance.thePersona = item;
        }
        else {
          this.instance.instance.theAsset = item;
        }
      },
      onOk(evt) {
        if (!this.checkForm()) {
          evt.preventDefault();
        }
        else {
          this.$emit('instance-update',{instance : this.instance.instance,update : this.locationInstance.update,index: this.locationInstance.update ? this.instance.index : -1});
          this.$refs.instanceDialog.hide();
        }
      }
    }
  }
</script>