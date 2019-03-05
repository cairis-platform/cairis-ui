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

  <div class="domainpropertyview">
    <b-breadcrumb :items="bcItems" /> 
    <value-type :object="this.objt" :label="this.commitLabel" v-on:valuetype-commit="commitValueType" />
  </div>
</template>


<script>

import axios from 'axios';
import axiosMixin from '../mixins/axiosMixin'
import ValueType from '@/components/ValueType.vue'
import store from '../store'
import EventBus from '../utils/event-bus';

export default {
  props : {
    objectName : String,
    dimName : String,
    envName : String
  },
  mixins : [
    axiosMixin
  ],
  computed : {
    bcItems() {
     return [{text: 'Home', to: {name: 'home'}},{text: this.valueTypesLabel(), to: {name: 'valuetypes',params : {dimension : this.dimName}}},{text: this.objectName, to: {name: 'valuetype', params: {objectName: this.objectName, dimName : this.dimName, envName : this.envName}}}];
    }

  },
  components : {
    ValueType 
  },
  data() {
    return {
      objt : {
        theName : '',
        theDescription : '',
        theType : '',
        theScore : 0,
        theRationale : 'None',
        theEnvironmentName : 'all',
      },
      theDimension : '',
      commitLabel : 'Create'
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.objectName.indexOf('New') == 0) {
      next(vm => {
        vm.objt.theType = to.params.dimName;
      });
    }
    else {
      var url = "/api/value_types/type/" + to.params.dimName + "/environment/" + to.params.envName + "/name/" + encodeURIComponent(to.params.objectName);
      axios.get(url,{
        baseURL : store.state.url,
        params : {'session_id' : store.state.session}
      })
      .then(response => {
        next(vm => {
          vm.commitLabel = 'Update';
          vm.objt = response.data;
          if (vm.objt.theEnvironmentName == '') {
            vm.objt.theEnvironmentName = 'all';
            vm.objt.theType = to.params.dimName;
          }
        })
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });
    }
  },
  methods : {
    commitValueType(objt) {
      this.objt = objt;
      var updateUrl = this.$store.state.url + "/api/value_types/type/" + this.objt.theType + "/environment/" + this.objt.theEnvironmentName + "/name/" + this.objectName + "?session_id=" + this.$store.state.session;
      var createUrl = this.$store.state.url + "/api/value_types/";
      this.commitObject(updateUrl,createUrl,'valuetypes',undefined,this.dimName);
    },
    valueTypesLabel() {
      if (this.dimName == 'asset_value') {
        return 'Asset Values';
      }
      else if (this.dimName == 'asset_type') {
        return 'Asset Types';
      }
      else if (this.dimName == 'access_right') {
        return 'Access Rights';
      }
      else if (this.dimName == 'protocol') {
        return 'Protocols';
      }
      else if (this.dimName == 'privilege') {
        return 'Privileges';
      }
      else if (this.dimName == 'surface_type') {
        return 'Surface Types';
      }
      else if (this.dimName == 'vulnerability_type') {
        return 'Vulnerability Types';
      }
      else if (this.dimName == 'severity') {
        return 'Vulnerability Severities';
      }
      else if (this.dimName == 'capability') {
        return 'Attacker Capabilities';
      }
      else if (this.dimName == 'motivation') {
        return 'Attacker Motivations';
      }
      else if (this.dimName == 'threat_type') {
        return 'Threat Types';
      }
      else if (this.dimName == 'likelihood') {
        return 'Threat Likelihoods';
      }
      else if (this.dimName == 'threat_value') {
        return 'Threat Values';
      }
      else {
        return 'Unknown value type';
      }
    }
  }

}
</script>