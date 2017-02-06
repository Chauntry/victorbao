<template lang="jade">
.cp-toast(v-if = "exist")
  .film(v-if = "false")
  .titile {{titile}}
  slot
</template>

<script>
import * as actions from 'vuex/actions'

export default {
  vuex: {
    getters: {
      count: state => state.index.count,
    },
    actions
  },
  components: {

  },
  data() {
    return {
    }
  },
  props: {
    exist: {
      type: Boolean,
      default: true
    },
    titile: {
      type: String,
      default: '参数错误'
    },
  },
  methods: {
    notexist () {
      this.exist = false
    },
  },

  computed: {
  },
  route: {

  },
  created () {

  },
  ready () {
  },
  beforeDestroy () {

  }
}
</script>

<style lang="sass">
@import 'config'
.cp-toast
  top: 0
  position: fixed
  z-index: 1
  height: 100%
  width: 100%
  .film
    height: 100%
    width: 100%
    background-color: black
    position: absolute
    top: 0
    right: 0
    opacity: 0.5
    z-index: 1
  .titile
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    z-index: 2
    width: rem(250)
    text-align: center
    color: #fff
    font-size: rem(15)
    font-weight: 700
    background-color: rgba(0,0,0,.6)
    border-radius: rem(5)
    padding: .6rem 1rem
</style>
