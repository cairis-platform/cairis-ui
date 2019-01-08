<template>
  <div class="attacker">
    <b-breadcrumb :items="bcItems" /> 
    <dimension-modal ref="environmentDialog" dimension="environment" :existing="environmentNames" v-on:dimension-modal-update="addAttackerEnvironmentProperty"/> 
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <b-form>
      <b-container fluid>
      <b-card no body>
        <b-row v-align="start">
          <b-col md=2>
            <b-img :src="attackerImage" fluid-grow /> 
          </b-col>
          <b-col md=10>
            <b-container fluid>
              <b-form-group label="Attacker" label-class="text-md-left" label-cols="2" horizontal label-for="theAttackerInput">
                <b-form-input id="theAttackerInput" v-model="objt.theName" type="text" required>
                </b-form-input>
              </b-form-group>
              <b-form-group label="Tags" label-class="text-md-left" label-cols="2" horizontal label-for="theTagsInput">
                <b-form-input id="theTagsInput" v-model="objt.theTags" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Description" label-class="text-md-left" label-cols="2" horizontal label-for="theDescription">
                <b-form-textarea id="theDescriptionInput" v-model="objt.theDescription" type="text" :rows=5 :max-rows=7 required>
                </b-form-textarea>
              </b-form-group>
            </b-container>
          </b-col>
        </b-row>
        <b-row>
          <b-container fluid>
            <b-card header="Environments" no-body class="text-left">
              <template slot="header">
                <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addEnvironment"/> Environment
              </template> 
              <b-row class="jusfify-content-md-left" align-content>
                <b-col sm="12">
                  <b-tabs v-model="envPropIndex">
                    <b-tab v-for="envProp in objt.theEnvironmentProperties" :key="envProp.theEnvironmentName" :title=envProp.theName>
                      <template slot="title">
                        <font-awesome-icon icon="trash" :style="{color: 'red'}" @click="deleteEnvironment(envProp.theEnvironmentName)"/>  {{envProp.theEnvironmentName}}
                      </template> 
                    </b-tab>
                  </b-tabs>
                </b-col>
              </b-row>
              <b-row class="justify-content-md-left" v-show="this.objt.theEnvironmentProperties.length">
                <b-col sm="12">
                  <b-tabs>
                    <b-tab title="Role" active>
                    </b-tab>
                    <b-tab title="Motivation">
                    </b-tab>
                    <b-tab title="Capabilities">
                    </b-tab>
                  </b-tabs>
                </b-col>
              </b-row>
            </b-card>
          </b-container>
        </b-row>
      </b-card>
      </b-container>
      <b-container fluid>
        <b-form-row>
          <b-col md="4" offset-md="5" >
            <b-button type="submit" variant="primary" @click="onCommit">{{commitLabel}}</b-button>
            <b-button type="submit" variant="secondary" @click="onCancel">Cancel</b-button>
          </b-col>
        </b-form-row>
      </b-container> 
    </b-form>
  </div>
</template>


<script>

import DimensionModal from '@/components/DimensionModal.vue'
import axios from 'axios';
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
    },
    attackerImage() {
      return this.objt.theImage != '' ? this.$store.state.url + '/images/' + this.objt.theImage : this.$store.state.url + '/assets/default-avatar.png'
    }
  },
  components : {
    DimensionModal
  },
  data() {
    return {
      errors : [],
      envPropIndex : 0,
      commitLabel : 'Create',
      objt : {
        theName : '',
        theTags : [],
        theDescription : '',
        theImage : '',
        theEnvironmentProperties : []
      }
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
    onCommit(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'attackers'})
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'attackers'})
    },
    addAttackerEnvironmentProperty : function(envName) {
      this.addEnvironmentProperty({
        theEnvironmentName : envName,
        theRoles : [],
        theMotives : [],
        theCapabilities : []
      });
    }

  }

}
</script>