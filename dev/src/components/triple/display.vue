<template lang="jade">
.app(@mouseover = "over")
  #Container
    .warp
    #Tiles
      .title(v-for= "i in 8", @mouseover = "displayControl.other = 1")
      .title(@mouseover = "displayControl.eye = 1")
        .eye(v-if = "1 || displayControl.eye")
          //- eye(:eye-height = "Math.round(clientWidth * 0.15)")
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
      predisplayControl: {
        eye : 0,
        other : 0
      },
      displayControl: {
        eye : 0,
        other : 0
      },
      eyecolor: '#fff',
      clientHeight: 0,
      clientWidth: 0,
      eyeHeight: 0,
      touching: null,
      mouseDownLocation: [0, 0],
      mouseCurrentLocation: [0, 0],
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
  #Container
    perspective: 30rem
    #Tiles
      width: 15.75rem
      height: 15.75rem
      position: absolute
      z-index: 10001
      left: 50%
      top: -4rem
      margin-left: -7.875rem
      transform: rotateX(75deg) rotateY(0deg) rotateZ(45deg)
      transform-style: preserve-3d
      .title
        width: 5rem
        height: 5rem
        float: left
        margin: 0 0.25rem 0.25rem 0
        cursor: pointer
        .trans
          width: 5rem
          height: 5rem
          position: absolute
          z-index: 10009
        &:before
          position: absolute
          content: ''
          width: 5rem
          height: 5rem
          background: #75A2A2
          transition: all 0.3s
          pointer-events: none
        &:hover:before
          background: #FFC600
          transform: translate3d(0,0,0.5rem)
          box-shadow: 0.75rem 0.75rem 0.75rem rgba(0,0,0,0.5)
        .eye
          animation: appear 1s
          position: absolute
          z-index: -1
          width: 5rem
          height: 5rem
          transform: rotateX(90deg) rotateY(-45deg) rotateZ(180deg) translateY(-2.5rem)
          background-color: red
</style>
