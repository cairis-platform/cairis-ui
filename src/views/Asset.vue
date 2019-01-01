<template>
  <div class="asset">
    <b-breadcrumb :items="bcItems" />
    <b-form @submit="onSubmit">
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
                    <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addAssetProperty"/> 
                  </template>
                  <template slot="propactions" slot-scope="row">
                    <font-awesome-icon icon="trash" :style="{color: 'red'}" @click.stop="clearAssetProperty(row.item)"/>
                  </template>
                </b-table>
              </b-tab>
              <b-tab title="Associations">
                <b-table striped hover :items="assetAssociations" :fields="assocTableFields" @row-clicked="viewAssetAssociation">
                  <template slot="HEAD_assocactions" slot-scope="data">
                    <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addAssetAssociation"/> 
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
const testAsset = {
  theName : 'Clinical Data', 
  theType : 'Information',
  theShortCode : 'CD',
  theDescription: 'Clinical Data',
  theSignificance: 'Unanonymised and in the wrong hands, this could be very damaging.',
  isCritical: 0,
  theTags : [],
  theEnvironmentProperties : [
    {
      "theName" : "Psychosis",
      "theAssociations" : [
        {
          "theHeadNav": 0,
          "theHeadType" : "Association",
          "theHeadMultiplicity":"*",
          "theHeadRole": "",
          "theTailRole" : "",
          "theTailMultiplicity" :"*",
          "theTailNav" : 0,
          "theTailName" : "Cache"}
      ],
      "theProperties" : [
        {"name":"Confidentiality",
         "value":"High",
         "rationale":"Clinical data is partially anonymised."},
        {"name":"Integrity",
         "value":"High",
         "rationale":"Don't touch this"},
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
    },
    {
      "theName" : "Stroke",
      "theAssociations" : [
        {"theHeadNav": 0,
         "theHeadType" : "Association",
         "theHeadMultiplicity":"*",
         "theHeadRole":"",
         "theTailRole" : "",
         "theTailMultiplicity" :"*",
         "theTailNav" : 0,
         "theTailName" : "Workflow"},
        {"theHeadNav": 0,
         "theHeadType" : "Association",
         "theHeadMultiplicity":"*",
         "theHeadRole":"",
         "theTailRole" : "",
         "theTailMultiplicity" :"*",
         "theTailNav" : 0,
         "theTailName" : "Portal"},
        {"theHeadNav": 0,
         "theHeadType" : "Association",
         "theHeadMultiplicity":"*",
         "theHeadRole":"",
         "theTailRole" : "",
         "theTailMultiplicity" :"*",
         "theTailNav" : 0,
         "theTailName" : "SomeAsset"},
        {"theHeadNav": 0,
         "theHeadType" : "Association",
         "theHeadMultiplicity":"*",
         "theHeadRole":"",
         "theTailRole" : "",
         "theTailMultiplicity" :"*",
         "theTailNav" : 0,
         "theTailName" : "SomeOtherAsset"}
      ],
      "theProperties" : [
        {"name":"Confidentiality",
         "value":"Low",
         "rationale":"Clinical data is fully anonymised."},
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
  ]
}

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
  data() {
    return {
      envPropIndex : 0,
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
      alert(JSON.stringify(this.objt));
    },
    addAssetProperty(evt) {
      evt.preventDefault();
      alert('Adding asset property');
    },
    addAssetAssociation(evt) {
      evt.preventDefault();
      alert('Adding asset association');
    },
    deleteAssetAssociation(index) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theAssociations.splice(index,1);
    },
    viewAssetAssociation(item) {
      alert(JSON.stringify(item));
    },
    viewAssetProperty(item) {
      alert(JSON.stringify(item));
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
      alert('Add environment');
    },
  }
}
</script>
<style>
</style>