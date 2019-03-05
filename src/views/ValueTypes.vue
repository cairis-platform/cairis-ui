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
  <div class="valuetypes">
    <objects :breadCrumbItems="bcItems" :fieldList="objectsFields" :getUrl="getUrl" :delUrl="delUrl" :dimName="dimension"/>
  </div>
</template>

<script>
import Objects from '@/components/Objects.vue'

export default {
  props : {
    dimension : String
  },
  watch : {
    dimension : {
      handler : function() {
        this.bcItems = [{text: 'Home', to: {name: 'home'}},{text: this.valueTypeLabel(), to: {name: 'valuetypes',params : {dimension : this.dimension}}}];
      }
    }
  },
  components : {
    Objects
  },
  computed : {
    getUrl() {
      return '/api/value_types/type/' + this.dimension + '/environment/all';
    },
    delUrl() {
      return '/api/value_types/type/' + this.dimension + '/environment/';
    }
  },
  data() {
    return {
      bcItems : [{text: 'Home', to: {name: 'home'}},{text: this.valueTypeLabel(), to: {name: 'valuetypes',params : {dimension : this.dimension}}}],
      items: [],
      objectsFields : {
        objectsactions : {label : ''},
        theName : {label : 'Name', sortable: true},
        theDescription : {label : 'Description', sortable: true}
      }
    }
  },
  methods : {
    valueTypeLabel() {
      if (this.dimension == 'asset_value') {
        return 'Asset Values';
      }
      else if (this.dimension == 'asset_type') {
        return 'Asset Types';
      }
      else if (this.dimension == 'access_right') {
        return 'Access Rights';
      }
      else if (this.dimension == 'protocol') {
        return 'Protocols';
      }
      else if (this.dimension == 'privilege') {
        return 'Privileges';
      }
      else if (this.dimension == 'surface_type') {
        return 'Surface Types';
      }
      else if (this.dimension == 'vulnerability_type') {
        return 'Vulnerability Types';
      }
      else if (this.dimension == 'severity') {
        return 'Vulnerability Severities';
      }
      else if (this.dimension == 'capability') {
        return 'Attacker Capabilities';
      }
      else if (this.dimension == 'motivation') {
        return 'Attacker Motivations';
      }
      else if (this.dimension == 'threat_type') {
        return 'Threat Types';
      }
      else if (this.dimension == 'likelihood') {
        return 'Threat Likelihoods';
      }
      else if (this.dimension == 'threat_value') {
        return 'Threat Values';
      }
      else {
        return 'Unknown value type';
      }
    }
  }
}
</script>