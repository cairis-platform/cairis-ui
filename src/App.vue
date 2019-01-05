<template>
  <b-container id="app" fluid>
    <div id="content">
    <b-row>
      <b-col>
        <navbar/>
      </b-col>
    </b-row> 
    <b-row>
      <b-col>
        <router-view/>
      </b-col>
    </b-row>
    </div>
    <status-footer/>
  </b-container>
</template>

<script>
import Navbar from './components/Navbar';
import StatusFooter from './components/StatusFooter';

export default {
  name: 'App',
  components: {
    Navbar,
    StatusFooter
  }
}
</script>
<style scoped>
div {
  width: 100%;
}
#app {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
 #nav {
  padding: 30px;
} 

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#content {
  padding-bottom: 30px; 
}

</style>
