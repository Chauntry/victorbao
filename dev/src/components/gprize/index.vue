<template lang="jade">
.cp-gprize
  .header
  .gprize-main
    .gprize-user
      .scroll(:style = "{ transform: styleOfScroll, transition: transitionTime}")
        p(v-for = "user in userList", :style = "{ transform: offset1 }")
          img(v-if = "user.avatar",:src = "user.avatar + '/0'")
          span {{user.uname}}
        p(v-for = "user in userList", :style = "{ transform: offset2 }")
          img(v-if = "user.avatar",:src = "user.avatar + '/0'")
          span {{user.uname}}
    .gprize-cover
    .gprize-lights-off(v-if = "!lighton")
    .gprize-lights-on(v-if = "lighton")
    //- .gprize-tip(v-if="hasPrize")
    //-   template(v-if="isBigPrize")
    //-     h3
    //-     h4
    //-   template(v-else)
    .gprize-tip0(:style = "{height: tip0rem + 'rem'}")
      h4 {{tip}}
    .gprize-tip1(:style = "{height: tip1rem + 'rem'}")
      h4 {{tip}}
  .about 本页面由江苏广电新闻中心提供
</template>

<script>
// current bug:
// 1. fixed - there should be a golem so that ensure the current user can be find
// 2. fixed - eventid should be get from hash so that dont need modify again and again
// 3. fixed - order the list by id would be better
// 4. fixed - about is not current
// 5. fixed - it flash when displayed in smart phone
// implement
// add some sound should be better
import api from 'api/'


export default {
  data() {
    return {
      stopId: null,
      reachTimes: 0,
      offset1: '',
      offset2: '',
      prizedata: [],
      userList: [],
      lighton: false,
      prizeList: [],
      transitionTime: 'transform 0.5s',
      currentTop: 0,
      eventId: null,
      owner: { ismy: null, reward: '' },
      tip: '',
      tip0rem: 0,
      tip1rem: 0,
      alreadyPopOver: false,
    }
  },
  methods: {
    moveDown () {
      this.currentTop --
      if (this.currentTop === -(this.userList.length) * (this.reachTimes + 1)) {
        this.reachTimes ++
        if (this.reachTimes % 2 === 0) {
          this.offset1 = `translateY(-${(this.userList.length * 2.5 * this.reachTimes)}rem)`
        } else {
          this.offset2 = `translateY(-${(this.userList.length * 2.5 * (this.reachTimes + 1))}rem)`
        }
      }
    },
    // when it need stop, damping is called which used to show damping moving
    damping () {
      let currentTime = 0
      let shift = 0
      const orginTop = this.currentTop + 0
      this.transitionTime = 'transform 0.5s'
      const damping = setInterval(() => {
        this.transitionTime = 'transform 0.1s'
        shift = - 2 * Math.pow(2.71828, - currentTime / 10) * Math.cos(currentTime / 5 - 3.14 / 2)
        currentTime ++
        if (this.lighton) this.lighton = false
        else this.lighton = true
        this.currentTop = orginTop + shift
        if (shift < 0.001 && shift > - 0.001) {
          this.currentTop = orginTop
          this.transitionTime = 'transform 0.5s'
          clearInterval(damping)
          this.printTip ()
        }
      }, 50)
    },
    // recurasivlry stop rounding
    stopRound () {
      if (`${this.currentIndex}` === this.stopIndex) {
        // this.damping ()
        setTimeout(() => { this.damping() }, 100)
      } else {
        setTimeout(() => {
          this.transitionTime = 'transform 0.12s'
          this.moveDown()
          if (this.lighton) this.lighton = false
          else this.lighton = true
          this.stopRound()
        }, 100)
      }
    },
    dealRes () {
      this.transitionTime = 'transform 0s'
      const adjustTimer = setInterval(() => {
        if (this.lighton) this.lighton = false
        else this.lighton = true
        this.getresult(adjustTimer)
        if (this.owner.ismy !== null) {
          clearInterval(adjustTimer)
          if (this.tip !== '很抱歉本次您没有中奖') this.roundTimeCount()
        }
      }, 4000)
    },
    printTip () {
      if (this.owner.ismy) this.tip1rem = 5.5
      else this.tip0rem = 5.5
    },
    getresult(adjustTimer) {
      api.getResultForBigPrize(this.eventId).then(res => {
        // 如果 有人中奖 就打出中奖信息
        if (res.data.result === 1) {
          this.owner.ismy = res.data.data ? res.data.data.ismy : null
          this.owner.reward = res.data.data ? res.data.data.reward : null
          this.stopId =  res.data.data ? res.data.data.id : null
          if (this.owner.ismy) this.tip = `${this.owner.reward}`
          else this.tip = '很抱歉这次您没有中奖'
        }
      })
      api.getShakeList(this.eventId).then(res => {
        // 当滚动前， 最后一下请求会是空数组
        if (res.data.data.list.length >= this.prizedata.data.data.list.length) this.prizedata = res
        this.userList = this.prizedata.data.data.list
        for (let i = 0; i <= 5 - this.userList.length; i ++)
          this.userList.push({ avatar:'', uname:'', id: -1})
        this.userList.sort(function(a,b){ { return b.id - a.id } })
        // 出奖时间
        if(this.prizedata.data.data.time <= 0 && this.prizedata.data.data.time >= -29) {
          api.getResultForBigPrize(this.eventId).then(res => {
            this.owner.ismy = res.data.data ? res.data.data.ismy : null
            this.owner.reward = res.data.data ? res.data.data.reward : null
            this.stopId =  res.data.data ? res.data.data.id : null
            if (this.owner.ismy) this.tip = `${this.owner.reward}`
            else this.tip = '很抱歉这次您没有中奖'
            if (res.data.result === 0) {
              this.owner.ismy = false
              this.tip = '很抱歉本次您没有中奖'
              this.printTip()
            }
          })
        }
        if(this.prizedata.data.data.time === -30) {
          if (!this.alreadyPopOver) {
            App.pop('抽奖已结束或未开始')
            this.alreadyPopOver = true
          }
          // clearInterval(adjustTimer)
        }
      })
    },
    roundTimeCount () {
      let moveCount = 0
      let maxMoveCount = 4
      let stopCounter = 0
      const countStop = 100
      this.transitionTime = 'transform 0s'
      const roundtimer = setInterval(() => {
        moveCount ++
        stopCounter ++
        this.userList = this.prizedata.data.data.list
        for (let i = 0; i <= 5 - this.userList.length; i ++)
          this.userList.push({ avatar:'', uname:'', id: -1})
        this.userList.sort(function(a,b){ return b.id - a.id })
        // this.prizedata.length != 0 && this.prizedata.data.msg === 'no member'
        if (stopCounter === countStop) {
          clearInterval(roundtimer)
          this.stopRound()
        }
        if (moveCount >= maxMoveCount) {
          this.transitionTime = 'transform ' + maxMoveCount * 0.12 + 's'
          this.moveDown()
          if (this.lighton) this.lighton = false
          else this.lighton = true
          if (maxMoveCount >= 1.125) maxMoveCount = maxMoveCount - 0.125
          moveCount = 0
        }
      }, 80)
    }
  },
  ready () {
    this.eventId = this.$route.params.id
    // It suppose to there is a stopId
    api.getShakeList(this.eventId).then(res => {
      this.prizedata = res
      this.userList = this.prizedata.data.data.list
      for (let i = 0; i <= 5 - this.userList.length; i ++)
        this.userList.push({ avatar:'', uname:'', id: -1})
      this.userList.sort(function(a,b){ return b.id - a.id })
      this.dealRes()
    })
    // there are three values in userList[i]
    // {avatar, uname, id}
  },
  computed: {
    // this part is used to computer translateX(distance) for css of scroll
    styleOfScroll () {
      return `translateY(${(-(this.userList.length + this.currentTop) * 2.5)}rem)`
    },

    // currentIdex
    // when reachtime = 0, index = top + 2
    // if top + 2 < 0, index = length + top + 2
    // when reachtime = 1 , idex = length + top + 2
    // if length + top + 2 < 0, index = 2* length + 2
    currentIndex () {
      if (this) {
        const value = this.currentTop + 2 + this.reachTimes * this.userList.length
        if (value < 0) return value + this.userList.length
        return value
      }
      return ''
    },
    stopIndex () {
      if (this) {
        if (!this.stopId) return ''
        for (const i in this.userList) {
          if (this.userList[i].id === this.stopId) return i
        }
      }
      return ''
    }
  }
}
</script>

