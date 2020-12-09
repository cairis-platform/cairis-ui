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

  <b-form-select ref="dimensionSelect" id="dimensionSelect" :disabled="is_disabled" v-model="selected" :size="display_size" :options = "filteredItems" @change="onChange($event)" />
</template>


<script>

import axios from 'axios'
import EventBus from '../utils/event-bus';

export default {
  name: 'dimension-select',
  props: {
    dimension: {
      type: String
    },
    dimensionUrl : {
      type: String,
      default : function() {
        return ''
      }
    },
    existing : {
      type: Array,
      default: function() {
        return []
      }
    },
    environment : {
      type: String,
      default : function() {
        return ''
      }
    },
    includeall : {
      type: Boolean,
      default : function() {
        return false
      }
    },
    initial : {
      type: String,
      default : function() {
        return ''
      }
    },
    add_initial : {
      type: Boolean,
      default : function() {
        return false;
      }
    },
    display_size : {
      type: String,
      default : function() {
        return 'md'
      }
    },
    is_disabled : {
      type: Boolean,
      default : function () {
        return false;
      }
    }
  },
  data () {
    return {
      items : [],
      selected : this.initial
    }
  },
  computed : {
    filteredItems() {
      return this.items.length > 0 ? this.items.filter((item) => {if (!this.existing.includes(item)) return item; }) : [];
    }
  },
  watch : {
    dimension: 'updateSelector',
    dimensionUrl : 'updateSelector',
    existing : 'updateSelector',
    environment : 'updateSelector',
    initial: 'updateSelector'
  },
  methods : {
    onChange(item) {
      this.$emit('dimension-select-change',item);
    },
    updateSelector() {
      if ((this.dimension == undefined && this.dimensionUrl == "") || (this.$store.state.session == '')) {
        return;
      }
      else {
        let url = this.dimensionUrl;
        if (this.dimensionUrl.length == 0) {
          url = "/api/dimensions/table/" + this.dimension
          if (this.environment != '') {
            url += '/environment/' + this.environment;
          }
        }
        let ref = this;
        axios.get(url,{
          baseURL : this.$store.state.url,
          params : {'session_id' : this.$store.state.session}
        })
        .then(response => {
          ref.items = response.data
          ref.items = ref.items.length > 0 ? ref.items.filter((item) => {if (!ref.existing.includes(item)) return item; }) : []
          if (ref.items.length == 1 && !ref.includeall) {
            ref.$emit('dimension-select-change',ref.items[0]);
          } 
          if (ref.includeall) {
            if (ref.dimension == 'persona_characteristic') {
              ref.items.unshift('All')
            }
            else {
              ref.items.unshift('all')
            }
          }
          if (ref.initial != '') {
            ref.selected = ref.initial;
            if (ref.add_initial) {
              ref.items.push(ref.initial);
              ref.items.sort();
            }
            this.$emit('dimension-items-updated',ref.selected);
          }
          else {
            if (ref.items.length > 0) {
              ref.selected = ref.items[0];
              this.$emit('dimension-items-updated',ref.selected);
            }
            else {
              this.$emit('dimension-items-updated','');
            }
          }
        })
        .catch((error) => {
          EventBus.$emit('operation-failure','Error updating selector:' + error)
        });
      }
    }
  },
  mounted : function() {
    if (this.dimension != undefined || this.dimensionUrl != "") {
      this.updateSelector();
    }
  }
}

</script>