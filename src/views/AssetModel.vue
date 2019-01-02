<template>
  <div class="assetmodel">
    <b-breadcrumb :items="bcItems" />
    <graphical-model />
  </div>
</template>

<script>

import GraphicalModel from '@/components/GraphicalModel.vue'

export default {
  computed : {
    bcItems() {
      return [{text: 'Home', to: {name: 'home'}},{text: 'Asset Model', to: {name: 'assetmodel'}}]
    }
  },
  components : {
    GraphicalModel
  }
}
</script>