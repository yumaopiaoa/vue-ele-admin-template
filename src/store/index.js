import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'
import permission from './modules/permission'
import user from './modules/user'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    tagsView,
  },
  getters
})

export default store
