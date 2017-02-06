<template lang="jade">
.app
  .headnav
    headnav
  scrollpage
  //- map
</template>

<script>
import headnav from 'components/global/headnav.vue'
import scrollpage from 'components/global/scrollpage.vue'
import bloglist from 'components/global/bloglist.vue'


export default {
  components: {
    scrollpage,
    headnav,
    bloglist,

  },
  data() {
    return {
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
      if (this.touching != null) {
        if (this.cookieIsInPlate(this.cookies[this.touching])) {
          this.emergeNewCookie(this.cookies[this.touching].id)
        }
        this.cookies[this.touching].original = this.cookies[this.touching].current
        this.touching = null
      }
    },
  },
  computed: {
  },
  ready: function() {
  }
}
</script>
<style lang="sass" scoped>
.app
  // overflow: hidden
  font-family: verdana
  width: 100%
  background: #22475E
  position: relative
  .headnav
    top: 0
    left: 0
</style>
