<template lang="jade">
.cp-recommend-index
  .wrap
    .scroll(@touchstart="touchstart", @touchmove= "touchmove", @touchend= "touchend", id="roll")
      .left(:style="{transform:styleForleft , 'z-index': indexForleft * 100,'background-image': contentForleft[1], 'transition': trasnitionControl}")
      .mid(:style="{transform: styleFormid , 'z-index': indexFormid * 100,'background-image': contentFormid[1], 'transition': trasnitionControl}")
      .right(:style="{transform: styleForright, 'z-index': indexForright * 100,'background-image': contentForright[1], 'transition': trasnitionControl}")
    //- .scroll(@touchstart="touchstart", @touchmove= "touchmove", @touchend= "touchend", id="roll")
    //-   .left(:style="{transform:styleForleft , 'z-index': indexForleft, '-webkit-filter':brightForleft,'background-image': contentForleft[1], 'transition': trasnitionControl}")
    //-   .mid(:style="{transform: styleFormid , 'z-index': indexFormid, '-webkit-filter':brightFormid,'background-image': contentFormid[1], 'transition': trasnitionControl}")
    //-   .right(:style="{transform: styleForright, 'z-index': indexForright,'-webkit-filter':brightForright,'background-image': contentForright[1], 'transition': trasnitionControl}")
    scrollnav(v-if="indexOfCenter+1",:needi = "photos.length",:index="indexOfCenter + 1", :bottom = "1")
</template>

<script>
// import Api from 'src/api/'
import $ from 'jquery'
import * as actions from 'vuex/actions'
import scrollnav from 'components/global/scrollnav.vue'


