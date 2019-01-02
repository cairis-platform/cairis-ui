<template>
  <SvgPanZoom 
        style="width: 100%; height: 100%; border:1px solid black;"
        :zoomEnabled="true"
        :controlIconsEnabled="true"
        :fit="true"
        :center="true">
   <div v-html="this.svgData" v-on:click="onClick($event)"></div> 
  </SvgPanZoom>
</template>

<script>
  import SvgPanZoom from 'vue-svg-pan-zoom';
  import axios from 'axios';

  export default {
    name: 'graphical-model',
    props : {
      api : String
    },
    computed : {
      svgData() {
        return this.theSvgData == null ? '<svg><p>No data</p></svg>' : this.theSvgData;
      }
    },
    data() {
      return {
        theSvgData : null
      }
    },
    components : {
      SvgPanZoom
    },
    methods : {
      onClick(event) {
        event.preventDefault();
        var url = event.target.parentElement.href.baseVal;
        if (url != undefined) {
          this.$emit('graphical-model-url',url);
        }
      },
      loadModel() {
        axios.get(this.$store.state.url +  this.api + "?session_id=" + this.$store.state.session)
        .then(response => {
          this.theSvgData = response.data;
         })
        .catch((error) => console.log(error))
      }
    },
    watch : {
      api : 'loadModel'
    },
    mounted() {
      this.loadModel(); 
    }
  };
</script>