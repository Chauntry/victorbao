<template lang="jade">
.app
  .cookie(v-if= "clientHeight", v-for = "cookie in cookies",:id ="cookie.id", :style="stylecookie(cookie.l,cookie.t,cookie.h,cookie.w)")

  .box(:style = "boxStyle", @click = "drop")
  .bowl(:style = "bowlStyle")
</template>

<script>

import rose from 'components/triple/rose.vue'
export default {
  components: {
    rose
  },
  data() {
    return {
      clientHeight: 0,
      dropCookie: 0,
      droping: 0,
      cookies: [
        {id: 'T', h: 70, w: 51, l: 65, t:20},
        {id: 'R', h: 70, w: 49, l: 65, t:20},
        {id: 'I', h: 70, w: 24, l: 65, t:20},
        {id: 'P', h: 66, w: 47, l: 65, t:20},
        {id: 'L', h: 73, w: 43, l: 65, t:20},
        {id: 'E', h: 64, w: 45, l: 65, t:20},
        {id: 'H', h: 71, w: 56, l: 65, t:20},
        {id: 'E', h: 64, w: 45, l: 65, t:20},
      ],
      timer: {}
    };
  },

  methods: {
    drop() {
      if (this.dropCookie >= 8 || this.dropinging == 1) return
      this.fall(this.dropCookie,25 ,200,0)
      this.dropCookie = this.dropCookie + 1
      this.dropinging = 1
      setTimeout(()=> {
        this.dropinging = 0
        this.fall(this.dropCookie,25 ,200,0)
        this.dropCookie = this.dropCookie + 1
      }, 500)
    },
    fall(index, x, t0, t) {

      let cookie = this.cookies[index]

      const vertical = 55
      let v = x / t0
      let a = vertical / (t0 * t0)

      console.log(index)
      cookie.l = cookie.l - v
      cookie.t = cookie.t + (a * t * t) - (a * (t-1) * (t-1))
      t ++
      this.cookies.$set(index, cookie)

      if (t >= t0) return

      setTimeout(()=>{
        this.fall(index, x, t0, t)
      }, 1)
    },
    stylecookie(l,t,h,w) {
      let height_unit = this.clientHeight * 0.001
       let style = { 'left': l + '%',
          'top': t + '%',
          'height': parseInt(height_unit * h) + 'px',
          'width': parseInt(height_unit * w) + 'px'
        }
      return style
    }
  },
  computed: {
    boxStyle() {
      let height = this.clientHeight * 0.3
      const obj = {
        height : height + 'px',
        width : height * 444 / 366 + 'px',
        transform: 'translate(-'+ height * 444 / 366 /2 +'px ,-'+ height /2 +'px)'
      }
      return obj
    },
    bowlStyle() {
      let height = this.clientHeight * 0.3
      const obj = {
        height : height + 'px',
        width : height * 561 / 341 + 'px',
        transform: 'translate(-'+ height * 561 / 341 /2 +'px ,-'+ height /2 +'px)'
      }
      return obj
    },
    // cookieStyle () {
    //   let height_unit = this.clientHeight * 0.001
    //   let array = []
    //   const cookies = this.cookies
    //   for (let i in cookies) {
    //     let style = { 'left': cookies[i].l + '%',
    //           'top': cookies[i].t + '%',
    //           'height': parseInt(height_unit * cookies[i].h) + 'px',
    //           'width': parseInt(height_unit * cookies[i].w) + 'px'
    //         }
    //       cookies[i].style = style
    //     array.$add(cookies[i])
    //   }
    //   return array
    // }
  },
  ready: function() {
    this.clientHeight = document.body.clientHeight
  }
}
</script>
<style lang="sass" scoped>
.app
  height: 100%
  width: 100%
  background-color: white
  position: relative
  .box
    position: absolute
    width: 444px
    height: 366px
    background:
      image: url(~assets/box.png)
      repeat: no-repeat
      size: 100%
    left: 65%
    top: 20%
  .bowl
    position: absolute
    width: 561px
    height: 341px
    background:
      image: url(~assets/bowl.png)
      repeat: no-repeat
      size: 100%
    left: 50%
    top: 80%
  .cookie
    position: absolute
    background-repeat: no-repeat
    background-size: 100%

#T
  background-image: url(~assets/cookie/t.png)
#R
  background-image: url(~assets/cookie/r.png)
#I
  background-image: url(~assets/cookie/i.png)
#P
  background-image: url(~assets/cookie/p.png)
#L
  background-image: url(~assets/cookie/l.png)
#E
  background-image: url(~assets/cookie/e.png)
#H
  background-image: url(~assets/cookie/h.png)

</style>
