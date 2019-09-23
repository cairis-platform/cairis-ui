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

  <b-modal ref="scDialog" @ok="onOk" :title="dialogTitle">
    <b-container v-if="countermeasure != undefined" fluid>
      <b-card bg-variant="light">
        <b-row>
          <b-col md="12">
            <b-form-group label="Generate" label-class="font-weight-bold text-sm-left" label-for="theSituateTypeRadio" >
              <b-form-radio-group id="theSituateTypeRadio" v-model="objt.situateType" :options="situateTypeOptions" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" v-if="objt.situateType == 'template_asset' || objt.situateType == 'securitypattern'">
            <b-form-group>
              <dimension-select :dimension='situateDimension' v-on:dimension-select-change="situateTypeSelected" v-on:dimension-items-updated="situateTypesLoaded" /> 
            </b-form-group>
          </b-col>
          <b-col md="12" v-if="objt.situateType == 'securitypattern-existing'">
            <b-form-group>
              <dimension-select :dimensionUrl='cspUrl' v-on:dimension-select-change="situateTypeSelected" v-on:dimension-items-updated="situateTypesLoaded" /> 
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </b-modal>
</template>

<script>

import DimensionSelect from './DimensionSelect';

  export default {
    name: 'situate-countermeasure-modal',
    props : {
      countermeasure : String
    },
    components : {
      DimensionSelect
    },
    data() {
      return {
        objt : {
          situateType : 'asset',
          situateValue : '',
          existing : false
        },
        situateTypeOptions : [
          {text : 'New asset', value : 'asset'},
          {text : 'New template asset', value : 'template_asset'},
          {text : 'New security pattern', value : 'securitypattern'},
          {text : 'Existing security pattern', value : 'securitypattern-existing'}
        ]
      }
    },
    computed : {
      dialogTitle() {
        return 'Situate ' + (this.countermeasure != undefined ? this.countermeasure : '');
      },
      situateDimension() {
        return this.objt.situateType == 'securitypattern-existing' ? 'securitypattern' : this.objt.situateType;
      },
      cspUrl() {
        return '/api/countermeasures/name/' + this.countermeasure + '/candidate_patterns';
      }
    },
    methods : {
      show() {
        this.$refs.scDialog.show()
      },
      situateTypeSelected(item) {
        this.objt.situateValue = item;
      },
      situateTypesLoaded(item) {
        this.objt.situateValue = item;
      },
      onOk() {
        this.$emit('situate-countermeasure-update',this.objt);
        this.$refs.scDialog.hide();
      }
    }
  };
</script>