import axios from 'axios';

export const axiosMixin = {

  methods : {
    commitObject(updateUrl,createUrl,dimRoute) {
      if (this.commitLabel == 'Update') {
        var url = this.$store.state.url + "/api/assets/name/" + this.assetName + "?session_id=" + this.$store.state.session;
        axios.put(updateUrl,{
          session_id : this.$store.state.session,
          object : this.objt
        })
        .then(response => {
          EventBus.$emit('operation-success',this.objt.theName + ' created')
          this.$router.push({ name: dimRoute})
        })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        })
      }
      else {
        var url = this.$store.state.url + "/api/assets";
        axios.post(createUrl,{
          session_id : this.$store.state.session,
          object : this.objt
        })
        .then(response => {
          EventBus.$emit('operation-success',this.objt.theName + ' updated')
          this.$router.push({ name: dimRoute})
        })
        .catch((error) => {
          EventBus.$emit('operation-failure',error)
        })
      }
    }
  }
}