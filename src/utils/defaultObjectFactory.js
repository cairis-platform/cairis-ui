
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
task : {
  theName : '',
  theShortCode : '',
  theObjective : '',
  isAssumption : 0,
  theAuthor : '',
  theTags : '',
  theEnvironmentProperties : []
},
threat : {
  theThreatName : '',
  theType : '',
  theMethod : '',
  theTags : '',
  theEnvironmentProperties : []
},
trustboundary : {
  theName : '',
  theDescription : '',
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
vulnerability : {
  theName : '',
  theType : '',
  theDescription : '',
  theTags : '',
  theEnvironmentProperties : []
}

}

export default defaultObjectFactory;