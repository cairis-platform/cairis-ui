<template>
  <div class="asset">
    <b-breadcrumb :items="bcItems" /> 
    <property-modal ref="assetPropertyDialog" :securityProperty="selectedProperty" v-on:property-update="updateAssetProperty"/> 
    <dimension-modal ref="environmentDialog" dimension="environment" :existing="environmentNames" v-on:dimension-modal-update="addEnvironmentProperty"/> 
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <b-form v-on:property-update="updateAssetProperty">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Summary" active>
            <b-card bg-variant="light">
              <b-form-group label="Assets" label-class="text-md-left" label-cols="1" horizontal label-for="theAssetInput">
                <b-form-input id="theAssetInput" v-model="objt.theName" type="text" required>
                </b-form-input>
              </b-form-group>
              <b-form-group label="Tags" label-class="text-md-left" label-cols="1" horizontal label-for="theTagsInput">
                <b-form-input id="theTagsInput" v-model="objt.theTags" type="text">
                </b-form-input>
              </b-form-group>
              <b-form-group label="Shortcode" label-class="text-md-left" label-cols="1" horizontal label-for="theShortCodeInput">
                <b-form-input id="theShortCodeInput" v-model="objt.theShortCode" type="text" required>
                </b-form-input>
              </b-form-group>
              <b-form-group label="Type" label-class="text-md-left" label-cols="1" horizontal label-for="theTypeInput">
                <b-form-select id="theTypeInput" v-model="objt.theType" :options="assetTypes" class="mb-3" required>
                </b-form-select>
              </b-form-group>
            </b-card> 
          </b-tab>
          <b-tab title="Description">
            <b-card bg-variant="light">
              <b-form-textarea v-model="objt.theDescription" type="text" :rows=2 :max-rows=4 required>
              </b-form-textarea>
            </b-card>
          </b-tab>
          <b-tab title="Significance">
            <b-card bg-variant="light">
              <b-form-textarea v-model="objt.theSignificance" type="text" :rows=2 :max-rows=4 required>
              </b-form-textarea>
            </b-card>
          </b-tab>
          <b-tab title="Criticality">
            <b-card bg-variant="light">
              <b-container>
                <b-row>
                  <b-col sm="2">
                    <b-form-checkbox v-model="objt.isCritical" >Critical Asset</b-form-checkbox>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-textarea v-model="objt.theCriticalRationale" type="text" :rows=2 :max-rows=4 v-if="objt.isCritical">
                    </b-form-textarea>
                  </b-col>
                </b-row>
              </b-container>
            </b-card>
          </b-tab>
          <b-tab title="Interfaces">
            <b-card bg-variant="light">
              <b-table striped hover :items="objt.theInterfaces" :fields=interfaceTableFields @row-clicked="viewInterface">
                <template slot="HEAD_intactions" slot-scope="data"> 
                  <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addInterface(data)"/> 
                </template>
                <template slot="intactions" slot-scope="row">
                  <font-awesome-icon icon="trash" :style="{color: 'red'}" @click.stop="deleteInterface(row.item)"/>
                </template>
              </b-table>
            </b-card>
          </b-tab>
        </b-tabs>
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
                <b-tabs >
                  <b-tab title="Definition" active>
                    <b-table striped hover :items="notNone" :fields=propTableFields @row-clicked="viewAssetProperty">
                      <template slot="HEAD_propactions" slot-scope="data"> 
                        <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addAssetProperty(data)"/> 
                      </template>
                      <template slot="propactions" slot-scope="row">
                        <font-awesome-icon icon="trash" :style="{color: 'red'}" @click.stop="clearAssetProperty(row.item)"/>
                      </template>
                    </b-table>
                  </b-tab>
                  <b-tab title="Associations">
                    <b-table striped hover :items="assetAssociations" :fields="assocTableFields" @row-clicked="viewAssetAssociation">
                     <template slot="HEAD_assocactions" slot-scope="data">
                        <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addAssetAssociation(data)"/> 
                      </template>
                      <template slot="assocactions" slot-scope="row">
                        <font-awesome-icon icon="trash" :style="{color: 'red'}" @click.stop="deleteAssetAssociation(row.index)"/>
                      </template>
                    </b-table>
                  </b-tab>
                </b-tabs>
              </b-col>
            </b-row>
          </b-card>
        </b-container>
      </b-card>
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

import PropertyModal from '@/components/PropertyModal.vue'
import DimensionModal from '@/components/DimensionModal.vue'
import axios from 'axios';
import store from '../store'
import EventBus from '../utils/event-bus';

