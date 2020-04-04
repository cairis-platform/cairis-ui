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

  <div class="requirementpanel">
    <b-container v-if="panelObject != undefined">
      <b-form-group label="Description" label-class="font-weight-bold text-sm-left" label-for="theDescription" >
        <b-form-textarea id="theDescription" v-model="panelObject.theDescription" type="text" :rows=2 :max-rows="4" readonly />
      </b-form-group>
      <b-form-group label="Priority" label-class="font-weight-bold text-sm-left" label-for="thePriority" >
        <b-form-input readonly id="thePriority" v-model="panelObject.thePriority" />
      </b-form-group>
      <b-form-group label="Type" label-class="font-weight-bold text-sm-left" label-for="theType" >
        <b-form-input readonly id="theType" v-model="panelObject.theType" />
      </b-form-group>
      <b-form-group label="Originator" label-class="font-weight-bold text-sm-left" label-for="theOriginator" >
        <b-form-input readonly id="theOriginator" v-model="panelObject.theOriginator" />
      </b-form-group>
      <b-form-group label="Rationale" label-class="font-weight-bold text-sm-left" label-for="theRationale" >
        <b-form-textarea id="theRationale" v-model="panelObject.theRationale" type="text" :rows=2 :max-rows="4" readonly />
      </b-form-group>
      <b-form-group label="Fit Criterion" label-class="font-weight-bold text-sm-left" label-for="theFitCriterion" >
        <b-form-textarea id="theFitCriterion" v-model="panelObject.theFitCriterion" type="text" :rows=2 :max-rows="4" readonly />
      </b-form-group>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'requirement-panel',
  props : {
    panelParameters : Object,
    panelObject : Object
  }
};
</script>