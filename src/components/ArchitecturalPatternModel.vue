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

  <div class="architecturalpatternmodel">
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Architectural Pattern" label-for="apModelAp" :label-cols="3" >
            <dimension-select id="apModelAp" ref="apModelAp" dimension="component_view" v-on:dimension-select-change="architecturalPatternSelected" v-on:dimension-items-updated="architecturalPatternsLoaded" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    </b-card>
    <graphical-model v-if="theArchitecturalPattern != ''" :api="architecturalPatternModelURI" />
  </div>
</template>

<script>

import GraphicalModel from '@/components/GraphicalModel.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'

export default {
  computed : {
    architecturalPatternModelURI() {
      return this.theArchitecturalPattern != '' ? '/api/architectural_patterns/component/model/' + this.theArchitecturalPattern : '';
    }
  },
  data() {
    return {
      theArchitecturalPattern : ''
    }
  },
  components : {
    DimensionSelect,
    GraphicalModel
  },
  methods : {
    architecturalPatternSelected(apName) {
      this.theArchitecturalPattern = apName;
    },
    architecturalPatternsLoaded(apName) {
      this.theArchitecturalPattern = apName;
    }
  }
}
</script>
