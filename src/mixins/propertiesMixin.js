/*  Licensed to the Apache Software Foundation (ASF) under one
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

    Authors: Shamal Faily */

export default {
  data() {
    return {
      propTableFields : {
        propactions : {label : ''},
        name : {label : 'Property'},
        value : {label : 'Value'},
        rationale : {label : 'Rationale'} 
      },
      selectedProperty : {}
    }
  },
  computed : {
    notNone() {
      return this.objt.theEnvironmentProperties.length > 0 ? this.objt.theEnvironmentProperties[this.envPropIndex].theProperties.filter(prop => prop.value != 'None') : [];
    }
  },
  methods : {
    defaultProperties() {
      return [
        {name : "Confidentiality",
         value : "None",
         rationale : "None"},
        {name : "Integrity",
         value : "None",
         rationale : "None"},
        {name : "Availability",
         value : "None",
         rationale : "None"},
        {name : "Accountability",
         value : "None",
         rationale : "None"},
        {name : "Anonymity",
         value : "None",
         rationale : "None"},
        {name : "Pseudonymity",
         value : "None",
         rationale : "None"},
        {name : "Unlinkability",
         value : "None",
         rationale : "None"},
        {name : "Unobservability",
         value : "None",
         rationale : "None"}
      ]
    },
    updateProperty : function(updProp) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theProperties.map(prop => { 
        if (prop.name == updProp.name) {
          prop.value = updProp.value;
          prop.rationale = updProp.rationale;
        }
      });
    },
    clearProperty(item) {
      this.objt.theEnvironmentProperties[this.envPropIndex].theProperties.map(prop => { 
        if (prop.name == item.name) {
          prop.value = 'None';
          prop.rationale = 'None';
        }
      });
    },
    viewProperty(data) {
      this.selectedProperty = JSON.parse(JSON.stringify(data));
      this.selectedProperty['update'] = true;
      this.$refs.propertyDialog.show();  
    },
    addProperty() {
      this.selectedProperty = {'name' : '','value' : '','rationale' : ''};
      this.selectedProperty['update'] = false;
      this.selectedProperty['propertyNames'] = this.objt.theEnvironmentProperties[this.envPropIndex].theProperties.filter(prop => (prop.value == 'None')).map(prop => prop.name);
      this.$refs.propertyDialog.show();  
    },
  }
}