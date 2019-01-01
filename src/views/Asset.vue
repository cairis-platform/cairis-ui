<template>
  <div class="asset">
    <b-breadcrumb :items="bcItems" />
    <property-modal ref="assetPropertyDialog" :securityProperty="selectedProperty" v-on:property-update="updateAssetProperty"/> 
    <b-form @submit="onSubmit" v-on:property-update="updateAssetProperty">
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
              <b-form-textarea v-model="objt.theDescription" type="text" :rows=2 :max-rows=4 required>
              </b-form-textarea>
            </b-card>
          </b-tab>
          <b-tab title="Criticality">
            <b-card bg-variant="light">
            </b-card>
          </b-tab>
          <b-tab title="Interfaces">
            <b-card bg-variant="light">
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
                  <b-tab v-for="envProp in objt.theEnvironmentProperties" :key="envProp.theName" :title=envProp.theName>
                    <template slot="title">
                      <font-awesome-icon icon="trash" :style="{color: 'red'}" @click="deleteEnvironment"/>  {{envProp.theName}}
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
      <div>
        <b-button type="submit" variant="primary">Submit</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>

 import PropertyModal from '@/components/PropertyModal.vue'
import testAsset from '../../tests/testAsset.js'

export default {
  computed : {
    notNone() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theProperties.filter(prop => prop.value != 'None') : [];
    },
    environmentNames() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties.map(prop => prop.theName) : [];
    },
    bcItems() {
      return [{text: 'Home', to: {name: 'home'}},{text: 'Assets', to: {name: 'assets'}},{text: this.objt.theName, to : {name: 'asset'}}]
    },
    assetAssociations() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theAssociations : [] ;
    }
  },
  components : {
    PropertyModal
  },
  data() {
    return {
      envPropIndex : 0,
      pmShow : false,
      selectedProperty : {},
      assetTypes: ['Hardware','Information','People','System'],
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
      objt: testAsset
    }
  }, 
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      console.log(evt);
      console.log("Submitting " + JSON.stringify(this.objt));
    },
    addAssetProperty(data) {
      console.log(data);
    },
    addAssetAssociation(data) {
      console.log(data);
    },
    deleteAssetAssociation(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theAssociations.splice(index,1);
    },
    viewAssetAssociation(data) {
      console.log(JSON.stringify(data));
    },
    viewAssetProperty(data) {
      this.selectedProperty = JSON.parse(JSON.stringify(data));
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
    deleteEnvironment() {
      this.objt.theEnvironmentProperties.splice(this.envPropIndex,1);
    },
    addEnvironment(evt) {
      console.log(evt);
      console.log('Add environment');
    },
    updateAssetProperty : function(updProp) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theProperties.map(prop => { 
        if (prop.name == updProp.name) {
          prop.value = updProp.value;
          prop.rationale = updProp.rationale;
        }
      });
    }
  }
}
</script>