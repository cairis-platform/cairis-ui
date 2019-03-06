
/*  Licensed to the Apache Software Foundation (ASF) under one
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

    Authors: Shamal Faily */

const objectsViewData = { 

asset : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Assets', to: {name: 'objectsview', params : {dimension: 'asset'}}}],
  objectsFields : {
    objectsactions : {label : ''},
    theName : {label : 'Asset', sortable: true },
    theType : {label : 'Type', sortable: true},
    postaction : {label : ''}
  },
  theGetUrl : '/api/assets/summary',
  theDelUrl : '/api/assets/name/'
},
attacker : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Attackers', to: {name: 'objectsview', params : {dimension: 'attacker'}}}],
  objectsFields : {
    objectsactions : {label : ''},
    theName : {label : 'Attacker', sortable: true},
    theDescription : {label : 'Description'}
  },
  theGetUrl : '/api/attackers/summary',
  theDelUrl : '/api/attackers/name/'
},
countermeasure : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Countermeasures', to: {name: 'objectsview', params : {dimension: 'countermeasure'}}}],
  objectsFields : {
    objectsactions : {label : ''},
    theName : {label : 'Name', sortable: true},
    theType : {label : 'Type', sortable: true}
  },
  theGetUrl : '/api/countermeasures',
  theDelUrl : '/api/countermeasures/name/'
},
domainproperty: {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Domain Properties', to: {name: 'objectsview', params : {dimension: 'domainproperty'}}}],
  objectsFields : {
    objectsactions : {label : ''},
    theName : {label : 'Name', sortable: true },
    theType : {label : 'Type', sortable: true},
    postaction : {label : ''}
  },
  theGetUrl : '/api/domainproperties',
  theDelUrl : '/api/domainproperties/name/'
},
goal : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Goals', to: {name: 'objectsview', params : {dimension: 'goal'}}}],
  objectsFields : {
    objectsactions : {label : ''},
    theName : {label : 'Name', sortable: true},
    theOriginator : {label : 'Originator', sortable: true},
    theStatus : {label : 'Status'}
  },
  theGetUrl : '/api/goals/summary',
  theDelUrl : '/api/goals/name/'
},
obstacle : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Obstacles', to: {name: 'objectsview', params : {dimension: 'obstacle'}}}],
  objectsFields : {
    objectsactions : {label : ''},
    theName : {label : 'Name', sortable: true},
    theOriginator : {label : 'Originator', sortable: true}
  },
  theGetUrl : '/api/obstacles/summary',
  theDelUrl : '/api/obstacles/name/'
},
response : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Responses', to: {name: 'objectsview', params : {dimension: 'response'}}}],
  objectsFields : {
    objectsactions : {label : ''},
    theName : {label : 'Name', sortable: true},
    theResponseType : {label : 'Type', sortable: true},
    generategoalaction : {label : ''}
  },
  theGetUrl : '/api/responses',
  theDelUrl : '/api/responses/name/'
},
risk : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Risks', to: {name: 'objectsview', params : {dimension: 'risk'}}}],
  objectsFields : {
    objectsactions : {label : ''},
    theName : {label : 'Name', sortable: true},
    theVulnerability : {label : 'Vulnerability', sortable: true},
    theThreat : {label : 'Threat', sortable: true}
  },
  theGetUrl : '/api/risks/summary',
  theDelUrl : '/api/risks/name/'
},
role : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Roles', to: {name: 'objectsview', params : {dimension: 'role'}}}],
  objectsFields : {
    objectsactions : {label : ''},
    theName : {label : 'Role', sortable: true},
    theType : {label : 'Type', sortable: true},
    theDescription : {label : 'Description'},
    pretaction : {label: ''}
  },
  theGetUrl : '/api/roles',
  theDelUrl : '/api/roles/name/'
},
threat : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Threats', to: {name: 'objectsview', params: {dimension: 'threat'}}}],
  objectsFields : {
    objectsactions : {label : ''},
    theName : {label : 'Name', sortable: true},
    theType : {label : 'Type', sortable: true}
  },
  theGetUrl : '/api/threats/summary',
  theDelUrl : '/api/threats/name/'
},
vulnerability : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Vulnerabilities', to: {name: 'objectsview', params: {dimension: 'vulnerability'}}}],
  objectsFields : {
    objectsactions : {label : ''},
    theName : {label : 'Name', sortable: true},
    theType : {label : 'Type', sortable: true},
    pretaction : {label: ''}
  },
  theGetUrl : '/api/vulnerabilities',
  theDelUrl : '/api/vulnerabilities/name/'
}

}

export default objectsViewData;