<template>
  <div class="attackers">
    <b-breadcrumb :items="bcItems" />
    <b-card no-body>
    <b-table b-table striped hover :fields="attackersFields" :items="items" @row-clicked="attackerClicked" >
      <template slot="HEAD_attackersactions" slot-scope="data">
        <font-awesome-icon icon="plus" :style="{color: 'green'}" @click.stop="addAttacker()"/> 
      </template>
      <template slot="attackersactions" slot-scope="row">
        <font-awesome-icon icon="trash" :style="{color: 'red'}" @click.stop="deleteAttacker(row.index)"/>
      </template>
    </b-table>
    </b-card>
  </div>
</template>

<script>

import axios from 'axios';
import EventBus from '../utils/event-bus';

export default {
  data() {
    return {
      bcItems : [{text: 'Home', to: {name: 'home'}},{text: 'Attackers', to: {name: 'attackers'}}],
      items: [],
      attackersFields : {
        attackersactions : {label : ''},
        theName : {label : 'Attacker'},
        theDescription : {label : 'Description'}
      }
    }
  },
  methods : {
    attackerClicked(row) {
      this.$router.push({ name: 'attacker', params : {attackerName: row.theName}});
    },
    addAsset() {
      this.$router.push({ name: 'attacker', params : {attackerName: 'New attacker'}});
    },
    deleteAttacker(index) {
      var attackerName = JSON.parse(JSON.stringify(this.items[index].theName));
      var url = "/api/attackers/name/" + attackerName;
      axios.delete(url,{
        baseURL : this.$store.state.url,
        params : {'session_id' : this.$store.state.session}
       })
      .then(response => {
        this.items.splice(index,1);
        EventBus.$emit('operation-success',attackerName + ' deleted')
       })
      .catch((error) => {
        EventBus.$emit('operation-failure',error)
      })
    }
  },
  mounted() {
    var url = "/api/attackers/summary";
    axios.get(url,{
      baseURL : this.$store.state.url,
      params : {'session_id' : this.$store.state.session}
     })
    .then(response => {
      this.items = response.data;
     })
    .catch((error) => console.log(error))
  }
}
</script>