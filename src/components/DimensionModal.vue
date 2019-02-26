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

  <b-modal ref="dimensionDialog" :title="this.dialogTitle"  @ok="onOk">
    <b-card>
      <dimension-select v-if="environment == ''" :dimensionUrl=this.dimensionUrl :dimension=this.dimension :existing=this.existing :initial=this.initial v-on:dimension-select-change="dimensionSelected" />
      <dimension-select v-if="environment != ''" :dimensionUrl=this.dimensionUrl :environment=this.environment :dimension=this.dimension :existing=this.existing :initial=this.initial v-on:dimension-select-change="dimensionSelected" />
    </b-card>
  </b-modal>
</template>

<script>

import DimensionSelect from '@/components/DimensionSelect.vue'

  export default {
    name : 'dimension-modal',
    props : {
      dimension : String,
      existing : {
        type: Array,
        default : function () {
          return [];
        }
      },
      initial : {
        type: String,
        default : function() {
          return '';
        }
      },
      environment : {
        type: String,
        default : function() {
          return '';
        }
      },
      dimensionUrl : {
        type: String,
        default : function() {
          return '';
        }
      },
      label : {
        type: String,
        default : function() {
          return '';
        }
      }
    },
    data () {
      return {
        selected : ''
      }
    },
    components : {
      DimensionSelect
    },
    computed : {
      dialogTitle() {
        return 'Select ' + (this.label.length > 0 ? this.label : (this.dimension != undefined ? this.dimension : 'Object' ) );
      }
    },
    methods : {
      show() {
        this.$refs.dimensionDialog.show();
      },
      dimensionSelected(item) {
        this.selected = item;
      },
      onOk(evt) {
        if (this.selected.length == 0) {
          evt.preventDefault();
          alert("Please select a value");
        }
        else {
          this.$emit('dimension-modal-update',this.selected);
          this.$refs.dimensionDialog.hide();
        }
      }
    }
  }

</script>