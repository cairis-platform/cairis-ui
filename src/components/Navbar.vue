<template>
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
        <b-dropdown-item href="#">Import Model</b-dropdown-item>
        <b-dropdown-item href="#">Import from Trello</b-dropdown-item>
        <b-dropdown-item href="#">Export Model</b-dropdown-item>
        <b-dropdown-item href="#">Export Architectural Pattern</b-dropdown-item>
        <b-dropdown-item href="#">Export GRL</b-dropdown-item>
        <b-dropdown-item href="#">Export to Trello</b-dropdown-item>
        <b-dropdown-item href="#">Documentation</b-dropdown-item>
        <b-dropdown-item href="#">Properties</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Requirements">
        <b-dropdown-item href="#">Requirements</b-dropdown-item>
        <b-dropdown-item href="#">Domain Properties</b-dropdown-item>
        <b-dropdown-item href="#">Goals</b-dropdown-item>
        <b-dropdown-item href="#">Obstacles</b-dropdown-item>
        <b-dropdown-item href="#">Use Cases</b-dropdown-item>
        <b-dropdown-item href="#">Dependencies</b-dropdown-item>
        <b-dropdown-item href="#">Architectural Patterns</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Risk">
        <b-dropdown-item href="#">Roles</b-dropdown-item>
        <b-dropdown-item :to="{name: 'assets'}">Assets</b-dropdown-item>
        <b-dropdown-item href="#">Asset Associations</b-dropdown-item>
        <b-dropdown-item href="#">Attackers</b-dropdown-item>
        <b-dropdown-item href="#">Threats</b-dropdown-item>
        <b-dropdown-item href="#">Vulnerabilities</b-dropdown-item>
        <b-dropdown-item href="#">Risks</b-dropdown-item>
        <b-dropdown-item href="#">Responses</b-dropdown-item>
        <b-dropdown-item href="#">Countermeasures</b-dropdown-item>
        <b-dropdown-item href="#">Security Patterns</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="UX">
        <b-dropdown-item href="#">Environments</b-dropdown-item>
        <b-dropdown-item href="#">Personas</b-dropdown-item>
        <b-dropdown-item href="#">Tasks</b-dropdown-item>
        <b-dropdown-item href="#">Data Flows</b-dropdown-item>
        <b-dropdown-item href="#">Trust Boundaries</b-dropdown-item>
        <b-dropdown-item href="#">External Documents</b-dropdown-item>
        <b-dropdown-item href="#">Document References</b-dropdown-item>
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
        <b-dropdown-item href="#">Data Flow</b-dropdown-item>
        <b-dropdown-item href="#">Goal</b-dropdown-item>
        <b-dropdown-item href="#">Locations</b-dropdown-item>
        <b-dropdown-item href="#">Misusability</b-dropdown-item>
        <b-dropdown-item href="#">Obstacle</b-dropdown-item>
        <b-dropdown-item href="#">Persona</b-dropdown-item>
        <b-dropdown-item href="#">Requirement</b-dropdown-item>
        <b-dropdown-item href="#">Responsibility</b-dropdown-item>
        <b-dropdown-item href="#">Risk</b-dropdown-item>
        <b-dropdown-item href="#">Task</b-dropdown-item>
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