<style lang="sass" scoped>
@import 'config'
.cp-gprize
  .header
    height: 2.9375rem
    line-height: 2.3125rem
    background:
      image: url('~assets/header-bg.png')
      repeat: no-repeat
      size: 100% 100%
    text-align: center
    color: #fff
  .gprize-main
    position: relative
    height: rem(440)
    padding: rem(0) rem(10) rem(10) rem(10)
    background:
      image: url('~assets/gprize-bg.jpg')
      repeat: no-repeat
      size: 100% 100%
    div
      position: absolute
      width: 18.75rem
    .gprize-user
      font-size: rem(16)
      position: absolute
      left: rem(80)
      top: rem(105)
      height: rem(200)
      width: rem(200)
      text-align: left
      overflow: hidden
      font-family: "Microsoft YaHei", sans-serif
      .scroll
        transition: transform 0.5s
        p
          height: 2.5rem
          img
            width: 2.1rem
            height: 2.1rem
            vertical-align: middle
            border-radius: 50%
            margin-right: 0.3125rem
    .gprize-cover
      height: 100%
      background:
        image: url('~assets/machine.png')
        repeat: no-repeat
        size: 100%
    .gprize-lights-off
      height: 100%
      background:
        image: url('~assets/lights-off.png')
        repeat: no-repeat
        size: rem(222)
        position: rem(38) rem(30)
    .gprize-lights-on
      height: 100%;
      background:
        image: url('~assets/lights-on.png')
        repeat: no-repeat
        size: rem(222)
        position: rem(38) rem(30)
    .gprize-tip1
      transition: height 2s
      left: rem(66)
      top: rem(324)
      width: rem(184)
      height: rem(0)
      overflow: hidden
      text-align: center
      color: #c74032
      background:
        image: url('~assets/bigprize-tip.png')
        repeat: no-repeat
        size: 100%
        position: left bottom
      h4
        position: absolute
        width: 100%
        bottom: rem(35)
    .gprize-tip0
      transition: height 2s
      left: rem(66)
      top: rem(324)
      width: rem(184)
      height: rem(0)
      overflow: hidden
      text-align: center
      color: #c74032
      background:
        image: url('~assets/bigprize-tip0.png')
        repeat: no-repeat
        size: 100%
        position: left bottom
      h4
        position: absolute
        width: 100%
      h4:first-child
        bottom: rem(55)
      h4:last-child
        bottom: rem(35)
  .about
    display: block
    width: 100%
    font-size: 0.7rem
    text-align: center
    height: 1rem
    color: gray
</style>
