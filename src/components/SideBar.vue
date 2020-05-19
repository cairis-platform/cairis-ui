
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

  <b-sidebar id="sideBar" v-model="isNodeClicked" :title="title" lazy right shadow>
    <template v-slot:default="{ hide }">
      <component :is="panelName" :panelParameters="panelParameters" :panelObject="panelObject" />
      <b-button variant="primary" block @click="hideSideBar">Close</b-button>
    </template>
  </b-sidebar>
</template>

<script>

export default {
  name : 'side-bar',
  props : {
    dimension : String,
    panelObject : Object,
    panelParameters: Object
  },
  watch : {
    panelObject: {
      handler() {
        this.isNodeClicked = true;
      },
      deep: true
    }
  },
  components : {
    'AssetPanel' : () => import('@/components/AssetPanel.vue'),
    'AttackerPanel' : () => import('@/components/AttackerPanel.vue'),
    'CountermeasurePanel' : () => import('@/components/CountermeasurePanel.vue'),
    'DataFlowPanel' : () => import('@/components/DataFlowPanel.vue'),
    'DocumentReferencePanel' : () => import('@/components/DocumentReferencePanel.vue'),
    'DomainPropertyPanel' : () => import('@/components/DomainPropertyPanel.vue'),
    'ExternalDocumentPanel' : () => import('@/components/ExternalDocumentPanel.vue'),
    'GoalPanel' : () => import('@/components/GoalPanel.vue'),
    'GoalAssociationPanel' : () => import('@/components/GoalAssociationPanel.vue'),
    'MisuseCasePanel' : () => import('@/components/MisuseCasePanel.vue'),
    'ObstaclePanel' : () => import('@/components/ObstaclePanel.vue'),
    'PersonaPanel' : () => import('@/components/PersonaPanel.vue'),
    'RequirementPanel' : () => import('@/components/RequirementPanel.vue'),
    'ResponsePanel' : () => import('@/components/ResponsePanel.vue'),
    'RiskPanel' : () => import('@/components/RiskPanel.vue'),
    'RolePanel' : () => import('@/components/RolePanel.vue'),
    'TaskPanel' : () => import('@/components/TaskPanel.vue'),
    'TemplateAssetPanel' : () => import('@/components/TemplateAssetPanel.vue'),
    'TemplateGoalPanel' : () => import('@/components/TemplateGoalPanel.vue'),
    'ThreatPanel' : () => import('@/components/ThreatPanel.vue'),
    'TrustBoundaryPanel' : () => import('@/components/TrustBoundaryPanel.vue'),
    'UseCasePanel' : () => import('@/components/UseCasePanel.vue'),
    'UserGoalPanel' : () => import('@/components/UserGoalPanel.vue'),
    'VulnerabilityPanel' : () => import('@/components/VulnerabilityPanel.vue')
  },
  data() {
    return {
      isNodeClicked : false
    }
  },
  methods : {
    hideSideBar() {
      this.isNodeClicked = false;
    }
  },
  computed : {
    title() {
      return this.panelObject != undefined ? this.panelObject.theName : '';
    },
    panelName() {
      if (this.dimension == 'assets') {
        return 'AssetPanel';
      }
      else if (this.dimension == 'attackers') {
        return 'AttackerPanel';
      }
      else if (this.dimension == 'countermeasures') {
        return 'CountermeasurePanel';
      }
      else if (this.dimension == 'dataflows') {
        return 'DataFlowPanel';
      }
      else if (this.dimension == 'document_references') {
        return 'DocumentReferencePanel';
      }
      else if (this.dimension == 'domainproperties') {
        return 'DomainPropertyPanel';
      }
      else if (this.dimension == 'external_documents') {
        return 'ExternalDocumentPanel';
      }
      else if (this.dimension == 'goals') {
        return 'GoalPanel';
      }
      else if (this.dimension == 'goalassociations') {
        return 'GoalAssociationPanel';
      }
      else if (this.dimension == 'misusecases') {
        return 'MisuseCasePanel';
      }
      else if (this.dimension == 'obstacles') {
        return 'ObstaclePanel';
      }
      else if (this.dimension == 'personas') {
        return 'PersonaPanel';
      }
      else if (this.dimension == 'requirements') {
        return 'RequirementPanel';
      }
      else if (this.dimension == 'responses') {
        return 'ResponsePanel';
      }
      else if (this.dimension == 'risks') {
        return 'RiskPanel';
      }
      else if (this.dimension == 'roles') {
        return 'RolePanel';
      }
      else if (this.dimension == 'tasks') {
        return 'TaskPanel';
      }
      else if (this.dimension == 'template_assets') {
        return 'TemplateAssetPanel';
      }
      else if (this.dimension == 'template_goals') {
        return 'TemplateGoalPanel';
      }
      else if (this.dimension == 'threats') {
        return 'ThreatPanel';
      }
      else if (this.dimension == 'trust_boundaries') {
        return 'TrustBoundaryPanel';
      }
      else if (this.dimension == 'usecases') {
        return 'UseCasePanel';
      }
      else if (this.dimension == 'user_goals') {
        return 'UserGoalPanel';
      }
      else if (this.dimension == 'vulnerabilities') {
        return 'VulnerabilityPanel';
      }
      else {
        return '';
      }
    }
  }
}
</script>