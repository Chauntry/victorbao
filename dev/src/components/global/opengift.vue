<template lang="jade">
.cp-sorry(v-if = "exist")
  .film(v-if = "exist")
  .prize-box(:style = "animation")
    button.btn-back(v-link = "'../shakesmallprize'") 拆礼包
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
      animation: {},
    }
  },
  props: {
    exist: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    notexist () {
      this.exist = false
    },
  },
  computed: {
    animation() {
      // let obj = {}
      // if (this.exist === false) return
      // setTimeout(() => {obj = { 'top' : '0rem'}}, 1000)
      // return obj
    }
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
@import 'animations/bounceInDown'

.cp-sorry
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
  .prize-box
    animation: bounceInDown 1s
    transition: all 1s
    width: rem(244/2)
    height: rem(360/2)
    position: absolute
    z-index: 2
    left: 0
    right: 0
    bottom: 0
    top: 0rem
    margin: auto
    background:
      image: url('~assets/prize-box.png')
      size: r(244) r(238)
      repeat: no-repeat
    .btn-back
      z-index: 2
      position: relative
      bottom: 0
      margin: rem(300/2) auto 0
      width: rem(120)
      height: rem(35)
      border-radius: rem(5)
      background-color: #FEE1A4
      color: #C52028
      font-weight: bold
      font-size: rem(18)
      text-align: center
      line-height: rem(35)
      border: 0
</style>
