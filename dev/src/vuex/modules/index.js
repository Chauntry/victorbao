// initial state
const state = {
  questiondata: {},
  telecasts: [],
  member: [],
}

// mutations
const mutations = {
  TELE (state, obj) {
    state.telecasts = obj
  },
  MEM (state, obj) {
    state.member = obj
  },
  QUE (state, obj) {
    state.questiondata = obj
  }
  // SETSTATE1 (state, number){
  //   state.state1 = number
  // },
  // SETSTATE2 (state, number){
  //   state.state2 = number
  // },
  // SETDIFFT1 (state, string){
  //   state.difft1 = string
  // },
  // SETDIFFT2 (state, string){
  //   state.difft2 = string
  // },
  // SETCPOG (state, string){
  //   state.currentprog = string
  // }
}

export default {
  state,
  mutations
}
