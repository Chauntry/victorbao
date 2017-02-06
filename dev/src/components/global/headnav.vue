<template lang="jade">
.cp-nav(:style = "{left: leftvalue}")
  .logo
  ul.nav1
    li.blog(@click = "$route.router.go('/blog')") Blog
    li.about(@click = "$route.router.go('/about')") About Me
    li.NoticeBoard(@click = "$route.router.go('/notice')") NoticeBoard
</template>

<script>
export default {
  props: {
    leftvalue: {
      type: String,
      default: '0%'
    },
  },
  computed: {

  }
}
</script>

<style lang="sass" scoped>
@import 'config'

.cp-nav
  z-index: 10001
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 2rem
  background-color: transparent
  .logo
    top: 0
    left: 0
    width: 0%
    position: absolute
    height: 2rem
  .nav1
    top: 0
    left: 24%
    width: 75%
    float: left
    position: absolute
    clear: none
    list-style: none
    li
      font-weight: bold
      font-size: 16px
      color: #fff
      // #0e12b9 - deep blue
      -webkit-transition: all 0.2s ease
      -moz-transition: all 0.2s ease
      background-repeat: no-repeat
      text-decoration: none
      // padding: 11% 4% 1% 1%
      width: 20%
      margin-right: 1%
      float: left
      // padding: 11% 2% 1%
      line-height: 2rem
      height: 2rem
      margin-left: 1%
      padding-left: 1%
      -webkit-transition: background .2s ease-in-out
      transition: background .2s ease-in-out
      display: list-item
      text-align: -webkit-match-parent
    .blog
      background-image: url(http://cdn.css-tricks.com/wp-content/themes/CSS-Tricks-8/images/css-tricks.png)
      background-position: 290px -1288px
    .blog:hover
      background-color: #237abe
      background-position: 86px -1288px


    .NoticeBoard
        background-image: url(http://cdn.css-tricks.com/wp-content/themes/CSS-Tricks-8/images/css-tricks.png)
        background-position: 290px -1448px
    .NoticeBoard:hover
        background-color: #37597a
        background-position: 86px -1448px
    .about
        background-image: url(http://cdn.css-tricks.com/wp-content/themes/CSS-Tricks-8/images/css-tricks.png)
        background-position: 290px -1608px
    .about:hover
        background-color: #333333
        background-position: 86px -1608px
    .aboutweb
        background-image: url(http://cdn.css-tricks.com/wp-content/themes/CSS-Tricks-8/images/css-tricks.png)
        background-position: 290px -1768px
    .aboutweb:hover
        background-color: #ff8400
        background-position: 86px -1768px
</style>
