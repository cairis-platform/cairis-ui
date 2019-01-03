<template>
  <b-form-select v-model="selected" :options = "filteredItems" @change="onChange($event)" />
</template>


<script>

import axios from 'axios'

export default {
  name: 'dimension-select',
  props: {
    dimension: String,
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
    all : {
      type: Boolean,
      default : function() {
        return false
      }
    } 
  },
  data () {
    return {
      items : [],
      selected : ''
    }
  },
  computed : {
    filteredItems() {
      return this.items.length > 0 ? this.items.filter((item) => {if (!this.existing.includes(item)) return item; }) : [];
    }
  },
  watch : {
    existing : 'updateSelector',
    environment : 'updateSelector'
  },
  methods : {
    onChange(item) {
      this.$emit('dimension-select-change',item);
    },
    updateSelector() {
      var url = this.$store.state.url + "/api/dimensions/table/" + this.dimension
      if (this.environment != '') {
        url += '/environment/' + this.environment;
      }
      url += "?session_id=" + this.$store.state.session;
      var ref = this;
      axios.get(url)
      .then(response => {
        ref.items = response.data
        ref.items = ref.items.length > 0 ? ref.items.filter((item) => {if (!ref.existing.includes(item)) return item; }) : []
        if (ref.items.length == 1) {
          ref.$emit('dimension-select-change',ref.items[0]);
        } 
        if (ref.all) {
          ref.items.unshift('all')
        }
      })
      .catch((error) => console.log(error))
    }
  },
  mounted : function() {
    this.updateSelector();
  }
}

</script>