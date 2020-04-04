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

  <div class="externaldocumentpanel">
    <b-container v-if="panelObject != undefined">
      <b-form-group label="Name" label-class="font-weight-bold text-md-left">
        <b-form-input v-model="panelObject.theName" type="text" readonly>
        </b-form-input>
      </b-form-group>
      <b-form-group label="Authors" label-class="font-weight-bold text-md-left">
        <b-form-input v-model="panelObject.theAuthors" type="text" readonly>
        </b-form-input>
      </b-form-group>
      <b-form-group label="Version" label-class="font-weight-bold text-md-left">
        <b-form-input v-model="panelObject.theVersion" type="text" readonly>
        </b-form-input>
      </b-form-group>
      <b-form-group label="Publication Date" label-class="font-weight-bold text-md-left">
        <b-form-input v-model="panelObject.thePublicationDate" type="text" readonly>
        </b-form-input>
      </b-form-group>
      <b-form-group label="Description" label-class="font-weight-bold text-md-left">
        <b-form-textarea v-model="panelObject.theDescription" type="text" :rows=4 :max-rows=6 readonly>
        </b-form-textarea>
      </b-form-group>
    </b-container>
  </div>
</template>

<script>

  export default {
    name: 'externaldocument-panel',
    props : {
      panelParameters : Object,
      panelObject : Object
    }
  };
</script>