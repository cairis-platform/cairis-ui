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

function dimensionCheck(dimName, cb) {
  const dcUrl = '/api/dimensions/table/' + dimName;
  axios.get(dcUrl,{
    baseURL : store.state.url,
    params : {'session_id' : store.state.session}
  })
  .then(response => {
    if (response.data.length > 0) {
      if (cb != undefined) {
        cb();
      }
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
  watch : {
    dimension : 'checkRoute' 
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
      theDelUrl : ''
    }
  },
  beforeRouteEnter (to, from, next) {
    if (['requirement','goal','obstacle','usecase','dependency','asset','location','traceability','role','kaosassociation'].indexOf(to.params.dimension) > -1) {
      dimensionCheck('environment',next);
    }
    else if (to.params.dimension == 'attacker') {
      dimensionCheck('role',() => {
        dimensionCheck('environment',next);
      });
    }
    else if (to.params.dimension == 'assetassociation') {
      dimensionCheck('environment',() => {
        dimensionCheck('asset',next);
      });
    }
    else if (to.params.dimension == 'vulnerability') {
      dimensionCheck('vulnerability_type',() => {
        dimensionCheck('environment',() => {
          dimensionCheck('asset',next);
        });
      });
    }
    else if (to.params.dimension == 'threat') {
      dimensionCheck('threat_type',() => {
        dimensionCheck('environment',() => {
          dimensionCheck('attacker',() => {
            dimensionCheck('asset',next);
          });
        });
      });
    }
    else if (to.params.dimension == 'risk') {
      dimensionCheck('threat',() => {
        dimensionCheck('vulnerability',next);
      });
    }
    else if (to.params.dimension == 'response') {
      dimensionCheck('risk',next);
    }
    else if (to.params.dimension == 'countermeasure') {
      dimensionCheck('response',() => {
        dimensionCheck('task',next);
      });
    }
    else if (to.params.dimension == 'task') {
      dimensionCheck('persona',() => {
        dimensionCheck('role',next);
      });
    }
    else if (to.params.dimension == 'persona') {
      dimensionCheck('role',next);
    }
    else if (to.params.dimension == 'trustboundary') {
      dimensionCheck('environment',() => {
        dimensionCheck('usecase',next);
      });
    }
    else if (to.params.dimension == 'dataflow') {
      dimensionCheck('environment',() => {
        dimensionCheck('usecase',next);
      });
    }
    else if (to.params.dimension == 'templateasset') {
      dimensionCheck('surface_type',() => {
        dimensionCheck('access_right',() => {
          dimensionCheck('privilege',next);
        });
      });
    }
    else if (to.params.dimension == 'templaterequirement') {
      dimensionCheck('template_asset',next);
    }
    else if (to.params.dimension == 'architecturalpattern') {
      dimensionCheck('template_asset',() => {
        dimensionCheck('protocol',next);
      });
    }
    else if (to.params.dimension == 'securitypattern') {
      dimensionCheck('template_asset',next);
    }
    else if (to.params.dimension == 'documentreference') {
      dimensionCheck('external_document',next);
    }
    else if (to.params.dimension == 'personacharacteristic') {
      dimensionCheck('external_document',() => {
        dimensionCheck('document_reference',next);
      });
    }
    else if (to.params.dimension == 'locations') {
      dimensionCheck('persona',() => {
        dimensionCheck('asset',next);
      });
    }
    else if (['environment','externaldocument','domainproperty','templategoal','taskcharacteristic'].indexOf(to.params.dimension) > -1) {
      next();
    }
  },
  methods : {
    checkRoute() {
      if (['requirement','goal','obstacle','usecase','dependency','asset','location','traceability','role','kaosassociation'].indexOf(this.dimension) > -1) {
        dimensionCheck('environment',this.setData);
      }
      else if (this.dimension == 'attacker') {
        dimensionCheck('role',() => {
          dimensionCheck('environment',this.setData);
        });
      }
      else if (this.dimension == 'assetassociation') {
        dimensionCheck('environment',() => {
          dimensionCheck('asset',this.setData);
        });
      }
      else if (this.dimension == 'vulnerability') {
        dimensionCheck('vulnerability_type',() => {
          dimensionCheck('environment',() => {
            dimensionCheck('asset',this.setData);
          });
        });
      }
      else if (this.dimension == 'threat') {
        dimensionCheck('threat_type',() => {
          dimensionCheck('environment',() => {
            dimensionCheck('attacker',() => {
              dimensionCheck('asset',this.setData);
            });
          });
        });
      }
      else if (this.dimension == 'risk') {
        dimensionCheck('threat',() => {
          dimensionCheck('vulnerability',this.setData);
        });
      }
      else if (this.dimension == 'response') {
        dimensionCheck('risk',this.setData);
      }
      else if (this.dimension == 'countermeasure') {
        dimensionCheck('response', () => {
          dimensionCheck('task',this.setData);
        });
      }
      else if (this.dimension == 'task') {
        dimensionCheck('persona',() => {
          dimensionCheck('role',this.setData);
        });
      }
      else if (this.dimension == 'persona') {
        dimensionCheck('role',this.setData);
      }
      else if (this.dimension == 'trustboundary') {
        dimensionCheck('environment',() => {
          dimensionCheck('usecase',this.setData);
        });
      }
      else if (this.dimension == 'dataflow') {
        dimensionCheck('environment',() => {
          dimensionCheck('usecase',this.setData);
        });
      }
      else if (this.dimension == 'template_asset') {
        dimensionCheck('surface_type',() => {
          dimensionCheck('access_right',() => {
            dimensionCheck('privilege',this.setData);
          });
        });
      }
      else if (this.dimension == 'template_requirement') {
        dimensionCheck('template_asset',this.setData);
      }
      else if (this.dimension == 'architecturalpattern') {
        dimensionCheck('template_asset',() => {
          dimensionCheck('protocol',this.setData);
        });
      }
      else if (this.dimension == 'securitypattern') {
        dimensionCheck('template_asset',() => {
          dimensionCheck('protocol',this.setData);
        });
      }
      else if (this.dimension == 'documentreference') {
        dimensionCheck('external_document',this.setData);
      }
      else if (this.dimension == 'personacharacteristic') {
        dimensionCheck('external_document',() => {
          dimensionCheck('document_reference',this.setData);
        });
      }
      else if (this.dimension == 'locations') {
        dimensionCheck('persona',() => {
          dimensionCheck('asset',this.setData);
        });
      }
      else if (['environment','externaldocument','conceptreference','domainproperty','template_goal','template_asset','taskcharacteristic'].indexOf(this.dimension) > -1) {
        this.setData();
      }
    },
    setData() {
      const viewData = objectsViewData[this.dimension];
      this.bcItems = viewData.bcItems;
      this.objectsFields = viewData.objectsFields;
      this.theGetUrl = viewData.theGetUrl;
      this.theDelUrl = viewData.theDelUrl;
    }
  },
  mounted() {
    this.setData();
  }
}
</script>