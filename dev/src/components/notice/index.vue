<template lang="jade">
.app
  headnav


</template>

<script>
import chef from 'components/global/chef.vue'
import headnav from 'components/global/headnav.vue'
import scrollpage from 'components/global/scrollpage.vue'
export default {
  components: {
    chef,
    headnav,
    scrollpage
  },
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
  },
  ready: function() {
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

</style>
