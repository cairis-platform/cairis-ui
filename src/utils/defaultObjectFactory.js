
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

const defaultObjectFactory = { 

architecturalpattern : {
  theName : '',
  theSynopsis : '',
  theComponents : [],
  theConnectors : []
},
asset : {
  theName : '',
  theTags : '',
  theShortCode : '',
  theType : '',
  theDescription : '',
  theSignificance : '',
  isCritical : 0,
  theCriticalRationale : '',
  theInterfaces : [],
  theEnvironmentProperties : [],
},
attacker : {
  theName : '',
  theTags : '',
  theDescription : '',
  theImage : '',
  theEnvironmentProperties : []
},
conceptreference : {
  theName : '',
  theDimName : 'persona',
  theObjtName : '',
  theDescription : ''
},
countermeasure : {
  theName : '',
  theDescription : '',
  theType : 'Information',
  theTags : '',
  theEnvironmentProperties : []
},
documentreference : {
  theName : '',
  theDocName : '',
  theContributor : '',
  theExcerpt : ''
},
domainproperty : {
  theName : '',
  theType : '',
  theDescription : '',
  theOriginator : '',
  theTags : '' 
},
environment : {
  theName : '',
  theShortCode : '',
  theDescription : '',
  theEnvironments : [],
  theDuplicateProperty : 'None',
  theOverridingEnvironment : '',
  theTensions : [
    {"value": 0, "attr_id": 4, "base_attr_id": 0, "rationale": "None"}, 
    {"value": 0, "attr_id": 5, "base_attr_id": 0, "rationale": "None"}, 
    {"value": 0, "attr_id": 6, "base_attr_id": 0, "rationale": "None"}, 
    {"value": 0, "attr_id": 7, "base_attr_id": 0, "rationale": "None"}, 
    {"value": 0, "attr_id": 4, "base_attr_id": 1, "rationale": "None"}, 
    {"value": 0, "attr_id": 5, "base_attr_id": 1, "rationale": "None"}, 
    {"value": 0, "attr_id": 6, "base_attr_id": 1, "rationale": "None"}, 
    {"value": 0, "attr_id": 7, "base_attr_id": 1, "rationale": "None"}, 
    {"value": 0, "attr_id": 4, "base_attr_id": 2, "rationale": "None"}, 
    {"value": 0, "attr_id": 5, "base_attr_id": 2, "rationale": "None"}, 
    {"value": 0, "attr_id": 6, "base_attr_id": 2, "rationale": "None"}, 
    {"value": 0, "attr_id": 7, "base_attr_id": 2, "rationale": "None"}, 
    {"value": 0, "attr_id": 4, "base_attr_id": 3, "rationale": "None"}, 
    {"value": 0, "attr_id": 5, "base_attr_id": 3, "rationale": "None"},
    {"value": 0, "attr_id": 6, "base_attr_id": 3, "rationale": "None"}, 
    {"value": 0, "attr_id": 7, "base_attr_id": 3, "rationale": "None"}] 
},
externaldocument : {
  theName : '',
  theVersion : '',
  thePublicationDate : '',
  theAuthors : '',
  theDescription : ''
},
goal : {
  theName : '',
  theOriginator : '',
  theTags : '',
  theEnvironmentProperties : []
},
goal_contribution : {
  theSource : '',
  theSourceType : 'document_reference',
  theDestination: '',
  theDestinationType: 'document_reference',
  theMeansEnd : 'means',
  theContribution : 'Help'
},
locations : {
  theName : '',
  theDiagram : '',
  theLocations : []
},
obstacle : {
  theName : '',
  theOriginator : '',
  theTags : '',
  theEnvironmentProperties : []
},
persona : {
  theName : '',
  theTags : '',
  theActivities : '',
  theAptitudes : '',
  theAttitudes : '',
  theMotivations : '',
  theSkills : '',
  theIntrinsic : '',
  theContextual : '',
  theImage : '',
  isAssumption : 0,
  thePersonaType : '',
  theEnvironmentProperties : []
},
personacharacteristic : {
  thePersonaName : '',
  theModQual : '',
  theVariable : '',
  theName : '',
  theCharacteristicSynopsis : {
    theDimension : 'goal',
    theSynopsis : ''
  },
  theGrounds : [],
  theWarrant : [],
  theBacking : [],
  theRebuttal : []
},
policy_statement : {
  theGoalName : '',
  theEnvironmentName : '',
  theSubject : '',
  theAccessType : 'interact',
  theResource : '',
  thePermission: 'deny'
},
response : {
  theName : '',
  theResponseType : 'Accept',
  theRisk : '',
  theTags : '',
  theEnvironmentProperties : {accept : [], transfer : [], mitigate : []}
},
risk : {
  theName : '',
  theVulnerabilityName : '',
  theThreatName : '',
  theMisuseCase : {theName : '',theRiskName : '',theThreatName : '',theVulnerabilityName : '',theEnvironmentProperties : []},
  theTags : ''
},
role : {
  theName : '',
  theType : '',
  theShortCode : '',
  theDescription : ''
},
securitypattern : {
  theName : '',
  theConcernAssociations : [],
  theProblem : '',
  theSolution : '',
  theRequirements : [],
  theContext : []
},
task : {
  theName : '',
  theShortCode : '',
  theObjective : '',
  isAssumption : 0,
  theAuthor : '',
  theTags : '',
  theEnvironmentProperties : []
},
taskcharacteristic : {
  thePersonaName : '',
  theModQual : '',
  theVariable : '',
  theName : '',
  theGrounds : [],
  theWarrant : [],
  theBacking : [],
  theRebuttal : []
},
templateasset : {
  theName : '',
  theShortCode : '',
  theDescription : '',
  theSignificance : '',
  theType : '',
  theSurfaceType : '',
  theAccessRight : '',
  theTags : '',
  theInterfaces : [],
  theProperties : [
    {name : "Confidentiality",
     value : "None",
     rationale : "None"},
    {name : "Integrity",
     value : "None",
     rationale : "None"},
    {name : "Availability",
     value : "None",
     rationale : "None"},
    {name : "Accountability",
     value : "None",
     rationale : "None"},
    {name : "Anonymity",
     value : "None",
     rationale : "None"},
    {name : "Pseudonymity",
     value : "None",
     rationale : "None"},
    {name : "Unlinkability",
     value : "None",
     rationale : "None"},
    {name : "Unobservability",
     value : "None",
     rationale : "None"}
  ]
},
templategoal : {
  theName : '',
  theDefinition : '',
  theRationale : '',
  theResponsibilities : [],
  theConcerns : []
},
templaterequirement : {
  theName : '',
  theDescription : '',
  theAssetName : '',
  theFitCriterion : '',
  theRationale : '',
  theType : ''
},
threat : {
  theName : '',
  theType : '',
  theMethod : '',
  theTags : '',
  theEnvironmentProperties : []
},
trustboundary : {
  theName : '',
  theType : 'General',
  theDescription : '',
  theTags : [],
  theEnvironmentProperties : []
},
usecase : {
  theName : '',
  theAuthor : '',
  theCode : '',
  theActors : [],
  theDescription : '',
  theReferenceContributions : [],
  theTags : '',
  theEnvironmentProperties : []
},
userstory : {
  theName : '',
  theAuthor : '',
  theRole : '',
  theDescription : '',
  theUserGoal : '',
  theAcceptanceCriteria : [],
  theTags : ''
},
user_goal : {
  theActor : '',
  theActorType : 'persona',
  theDimension : 'goal',
  theReference : '',
  theSynopsis : '',
  theSynopsisDimension : 'document_reference',
  theInitialSatisfaction : 'None',
  theRelatedGoals : []
},
vulnerability : {
  theName : '',
  theType : '',
  theDescription : '',
  theTags : '',
  theEnvironmentProperties : []
}

}

export default defaultObjectFactory;