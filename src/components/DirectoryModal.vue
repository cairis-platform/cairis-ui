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

  <b-modal ref="directoryDialog" title="Add directory entry"  @ok="onOk">
    <b-card>
      <b-table b-table striped small selectable select-mode="single" selectedVariant="primary" :fields="directoryFields" :items="items" @row-clicked="entryClicked" />
    </b-card>
  </b-modal>
</template>

<script>

  import axios from 'axios';
  import EventBus from '../utils/event-bus';

  export default {
    name : 'directory-modal',
    props : {
      dimension : String
    },
    data () {
      return {
        objt : undefined,
        items : [],
        directoryFields : [
          {key: 'theLabel', label: 'Label', sortable: true}, 
          {key: 'theName', label: 'Name', sortable: true},
          {key: 'theType', label: 'Type', sortable: true} 
        ]
      }
    },
    methods : {
      show() {
        this.$refs.directoryDialog.show();
      },
      onOk(evt) {
        if (this.objt == undefined) {
          evt.preventDefault();
          alert("Please select an entry");
        }
        else {
          this.$emit('directory-modal-update',this.objt);
          this.$refs.directoryDialog.hide();
        }
      },
      entryClicked(entry) {
        this.objt = entry;
      },
      updateDirectoryTable() {
        const dirUrl = '/api/directory/' + this.dimension + '/all';
        axios.get(dirUrl,{
          baseURL : this.$store.state.url,
          params : {'session_id' : this.$store.state.session}
         })
        .then(response => {
          this.items = response.data;
        })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        });
      }
    },
    mounted() {
      this.updateDirectoryTable();
    }
  }

</script>