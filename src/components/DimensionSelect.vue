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
    existing : function() {
      this.updateSelector();
    }
  },
  methods : {
    onChange(item) {
      this.$emit('dimension-select-change',item);
    },
    updateSelector() {
      axios.get(this.$store.state.url + "/api/dimensions/table/" + this.dimension + "?session_id=" + this.$store.state.session)
      .then(response => {
        this.items = response.data
        this.items = this.items.length > 0 ? this.items.filter((item) => {if (!this.existing.includes(item)) return item; }) : []
        if (this.items.length == 1) {
          this.$emit('dimension-select-change',this.items[0]);
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