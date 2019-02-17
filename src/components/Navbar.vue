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
        <b-dropdown-item href="#">New Database</b-dropdown-item>
        <b-dropdown-item href="#">Open Database</b-dropdown-item>
        <b-dropdown-item href="#">Delete Database</b-dropdown-item>
        <b-dropdown-item href="#">Clear Database</b-dropdown-item>
        <b-dropdown-item :to="{name: 'import'}">Import Model</b-dropdown-item>
        <b-dropdown-item href="#">Import from Trello</b-dropdown-item>
        <b-dropdown-item :to="{name: 'export'}">Export</b-dropdown-item>
        <b-dropdown-item href="#">Export to Trello</b-dropdown-item>
        <b-dropdown-item :to="{name: 'documentation'}">Documentation</b-dropdown-item>
        <b-dropdown-item :to="{name: 'properties'}">Properties</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Requirements">
        <b-dropdown-item :to="{name: 'requirements'}">Requirements</b-dropdown-item>
        <b-dropdown-item :to="{name: 'domainproperties'}">Domain Properties</b-dropdown-item>
        <b-dropdown-item :to="{name: 'goals'}">Goals</b-dropdown-item>
        <b-dropdown-item :to="{name: 'obstacles'}">Obstacles</b-dropdown-item>
        <b-dropdown-item :to="{name: 'usecases'}">Use Cases</b-dropdown-item>
        <b-dropdown-item :to="{name: 'dependencies'}">Dependencies</b-dropdown-item>
        <b-dropdown-item :to="{name: 'kaosassociations'}">KAOS Associations</b-dropdown-item>
        <b-dropdown-item href="#">Architectural Patterns</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Risk">
        <b-dropdown-item :to="{name: 'roles'}">Roles</b-dropdown-item>
        <b-dropdown-item :to="{name: 'assets'}">Assets</b-dropdown-item>
        <b-dropdown-item href="#">Asset Associations</b-dropdown-item>
        <b-dropdown-item :to="{name: 'attackers'}">Attackers</b-dropdown-item>
        <b-dropdown-item :to="{name: 'threats'}">Threats</b-dropdown-item>
        <b-dropdown-item :to="{name: 'vulnerabilities'}">Vulnerabilities</b-dropdown-item>
        <b-dropdown-item :to="{name: 'risks'}">Risks</b-dropdown-item>
        <b-dropdown-item :to="{name: 'responses'}">Responses</b-dropdown-item>
        <b-dropdown-item :to="{name: 'countermeasures'}">Countermeasures</b-dropdown-item>
        <b-dropdown-item :to="{name: 'securitypatterns'}">Security Patterns</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="UX">
        <b-dropdown-item :to="{name: 'environments'}">Environments</b-dropdown-item>
        <b-dropdown-item :to="{name: 'personas'}">Personas</b-dropdown-item>
        <b-dropdown-item :to="{name: 'tasks'}">Tasks</b-dropdown-item>
        <b-dropdown-item :to="{name: 'dataflows'}">Data Flows</b-dropdown-item>
        <b-dropdown-item :to="{name: 'trustboundaries'}">Trust Boundaries</b-dropdown-item>
        <b-dropdown-item :to="{name: 'externaldocuments'}">External Documents</b-dropdown-item>
        <b-dropdown-item :to="{name: 'documentreferences'}">Document References</b-dropdown-item>
        <b-dropdown-item href="#">Concept References</b-dropdown-item>
        <b-dropdown-item href="#">Persona Characteristics</b-dropdown-item>
        <b-dropdown-item href="#">Task Characteristics</b-dropdown-item>
        <b-dropdown-item href="#">Locations</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Models">
        <b-dropdown-item href="#">Validate</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="#">Architectural Pattern</b-dropdown-item>
        <b-dropdown-item :to="{name: 'assetmodel'}">Asset</b-dropdown-item>
        <b-dropdown-item :to="{name: 'dataflowdiagram'}">Data Flow</b-dropdown-item>
        <b-dropdown-item :to="{name: 'goalmodel'}">Goal</b-dropdown-item>
        <b-dropdown-item href="#">Locations</b-dropdown-item>
        <b-dropdown-item href="#">Misusability</b-dropdown-item>
        <b-dropdown-item :to="{name: 'obstaclemodel'}">Obstacle</b-dropdown-item>
        <b-dropdown-item :to="{name: 'personamodel'}">Persona</b-dropdown-item>
        <b-dropdown-item href="#">Requirement</b-dropdown-item>
        <b-dropdown-item :to="{name: 'responsibilitymodel'}">Responsibility</b-dropdown-item>
        <b-dropdown-item :to="{name: 'riskmodel'}">Risk</b-dropdown-item>
        <b-dropdown-item :to="{name: 'taskmodel'}">Task</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Options">
        <b-dropdown-item href="#">Asset Values</b-dropdown-item>
        <b-dropdown-item href="#">Asset Types</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="#">Access Rights</b-dropdown-item>
        <b-dropdown-item href="#">Protocols</b-dropdown-item>
        <b-dropdown-item href="#">Privileges</b-dropdown-item>
        <b-dropdown-item href="#">Surface Types</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="#">Vulnerability Types</b-dropdown-item>
        <b-dropdown-item href="#">Vulnerability Severities</b-dropdown-item>
        <b-dropdown-item href="#">Capabilities</b-dropdown-item>
        <b-dropdown-item href="#">Motivations</b-dropdown-item>
        <b-dropdown-item href="#">Threat Types</b-dropdown-item>
        <b-dropdown-item href="#">Threat Likelihoods</b-dropdown-item>
        <b-dropdown-item href="#">Threat Values</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="#">Template Assets</b-dropdown-item>
        <b-dropdown-item href="#">Template Requirements</b-dropdown-item>
        <b-dropdown-item href="#">Template Goals</b-dropdown-item>
        <b-dropdown-item href="#">Countermeasure Values</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="#">Traceability</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-form>
        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>
      <b-nav-item href="#" right>Logout</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>


<script>
  export default {
    name: 'Navbar'
  };
</script>