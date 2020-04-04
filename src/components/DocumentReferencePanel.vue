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

  <div class="documentreferencepanel">
    <b-container v-if="panelObject != undefined">
      <b-form-group label="Name" label-class="font-weight-bold text-md-left">
        <b-form-input readonly v-model="panelObject.theName" type="text">
        </b-form-input>
      </b-form-group>
      <b-form-group label="External Document" label-class="font-weigh-bold text-md-left">
        <b-form-input readonly v-model="panelObject.theDocName" type="text">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Contributor" label-class="font-weight-bold text-md-left">
        <b-form-input readonly v-model="panelObject.theContributor" type="text">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Excerpt" label-class="font-weight-bold text-md-left">
        <b-form-textarea readonly v-model="panelObject.theExcerpt" type="text" :rows=4 :max-rows=6>
        </b-form-textarea>
      </b-form-group>
    </b-container>
  </div>
</template>

<script>

  export default {
    name: 'documentreference-panel',
    props : {
      panelParameters : Object,
      panelObject : Object
    }
  };
</script>