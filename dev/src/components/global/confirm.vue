<template lang="jade">
.cp-confirm(v-if = "exist")
  .film
  .block
    .titile {{titile}}
    button.cancel(@click="notexist") 取消
    button.confirm(@click="confirm") 确认
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
      default: '确定修改小奖发放策略吗？'
    },
    toBeTrue: {
      type: String,
      default: 'drawning'
    }
  },
  methods: {
    notexist () {
      this.exist = false
      if (this.toBeTrue === 'getPrize') {
        this.$parent.owener = false
        this.$parent.getPrize = true
        // eval(be)
      }
    },
    confirm () {
      this.notexist()
      this.$dispatch(this.toBeTrue)
    }
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

<style lang="sass" scoped>
@import 'config'
.cp-confirm
  top: 0
  position: fixed
  z-index: 10002
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
  .block
    z-index: 2
    position: absolute
    left: 50%
    top: 50%
    min-height: 7.5rem
    width: 13.1875rem
    border-radius: 0.3125rem
    padding: 0.4375rem
    background-color: #fff
    text-align: center
    transform: translate(-50%, -50%)
    .titile
      min-height: 3.4375rem
      padding-top: 1rem
      padding-bottom: 1rem
      font-size: rem(16)
    button
      margin-top: r(10)
      margin-left: 1.5%
      margin-right: 1.5%
      min-width: 5.375rem
      height: 2.1875rem
      border: 0px
      border-radius: 0.3125rem
      border-radius: rem(5)
      border: 0
      color: #fff
      line-height: r(70)
      background-color: #f29c9d
    .confirm
      background-color: #04be02
      left: r(280)
  .cancel
    background-color: #aaa6a0
    left: r(50)

</style>
