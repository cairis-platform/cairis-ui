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

  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-brand href="#">CAIRIS</b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item :to="{name: 'home'}">Home</b-nav-item>
      <b-nav-item-dropdown text="System">
        <b-dropdown-item :to="{name: 'about'}">About</b-dropdown-item>
        <b-dropdown-item :to="{name: 'databases'}">Databases</b-dropdown-item>
        <b-dropdown-item :to="{name: 'import'}">Import Model</b-dropdown-item>
        <b-dropdown-item href="#">Import from Trello</b-dropdown-item>
        <b-dropdown-item :to="{name: 'export'}">Export</b-dropdown-item>
        <b-dropdown-item :to="{name: 'totrello'}">Export to Trello</b-dropdown-item>
        <b-dropdown-item :to="{name: 'documentation'}">Documentation</b-dropdown-item>
        <b-dropdown-item :to="{name: 'properties'}">Properties</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Requirements">
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'requirement'}}">Requirements</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'domainproperty'}}">Domain Properties</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'goal'}}">Goals</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'obstacle'}}">Obstacles</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'usecase'}}">Use Cases</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'dependency'}}">Dependencies</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'kaosassociation'}}">KAOS Associations</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'architecturalpattern'}}">Architectural Patterns</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Risk">
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'role'}}">Roles</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'asset'}}">Assets</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'assetassociation'}}">Asset Associations</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'attacker'}}">Attackers</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'threat'}}">Threats</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'vulnerability'}}">Vulnerabilities</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'risk'}}">Risks</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'response'}}">Responses</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'countermeasure'}}">Countermeasures</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'securitypattern'}}">Security Patterns</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="UX">
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'environment'}}">Environments</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'persona'}}">Personas</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'task'}}">Tasks</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'dataflow'}}">Data Flows</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'trustboundary'}}">Trust Boundaries</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'externaldocument'}}">External Documents</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'documentreference'}}">Document References</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'conceptreference'}}">Concept References</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'personacharacteristic'}}">Persona Characteristics</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'taskcharacteristic'}}">Task Characteristics</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'locations'}}">Locations</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Models">
        <b-dropdown-item :to="{name: 'validationmodel'}">Validate</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item :to="{name: 'architecturalpatternmodel'}">Architectural Pattern</b-dropdown-item>
        <b-dropdown-item :to="{name: 'assetmodel'}">Asset</b-dropdown-item>
        <b-dropdown-item :to="{name: 'componentassetmodel'}">Component Asset</b-dropdown-item>
        <b-dropdown-item :to="{name: 'componentgoalmodel'}">Component Goal</b-dropdown-item>
        <b-dropdown-item :to="{name: 'dataflowdiagram'}">Data Flow</b-dropdown-item>
        <b-dropdown-item :to="{name: 'goalmodel'}">Goal</b-dropdown-item>
        <b-dropdown-item :to="{name: 'locationsmodel'}">Locations</b-dropdown-item>
        <b-dropdown-item :to="{name: 'misusabilitymodel'}">Misusability</b-dropdown-item>
        <b-dropdown-item :to="{name: 'obstaclemodel'}">Obstacle</b-dropdown-item>
        <b-dropdown-item :to="{name: 'personamodel'}">Persona</b-dropdown-item>
        <b-dropdown-item :to="{name: 'requirementmodel'}">Requirement</b-dropdown-item>
        <b-dropdown-item :to="{name: 'responsibilitymodel'}">Responsibility</b-dropdown-item>
        <b-dropdown-item :to="{name: 'riskmodel'}">Risk</b-dropdown-item>
        <b-dropdown-item :to="{name: 'taskmodel'}">Task</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Options">
        <b-dropdown-item :to="{name: 'valuetypes', params: {dimension: 'asset_value'}}">Asset Values</b-dropdown-item>
        <b-dropdown-item :to="{name: 'valuetypes', params: {dimension: 'asset_type'}}">Asset Types</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item :to="{name: 'valuetypes', params: {dimension: 'access_right'}}">Access Rights</b-dropdown-item>
        <b-dropdown-item :to="{name: 'valuetypes', params: {dimension: 'protocol'}}">Protocols</b-dropdown-item>
        <b-dropdown-item :to="{name: 'valuetypes', params: {dimension: 'privilege'}}">Privileges</b-dropdown-item>
        <b-dropdown-item :to="{name: 'valuetypes', params: {dimension: 'surface_type'}}">Surface Types</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item :to="{name: 'valuetypes', params: {dimension: 'vulnerability_type'}}">Vulnerability Types</b-dropdown-item>
        <b-dropdown-item :to="{name: 'valuetypes', params: {dimension: 'severity'}}">Vulnerability Severities</b-dropdown-item>
        <b-dropdown-item :to="{name: 'valuetypes', params: {dimension: 'capability'}}">Capabilities</b-dropdown-item>
        <b-dropdown-item :to="{name: 'valuetypes', params: {dimension: 'motivation'}}">Motivations</b-dropdown-item>
        <b-dropdown-item :to="{name: 'valuetypes', params: {dimension: 'threat_type'}}">Threat Types</b-dropdown-item>
        <b-dropdown-item :to="{name: 'valuetypes', params: {dimension: 'likelihood'}}">Threat Likelihoods</b-dropdown-item>
        <b-dropdown-item :to="{name: 'valuetypes', params: {dimension: 'threat_value'}}">Threat Values</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'templateasset'}}">Template Assets</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'templategoal'}}">Template Goals</b-dropdown-item>
        <b-dropdown-item :to="{name: 'objectsview', params: {dimension: 'templaterequirement'}} ">Template Requirements</b-dropdown-item>
        <b-dropdown-item href="#">Countermeasure Values</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item :to="{name: 'traces'}">Traceability</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" type="text" v-model="theSearchString" placeholder="Search"/>
        <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="onFind">Search</b-button>
      </b-nav-form>
      <b-nav-item :to="{name: 'logout'}" right>Logout</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>


<script>
  export default {
    name: 'Navbar',
    data() {
      return {
        theSearchString : ''
      }
    },
    methods : {
      onFind(evt) {
        evt.preventDefault();
        this.$router.push({ name: 'findview', params : {findTxt: this.theSearchString}});
      }
    }
  };
</script>