<template>
  <SvgPanZoom 
        style="width: 100%; height: 100%; border:1px solid black;"
        :zoomEnabled="true"
        :controlIconsEnabled="true"
        :fit="true"
        :center="true">
    <div v-html="this.svgData"></div>
  </SvgPanZoom>
</template>

<script>
  import SvgPanZoom from 'vue-svg-pan-zoom';
  import axios from 'axios'

  export default {
    name: 'graphical-model',
    components : {
      SvgPanZoom
    },
    data() {
      return {
        svgData : ''
      }
    },
    mounted() {
      axios.get(this.$store.state.url + "/api/assets/model/environment/Psychosis/asset/all?session_id=" + this.$store.state.session)
      .then(response => {
        this.svgData = response.data;
       })
      .catch((error) => console.log(error))
    }
  };
</script>