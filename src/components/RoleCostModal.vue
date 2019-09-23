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

  <b-modal ref="rcDialog" title="Select role"  @ok="onOk">
    <b-card>
      <b-form-group label="Role" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theRoleInput">
        <dimension-select id="theRoleInput" dimension='role' :existing="existingRoles" v-on:dimension-select-change="roleSelected" v-on:dimension-items-updated="rolesLoaded" />
      </b-form-group>
      <b-form-group label="Cost" label-class="font-weight-bold text-md-left" label-cols="3" label-for="theCostRadio">
        <b-form-radio-group id="theCostRadio" v-model="cost">
          <b-form-radio value="Low">Low</b-form-radio>
          <b-form-radio value="Medium">Medium</b-form-radio>
          <b-form-radio value="High">High</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </b-card>
  </b-modal>
</template>

<script>

import DimensionSelect from '@/components/DimensionSelect.vue'

  export default {
    name : 'role-cost-modal',
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
        theRole  : '',
        existingRoles : this.existing,
        cost : 'Low'
      }
    },
    components : {
      DimensionSelect
    },
    methods : {
      show() {
        this.$refs.rcDialog.show();
      },
      roleSelected(item) {
        this.theRole = item;
      },
      rolesLoaded(item) {
        this.theRole = item;
      },
      onOk(evt) {
        if (this.theRole.length == 0) {
          alert("Please select a role");
          evt.preventDefault();
        }
        else {
          this.$emit('role-cost-modal-update',{roleName : this.theRole, cost: this.cost});
          this.$refs.rcDialog.hide();
        }
      }
    }
  }

</script>