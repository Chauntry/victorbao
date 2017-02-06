<template lang="jade">
.app
  //- .title Victor Bao
  .display(@mousemove= "mousemove",@mouseup= "mouseup",@mouseout= "mousemove")
    .cookie(v-for = "cookie in cookies",:id = "cookie.id",:style="{left: cookie.current[0] + 'px', bottom: cookie.current[1] + 'px'}", @mousedown="mousedown($event, $index)")
    .plate
    .buttoncookie(v-if = "buttonCookiesId",:id = "buttonCookiesId", @click = "enablelogin = true")
    .detail(v-if = "enableDetail") a website designer, bala bala bala ......
  login(v-if= "enablelogin")
  tips(v-if= "false")
//- chef(:exist.sync = "enableChef", :text = "finalOrderText")
</template>

<script>
import login from 'components/global/login.vue'
import tips from 'components/global/tips.vue'
export default {
  components: {
    login,
    tips
  },
  data() {
    return {
      cookies: [],
      cookiesProperty: [{id: 'A', location: [65, 362]},
                {id: 'B', location: [-28, 357]},
                {id: 'C', location: [27, 489]},
                {id: 'E', location: [598, 33]},
                {id: 'G', location: [516, 581]},
                {id: 'I', location: [-45, 495]},
                {id: 'L', location: [427, 228]},
                {id: 'N', location: [954, 68]},
                {id: 'O', location: [201, 496]},
                {id: 'O', location: [157, 360]},
                {id: 'R', location: [289, 498]},
                {id: 'S', location: [1061, 347]},
                {id: 'T', location: [113, 492]},
                {id: 'U', location: [961, 583]},
                {id: 'V', location: [-147, 491]},
                {id: 'P', location: [427,388]}
                ],
      touching: null,
      buttonCookiesId: null,
      mouseDownLocation: [0, 0],
      mouseCurrentLocation: [0, 0],
      enableChef: false,
      enablelogin: false,
      finalOrderText: '',
      enableDetail: true,
    };
  },

  methods: {
    // the style of block
    mousedown (e, index) {
      this.touching = index
      this.mouseDownLocation = [e.clientX, e.clientY]
      this.mouseCurrentLocation = [e.clientX, e.clientY]
    },
    mousemove (e) {
      if(this.touching == null) return
      this.mouseCurrentLocation = [e.clientX, e.clientY]
      this.cookies[this.touching].current = [this.cookies[this.touching].original[0] + this.mouseCurrentLocation[0] - this.mouseDownLocation[0], this.cookies[this.touching].original[1] - this.mouseCurrentLocation[1] + this.mouseDownLocation[1]]
    },
    mouseup (e) {
      if (this.enableDetail === true) {
        this.enableDetail = false
        this.addOptionCookies()
      }
      if (this.touching != null) {
        if (this.cookieIsInPlate(this.cookies[this.touching])) {
          this.emergeNewCookie(this.cookies[this.touching].id)
        }
        this.cookies[this.touching].original = this.cookies[this.touching].current
        this.touching = null
      }
      this.order()
    },
    getCentreOfCookie(cookie) {
      if (cookie.id == 'I')
        return [cookie.current[0]+ 12, cookie.current[1]+ 35]
      if (cookie.id == 'L'||cookie.id == 'S' || cookie.id == 'U')
        return [cookie.current[0]+ 20, cookie.current[1]+ 35]
      if (cookie.id == 'N')
        return [cookie.current[0]+ 28.5, cookie.current[1]+ 35.5]
      return [cookie.current[0]+ 24, cookie.current[1]+ 34.5]
    },
    cookieIsInPlate(cookie) {
      let plate_c = [760, 360]
      let plate_r = 260
      let cookie_c = this.getCentreOfCookie(cookie)
      let distance = Math.pow(Math.pow(plate_c[0] - cookie_c[0], 2) + Math.pow(plate_c[1] - cookie_c[1], 2),0.5)
      return distance <= plate_r
    },
    emergeNewCookie (cookieId) {
      for (let index in this.cookiesProperty) {
        if (cookieId === this.cookiesProperty[index].id) {
          const needCookie = {
            id: cookieId,
            original: this.cookiesProperty[index].location,
            current: this.cookiesProperty[index].location
          }
          this.cookies.push(needCookie)
        }
      }
    },
    order () {
      let TextArray = []
      for (let index in this.cookies) {
        if (this.cookieIsInPlate(this.cookies[index])) {
          TextArray.push(this.cookies[index])
        }
      }
      TextArray.sort(function(a,b){return a.current[0]-b.current[0]});
      let orderText = ''
      for (let index in TextArray) {
        orderText = orderText + TextArray[index].id
      }
      // this.initializeCookies()
      this.finalOrderText = orderText
      if (orderText === 'LOGIN' || orderText === 'REGISTER' || orderText === 'VISIT' || orderText === 'VISITOR' || orderText === 'LOGON' || orderText === 'TOURIST' || orderText === 'SIGNIN'|| orderText === 'SIGNUP') {
        this.buttonCookiesId = orderText
        this.initializeCookies()
      }
    },
    initializeCookies () {
      this.cookies = []
      let initialize = ['V', 'I', 'C', 'T', 'O', 'R', 'B', 'A']
      for (let index in this.cookiesProperty) {
        if (initialize.indexOf(this.cookiesProperty[index].id) != -1)
          this.cookies.push({id: this.cookiesProperty[index].id, original: this.cookiesProperty[index].location, current: this.cookiesProperty[index].location})
      }
    },
    addOptionCookies () {
      let initialize = ['V', 'I', 'C', 'T', 'O', 'R', 'B', 'A']
      for (let index in this.cookiesProperty) {
        if (initialize.indexOf(this.cookiesProperty[index].id) == -1)
          this.cookies.push({id: this.cookiesProperty[index].id, original: this.cookiesProperty[index].location, current: this.cookiesProperty[index].location})
      }
    }
  },
  computed: {
  },
  ready: function() {
    this.initializeCookies()
  }
}
</script>
<style lang="sass" scoped>
.app
  position: relative
  height: 100%
  width: 100%
  background:
    image: url(~assets/cloudbackground.jpg)
    repeat: no-repeat
    size: 100%
  .title
    position: absolute
    height: 60px
    width: 900px
    font-size: 60px
    top: 10px
    left: 50px
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif
    color: #999999
    letter-spacing: 1px
  .display
    top: 0px
    margin: 0 auto
    position: relative
    height: 99%
    width: 900px
    .bell
      position: absolute
      height: 114px
      width: 150px
      z-index: 1001
      bottom: 50px
      left: -100px
      background:
        image: url(~assets/cookie/Reception_Bell.png)
        repeat: no-repeat
        size: 100%
    .cookie
      cursor: pointer
      position: absolute
      transition: left 0s, bottom 0s
      background-repeat: no-repeat
      z-index: 10
    .buttoncookie
      cursor: pointer
      position: absolute
      transition: left 0s, bottom 0s
      background-repeat: no-repeat
      z-index: 10
      left: 760px
      bottom: 290px
      transform: translate(-50%,-50%)
    .detail
      position: absolute
      left: -120px
      bottom: 300px
      color: white
      font-size: 20px
      // font-weight: bold
      font-style: italic
    .plate
      position: absolute
      height: 520px
      width: 520px
      z-index: 1
      left: 500px
      bottom: 100px
      background:
        image: url(~assets/cookie/plate.png)
        repeat: no-repeat
        size: 100%
