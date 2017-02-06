<template lang="jade">
.cp-chef(v-if = "exist")
  .film(v-if = "exist")
  .photo
  .textCircle {{text}}
  botton.Try(@click = "notexist") Try it again
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
    text: {
      type: String,
      default: "I don't known this instruction"
    }
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

<style lang="sass" scoped>
@import 'config'
.cp-chef
  height: 100%
  width: 100%
  overflow: hidden
  position: fixed
  z-index: 1001
  .film
    height: 100%
    width: 100%
    background-color: black
    position: fixed
    top: 0
    right: 0
    opacity: 0.5
    z-index: 10
  .photo
    height: 300px
    width: 600px
    z-index: 110
    bottom: -50px
    right: 50px
    position: fixed
    background:
      image: url('~assets/cookie/chef.png')
      repeat: no-repeat
      size: 100% 100%
  .textCircle
    overflow: hidden
    z-index: 110
    position: fixed
    width: 700px
    height: 200px
    border-radius: 50%
    right: 500px
    bottom: 100px
    background-color: #f7f4f4
    text-align: center
    line-height: 150px
    font-size: 25px
  .Try
    overflow: hidden
    z-index: 110
    position: fixed
    width: 700px
    height: 200px
    right: 500px
    bottom: 50px
    text-align: center
    line-height: 200px
    font-size: 25px
</style>
