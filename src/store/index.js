import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state : {
    session: 'test',
    url : 'http://192.168.161.160:7071'
  }
});
