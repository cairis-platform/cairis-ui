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

  <b-modal ref="propertyDialog" :title="this.dialogTitle"  @ok="onOk">
    <b-card>
      <div v-if="securityProperty.update == true">
        <b-form-group label="Property" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="thePropertyInput" >
          <b-form-input readonly id="thePropertyInput" v-model="securityProperty.name"></b-form-input>
        </b-form-group>
      </div>
      <div v-if="securityProperty.update == false">
      <b-form-group label="Property" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="thePropertyInput" >
        <b-form-select id="theValueInput" v-model="securityProperty.name" :options="securityProperty.propertyNames" required>
        </b-form-select>
      </b-form-group>
      </div>
      <b-form-group label="Value" label-class="font-weight-bold text-sm-left" label-cols="3" label-for="theValueInput" >
        <b-form-select id="theValueInput" v-model="securityProperty.value" :options="propertyValues" required>
        </b-form-select>
      </b-form-group>
      <b-form-group label="Rationale" label-class="font-weight-bold text-sm-left" label-for="theRationaleInput" v-if="valueNotNone" >
        <b-form-textarea id="theRationaleInput" v-model="securityProperty.rationale" type="text" :rows=2 :max-rows=4 required>
        </b-form-textarea>
      </b-form-group>
    </b-card>
  </b-modal>
</template>

<script>
  export default {
    name: 'property-modal',
    props : {
      securityProperty : Object
    },
    computed : {
      valueNotNone() {
        return this.securityProperty.value != 'None';
      },
      dialogTitle() {
        return (this.securityProperty.update ? "Update" : "Add") + " Security Property";
      }
    },
    data() {
      return {
        propertyValues : ['None','Low','Medium','High'],
        updateProperty : {'name' : 'Undefined', 'value' : 'Undefined', 'rationale' : 'Undefined'}
      }
    },
    methods : {
      show() {
        this.$refs.propertyDialog.show();
      },
      onOk(evt) {
        if (this.securityProperty.value == 'None' || this.securityProperty.value == '') {
          evt.preventDefault();
          alert('Cannot enter a property with a value of None');
        }
        else if (!this.securityProperty.rationale.length) {
          evt.preventDefault();
          alert('Please enter rationale');
        }
        else {
          this.updateProperty.name = this.securityProperty.name;
          this.updateProperty.value = this.securityProperty.value;
          this.updateProperty.rationale = this.securityProperty.rationale;
          this.$emit('property-update',this.updateProperty);
          this.$refs.propertyDialog.hide(); 
        }
      }
    }
  };
</script>