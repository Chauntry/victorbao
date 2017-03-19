<template lang="jade">
.app
  .eye(:style="{height: eyeHeight +'px', width: eyeHeight*0.56 +'px',transform:'translate(-'+ eyeHeight/2 * 0.56+'px ,-'+ eyeHeight /2 +'px)'}")
    .eye-part1(:style = "{transform: 'rotateX(' + eyeDeg + 'deg)'}")
    .eye-part2
      .eye-wrapped(:style = "{height: eyeball + '%'}")
    .eye-part3
    .eye-part4(:style = "{transform: 'rotateX(' + eyeDeg + 'deg)'}" , v-if = "eyeDeg > 90")
</template>

<script>
import * as actions from 'vuex/actions'
import $ from 'jquery'
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
      eyecolor: '#fff',
      marilynHeight: 0,
      clientHeight: 0,
      eyeHeight: 0,
      eyeDeg: 0,
      eyeball: 100,
      cookies: [
        {id: 'eye1', location: [65, 362]},
        {id: 'eye2', location: [-28, 357]},
      ],
      touching: null,
      mouseDownLocation: [0, 0],
      mouseCurrentLocation: [0, 0],
    }
  },
  props: {
  },
  methods: {
    eyelidDown() {
      let eyeTimer = setInterval(() =>{
        if (this.eyeDeg < 180) {
          this.eyeDeg = this.eyeDeg + 1
          this.eyeball = Math.round(100 * (180 - this.eyeDeg) / 180)
        }
        else {
          clearInterval(eyeTimer)
          setTimeout (() => {this.eyelidUp()},2000)
        }
      }, 6);

      setTimeout (() => {this.eyelidDown()},6000)
    },
    eyelidUp() {
      console.log(this.eyeDeg)
      let eyeTimer = setInterval(() =>{
        if (this.eyeDeg > 0) {
          this.eyeDeg = this.eyeDeg - 1
          this.eyeball = Math.round(100 * (180 - this.eyeDeg) / 180)
        }
        else {
          clearInterval(eyeTimer)
        }
      }, 6);
    },
  },
  computed: {
  },
  route: {
  },
  created () {
  },
  ready () {
    this.eyelidDown()
    this.clientHeight = document.body.clientHeight
    this.marilynHeight = this.clientHeight * 0.6
    this.eyeHeight = this.clientHeight * 0.6
    this.eyecolor = this.$route.query.eyecolor ? this.$route.query.eyecolor : this.eyecolor
  },
  beforeDestroy () {
  }
}
</script>

<style lang="sass" scoped>
.app
  position: relative
  background-color: #184867
  .eye
    position: absolute
    top: 50%
    left: 50%
    .eye-part1
      transform-origin: 50% 97%
      position: absolute
      top: 1%
      left: 0
      z-index: 2
      width: 100%
      height: 14%
      background:
        image: url(~assets/eye-part1.svg)
        repeat: no-repeat
        size: 100%
    .eye-part2
      position: absolute
      top: 3.5%
      left: 31%
      z-index: 3
      width: 41%
      height: 22%
      .eye-wrapped
        transform: rotateX(180deg)
        position: absolute
        bottom: 0
        left: 0
        z-index: 3
        width: 100%
        height: 100%
        background:
          image: url(~assets/eye-part2.svg)
          repeat: no-repeat
          size: 100%
    .eye-part3
      position: absolute
      bottom: 0
      left: 0
      z-index: 1
      width: 100%
      height: 86%
      background:
        image: url(~assets/eye-part3.svg)
        repeat: no-repeat
        size: 100%
    .eye-part4
      transform-origin: 50% 100%
      position: absolute
      top: -8%
      left: 0
      z-index: 2
      width: 100%
      height: 22%
      background:
        image: url(~assets/eye-part4.svg)
        repeat: no-repeat
        size: 100%
</style>
