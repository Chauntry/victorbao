<template lang="jade">
.app(@mouseover = "over")
  .Container
    .Tiles
      .title(v-for= "i in 9",:style= "displayControl[i]?floatStyle: {}")
    .Tiles
      .faketitle(v-for= "i in 9")
        .item(v-if = "displayControl[i]") {{displayName[i]}}
    .transTiles
      .transtitle(v-for= "i in 9", @mouseover = "displayControl.$set(i,1)",@mouseout = "displayControl.$set(i,0)")
</template>

<script>
import * as actions from 'vuex/actions'
import $ from 'jquery'

import eye from 'components/triple/goods/eye.vue'
export default {
  vuex: {
    getters: {
      count: state => state.index.count,
    },
    actions
  },
  components: {
    eye
  },
  data() {
    return {
      displayControl: [0,0,0,0,0,0,0,0,0,0],
      displayName: ['A','B','C','D','E','F','G','H','I','J'],
      eyecolor: '#fff',
      clientHeight: 0,
      clientWidth: 0,
      eyeHeight: 0,
      touching: null,
      mouseDownLocation: [0, 0],
      mouseCurrentLocation: [0, 0],
      floatStyle: {
        'transform': 'translate3d(0,0,0.5rem)',
        'background': '#FFC600',
        'box-shadow': '0.75rem 0.75rem 0.75rem rgba(0,0,0,0.5)'
      }
    }
  },
  props: {
  },
  methods: {
    over() {
    }
  },
  computed: {
  },
  route: {
  },
  created () {
  },
  ready () {
    this.clientHeight = document.body.clientHeight
    this.clientWidth = document.body.clientWidth
    this.marilynHeight = this.clientHeight * 0.6
    this.eyeHeight = this.clientHeight * 0.6
    this.eyecolor = this.$route.query.eyecolor ? this.$route.query.eyecolor : this.eyecolor
  },
  beforeDestroy () {
  }
}
</script>

<style lang="sass" scoped>
@keyframes appear
  from
    opacity: 0
  to
    opacity: 1

.app
  position: relative
  background-color: #184867
  .Container
    perspective: 30rem
    .Tiles
      width: 15.75rem
      height: 15.75rem
      position: absolute
      z-index: 1
      left: 50%
      top: -4rem
      margin-left: -7.875rem
      transform: rotateX(75deg) rotateY(0deg) rotateZ(45deg)
      transform-style: preserve-3d
      .title
        position: relative
        width: 5rem
        height: 5rem
        float: left
        margin: 0 0.25rem 0.25rem 0
        cursor: pointer
        background: #75A2A2
        transition: all 0.3s

        // &:hover
        //   background: #FFC600
        //   transform: translate3d(0,0,0.5rem)
        //   box-shadow: 0.75rem 0.75rem 0.75rem rgba(0,0,0,0.5)
      .faketitle
        position: relative
        width: 5rem
        height: 5rem
        float: left
        margin: 0 0.25rem 0.25rem 0
        .item
          animation: appear 1s
          position: absolute
          z-index: 1
          width: 2rem
          height: 2rem
          transform: rotateX(90deg) rotateY(135deg) rotateZ(180deg) translateY(-0.5rem)
          font-size: 2rem
          text-align: center
          color: white
        // &:before
        //   position: absolute
        //   content: ''
        //   width: 5rem
        //   height: 5rem
        //   background: #75A2A2
        //   transition: all 0.3s
        //   pointer-events: none
        // &:hover:before
        //   background: #FFC600
        //   transform: translate3d(0,0,0.5rem)
        //   box-shadow: 0.75rem 0.75rem 0.75rem rgba(0,0,0,0.5)
    .transTiles
      width: 15.75rem
      height: 15.75rem
      position: absolute
      z-index: 10
      left: 50%
      top: -4rem
      margin-left: -7.875rem
      transform: rotateX(75deg) rotateY(0deg) rotateZ(45deg)
      transform-style: preserve-3d
      .transtitle
        position: relative
        width: 5rem
        height: 5rem
        float: left
        margin: 0 0.25rem 0.25rem 0
        cursor: pointer

</style>
