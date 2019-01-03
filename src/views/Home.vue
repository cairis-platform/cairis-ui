<template>
  <div class="home">
    <b-breadcrumb :items="bcItems" />
    <ModelSummary />
  </div>
</template>

<script>
// @ is an alias to /src
import ModelSummary from '@/components/ModelSummary.vue'

export default {
  components: {
    ModelSummary
  },
  data() {
    return {
      bcItems : [{text: 'Home', to: {name: 'home'}}]
    }
  }
}
</script>

<style>
</style>