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

  <b-modal ref="tbCompDialog" title="Add Trust Boundary Component"  @ok="onOk">
    <b-card>
      <b-row>
        <b-col md="12">
          <b-form-group label="Type" label-class="font-weight-bold text-md-left" label-for="theTBComponentTypeRadio" >
            <b-form-radio-group id="theTBComponentTypeRadio" v-model="theComponentType">
              <b-form-radio value='process'>Process</b-form-radio>
              <b-form-radio value='datastore'>Datastore</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <dimension-select :environment="this.environment" :dimension="theComponentType" v-on:dimension-select-change="dimensionSelected" v-on:dimension-items-updated="dimensionsLoaded" />
        </b-col>
      </b-row>
    </b-card>
  </b-modal>
</template>

<script>

import DimensionSelect from '@/components/DimensionSelect.vue'

  export default {
    name : 'trust-boundary-component-modal',
    props : {
      environment : String
    },
    data () {
      return {
        theComponentType: 'process',
        theName : ''
      }
    },
    components : {
      DimensionSelect
    },
    methods : {
      show() {
        this.$refs.tbCompDialog.show();
      },
      dimensionSelected(item) {
        this.theName = item;
      },
      dimensionsLoaded(item) {
        this.theName = item;
      },
      onOk(evt) {
        if (this.theName.length == 0) {
          evt.preventDefault();
          alert("Please select a value");
        }
        else {
          this.$emit('trust-boundary-component-modal-update',{theName: this.theName, theType: this.theComponentType});
          this.$refs.tbCompDialog.hide();
        }
      }
    }
  }

</script>