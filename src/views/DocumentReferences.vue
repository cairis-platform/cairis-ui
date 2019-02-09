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
  <div class="documentreferences">
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
      bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Document References', to: {name: 'documentreferences'}}],
      items: [],
      objectsFields : {
        objectsactions : {label : ''},
        theName : {label : 'Name', sortable: true},
        theDocName : {label : 'Document', sortable: true}
      },
      theGetUrl : '/api/document_references',
      theDelUrl : '/api/document_references/name/',
      dimension : 'documentreference'
    }
  }
}
</script>