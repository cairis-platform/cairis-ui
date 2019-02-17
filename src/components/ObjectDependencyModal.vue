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

  <b-modal ref="objectDependencyDialog" title="Confirm object deletion"  @ok="onOk">
    <b-card>
      <p><b>Removing this object will also remove the following objects.</b></p>
      <b-table striped bordered small :items="dependencies" :fields="odTableFields">
      </b-table>
      <p><b>Do you want to continue?</b></p>
    </b-card>
  </b-modal>
</template>

<script>

  export default {
    name : 'object-dependency-modal',
    props : {
      dependencies : Array
    },
    data() {
      return {
        odTableFields : {
          theDimensionName : {label: 'Dimension'},
          theObjectName : {label: 'Name'}
        }
      }
    },
    methods : {
      show() {
        this.$refs.objectDependencyDialog.show();
      },
      onOk(evt) {
        this.$emit('object-dependency-ok');
        this.$refs.objectDependencyDialog.hide();
      }
    }
  }

</script>