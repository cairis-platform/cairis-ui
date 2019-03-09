
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
conceptreference : {
  objectsLabel : 'Concept references',
  componentFile : 'ConceptReference',
  updatePath : '/api/concept_references/name/',
  createPath : '/api/concept_references'
},
countermeasure : {
  objectsLabel : 'Countermeasures',
  componentFile : 'Countermeasure',
  updatePath : '/api/countermeasures/name/',
  createPath : '/api/countermeasures'
},
documentreference : {
  objectsLabel : 'Document references',
  componentFile : 'DocumentReference',
  updatePath : '/api/document_references/name/',
  createPath : '/api/document_references'
},
domainproperty : {
  objectsLabel : 'Domain properties',
  componentFile : 'DomainProperty',
  updatePath : '/api/domainproperties/name/',
  createPath : '/api/domainproperties'
},
environment : {
  objectsLabel : 'Environments',
  componentFile : 'Environment',
  updatePath : '/api/environments/name/',
  createPath : '/api/environments'
},
externaldocument : {
  objectsLabel : 'External documents',
  componentFile : 'ExternalDocument',
  updatePath : '/api/external_documents/name/',
  createPath : '/api/external_documents'
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
persona : {
  objectsLabel : 'Personas',
  componentFile : 'Persona',
  updatePath : '/api/personas/name/',
  createPath : '/api/personas'
},
personacharacteristic : {
  objectsLabel : 'Persona characteristics',
  componentFile : 'PersonaCharacteristic',
  updatePath : '/api/persona_characteristics/name/',
  createPath : '/api/persona_characteristics'
},
response : {
  objectsLabel : 'Responses',
  componentFile : 'Response',
  updatePath : '/api/responses/name/',
  createPath : '/api/responses'
},
risk : {
  objectsLabel : 'Risks',
  componentFile : 'Risk',
  updatePath : '/api/risks/name/',
  createPath : '/api/risks'

},
role : {
  objectsLabel : 'Roles',
  componentFile : 'Role',
  updatePath : '/api/roles/name/',
  createPath : '/api/roles'
},
task : {
  objectsLabel : 'Tasks',
  componentFile : 'Task',
  updatePath : '/api/tasks/name/',
  createPath : '/api/tasks'
},
templateasset : {
  objectsLabel : 'Template assets',
  componentFile : 'TemplateAsset',
  updatePath : '/api/template_assets/name/',
  createPath : '/api/template_assets'
},
templategoal : {
  objectsLabel : 'Template goals',
  componentFile : 'TemplateGoal',
  updatePath : '/api/template_goals/name/',
  createPath : '/api/template_goals'
},
templaterequirement : {
  objectsLabel : 'Template requirements',
  componentFile : 'TemplateRequirement',
  updatePath : '/api/template_requirements/name/',
  createPath : '/api/template_requirements'
},
threat : {
  objectsLabel : 'Threats',
  componentFile : 'Threat',
  updatePath : '/api/threats/name/',
  createPath : '/api/threats'
},
trustboundary : {
  objectsLabel : 'Trust boundaries',
  componentFile : 'TrustBoundary',
  updatePath : '/api/trust_boundaries/name/',
  createPath : '/api/trust_boundaries'
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