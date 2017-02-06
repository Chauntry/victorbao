import {
  baseResource,
  defaultResource,
  memberResource,
  adminResource,
  rewardResource,
  promotionResource,
  yaotvResource,
  imageResource
} from './resources'

export default {
  getDefaultData () {
    let id = App.setUpParams.id ? App.setUpParams.id : undefined
    return defaultResource.get({ uri: 'data', id })
  },
  registerMember (params = {}) {
    params.id = App.setUpParams.id
    return memberResource.post({ uri: 'register' }, params)
  },
  // gprze 得到用户list
  getShakeList (eventId) {
    return memberResource.get({ uri: 'shake', id: eventId, hideLoading: true})
  },
  getSmallPrize () {
    return memberResource.get({ uri: 'small', id: App.setUpParams.id })
  },
  checkLogin (params = {}) {
    return adminResource.post({ uri: 'login' }, params)
  },
  uploadImg (params = {}) {
    return adminResource.post({ uri: 'upload' }, params)
  },
  getCpanel () {
    return adminResource.get({ uri: 'list' })
  },
  getControlSmall (eventId) {
    return rewardResource.get({ uri: 'small', id: eventId})
  },
  getControlLarge(eventId) {
    return rewardResource.get({ uri: 'large', id: eventId})
  },
  upateComfirm(params) {
    return rewardResource.post({ uri: 'update' }, params)
  },
  // Cgprize点击立即开奖
  bigPrizeNow(params) {
    return rewardResource.post({ uri: 'rand' }, params)
  },
  // Cprize确认发奖状态
  comfirmGetPrize(eventId){
    return rewardResource.post({ uri: 'confirm' }, {id: eventId})
  },
  pauseComfirm(eventId) {
    return promotionResource.get({ uri: 'pause', id: eventId})
  },
  // Cgprize点击退出抽奖
  makeBigPrizeNormal(eventId) {
    return promotionResource.get({ uri: 'normal', id: eventId})
  },
  // Cgprize点击发奖
  getRewardBigprize(params) {
    return promotionResource.post({ uri: 'reward' }, params)
  },
  // gprize result
  getResultForBigPrize(eventId) {
    return memberResource.get({ uri: 'large', id: eventId, hideLoading: true})
  },
  //cpancel start a even
  startAEvent(eventId) {
    return promotionResource.get({uri: 'start', id: eventId})
  },
  // weichatReserve(pid) {
  //   const timeNow = new Date()
  //   let t = timeNow.getTime()
  //   let date = 0
  //   return yaotvResource.get({uri: 'getinfo4subscribe', t, tvid: 10050, date, g_tk: 2090557760, pid})
  // },
  weichatReservation(params) {
    return memberResource.post({ uri: 'reservation' }, params)
  },
  checkExange(params) {
    return memberResource.post({ uri: 'exchange'}, params)
  },
  yaoTvImage(params) {
    return imageResource.post({ uri: 'upload' }, params)
  },
  //http://yao.qq.com/cgi-bin/component/reserve/getinfo4subscribe?t=1470878945346&tvid=10050&date=0&g_tk=2090557760&pid=2642
}

