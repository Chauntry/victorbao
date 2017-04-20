import Vue from 'vue'
import Vuex from 'Vuex'
import middlewares from './middlewares'
import index from './modules/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    index,
    pageIndex: {}
  },
  middlewares
})
