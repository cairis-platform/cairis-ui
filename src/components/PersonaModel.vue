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
    <external-document-modal v-if="thePersonaName != ''" ref="edDialog" :external_document="this.theSelectedObject"/> 
    <document-reference-modal v-if="thePersonaName != ''" ref="drDialog" :document_reference="this.theSelectedObject"/> 
    <b-card no-body>
      <b-container fluid>
        <b-row>
          <b-col>
            <b-form-group label="Persona" label-for="personaModelPersona">
              <dimension-select id="personaModelPersona" ref="personaModelPersona" dimension="persona" v-on:dimension-select-change="personaSelected" v-on:dimension-items-updated="personasLoaded" />
            </b-form-group>
          </b-col>
          <b-col v-if="thePersonaName != ''">
            <b-form-group label="Behaviour Type" label-for="personaModelBehaviourType">
              <b-form-select id="personaModelBehaviourType" ref="personaModelBehaviourType" v-model="theBehaviourType" :options="behaviourTypes" class="mb-3" required />
            </b-form-group>
          </b-col>
          <b-col v-if="thePersonaName != ''">
            <b-form-group label="Characteristic" label-form="personaModelCharacteristic">
              <dimension-select id="personaModelCharacteristic" ref="personaModelCharacteristic" :dimensionUrl="pcUrl" :initial="theCharacteristic" includeall v-on:dimension-select-change="characteristicSelected" v-on:dimension-items-updated="characteristicsLoaded" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
    <graphical-model v-if="thePersonaName != ''" :api="personaModelURI" v-on:graphical-model-url="nodeClicked" />
  </div>
</template>

<script>

import axios from 'axios';
import GraphicalModel from '@/components/GraphicalModel.vue'
import DimensionSelect from '@/components/DimensionSelect.vue'
import ExternalDocumentModal from '@/components/ExternalDocumentModal.vue'
import DocumentReferenceModal from '@/components/DocumentReferenceModal.vue'
import EventBus from '../utils/event-bus';

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
      theSelectedObject: null
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
    ExternalDocumentModal,
    DocumentReferenceModal,
    GraphicalModel
  },
  methods : {
    nodeClicked(url) {
      const dimName = url.slice(5).substring(0, url.slice(5).indexOf('/'))
      if (['grounds','warrants','backings','rebuttals'].indexOf(dimName) == -1) {
        return;
      }
      let objtUrl = '/api/document_references' + url.slice(12);
      if (dimName == 'backings') {
        objtUrl = '/api/external_documents' + url.slice(13);
      }
      else if (dimName == 'warrants') {
        objtUrl = '/api/document_references' + url.slice(13);
      }
      else if (dimName == 'rebuttals') {
        objtUrl = '/api/document_references' + url.slice(14);
      }
      axios.get(objtUrl,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
      })
      .then(response => {
        this.theSelectedObject = response.data;
        if (dimName == 'backings') {
          this.$refs.edDialog.show();  
        }
        else {
          this.$refs.drDialog.show();  
        }
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    },
    personaSelected(personaName) {
      this.thePersonaName = personaName
      this.$refs.personaModelPersona.selected = this.thePersonaName;
      if (this.$refs.personaModelBehaviourType != undefined) {
        this.theBehaviourType = 'all';
        this.theCharacteristic = 'all';
      }
    },
    personasLoaded(personaName) {
      this.thePersonaName = personaName
      this.$refs.personaModelPersona.selected = this.thePersonaName;
      if (this.$refs.personaModelBehaviourType != undefined) {
        this.theBehaviourType = 'all';
        this.theCharacteristic = 'all';
      }
    },
    characteristicSelected(charName) {
      this.theCharacteristic = charName;
    },
    characteristicsLoaded(charName) {
      this.theCharacteristic = charName;
    }
  }
}
</script>