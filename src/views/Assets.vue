<template>
  <div class="assets">
    <b-breadcrumb :items="bcItems" />
    <b-card no-body>
    <b-table b-table striped hover :fields="assetsFields" :items="items" @row-clicked="assetClicked" >
      <template slot="HEAD_assetsactions" slot-scope="data">
        <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addAsset(data)"/> 
      </template>
      <template slot="assetsactions" slot-scope="row">
        <font-awesome-icon icon="trash" :style="{color: 'red'}" @click.stop="deleteAsset(row.index)"/>
      </template>
    </b-table>
    </b-card>
  </div>
</template>

<script>

import testData from '../../tests/testData.js'

export default {
  data() {
    return {
      bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Assets', to: {name: 'assets'}}],
      items: testData['assets'],
      assetsFields : {
        assetsactions : {label : ''},
        asset : {label : 'Asset'},
        type : {label : 'Type'}
      }
    }
  },
  methods : {
    assetClicked(row) {
      console.log(row.asset);
      this.$router.push({ path: '/asset' });
    },
    addAsset(data) {
      console.log(data);
      this.items.push({asset : 'new asset',type: 'Systems'});
    },
    deleteAsset(index) {
      this.items.splice(index,1);
    }
  }
}
</script>