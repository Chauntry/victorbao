import api from 'api/'

export const getData = ({ dispatch }, cb) => {
  api.getDefaultData().then(res => {
    // if (res.data.result === 0) App.router.go('error')
    sendTeleMemToVuex ({ dispatch },res)
    cb && cb(res)
  })
}
// export const getData = function () {
//   App.showLoading()
//   setTimeout(()=> {
//     App.hideLoading()
//     sendTeleMemToVuex (this)
//   }, 1000)
// }

export const copyPageIndex = ({ dispatch }, json) => {
  dispatch('PAGEINDEX', json)
}



export const registerState = function () {
  App.showLoading()
  setTimeout(()=> {
    App.hideLoading()
    return memberData
  }, 1000)
}

export const getBigPrize = function () {
  setTimeout(()=> {
    this.prizedata = bigPrize
  }, 500)
}

export const setTele = ({ dispatch }, array) => {
  dispatch('TELE', array)
}
export const setMem = ({ dispatch }, num) => {
  dispatch('MEM', num)
}
export const setQue = ({ dispatch }, obj) => {
  dispatch('QUE', obj)
}
// export const setstate1 = ({ dispatch }, num) => {
//   dispatch('SETSTATE1', num)
// }
// export const setstate2 = ({ dispatch }, num) => {
//   dispatch('SETSTATE2', num)
// }
// export const setdiff1 = ({ dispatch }, num) => {
//   dispatch('SETDIFFT1', num)
// }
// export const setdiff2 = ({ dispatch }, num) => {
//   dispatch('SETDIFFT2', num)
// }
// export const updateDevices = ({ dispatch }, list) => {
//   dispatch('DEVICES_UPDATE_LIST', list)
// }
// export const setcpog = ({ dispatch }, string) => {
//   dispatch('SETCPOG', string)
// }


function sendTeleMemToVuex ({ dispatch }, res) {
  let list = []
  for (let i = 0; i < res.data.data.telecasts.length; i++){
    let url = res.data.data.telecasts[i].html.split('<img class="fadein" src="')[1].split('"/>')[0]
    list.push({'url': url , reserveid : res.data.data.telecasts[i].reserveid})
  }
  dispatch('TELE', list)
  dispatch('MEM', res.data.data.member.avatar)
  dispatch('QUE', res.data.data)
}