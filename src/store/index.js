import "babel-polyfill"
import Vue from 'vue'
import Vuex from 'vuex'

import authList from './modules/authList'
import authData from './modules/authData'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authList,
    authData
  }
})
