
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

architecturalpattern : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Architectural patterns', to: {name: 'objectsview', params : {dimension: 'architecturalpattern'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name'},
    {key: 'theAttackSurfaceMetric.theInterfacesDER' , label : 'Interfaces DER'},
    {key: 'theAttackSurfaceMetric.theChannelsDER' , label : 'Channels DER'},
    {key: 'theAttackSurfaceMetric.theUntrustedSurfaceDER' , label : 'Untrusted Surface DER'},
    {key: 'sitapaction', label : 'Situate'}
  ],
  theGetUrl : '/api/architectural_patterns',
  theDelUrl : '/api/architectural_patterns/name/'
},
asset : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Assets', to: {name: 'objectsview', params : {dimension: 'asset'}}}],
  objectsFields :[ 
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Asset', sortable: true },
    {key: 'theType', label : 'Type', sortable: true},
    {key: 'postaction', label : ''}
  ],
  theGetUrl : '/api/assets/summary',
  theDelUrl : '/api/assets/name/'
},
assetassociation : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Asset associations', to: {name: 'objectsview', params : {dimension: 'assetassociation'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theEnvironmentName',  label : 'Environment', sortable: true},
    {key: 'theHeadAsset', label : 'Head', sortable: true},
    {key: 'theHeadNavigation', label : 'Nav', sortable: true},
    {key: 'theHeadType', label : 'Type', sortable: true},
    {key: 'theHeadMultiplicity', label : 'Nry', sortable: true},
    {key: 'theHeadRole', label : 'Role', sortable: true},
    {key: 'theTailRole', label : 'Role', sortable: true},
    {key: 'theTailMultiplicity', label : 'Nry', sortable: true},
    {key: 'theTailType', label : 'Type', sortable: true},
    {key: 'theTailNavigation', label : 'Nav', sortable: true},
    {key: 'theTailAsset', label : 'Head', sortable: true}
  ],
  theGetUrl : '/api/assets/association',
  theDelUrl : '/api/assets/association/environment/'
},
attacker : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Attackers', to: {name: 'objectsview', params : {dimension: 'attacker'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Attacker', sortable: true},
    {key: 'theDescription', label : 'Description'}
  ],
  theGetUrl : '/api/attackers/summary',
  theDelUrl : '/api/attackers/name/'
},
conceptreference : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Concept references', to: {name: 'objectsview', params : {dimension: 'conceptreference'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theDimName', label : 'Dimension', sortable: true}
  ],
  theGetUrl : '/api/concept_references',
  theDelUrl : '/api/concept_references/name/'
},
countermeasure : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Countermeasures', to: {name: 'objectsview', params : {dimension: 'countermeasure'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theType', label : 'Type', sortable: true},
    {key: 'sitcmaction', label : 'Situate'},
    {key: 'rmspaction', label: 'Pattern'}
  ],
  theGetUrl : '/api/countermeasures',
  theDelUrl : '/api/countermeasures/name/'
},
dataflow : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Dataflows', to: {name: 'objectsview', params: {dimension: 'dataflow'}}}],
  objectsFields : [
    {key: 'objectsactions' , label : ''},
    {key: 'theEnvironmentName',  label : 'Environment', sortable: true},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theFromName', label : 'From', sortable: true},
    {key: 'theFromType', label : 'Type', sortable: true},
    {key: 'theToName', label : 'To', sortable: true},
    {key: 'theToTypelabel',label: 'Type', sortable: true}
  ],
  theGetUrl : '/api/dataflows',
  theDelUrl : '/api/dataflows/name/'
},
dependency : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Dependencies', to: {name: 'objectsview', params: {dimension: 'dependency'}}}],
  objectsFields : [
    {key: 'objectsactions',  label : ''},
    {key: 'theEnvironmentName', label : 'Environment', sortable: true},
    {key: 'theDepender', label : 'Depender', sortable: true},
    {key : 'theDependee', label : 'Dependee', sortable: true},
    {key: 'theDependencyType', label : 'Type', sortable: true},
    {key: 'theDependency', label : 'Dependency', sortable: true}
  ],
  theGetUrl : '/api/dependencies',
  theDelUrl : '/api/dependencies/environment/'
},
documentreference : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Document references', to: {name: 'objectsview', params : {dimension: 'documentreference'}}}],
  objectsFields : [
    {key: 'objectsactions', label: ''},
    {key: 'theName', label: 'Name', sortable: true},
    {key: 'theDocName', label: 'Document', sortable: true},
    {key: 'pretaction', label: ''}
  ],
  theGetUrl : '/api/document_references',
  theDelUrl : '/api/document_references/name/'
},
domainproperty: {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Domain properties', to: {name: 'objectsview', params : {dimension: 'domainproperty'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true },
    {key: 'theType', label : 'Type', sortable: true},
    {key: 'postaction', label : ''}
  ],
  theGetUrl : '/api/domainproperties',
  theDelUrl : '/api/domainproperties/name/'
},
environment : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Environments', to: {name: 'objectsview', params : {dimension: 'environment'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theDescription', label : 'Description'}
  ],
  theGetUrl : '/api/environments',
  theDelUrl : '/api/environments/name/'
},
externaldocument : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'External documents', to: {name: 'objectsview', params : {dimension: 'externaldocument'}}}],
  objectsFields : [ 
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theDescription', label : 'Description'}
  ],
  theGetUrl : '/api/external_documents',
  theDelUrl : '/api/external_documents/name/'
},
goal : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Goals', to: {name: 'objectsview', params : {dimension: 'goal'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theOriginator', label : 'Originator', sortable: true},
    {key: 'theStatus', label : 'Status'}
  ],
  theGetUrl : '/api/goals/summary',
  theDelUrl : '/api/goals/name/'
},
kaosassociation : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'KAOS associations', to: {name: 'objectsview', params : {dimension: 'kaosassociation'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theEnvironmentName', label : 'Environment', sortable: true},
    {key: 'theGoal', label : 'Goal', sortable: true},
    {key: 'theGoalDimension', label : 'Dimension', sortable: true},
    {key: 'theAssociationType', label : 'Association', sortable: true},
    {key: 'theSubGoal', label : 'Sub Goal', sortable: true},
    {key: 'theSubGoalDimension', label : 'Dimension', sortable: true}
  ],
  theGetUrl : '/api/goals/association',
  theDelUrl : '/api/goals/association/environment/'
},
locations : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Locations', to: {name: 'objectsview', params : {dimension: 'locations'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true}
  ],
  theGetUrl : '/api/locations',
  theDelUrl : '/api/locations/name/'
},
obstacle : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Obstacles', to: {name: 'objectsview', params : {dimension: 'obstacle'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theOriginator', label : 'Originator', sortable: true}
  ],
  theGetUrl : '/api/obstacles/summary',
  theDelUrl : '/api/obstacles/name/'
},
persona : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Personas', to: {name: 'objectsview', params : {dimension: 'persona'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theType', label : 'Type', sortable: true}
  ],
  theGetUrl : '/api/personas/summary',
  theDelUrl : '/api/personas/name/'
},
personacharacteristic : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Persona characteristics', to: {name: 'objectsview', params : {dimension: 'personacharacteristic'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theVariable', label : 'Variable', sortable: true},
    {key: 'theCharacteristic', label : 'Characteristic', sortable: true}
  ],
  theGetUrl : '/api/persona_characteristics/summary',
  theDelUrl : '/api/persona_characteristics/name/'
},
response : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Responses', to: {name: 'objectsview', params : {dimension: 'response'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theResponseType', label : 'Type', sortable: true},
    {key: 'generategoalaction', label : 'Goal'}
  ],
  theGetUrl : '/api/responses',
  theDelUrl : '/api/responses/name/'
},
requirement : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Requirements', to: {name: 'objectsview', params : {dimension: 'requirement'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theDescription', label : 'Description'},
    {key: 'thePriority', label : 'Priority', sortable: true},
    {key: 'theRationale', label : 'Rationale'},
    {key: 'theFitCriterion', label : 'Fit Criterion'},
    {key: 'theOriginator', label : 'Originator', sortable: true},
    {key: 'theType', label : 'Type', sortable: true},
    {key: 'pretaction', label: ''},
    {key: 'postaction', label: ''}
  ],
  theGetUrl : '',
  theDelUrl : '/api/requirements/name/'
},
risk : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Risks', to: {name: 'objectsview', params : {dimension: 'risk'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theVulnerability', label : 'Vulnerability', sortable: true},
    {key: 'theThreat', label : 'Threat', sortable: true},
    {key: 'postaction', label : ''}
  ],
  theGetUrl : '/api/risks/summary',
  theDelUrl : '/api/risks/name/'
},
role : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Roles', to: {name: 'objectsview', params : {dimension: 'role'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Role', sortable: true},
    {key: 'theType', label : 'Type', sortable: true},
    {key: 'theDescription',  label : 'Description'},
    {key: 'pretaction', label: ''}
  ],
  theGetUrl : '/api/roles',
  theDelUrl : '/api/roles/name/'
},
securitypattern : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Security patterns', to: {name: 'objectsview', params: {dimension: 'securitypattern'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name'},
    {key: 'sitspaction', label : 'Situate'}
  ],
  theGetUrl : '/api/security_patterns',
  theDelUrl : '/api/security_patterns/name/'
},
task : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Tasks', to: {name: 'objectsview', params: {dimension: 'task'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName',  label : 'Name', sortable: true},
    {key: 'theObjective', label : 'Objective'},
    {key: 'pretaction', label: ''},
    {key: 'postaction', label : ''}
  ],
  theGetUrl : '/api/tasks',
  theDelUrl : '/api/tasks/name/'
},
taskcharacteristic : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Task characteristics', to: {name: 'objectsview', params: {dimension: 'taskcharacteristic'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Characteristic', sortable: true},
    {key: 'theTaskName', label : 'Task', sortable: true}
  ],
  theGetUrl : '/api/task_characteristics',
  theDelUrl : '/api/task_characteristics/name/'
},
templateasset : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Template assets', to: {name: 'objectsview', params: {dimension: 'templateasset'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theType', label : 'Type', sortable: true}
  ],
  theGetUrl : '/api/template_assets',
  theDelUrl : '/api/template_assets/name/'
},
templategoal : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Template goals', to: {name: 'objectsview', params: {dimension: 'templategoal'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theDefinition', label : 'Definition', sortable: true}
  ],
  theGetUrl : '/api/template_goals',
  theDelUrl : '/api/template_goals/name/'
},
templaterequirement : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Template requirements', to: {name: 'objectsview', params: {dimension: 'templaterequirement'}}}],
  objectsFields : [
    {key: 'objectsactions',label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theType', label : 'Type', sortable: true}
  ],
  theGetUrl : '/api/template_requirements',
  theDelUrl : '/api/template_requirements/name/'
},
threat : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Threats', to: {name: 'objectsview', params: {dimension: 'threat'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theType', label : 'Type', sortable: true},
    {key: 'pretaction', label: ''},
    {key: 'introduceaction', label: ''}
  ],
  theGetUrl : '/api/threats/summary',
  theDelUrl : '/api/threats/name/'
},
trustboundary : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Trust boundaries', to: {name: 'objectsview', params: {dimension: 'trustboundary'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theDescription', label : 'Description'}
  ],
  theGetUrl : '/api/trust_boundaries',
  theDelUrl : '/api/trust_boundaries/name/'
},
usecase : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Use cases', to: {name: 'objectsview', params: {dimension: 'usecase'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theDescription', label : 'Description'},
    {key: 'pretaction', label: ''},
    {key: 'postaction', label : ''}
  ],
  theGetUrl : '/api/usecases/summary',
  theDelUrl : '/api/usecases/name/'
},
vulnerability : {
  bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Vulnerabilities', to: {name: 'objectsview', params: {dimension: 'vulnerability'}}}],
  objectsFields : [
    {key: 'objectsactions', label : ''},
    {key: 'theName', label : 'Name', sortable: true},
    {key: 'theType', label : 'Type', sortable: true},
    {key: 'pretaction', label: ''},
    {key: 'introduceaction', label: ''}
  ],
  theGetUrl : '/api/vulnerabilities',
  theDelUrl : '/api/vulnerabilities/name/'
}

}

export default objectsViewData;