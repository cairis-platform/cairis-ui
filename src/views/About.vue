<template>
  <b-jumbotron id="about" header="CAIRIS" :lead="theVersion" container-fluid />
</template>

<script>

import axios from 'axios';
import EventBus from '../utils/event-bus';

export default {
  data() {
    return {
      theVersion : ''
    }
  },
  mounted() {
    var url = "/api/version";
    axios.get(url,{
      baseURL : this.$store.state.url,
      params : {'session_id' : this.$store.state.session}
     })
    .then(response => {
      this.theVersion = response.data;
     })
    .catch((error) => {
      EventBus.$emit('operation-failure',error)
    })
  }
}      

</script>