#A
  width: 49px
  height: 70px
  background-image: url(~assets/cookie/a.png)
#B
  width: 51px
  height: 72px
  background-image: url(~assets/cookie/b.png)
#C
  width: 50px
  height: 72px
  background-image: url(~assets/cookie/c.png)
#E
  width: 45px
  height: 64px
  background-image: url(~assets/cookie/e.png)
#G
  width: 47px
  height: 68px
  background-image: url(~assets/cookie/g.png)
#I
  width: 24px
  height: 70px
  background-image: url(~assets/cookie/i.png)
#L
  width: 43px
  height: 72px
  background-image: url(~assets/cookie/l.png)
#N
  width: 57px
  height: 71px
  background-image: url(~assets/cookie/n.png)
#O
  width: 51px
  height: 65px
  background-image: url(~assets/cookie/o.png)
#R
  width: 49px
  height: 70px
  background-image: url(~assets/cookie/r.png)
#S
  width: 38px
  height: 67px
  background-image: url(~assets/cookie/s.png)
#T
  width: 51px
  height: 70px
  background-image: url(~assets/cookie/t.png)
#U
  width: 44px
  height: 68px
  background-image: url(~assets/cookie/u.png)
#V
  width: 53px
  height: 66px
  background-image: url(~assets/cookie/v.png)
#P
  width: 47px
  height: 66px
  background-image: url(~assets/cookie/p.png)
#LOGIN
  width: 263px
  height: 78px
  background-image: url(~assets/cookie/login.png)
#LOGON
  width: 287px
  height: 78px
  background-image: url(~assets/cookie/logon.png)
#SIGNUP
  width: 339px
  height: 78px
  background-image: url(~assets/cookie/signup.png)
#SIGNIN
  width: 355px
  height: 79px
  background-image: url(~assets/cookie/signin.png)
#REGISTER
  width: 370px
  height: 77px
  background-image: url(~assets/cookie/register.png)
#TOURIST
  width: 370px
  height: 78px
  background-image: url(~assets/cookie/tourist.png)
#VISIT
  width: 255px
  height: 79px
  background-image: url(~assets/cookie/visit.png)
#VISITOR
  width: 369px
  height: 80px
  background-image: url(~assets/cookie/visitor.png)
#EMPTY
  width: 0px
  height: 0px
</style>
