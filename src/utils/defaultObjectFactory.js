
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
domainproperty : {
  theName : '',
  theType : '',
  theDescription : '',
  theOriginator : '',
  theTags : '' 
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
role : {
  theName : '',
  theType : '',
  theShortCode : '',
  theDescription : ''
},
threat : {
  theThreatName : '',
  theType : '',
  theMethod : '',
  theTags : '',
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