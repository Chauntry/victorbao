<template lang="jade">
.app
  .logo1(@click = "movingDis = clientWidth/2",:style = "{'background-size' : clientHeight/2 + 'px', 'background-position': clientWidth/2 - clientHeight/4 + 'px ' + clientHeight/4 + 'px', left : '-' + movingDis + 'px'}")
  .logo2(@click = "movingDis = clientWidth/2",:style = "{'background-size' : clientHeight/2 + 'px', 'background-position': '-' + clientHeight/4 + 'px ' + clientHeight/4 + 'px', right : '-' + movingDis + 'px'}")
  .aboutme(@click= "$router.go('/catalog')")
    .content(:style = "{width: clientHeight/1.4 + 'px'}")
      .bar
      h1 Lorem Ipsum
      br
      h2 Lorem ipsum dolor sit amet, id pro quis vivendum singulis, quis veritus at vel. Cu vis mucius platonem expetendis, aperiam ancillae id ius, sed cu atqui detracto lobortis. Facer aliquip eum at, quo id possim corpora. Et quo torquatos intellegebat, sea prima bonorum legendos ut, paulo primis nusquam pri at. Alienum instructior has ne, ea eam impetus epicurei recteque. Cu pro mnesarchum moderatius.
</template>

<script>

import rose from 'components/triple/rose.vue'
export default {
  components: {
    rose
  },
  data() {
    return {
      movingDis: 0,
      clientHeight: 0,
      clientWidth: 0,
      dropCookie: 0,
      droping: 0,
      timer: {}
    };
  },
  methods: {
  },
  computed: {
  },
  ready: function() {
    this.clientHeight = document.body.clientHeight
    this.clientWidth = document.body.clientWidth
    window.onresize = () => {
      this.clientHeight = document.body.clientHeight
      this.clientWidth = document.body.clientWidth
    }
  }
}
</script>
<style lang="sass" scoped>
.app
  height: 100%
  width: 100%
  position: relative
  background-color: black
  .logo1
    z-index: 3
    transition: left 1.5s cubic-bezier(0.81, 0.32, 0, 1.28)
    height: 100%
    width: 50%
    position: absolute
    background-color: black
    background:
      image: url(~assets/marilynmonroe.png)
      repeat: no-repeat
  .logo2
    background-color: black
    z-index: 3
    transition: right 1.5s cubic-bezier(0.81, 0.32, 0, 1.28)
    height: 100%
    width: 50%
    position: absolute
    background:
      image: url(~assets/marilynmonroe.png)
      repeat: no-repeat
  .aboutme
    z-index: 2
    position: relative
    .bar
      height: 50px
    .content
      max-height: 100%
      padding: 40px 0
      margin: 0 auto
      text-align: center
      color: #fff

</style>
