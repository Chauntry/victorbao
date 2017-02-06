<template lang="jade">
.cp-concern(v-if = "exist")
  .block
    .titile 是否预约该节目？
    .detail
      .photo
      .script
        h3 非诚勿扰
        p 江苏卫视
        p 09月12日 21:10播出
    button.cancel(@click="notexist") 取消
    button.confirm(@click="confirm") 预约
      .clicker(v-if = "ableToRound", v-link="'../member'")
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
    ableToRound: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    notexist () {
      this.exist = false
    },
    confirm () {
      this.notexist()
      this.$parent.moveToNext()
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
.cp-concern
  position: relative
  z-index: 1
  height: 100%
  width: 100%
  .block
    position: absolute
    top: 30%
    margin-left: 8%
    width: 84%
    height: 40%
    border: rem(1) solid black
    border-radius: rem(5)
    background-color: #eae8e5
    .titile
      width: 100%
      height: rem(50)
      border-bottom: r(2) solid #d7d4cf
      line-height: rem(50)
      padding-left: rem(10)
    .detail
      width: 100%
      height: rem(100)
      .photo
        float: left
        height: rem(65)
        width: rem(65)
        border-radius: 50%
        border: r(1) solid #d7d4cf
        margin-left: rem(20)
        margin-top: rem(15)
      .script
        font-size: r(24)
        margin-top: rem(25)
        margin-left: rem(10)
        float: left
        height: rem(80)
        width: rem(150)
        p
          margin-top: r(10)
    button
      position: absolute
      top: r(295)
      width: r(200)
      height: r(70)
      border-radius: rem(5)
      border: 0
      color: #fff
      line-height: r(70)
    .confirm
      background-color: #0fb044
      left: r(280)
      .clicker
        position: absolute
        top: r(0)
        left: r(0)
        height: 100%
        width: 100%
  .cancel
    background-color: #aaa6a0
    left: r(50)

</style>
