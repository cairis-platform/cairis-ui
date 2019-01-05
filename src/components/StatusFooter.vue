<template>
  <b-container class="footer bg-dark" fluid>
    <transition name="fade">
      <div v-if="isSuccess == 1"><font-awesome-icon icon="check" :style="{color: 'green'}" />  {{theStatusMessage}}</div>
      <div v-if="isSuccess == -1"><font-awesome-icon icon="times" :style="{color: 'red'}" />  {{theStatusMessage}}</div>
    </transition>
  </b-container>

</template>

<script>
  import EventBus from '../utils/event-bus';

  export default {
    name: 'status-footer',
    data() {
      return {
        isSuccess : 0,
        theStatusMessage : ''
      }
    },
    mounted() {
      var ref = this;
      EventBus.$on('operation-success',function(msg) {
        ref.isSuccess = 1;
        ref.theStatusMessage = msg;
        setTimeout(function() {
          ref.isSuccess = 0;
        },3000);
      });
      EventBus.$on('operation-failure',function(msg) {
        ref.isSuccess = -1;
        ref.theStatusMessage = msg;
        setTimeout(function() {
          ref.isSuccess = 0;
        },3000);
      });
    }
  };
</script>

<style>

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 5;
  width: 100%;
  background-color: black;
  text-align: right;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>