export default {
  vuex: {
    getters: {
    },
    actions,

  },
  components: {
    scrollnav,
  },
  data () {
    return {
      disofmoving: 0,
      speed: 0,
      moving: false,
      styleForright: '',
      styleFormid: '',
      styleForleft: '',
      adjust: [false,false,false],
      trasnitionControl: 'transform 1s',
      rcmd: [],
      currentime: 0,
      movingDistance: 0,
      indexOf3: 1,
      indexOfCenter: 0,
      deviceList: [],
      counter: 0,
      touchX: 0,
      touchY: 0,
      objX: 0,
      touching: false,
      InitialClk: 0,
      forcemoving: false,
      x: 0,
      y: 0,
      recommendlist: this.photos,
      list : {
        prog: {
          rcmd : this.photos
        }
      },
     // this.list.prog.rcmd[this.indexOfCenter].series.poster
      lotteryTime: [
      {startTime: 1469447184182, endTime: 1469448184182},
      {startTime: 1469453184182, endTime: 1469463184182}
      ]
    }
  },
  props: {
    photos: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  methods: {

    // this part is used to adjust
    // as js complier value of deg from 360 to 0
    adjustDegPrev (){

      this.trasnitionControl = 'transform 0s'
      let numl = Number(this.styleForleft.split('rotateY(')[1].split('deg) translateZ(12.5rem) scale(0.85)')[0])
      let numm = Number(this.styleFormid.split('rotateY(')[1].split('deg) translateZ(12.5rem) scale(0.85)')[0])
      let numr = Number(this.styleForright.split('rotateY(')[1].split('deg) translateZ(12.5rem) scale(0.85)')[0])

      if (this.indexOf3 === 1)
        this.styleForleft = 'rotateY('+ (numl - 359.5 )+ 'deg) translateZ(12.5rem) scale(0.85)'
      if (this.indexOf3 === 2)
        this.styleFormid = 'rotateY('+ (numm - 359.5 )+ 'deg) translateZ(12.5rem) scale(0.85)'
      if (this.indexOf3 === 0)
        this.styleForright = 'rotateY('+ (numr - 359.5 )+ 'deg) translateZ(12.5rem) scale(0.85)'
    },
    adjustDegNext (){
      this.trasnitionControl = 'transform 0s'
      let numl = Number(this.styleForleft.split('rotateY(')[1].split('deg) translateZ(12.5rem) scale(1)')[0])
      let numm = Number(this.styleFormid.split('rotateY(')[1].split('deg) translateZ(12.5rem) scale(1)')[0])
      let numr = Number(this.styleForright.split('rotateY(')[1].split('deg) translateZ(12.5rem) scale(1)')[0])
      if (this.indexOf3 === 0)
        this.styleForleft = 'rotateY('+ (numl + 360 )+ 'deg) translateZ(12.5rem) scale(1)'
      if (this.indexOf3 === 1)
        this.styleFormid = 'rotateY('+ (numm + 360 )+ 'deg) translateZ(12.5rem) scale(1)'
      if (this.indexOf3 === 2)
        this.styleForright = 'rotateY('+ (numr + 360 )+ 'deg) translateZ(12.5rem) scale(1)'
    },
    movePrev () {

      if (!this.moving){
        this.moving = true
        this.adjustDegPrev ()
        // setTimeouthere is give time for adjust rotataY
        setTimeout(() => {
          this.trasnitionControl = 'transform 1s'
          this.indexOf3 --
          if (this.indexOf3 < 0) this.indexOf3 = 2
          this.countTransform(0)
          this.indexOfCenter --
          if (this.indexOfCenter < 0) this.indexOfCenter = this.recommendlist.length - 1
          this.moving = false
        }, 100)
      }
    },
    moveNext () {
      if (!this.moving){
        this.moving = true
        this.adjustDegNext ()
        setTimeout(() => {
          this.trasnitionControl = 'transform 1s'
          this.indexOf3 ++
          if (this.indexOf3 > 2) this.indexOf3 = 0
          this.countTransform(0)
          this.indexOfCenter ++
          if (this.indexOfCenter > this.recommendlist.length - 1) this.indexOfCenter = 0
          this.moving = false
        }, 100)
      }
    },
    allcateprogram () {
      this.indexOfCenter
    },

    touchstart (e) {
      this.touchX = e.touches[0].clientX
      this.y = e.touches[0].clientY;
      this.touching = true
      const Itime = new Date()
      this.InitialClk = Itime.getTime()
    },
    // ...
    modify () {
      // 修改数据
      this.styleForright = 'changed'
      // DOM 还没有更新
      this.$nextTick( this.moveNext ())
    },

    touchmove (e) {
      e.preventDefault()
      this.x = e.touches[0].clientX
      const Itime = new Date()
      this.counter = Itime.getTime()
      let disofmoving = parseInt(this.x)- parseInt(this.touchX)
      this.movingDistance = disofmoving
      let speed = disofmoving / (this.InitialClk - this.counter)
      let deg

      if(disofmoving>= -180 && disofmoving<= 180){
        this.trasnitionControl = 'transform 0s'
        deg = Math.asin(disofmoving / 200) * 180 / Math.PI
        this.countTransform(deg)
      }

      this.disofmoving = disofmoving
      this.speed = speed
      let top = $("#app").scrollTop()

      $("#app").scrollTop(this.y - e.touches[0].clientY + top)
      this.y = e.touches[0].clientY;


      // There is a bug for the speed moving
      // if(this.speed > 0.5){
      //   if (this.touching){
      //     self = this
      //     setTimeout(function() {self.moveNext()},100)
      //   }
      //   this.touching = false
      // }
      // if(this.speed < -0.5){
      //   if (this.touching){
      //     self = this
      //     setTimeout(function() {self.movePrev()},100)
      //   }
      //   this.touching = false
      // }

      // Let scroll move when speed up
      // while using below code, there is a unfixed bug
      // adjustmoving cannot achieve
      // the real rotataY not equal to the rotataY that adjust count.
    },
    touchend (e) {
      if (this.disofmoving < -100){
        if(this.touching)
          this.moveNext()
      }
      if (this.disofmoving > 100){
        if(this.touching)
          this.movePrev()
      }
      if (this.touching) {
        this.touching = false
        if (!this.moving){

          this.trasnitionControl = 'transform 1s'
          this.countTransform(0)
        }
      }
    },
    countTransform(deg){
      this.countStyleForleft(deg)
      this.countStyleFormid(deg)
      this.countStyleForright(deg)
    },
    countStyleForleft (deg) {
      let string = ''
      if (this.indexOf3 === 1) string = 'rotateY(' +( 285 + deg )+ 'deg) translateZ(12.5rem) scale(0.85)'
      else if (this.indexOf3 === 0) string = 'rotateY(' + deg + 'deg) translateZ(12.5rem) scale(1)'
      else string = 'rotateY('+ (75 + deg )+ 'deg) translateZ(12.5rem) scale(0.85)'
      this.styleForleft = string
    },

    countStyleFormid (deg) {
      let string = ''
      if (this.indexOf3 === 1) string = 'rotateY(' + deg + 'deg) translateZ(12.5rem) scale(1)'
      else if (this.indexOf3 === 0) string = 'rotateY('+( 75 + deg )+ 'deg) translateZ(12.5rem) scale(0.85)'
      else string = 'rotateY(' +( 285 + deg )+ 'deg) translateZ(12.5rem) scale(0.85)'
      this.styleFormid = string
    },

    countStyleForright (deg) {
      let string = ''
      if (this.indexOf3 === 1) string = 'rotateY('+( 75 + deg )+ 'deg) translateZ(12.5rem) scale(0.85)'
      else if (this.indexOf3 === 0) string = 'rotateY(' + (285 + deg) + 'deg) translateZ(12.5rem) scale(0.85)'
      else string = 'rotateY(' + deg + 'deg) translateZ(12.5rem) scale(1)'
      this.styleForright = string
    },

  },

  computed: {
    contentForleft () {
      let string = ''
      let poster = ''
      if (this.indexOf3 === 1) {
        let aheadCenter = this.indexOfCenter - 1
        if (aheadCenter < 0) aheadCenter = this.recommendlist.length - 1
        string = this.recommendlist[aheadCenter].text
        poster = this.list.prog.rcmd[aheadCenter]
      } else if (this.indexOf3 === 0) {
        string = this.recommendlist[this.indexOfCenter].text
        poster = this.list.prog.rcmd[this.indexOfCenter]
      } else {
        let beforeCenter = this.indexOfCenter + 1
        if (beforeCenter > this.recommendlist.length - 1) beforeCenter = 0
        string = this.recommendlist[beforeCenter].text
        poster = this.list.prog.rcmd[beforeCenter]
      }
      return [string, 'url(' + poster + ')']
    },

    contentFormid () {
      let string = ''
      let poster = ''
      if (this.indexOf3 === 1) {
        string = this.recommendlist[this.indexOfCenter].text
        poster = this.list.prog.rcmd[this.indexOfCenter]
      } else if (this.indexOf3 === 0) {
        let beforeCenter = this.indexOfCenter + 1
        if (beforeCenter > this.recommendlist.length - 1) beforeCenter = 0
        string = this.recommendlist[beforeCenter].text
        poster = this.list.prog.rcmd[beforeCenter]
      } else {
        let aheadCenter = this.indexOfCenter - 1
        if (aheadCenter < 0) aheadCenter = this.recommendlist.length - 1
        string = this.recommendlist[aheadCenter].text
        poster = this.list.prog.rcmd[aheadCenter]
      }
      return [string, 'url(' + poster + ')']
    },

    contentForright () {
      let string = ''
      let poster = ''
      if (this.indexOf3 === 1) {
        let beforeCenter = this.indexOfCenter + 1
        if (beforeCenter > this.recommendlist.length - 1) beforeCenter = 0
        string = this.recommendlist[beforeCenter].text
        poster = this.list.prog.rcmd[beforeCenter]
      } else if (this.indexOf3 === 0) {
        let aheadCenter = this.indexOfCenter - 1
        if (aheadCenter < 0) aheadCenter = this.recommendlist.length - 1
        string = this.recommendlist[aheadCenter].text
        poster = this.list.prog.rcmd[aheadCenter]
      } else {
        string = this.recommendlist[this.indexOfCenter].text
        poster = this.list.prog.rcmd[this.indexOfCenter]
      }
      return [string, 'url(' + poster + ')']
    },
    // =====================================================================
    indexForleft () {
      let string = ''
      if (this.indexOf3 === 1) string = '1'
      else if (this.indexOf3 === 0) string = '2'
      else string = '1'
      return string
    },

    indexFormid () {
      let string = ''
      if (this.indexOf3 === 1) string = '2'
      else if (this.indexOf3 === 0) string = '1'
      else string = '1'
      return string
    },

    indexForright () {
      let string = ''
      if (this.indexOf3 === 1) string = '1'
      else if (this.indexOf3 === 0) string = '1'
      else string = '2'
      return string
    },
    //=======================================================

    brightForleft () {
      let string = ''
      if (this.indexOf3 === 1) string = 'brightness(.3)'
      else if (this.indexOf3 === 0) string = 'brightness(1)'
      else string = 'brightness(.3)'
      return string
    },

    brightFormid () {
      let string = ''
      if (this.indexOf3 === 1) string = 'brightness(1)'
      else if (this.indexOf3 === 0) string = 'brightness(.3)'
      else string = 'brightness(.3)'
      return string
    },

    brightForright () {
      let string = ''
      if (this.indexOf3 === 1) string = 'brightness(.3)'
      else if (this.indexOf3 === 0) string = 'brightness(.3)'
      else string = 'brightness(1)'
      return string
    },
  // =================== End style count ===========================
  // ===============================================================
  },
  created () {
    this.trasnitionControl = 'transform 0s'
    this.countTransform(0)
  },
  http: {
    root: '/root'
  },
  ready () {
    $("#app").scrollTop(0);
  },
  beforeDestroy () {

  }
}
</script>

<style lang="sass" scoped>
@import "config"
.cp-recommend-index
  width: 100%
  .wrap
    position: absolute
    top: r(87)
    height: r(745)
    width: 100%
    overflow: hidden
    .scroll
      left: 10%
      position: relative
      width: r(600)
      height: r(600)
      perspective: r(3000)
      div
        position: absolute
        left: r(0)
        top: r(0)
        transition: transform 1s
        width: r(600)
        height: r(600)
        background: #fff
        border-radius: r(10)
        font-size: r(150)
        line-height: r(412)
        color: white
        background:
          repeat: no-repeat
          size: 100%
          position: r(0) r(0)
          size: r(600) r(600)


</style>
