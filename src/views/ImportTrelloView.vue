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

  <div class="fromtrello">
    <b-form class="vld-parent">
      <loading :active.sync="isLoading" is-full-page></loading>
      <b-breadcrumb :items="bcItems" /> 
      <b-container fluid>
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </p>
        <b-card bg-variant="light">
          <b-form-group label="Board" label-class="text-md-left" label-cols="3" label-for="theBoardSelect">
            <b-form-select id="theBoardSelect" v-model="theBoardName" :options="boardNames" class="mb-3" required />
          </b-form-group>
          <b-form-group label="Persona" label-class="text-md-left" label-cols="3" label-for="thePersonaSelect">
            <b-form-select id="thePersonaSelect" v-model="thePersonaName" :options="personaNames" class="mb-3" required />
          </b-form-group>
        </b-card>
      </b-container> 
      <b-container fluid>
        <b-form-row>
          <b-col md="4" offset-md="5" >
            <b-button type="submit" variant="primary" @click="onImport">Import</b-button>
            <b-button type="submit" variant="secondary" @click="onCancel">Cancel</b-button>
          </b-col>
        </b-form-row>
      </b-container> 
    </b-form>

  </div>
</template>


<script>

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios';
import EventBus from '../utils/event-bus';

export default {
  computed : {
    bcItems() {
     return [{text: 'Home', to: {name: 'home'}},{text: 'Trello Import', to: {name: 'fromtrello'}}]
    },
  },
  components : {
    Loading
  },
  data() {
    return {
      errors : [],
      isLoading : false,
      theBoardName : '',
      thePersonaName : '',
      boardNames : [],
      personaNames : []
    }
  },
  methods : {
    checkForm() {
      this.errors = []

      if (this.theBoardName.length == 0) {
        this.errors.push('Board name is required');
      }
      if (this.thePersonaName.length == 0) {
        this.errors.push('Persona name is required');
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    },
    onImport(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        this.isLoading = true;
        this.importBoard();
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.isLoading = false;
      this.$router.push({ name: 'home'})
    },
    importBoard() {
      const that = this;
      const varList = ['activities','aptitudes','attitudes','motivations','skills','intrinsic','contextual'];
      const charList = ['grounds','warrant','rebuttal'];
      // eslint-disable-next-line
      Trello.get('/boards/' + this.theBoardName + '/lists',function(data) {
        that.isLoading = true;
        data.forEach(function(item) {
          const itemArray = item.name.split(':');
          const variableName = itemArray.length < 2 ? 'none' : itemArray[1].trim();
          if (variableName == 'none') {
            that.errors.push("No behavioural variable set for list " + item.name);
            return;
          }
          else if (varList.indexOf(variableName) != -1) {
            let pc = {'thePersonaName' : that.thePersonaName, 'theModQual' : 'Perhaps', 'theVariable' : variableName, 'theName' : itemArray[0].trim(), 'theCharacteristicSynopsis' : {'theActor' : '','theSynopsis' : '','theDimension' : '','theActorType' : ''}, 'theGrounds' : [], 'theWarrant' : [], 'theRebuttal' : [], 'theBacking' : []};
            // eslint-disable-next-line
            Trello.get('/lists/' + item.id + '/cards',function(cards) {
              if (cards.length == 0) {
                that.errors.push("List " + item.name + " contains no cards");
                return;
              }
              cards.forEach(function(card) {
                const cardName = card.name;
                let cardDesc = card.desc;
                if (cardDesc == "") {
                  cardDesc = cardName;
                }
                if (card.labels.length == 0) {
                  that.errors.push("No card labels set.  Permissable values: grounds, warrant, rebuttal");
                }
                const charType = card.labels[0].name;
                if (charList.indexOf(charType) == -1) {
                  that.errors.push("Card label " + charType + " is invalid.  Permissable values: grounds, warrant, rebuttal");
                }
                const ref = {'theCharacteristicType' : charType, 'theDimensionName' : 'document', 'theReferenceName' : cardName, 'theReferenceDescription' : cardDesc};
                if (ref.theCharacteristicType == 'warrant') {
                  pc.theWarrant.push(ref);
                }
                else if (ref.theCharacteristicType == 'rebuttal') {
                  pc.theRebuttal.push(ref);
                }
                else {
                  pc.theGrounds.push(ref);
                }
              });
              if (that.errors.length == 0) {
                axios.post(that.$store.state.url + '/api/persona_characteristics',{
                  session_id : that.$store.state.session,
                  object : pc
                })
                .then(() => {
                  EventBus.$emit('operation-success','Imported persona characteristic: ' + pc.theName);
                  that.isLoading = false;
                })
                .catch((error) => {
                  EventBus.$emit('operation-failure',error.response.data.message);
                  that.isLoading = false;
                });
              }
              else {
                that.errors.forEach(function(msg) {
                  EventBus.$emit('operation-failure',msg);
                });
              }
            });
            that.$router.push({ name: 'home'})
          }
          else {
            that.errors.push(variableName + " is an invalid behavioural variable.  Permissable values: activities, aptitudes, attitudes, motivations, skills, intrinsic, contextual");
            return;
          }
        });
      });
    },
    postReference(dr,listId) {
      const newCard = {name: dr.theName, desc: dr.theExcerpt, due: null};
      // eslint-disable-next-line
      Trello.post('/lists/' + listId + '/cards',newCard,function() {});
    }
  },
  mounted() {
    const that = this;
    // eslint-disable-next-line
    Trello.authorize({
      type: 'popup',
      name: 'CAIRIS',
      scope: {read: 'true', write: 'true'},
      expiration: 'never',
      success: function() {
        // eslint-disable-next-line
        Trello.get('/members/me/boards',function(data){
          that.boardNames = data.map(b => ({text: b.name, value: b.id}));

          axios.get('/api/dimensions/table/persona',{
            baseURL : that.$store.state.url,
            params : {'session_id' : that.$store.state.session}
          })
          .then(response => {
            that.personaNames = response.data;
          })
          .catch((error) => {
            EventBus.$emit('operation-failure',error)
          });
        });
      },
      error: function() {
        EventBus.$emit('operation-failure','Authentication failed')
      }
    });
  }
}
</script>