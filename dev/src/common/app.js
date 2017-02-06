import Store from 'common/store'

export default {
  startTime: Date.now(),
  isLocalIp: /192|10|127/.test(location.host),
  isLocal: /localhost|192|10|127/.test(location.host),
  isProd: /app.intv.com|yaotv.qq.com/.test(location.hostname),
  isIos: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,

  ls: new Store(localStorage),
  ss: new Store(sessionStorage),
  log (msg) {
    if (this.isProd) return
    let time = Date.now() - this.startTime
    time = time < 1000 ? `[${time}ms]` : `[${(time / 1000).toFixed(2)}s]`
    console.log(time, msg)
  },
  hideLoading () {
    document.querySelector('#loading').style.display = 'none'
  },
  showLoading () {
    document.querySelector('#loading').style.background = 'transparent'
    document.querySelector('#loading').style.display = 'block'
  },
  pop (msg = '网络不给力，请稍后再试试吧', delay = 3000, cb = false) {
    let el = document.querySelector('#App-pop')

    if (el) {
      // update
      el.innerHTML = msg
      el.classList.remove('hide')
    } else {
      // create
      el = document.createElement('div')
      el.id = 'App-pop'
      el.innerHTML = msg
      document.body.appendChild(el)
    }

    setTimeout(() => {
      el.classList.add('hide')
      cb && cb()
    }, delay)
  },
  pop2 (msg = '网络不给力，请稍后再试试吧', delay = 3000, cb = false) {
    let el = document.querySelector('#App-pop')

    document.body.style.pointerEvents = 'none'
    if (el) {
      // update
      el.innerHTML = msg
      el.classList.remove('hide')
    } else {
      // create
      el = document.createElement('div')
      el.id = 'App-pop'
      el.innerHTML = msg
      document.body.appendChild(el)
    }

    setTimeout(() => {
      document.body.style.pointerEvents = 'auto'
      el.classList.add('hide')
      cb && cb()
    }, delay)
  },
  go (hash) {
    location.href = `${location.href.split('#')[0]}#${hash}`
  },
  share ({ title, desc, link, imgUrl, success, cancel }) {
    const successCb = function () {
      success && success()
    }
    const cancelCb = function () {
      cancel && cancel()
    }

    wx.ready(() => {
      wx.onMenuShareTimeline({ title, link, imgUrl, successCb, cancelCb })
      wx.onMenuShareAppMessage({ title, desc, link, imgUrl, successCb, cancelCb })
    })
  },
  random (start, end) {
    return Math.floor(start + Math.random() * (end - start + 1))
  },
  queryHref (key) {
    if (!location.href.split('?')[1]) return ''

    const params = location.href.split('?')[1].split('#')[0].split('&')
    const res = params.find(v => v.split('=')[0] === key)

    return res ? res.split('=')[1] : ''
  }
}

