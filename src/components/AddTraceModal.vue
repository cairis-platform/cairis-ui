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

  <b-modal ref="traceDialog" :title="this.dialogTitle"  @ok="onOk">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p> 
    <b-card>
      <b-container fluid>
        <b-row>
          <b-col md="6">
            <b-table v-if="theDimensions.length > 0" striped selectable select-mode="single" selectedVariant="primary" small bordered :fields="dimTableFields" :items="dimensions" @row-clicked="dimensionClicked" />
          </b-col>
          <b-col md="6">
            <b-table v-if="theObjects.length > 0" striped selectable select-mode="single" selectedVariant="primary" small bordered :fields="objtTableFields" :items="objects" @row-clicked="objectClicked" />
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </b-modal> 
</template>

<script>

import axios from 'axios';
import EventBus from '../utils/event-bus';

export default {
  name : 'add-trace-modal',
  props : {
    dimension : String,
    tobject : String,
    isFrom : Number
  },
  watch : {
    tobject : 'updateDimensionTable'
  },
  data () {
    return {
      errors : [],
      theDimensions : [],
      theObjects : [],
      theTargetDimension : '',
      theTargetObject : '',
      dimTableFields : {
        name : {label : 'Dimension', sortable : true}
      },
      objtTableFields : {
        name : {label : 'Object', sortable : true}
      }
    }
  },
  computed : {
    dialogTitle() {
      return 'Add ' + (this.isFrom ? "Contribution" : "Source") + " Traceability Link";
    },
    dimensions() {
      return this.theDimensions.length > 0 ? this.theDimensions.map(d => ({name : d})) : [];
    },
    objects() {
      return this.theObjects.length > 0 ? this.theObjects.map(o => ({name : o})) : [];
    }
  },
  methods : {
    checkForm() {
      this.errors = []
      if (this.theTargetDimension.length == 0) {
        this.errors.push('Dimension is required');
      }
      if (this.theTargetObject.length == 0) {
        this.errors.push('Object is required');
      }
      if (!this.errors.length) {
        return true;
      }
      else {
        return false;
      }
    },
    show() {
      this.$refs.traceDialog.show();
    },
    onOk(evt) {
      if (!this.checkForm()) {
        evt.preventDefault();
      }
      else {
        this.addTraceLink();
      }
    },
    updateDimensionTable() {
      const dimUrl = '/api/traces/dimensions/' + this.dimension + '/is_from/' + this.isFrom;
      axios.get(dimUrl,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
       })
      .then(response => {
        this.theDimensions = response.data;
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });
    },
    updateObjectTable() {
      const objtUrl = '/api/dimensions/table/' + this.theTargetDimension;
      axios.get(objtUrl,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
       })
      .then(response => {
        this.theObjects = response.data;
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });
    },
    addTraceLink() {
      const traceObjt = this.isFrom == 1 ? {theFromObject : this.dimension, theFromName : this.tobject, theToObject : this.theTargetDimension, theToName : this.theTargetObject} : {theFromObject : this.theTargetDimension, theFromName : this.theTargetObject, theToObject : this.dimension, theToName : this.tobject};
      axios.post(this.$store.state.url + '/api/traces',{
        session_id : this.$store.state.session,
        object : traceObjt
      })
      .then(response => {
        EventBus.$emit('operation-success',response.data.message)
        this.$refs.traceDialog.hide();
      })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      });
    },
    dimensionClicked(dimRow) {
      this.theTargetDimension = dimRow.name;
      this.updateObjectTable();
    },
    objectClicked(objtRow) {
      this.theTargetObject = objtRow.name;
    }
  },
  mounted() {
    this.updateDimensionTable();
  }
}
</script>