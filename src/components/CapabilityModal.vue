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

  <b-modal ref="capabilityDialog" title="Select capability"  @ok="onOk">
    <b-card>
      <b-form-group label="Capability" label-class="text-md-left" label-cols="3" horizontal label-for="theCapabilityInput">
        <dimension-select :dimension='capability' :existing="existingCapabilities" v-on:dimension-select-change="capabiltySelected" />
      </b-form-group>
      <b-form-group label="Value" label-class="text-md-left" label-cols="3" horizontal label-for="theValueInput">
        <b-form-select id="theValueInput" v-model="value" :options="valueTypes" class="mb-3" required>
        </b-form-select>
      </b-form-group>
    </b-card>
  </b-modal>
</template>

<script>

import DimensionSelect from '@/components/DimensionSelect.vue'

  export default {
    name : 'capability-modal',
    props : {
      existing : {
        type: Array,
        default : function () {
          return [];
        }
      }
    },
    data () {
      return {
        capability  : '',
        existingCapabilities : this.existing,
        value : '',
        valueTypes : ['Low','Medium','High']
      }
    },
    components : {
      DimensionSelect
    },
    methods : {
      show() {
        this.$refs.capabilityDialog.show();
      },
      capabilitySelected(item) {
        this.capability = item;
      },
      onOk(evt) {
        evt.preventDefault();
        if (this.capability.length == 0) {
          alert("Please select a capability");
        }
        else {
          this.$emit('capability-modal-update',{name : this.capability, value: this.value});
          this.$refs.capabilityDialog.hide();
        }
      }
    }
  }

</script>