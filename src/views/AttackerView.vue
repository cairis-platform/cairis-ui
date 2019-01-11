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

  <div class="attackerview">
    <b-breadcrumb :items="bcItems" /> 
    <attacker :object="this.objt" :label="this.commitLabel" v-on:attacker-commit="commitAttacker" />
  </div>
</template>


<script>

import axios from 'axios';
import axiosMixin from '../mixins/axiosMixin'
import Attacker from '@/components/Attacker.vue'
import store from '../store'
import EventBus from '../utils/event-bus';
import objectMixin from '../mixins/objectMixin'

export default {
  props : {
    objectName : String
  },
  mixins : [
    objectMixin
  ],
  computed : {
    bcItems() {
     return [{text: 'Home', to: {name: 'home'}},{text: 'Attackers', to: {name: 'attackers'}},{text: this.objt.theName, to : {name: 'attacker'}}]
    }
  },
  components : {
    Attacker 
  },
  data() {
    return {
      objt : {
        theName : '',
        theTags : '',
        theDescription : '',
        theImage : '',
        theEnvironmentProperties : []
      },
      commitLabel : 'Create',
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.objectName == 'New attacker') {
      next();
    }
    else {
      var url = "/api/attackers/name/" + to.params.objectName
      axios.get(url,{
        baseURL : store.state.url,
        params : {'session_id' : store.state.session}
      })
      .then(response => {
        next(vm => {
          vm.commitLabel = 'Update';
          vm.objt = response.data;
        })
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    }
  },
  methods : {
    commitAttacker(objt) {
      this.objt = objt
      var updateUrl = this.$store.state.url + "/api/attacker/name/" + this.objectName + "?session_id=" + this.$store.state.session;
      var createUrl = this.$store.state.url + "/api/attackers";
      this.commitObject(updateUrl,createUrl,'attackers');
    }
  }

}
</script>