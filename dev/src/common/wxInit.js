import { resource } from 'api/resources'
import jsApiList from 'config/wxApiList'

export default function (cb) {
  resource.get('//app.intv.com.cn/yao/feature-api-wechat/index/js-sign').then(res => {
    if (!res.ok) return

    const data = res.data

    wx.config({
      signatured: data.signatured,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      jsApiList: data.jsApiList,
      appId: data.appId,
      debug: false
    })

    cb && cb()
  })
}
