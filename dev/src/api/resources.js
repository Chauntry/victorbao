import Vue from 'vue'
import VueResource from 'vue-resource'
import App from 'common/app'
import { getCookie } from 'common/utils'

const host = App.isProd ? '//app.intv.com.cn/yaojs/ditui' : '//app.myintv.com.cn/yaojs/ditui'
// const host = 'http://localhost:4001'
const hostyao = '//app.intv.com.cn/yao/feature-api-image'
Vue.use(VueResource)

Vue.http.options.crossOrigin = true
Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true
Vue.http.options.timeout = 15000
Vue.http.options.cache = false
Vue.http.options.credentials = true

Vue.http.interceptors.push((request, next) => {
  if (request.params.hideLoading) {
    delete request.params.hideLoading
  } else {
    App.showLoading()
  }

  const debugOpenid = App.queryHref('openid')
  if (App.isLocal || debugOpenid) {
    const openid = 'oXH2SuBlLw1XM4hy_Wy3unBYTzuU'
    request.params.INTV_DEBUG = 1
    request.params.DEBUG_OPENID = debugOpenid || openid
  }

  if (request.url.indexOf('yaojs/ditui') > -1) request.params.version = 'v1'

  next((response) => {
    if (typeof response.data !== 'object') {
      response.data = JSON.parse(response.data)
    }

    if (response.data.meta) {
      const status = parseInt(response.data.meta.status)
      if (status === 401) {
        const loginUrl = response.data.data.loginUrl
        const url = `${loginUrl}&redirect=${encodeURIComponent(location.href)}`

        setTimeout(() => {
          location.href = url
        }, 10)
      } else if (status === 402) {
        App.go('login')
      }
    }
    App.hideLoading()
  })
})

export const resource = Vue.http
export const baseResource = Vue.resource(`${host}{/uri}`, {}, {
  post: { method: 'POST', url: `${host}{/uri}` },
})
export const defaultResource = Vue.resource(`${host}/default{/uri}`, {}, {
  post: { method: 'POST', url: `${host}/default{/uri}` },
})
// export const defaultResource = Vue.resource('http://192.168.1.101:4000/defaultdata', {}, {
//   post: { method: 'POST', url: 'http://192.168.1.101:4000/defaultdata' },
// })
export const adminResource = Vue.resource(`${host}/admin{/uri}`, {}, {
  post: { method: 'POST', url: `${host}/admin{/uri}` },
})
export const memberResource = Vue.resource(`${host}/member{/uri}`, {}, {
  post: { method: 'POST', url: `${host}/member{/uri}` },
})
export const rewardResource = Vue.resource(`${host}/reward{/uri}`, {}, {
  post: { method: 'POST', url: `${host}/reward{/uri}` },
})
export const promotionResource = Vue.resource(`${host}/promotion{/uri}`, {}, {
  post: { method: 'POST', url: `${host}/promotion{/uri}` },
})

export const imageResource = Vue.resource(`${hostyao}/image{/uri}`, {} , {
  post: { method: 'POST', url: `${hostyao}/image{/uri}` },
})

// export const yaovtResource = Vue.resouse()
// 'shaketv':'http://yaotv.qq.com/shake_tv/include/js/jsapi',
// http://yao.qq.com/cgi-bin/component/reserve/getinfo4subscribe
