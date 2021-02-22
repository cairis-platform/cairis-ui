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

  <b-modal ref="newDbDialog" title="New Database"  @ok="onOk">
    <b-card>
      <b-container fluid>
        <b-row>
          <b-col md="12">
            <b-form-group label="Name" label-class="font-weight-bold text-md-left" label-for="theDatabaseInput">
              <b-form-input id="theDatabaseInput" v-model="theName" type="text" required />
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </b-modal>
</template>

<script>

  export default {
    name : 'new-database-modal',
    data () {
      return {
        theName : ''
      }
    },
    methods : {
      show() {
        this.$refs.newDbDialog.show();
      },
      onOk(evt) {
        const resChars = /[<>‘'`"\\:%/_*?#£$&]/ ;
        const res = this.theName.match(resChars);

        if (this.theName.length == 0) {
          evt.preventDefault();
          alert("Please enter a name");
        }
        else if (this.theName.indexOf(' ') >= 0) {
          evt.preventDefault();
          alert("Name cannot include spaces");
        }
        else if (res != null) {
          evt.preventDefault();
          alert('Character ' + res['index'] + ' in ' + this.theName + ' is a reserved character.');
        }
        else {
          this.$emit('new-database-modal-update',this.theName);
          this.$refs.newDbDialog.hide();
        }
      }
    }
  }

</script>