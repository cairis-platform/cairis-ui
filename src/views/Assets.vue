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
  <div class="assets">
    <objects :breadCrumbItems="bcItems" :fieldList="objectsFields" :getUrl="theGetUrl" :delUrl="theDelUrl" :dimName="dimension"/>
  </div>
</template>

<script>
import Objects from '@/components/Objects.vue'

export default {
  components : {
    Objects
  },
  data() {
    return {
      bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Assets', to: {name: 'assets'}}],
      items: [],
      objectsFields : {
        objectsactions : {label : ''},
        theName : {label : 'Asset', sortable: true },
        theType : {label : 'Type', sortable: true},
        postaction : {label : ''}
      },
      theGetUrl : '/api/assets/summary',
      theDelUrl : '/api/assets/name/',
      dimension : 'asset'
    }
  }
}
</script>