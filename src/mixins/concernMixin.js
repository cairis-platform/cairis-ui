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

export default {
  computed : {
    concernAssociations() {
      return this.objt.theConcernAssociations != undefined ? this.objt.theConcernAssociations : (
        this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theConcernAssociations : [] 
      )
    }
  },
  components : {
    DimensionModal : () => import('@/components/DimensionModal.vue'),
  },
  data() {
    return {
      concernTableFields : [
        {key: 'concernactions', label : ''},
        {key: 'name', label : 'Concern'}
      ],
      concernAssociationTableFields : [
        {key: 'concernassociationactions', label : ''},
        {key: 'theSource', label : 'Source'},
        {key: 'theSourceNry',label : 'n'},
        {key: 'theLinkVerb', label : 'Link Verb'},
        {key: 'theTargetNry', label : 'n'},
        {key: 'theTarget', label : 'Target'}
      ],
      selectedConcernAssociation : {
        update : false,
        association : {
          theSource : '',
          theSourceNry : '1',
          theLinkVerb : '',
          theTargetNry : '1',
          theTarget : ''
        }
      }
    }
  },
  methods : {
    addConcern() {
      this.$refs.assetDialog.show();  
    },
    viewConcernAssociation(data,index) {
      this.selectedConcernAssociation['index'] = index;
      this.selectedConcernAssociation['association'] = JSON.parse(JSON.stringify(data));
      this.selectedConcernAssociation['update'] = true;
      this.$refs.concernAssociationDialog.show();  
    },
    addConcernAssociation() {
      this.selectedConcernAssociation['association'] = {theSource : '', theSourceNry : '', theLinkVerb : '', theTargetNry: '', theTarget : ''};
      this.selectedConcernAssociation['update'] = false;
      this.$refs.concernAssociationDialog.show();  
    },
    updateConcernAssociation : function(updAssoc) {
      const theConcernAssociations = (this.objt.theConcernAssociations != undefined ? this.objt.theConcernAssociations : this.objt.theEnvironmentProperties[this.envPropIndex].theConcernAssociations);
      if (updAssoc.update) {
        this.$set(theConcernAssociations,updAssoc.index,updAssoc.association);
      }
      else {
        theConcernAssociations.push(updAssoc.association);
      }
    },
    deleteConcernAssociation(index) {
      const theConcernAssociations = (this.objt.theConcernAssociations != undefined ? this.objt.theConcernAssociations : this.objt.theEnvironmentProperties[this.envPropIndex].theConcernAssociations);
      theConcernAssociations.splice(index,1);
    }
  }
}