export default {
  props : {
    assetName : String
  },
  computed : {
    notNone() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theProperties.filter(prop => prop.value != 'None') : [];
    },
    environmentNames() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.map(prop => prop.theEnvironmentName) : [];
    },
    bcItems() {
      return [{text: 'Home', to: {name: 'home'}},{text: 'Assets', to: {name: 'assets'}},{text: this.objt.theName, to : {name: 'asset'}}]
    },
    assetAssociations() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theAssociations : [] ;
    },
    unusedProperties() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theProperties.filter(prop => (prop.value == 'None')).map(prop => prop.name) : [];
    }
  },
  components : {
    PropertyModal,
    DimensionModal
  },
  data() {
    return {
      errors : [],
      envPropIndex : 0,
      commitLabel : 'Create',
      selectedProperty : {},
      assetTypes: ['Hardware','Information','People','Systems'],
      envFields : {
        envactions : {label : ''},
        theName : {label : 'Environment'}
      },
      propTableFields : {
        propactions : {label : ''},
        name : {label : 'Property'},
        value : {label : 'Value'},
        rationale : {label : 'Rationale'} 
      },
      interfaceTableFields : {
        intactions : {label : ''},
        theInterfaceName : {label : 'Interface'},
        theInterfaceType : {label : 'Type'},
        theAccessRight : {label : 'Access Right'},
        thePrivilege : {label : 'Privilege'} 
      },
      assocTableFields : [
        {key: 'assocactions', label: ''},
        {key: 'theHeadNav', label: 'Nav'},
        {key: 'theHeadType',label: 'Type'},
        {key: 'theHeadMultiplicity', label: 'Nry'},
        {key: 'theHeadRole', label: 'Role'},
        {key: 'theTailRole', label: 'Tail Role'},
        {key: 'theTailMultiplicity', label: 'Tail Nry'},
        {key: 'theTailNav', label: 'Tail Nav'},
        {key: 'theTailName', label: 'Tail Asset'}
      ],
      objt : {
        theName : '',
        theTags : '',
        theShortCode : '',
        theType : '',
        theDescription : '',
        theSignificance : '',
        isCritical : 0,
        theCriticalRationale : '',
        theInterfaces : [],
        theEnvironmentProperties : []}
    }
  }, 
  beforeRouteEnter (to, from, next) {
    if (to.params.assetName == 'New asset') {
      next();
    }
    else {
      var url = "/api/assets/name/" + to.params.assetName
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
  methods: {
    setData(objt) {
      this.objt = objt;
    },
    onCancel(evt) {
      evt.preventDefault();
      this.$router.push({ name: 'assets'})
    },
    checkForm() {
      this.errors = []
      if (this.objt.theName.length == 0) {
        this.errors.push('Asset name is required');
      }
      if (this.objt.theShortCode.length == 0) {
        this.errors.push('Short code is required');
      }
      if (this.objt.theType.length == 0) {
        this.errors.push('Asset type is required');
      }
      if (this.objt.theDescription.length == 0) {
        this.errors.push('Description is required');
      }
      if (this.objt.theSignificance.length == 0) {
        this.errors.push('Significance is required');
      }
      if (this.objt.theEnvironmentProperties.length == 0) {
        this.errors.push('No environment properties have been defined')
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    },
    commitAsset() {
      if (this.commitLabel == 'Update') {
        var url = this.$store.state.url + "/api/assets/name/" + this.assetName + "?session_id=" + this.$store.state.session;
        axios.put(url,{
          session_id : this.$store.state.session,
          object : this.objt
        })
        .then(response => {
          EventBus.$emit('operation-success',this.objt.theName + ' created')
          this.$router.push({ name: 'assets'})
        })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        })
      }
      else {
        var url = this.$store.state.url + "/api/assets";
        axios.post(url,{
          session_id : this.$store.state.session,
          object : this.objt
        })
        .then(response => {
          EventBus.$emit('operation-success',this.objt.theName + ' updated')
          this.$router.push({ name: 'assets'})
        })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        })
      }
    },
    onCommit(evt) {
      evt.preventDefault();
      if (this.checkForm()) {
        this.commitAsset();
      }
    },
    addAssetProperty(data) {
      this.selectedProperty = {'name' : '','value' : '','rationale' : ''};
      this.selectedProperty['update'] = false;
      this.selectedProperty['propertyNames'] = this.objt.theEnvironmentProperties[this.envPropIndex].theProperties.filter(prop => (prop.value == 'None')).map(prop => prop.name);
      this.$refs.assetPropertyDialog.show();  
      console.log(data);
    },
    addAssetAssociation(data) {
      console.log(data);
    },
    deleteAssetAssociation(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theAssociations.splice(index,1);
    },
    addInterface(data) {
      console.log(data);
    },
    deleteInterface(index) {
      this.objt.theInterfaces.splice(index,1);
    },
    viewInterface(data) {
      console.log(data);
    },
    viewAssetAssociation(data) {
      console.log(JSON.stringify(data));
    },
    viewAssetProperty(data) {
      this.selectedProperty = JSON.parse(JSON.stringify(data));
      this.selectedProperty['update'] = true;
      this.$refs.assetPropertyDialog.show();  
    },
    clearAssetProperty(item) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theProperties.map(prop => { 
        if (prop.name == item.name) {
          prop.value = 'None';
          prop.rationale = 'None';
        }
      });
    },
    deleteEnvironment(envName) {
      this.objt.theEnvironmentProperties = this.objt.theEnvironmentProperties.filter(envProp => envProp.theName != envName);
    },
    addEnvironment(evt) {
      evt.preventDefault();
      this.$refs.environmentDialog.show();  
    },
    updateAssetProperty : function(updProp) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theProperties.map(prop => { 
        if (prop.name == updProp.name) {
          prop.value = updProp.value;
          prop.rationale = updProp.rationale;
        }
      });
    },
    addEnvironmentProperty : function(envName) {
      var defaultEnvProp = {
        'theEnvironmentName' : envName,
        'theAssociations' : [],
        'theProperties' : [
          {"name":"Confidentiality",
           "value":"None",
           "rationale":"None"},
          {"name":"Integrity",
           "value":"None",
           "rationale":"None"},
          {"name":"Availability",
           "value":"None",
           "rationale":"None"},
          {"name":"Accountability",
           "value":"None",
           "rationale":"None"},
          {"name":"Anonymity",
           "value":"None",
           "rationale":"None"},
          {"name":"Pseudonymity",
           "value":"None",
           "rationale":"None"},
          {"name":"Unlinkability",
           "value":"None",
           "rationale":"None"},
          {"name":"Unobservability",
           "value":"None",
           "rationale":"None"}
        ]
      }
      this.objt.theEnvironmentProperties.push(defaultEnvProp);
      this.envProp = this.objt.theEnvironmentProperties.length;
    }
  }
}
</script>