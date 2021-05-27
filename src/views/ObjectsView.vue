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
  <div class="objectsview">
    <objects :breadCrumbItems="bcItems" :fieldList="objectsFields" :getUrl="theGetUrl" :delUrl="theDelUrl" :dimName="dimension"/>
  </div>
</template>

<script>
import Objects from '@/components/Objects.vue'
import objectsViewData from '../utils/objectsViewData';
import axios from 'axios';
import EventBus from '../utils/event-bus';
import store from '../store';

function dimensionCheck(dimName, cb, cb2) {
  const dcUrl = '/api/dimensions/table/' + dimName;
  axios.get(dcUrl,{
    baseURL : store.state.url,
    params : {'session_id' : store.state.session}
  })
  .then(response => {
    if (response.data.length > 0) {
      cb(cb2);
    }
    else {
      EventBus.$emit('operation-failure','You must define or import at least one ' + dimName + ' first.')
    }
  })
  .catch((error) => {
    EventBus.$emit('operation-failure',error)
  });
}

export default {
  props : {
    dimension : String
  },
  components : {
    Objects
  },
  data() {
    return {
      bcItems : [],
      items: [],
      objectsFields : [], 
      theGetUrl : '',
      theDelUrl : '',
      theToDim : ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.checkRouteBeforeEntry(to,from,next);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.theToDim = to.params.dimension;
    this.checkRouteBeforeEntry(to,from,this.setData,next);
  },
  methods : {
    checkRouteBeforeEntry(to,from,next,cb2) {
      if (['goal','obstacle','usecase','dependency','asset','location','traceability','role','kaosassociation'].indexOf(to.params.dimension) > -1) {
        dimensionCheck('environment',next,cb2);
      }
      else if (to.params.dimension == 'attacker') {
        dimensionCheck('role',() => {
          dimensionCheck('environment',next,cb2);
        });
      }
      else if (to.params.dimension == 'assetassociation') {
        dimensionCheck('environment',() => {
          dimensionCheck('asset',next,cb2);
        });
      }
      else if (to.params.dimension == 'requirement') {
        dimensionCheck('environment',() => {
          dimensionCheck('asset',next,cb2);
        });
      }
      else if (to.params.dimension == 'vulnerability') {
        dimensionCheck('vulnerability_type',() => {
          dimensionCheck('environment',() => {
            dimensionCheck('asset',next,cb2);
          });
        });
      }
      else if (to.params.dimension == 'threat') {
        dimensionCheck('threat_type',() => {
          dimensionCheck('environment',() => {
            dimensionCheck('attacker',() => {
              dimensionCheck('asset',next,cb2);
            });
          });
        });
      }
      else if (to.params.dimension == 'risk') {
        dimensionCheck('threat',() => {
          dimensionCheck('vulnerability',next,cb2);
        });
      }
      else if (to.params.dimension == 'response') {
        dimensionCheck('risk',next,cb2);
      }
      else if (to.params.dimension == 'countermeasure') {
        dimensionCheck('response',() => {
          dimensionCheck('task',next,cb2);
        });
      }
      else if (to.params.dimension == 'task' || to.params.dimension == 'user_goal') {
        dimensionCheck('persona',() => {
          dimensionCheck('role',next,cb2);
        });
      }
      else if (to.params.dimension == 'persona') {
        dimensionCheck('role',next,cb2);
      }
      else if (to.params.dimension == 'trustboundary') {
        dimensionCheck('environment',() => {
          dimensionCheck('usecase',next,cb2);
        });
      }
      else if (to.params.dimension == 'dataflow') {
        dimensionCheck('environment',() => {
          dimensionCheck('usecase',next,cb2);
        });
      }
      else if (to.params.dimension == 'templateasset') {
        dimensionCheck('surface_type',() => {
          dimensionCheck('access_right',() => {
            dimensionCheck('privilege',next,cb2);
          });
        });
      }
      else if (to.params.dimension == 'templaterequirement') {
        dimensionCheck('template_asset',next,cb2);
      }
      else if (to.params.dimension == 'architecturalpattern') {
        dimensionCheck('template_asset',() => {
          dimensionCheck('protocol',next,cb2);
        });
      }
      else if (to.params.dimension == 'securitypattern') {
        dimensionCheck('template_asset',next,cb2);
      }
      else if (to.params.dimension == 'documentreference') {
        dimensionCheck('external_document',next,cb2);
      }
      else if (to.params.dimension == 'personacharacteristic') {
        dimensionCheck('external_document',() => {
          dimensionCheck('document_reference',next,cb2);
        });
      }
      else if (to.params.dimension == 'goal_contribution') {
        dimensionCheck('external_document',() => {
          dimensionCheck('document_reference',next,cb2);
        });
      }
      else if (to.params.dimension == 'locations') {
        dimensionCheck('persona',() => {
          dimensionCheck('asset',next,cb2);
        });
      }
      else if (to.params.dimension == 'userstory') {
        dimensionCheck('role',() => {
          dimensionCheck('user_goal',next,cb2);
        });
      }
      else if (to.params.dimension == 'policy_statement') {
        dimensionCheck('goal',() => {
          dimensionCheck('asset',next,cb2);
        });
      }
      else if (['environment','externaldocument','domainproperty','templategoal','taskcharacteristic','conceptreference'].indexOf(to.params.dimension) > -1) {
        next(cb2);
      }
    },
    setData(cb) {
      const viewData = objectsViewData[this.theToDim == '' ? this.dimension : this.theToDim];
      this.bcItems = viewData.bcItems;
      this.objectsFields = viewData.objectsFields;
      this.theGetUrl = viewData.theGetUrl;
      this.theDelUrl = viewData.theDelUrl;
      if (cb != undefined) {
        cb();
      }
    }
  },
  mounted() {
    this.setData();
  }
}
</script>