<template>
  <SvgPanZoom
    style="width: 100%; height: 800px; border:1px solid black;"
    :zoomEnabled="true"
    :controlIconsEnabled="true"
    :fit="true"
    :center="true"> 
    <svg width="100%" height="800" v-html="theSvgData" v-on:click="onClick($event)"></svg> 
  </SvgPanZoom> 
</template>

<script>
  import SvgPanZoom from 'vue-svg-pan-zoom';
  import axios from 'axios';
  import EventBus from '../utils/event-bus';

  export default {
    name: 'graphical-model',
    props : {
      api : String,
      parameters : {
        type : String,
        default : ''
      }
    },
    components : {
      SvgPanZoom
    },
    data() {
      return {
        theSvgData : null
      }
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
        var url = this.$store.state.url +  this.api + "?session_id=" + this.$store.state.session
        if (this.parameters != '') {
          url += this.parameters;
        }
        axios.get(url)
        .then(response => {
          this.theSvgData = response.data;
         })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        })
      }
    },
    watch : {
      api : 'loadModel',
      parameters : 'loadModel'
    },
    mounted() {
      this.loadModel(); 
    }
  };
</script>
