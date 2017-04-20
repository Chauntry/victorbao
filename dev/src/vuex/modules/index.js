// initial state
const state = {
  pageIndex: {},
  questiondata: {},
  telecasts: [],
  member: [],
}

// mutations
const mutations = {
  PAGEINDEX (state, obj) {
    state.pageIndex = obj
  },
  TELE (state, obj) {
    state.telecasts = obj
  },
  MEM (state, obj) {
    state.member = obj
  },
  QUE (state, obj) {
    state.questiondata = obj
  }
}

export default {
  state,
  mutations
}
