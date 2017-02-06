export const getCookie = function (key) {
  let k = null
  let v = null
  const ARRcookies = document.cookie.split(';')

  for (let i = 0; i < ARRcookies.length; i++) {
    k = ARRcookies[i].substr(0, ARRcookies[i].indexOf('='))
    v = ARRcookies[i].substr(ARRcookies[i].indexOf('=') + 1)
    k = k.replace(/^\s+|\s+$/g, '')

    if (k === key) return unescape(v)
  }
}

export const getIntvOpenID = () => {
  const str = decodeURIComponent(getCookie('intvopenid'))
  return /"([^:]+)";}$/.test(str) ? RegExp.$1 : ''
}

export const sendJsonp = (url) => {
  const script = document.createElement('script')
  script.src = url
  script.type = 'text/javascript'
  script.async = true
  script.onload = () => {
    document.body.removeChild(script)
  }
  script.onerror = () => {
    document.body.removeChild(script)
  }
  document.body.appendChild(script)
}

/*
 * 转换时间进制
 * 12进制数组['下午', '06', '12'] 转成=> 24进制'18:12'
 * 24进制'03:02' 转成=> 12进制数组['上午', '03', '02']
 */
export const transTime = (time) => {
  let rs = ''
  if (time && typeof time === 'object') {
    const n = time[0]
    const h = time[1]
    const m = time[2]
    if (n.indexOf('下') > -1) {
      rs = `${parseInt(h) + 12}:${m}`
    } else {
      rs = `${h}:${m}`
    }
  } else {
    if (!time) return ['', '', '']
    const h = Number(time.split(':')[0])
    const m = time.split(':')[1]
    const d = h - 12              // >= 0 : 下午
    const am = h >= 10 ? h : `0${h}`
    const pm = d >= 10 ? d : `0${d}`
    rs = (d >= 0 ? `下午,${pm},${m}` : `上午,${am},${m}`).split(',')
  }
  return rs
}
