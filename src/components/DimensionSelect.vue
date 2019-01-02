<template>
<!--  <b-form-select :options = "filteredItems" @input="onInput($event.target.value)" @change="onChange($event.target.value)" />-->
  <b-form-select :options = "filteredItems" @input="onInput(value)" @change="onChange(value)" />
</template>


<script>

  import axios from 'axios'

  export default {
    name: 'dimension-select',
    props: {
      dimension: String,
      existing : {
        type: Array,
        default: []
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
        return this.items.length > 0 ? this.items.filter((item) => {if (!this.existing.includes(item)) return item; }) : []
      }
    },
    methods : {
      onChange(value) {
        console.log('emitting ' + value);
        this.$emit('dimension-select-change',value);
      },
      onInput(value) {
        if (this.items.length == 1) {
          this.$emit('dimension-select-change',this.items[0]);
        }
      },
      updateSelector() {
        axios.get(this.$store.state.url + "/api/dimensions/table/" + this.dimension + "?session_id=" + this.$store.state.session)
        .then(response => {
          this.items = response.data
        })
        .catch((error) => console.log(error))
      }
    },
    mounted : function() {
      this.updateSelector();
    }
  }

</script>