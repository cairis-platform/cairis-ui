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

  <div class="personamodel">
    <b-card no-body>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-form-group label="Persona" label-for="personaModelPersona" :label-cols="3" >
            <dimension-select id="personaModelPersona" ref="personaModelPersona" dimension="persona" v-on:dimension-select-change="personaSelected" />
          </b-form-group>
        </b-col>
        <b-col v-if="thePersonaName != ''">
          <b-form-group label="Behaviour Type" label-for="personaModelBehaviourType" :label-cols="4" >
            <b-form-select id="personaModelBehaviourType" ref="personaModelBehaviourType" v-model="theBehaviourType" :options="behaviourTypes" class="mb-3" required>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col v-if="thePersonaName != ''">
          <b-form-group label="Characteristic" label-form="personaModelCharacteristic" :label-cols="4" >
            <dimension-select id="personaModelCharacteristic" ref="personaModelCharacteristic" :dimensionUrl="pcUrl" initial="all" includeall v-on:dimension-select-change="characteristicSelected" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    </b-card>
    <graphical-model v-if="thePersonaName != ''" :api="personaModelURI" />
  </div>
</template>

<script>

import GraphicalModel from '@/components/GraphicalModel.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'

export default {
  computed : {
    personaModelURI() {
      return this.thePersonaName != '' ? '/api/personas/model/name/' + this.thePersonaName + '/variable/' + this.theBehaviourType + '/characteristic/' + this.theCharacteristic : '';
    },
    pcUrl() {
      return this.thePersonaName != '' ? '/api/personas/characteristics/name/' + this.thePersonaName + '/variable/' + this.theBehaviourType + '/characteristic/' + this.theCharacteristic : '';
    }
  },
  data() {
    return {
      thePersonaName : '',
      theBehaviourType : 'all',
      theCharacteristic : 'all',
      behaviourTypes : ['all','Activities','Aptitudes','Attitudes','Motivations','Skills','Environment Narrative','Intrinsic','Contextual'],
    }
  },
  watch : {
    theBehaviourType : {
      handler() {
        this.theCharacteristic = 'all';
      }
    }
  },
  components : {
    DimensionSelect,
    GraphicalModel
  },
  methods : {
    personaSelected(personaName) {
      this.thePersonaName = personaName
      if (this.$refs.personaModelBehaviourType != undefined) {
        this.theBehaviourType = 'all'
        this.theCharacteristic = 'all'
        this.$refs.personaModelCharacteristic.selected = this.theCharacteristic;
      }
    },
    characteristicSelected(charName) {
      this.theCharacteristic = charName
    }
  }
}
</script>
