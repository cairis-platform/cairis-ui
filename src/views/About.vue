<template>
  <b-jumbotron id="about" header="CAIRIS" :lead="theVersion" container-fluid />
</template>

<script>

import axios from 'axios';

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
    .catch((error) => console.log(error))
  }
}      

</script>