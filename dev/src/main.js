import Vue from 'vue'
import Router from 'vue-router'
import app from './components/App.vue'
import { configRouter } from './config/router'
import App from './common/app.js'
import api from 'api/index'
import wxInit from 'common/wxInit'
import vueTouch from 'vue-touch'
import vueTap from 'plugins/v-tap'
import { formatMs } from 'common/filters'

Vue.use(Router)
Vue.use(vueTouch)
Vue.use(vueTap)
Vue.filter('formatMs', formatMs)
Vue.config.devtools = true

App.api = api
App.defaultView = 'index'
App.setUpParams = {}
window.App = App

const router = new Router({ hashbang: false })
configRouter(router)

App.router = router

router.start(app, '#app')
// wxInit(() => {

// })
App.hideLoading()
document.querySelector('html').style.fontSize = `${document.body.clientWidth / 375 * 16}px`
