
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

const objectViewParametersFactory = { 

asset : {
  objectsLabel : 'Assets',
  componentFile : 'Asset',
  updatePath : '/api/assets/name/',
  createPath : '/api/assets'
},
attacker : {
  objectsLabel : 'Attackers',
  componentFile : 'Attacker',
  updatePath : '/api/attackers/name/',
  createPath : '/api/attackers'
},
domainproperty : {
  objectsLabel : 'Domain properties',
  componentFile : 'DomainProperty',
  updatePath : '/api/domainproperties/name/',
  createPath : '/api/domainproperties'
},
goal : {
  objectsLabel : 'Goals',
  componentFile : 'Goal',
  updatePath : '/api/goals/name/',
  createPath : '/api/goals'
},
obstacle : {
  objectsLabel : 'Obstacles',
  componentFile : 'Obstacle',
  updatePath : '/api/obstacles/name/',
  createPath : '/api/obstacles'
},
role : {
  objectsLabel : 'Roles',
  componentFile : 'Role',
  updatePath : '/api/roles/name/',
  createPath : '/api/roles'
},
threat : {
  objectsLabel : 'Threats',
  componentFile : 'Threat',
  updatePath : '/api/threats/name/',
  createPath : '/api/threats'
},
usecase : {
  objectsLabel : 'Use cases',
  componentFile : 'UseCase',
  updatePath : '/api/usecases/name/',
  createPath : '/api/usecases'
},
vulnerability : {
  objectsLabel : 'Vulnerabilities',
  componentFile : 'Vulnerability',
  updatePath : '/api/vulnerabilities/name/',
  createPath : '/api/vulnerabilities'
}

}

export default objectViewParametersFactory;