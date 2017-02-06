<template lang="jade">
.app
  .piano
    piano
  //- tips(v-if= "false")

</template>

<script>

import tips from 'components/global/tips.vue'
import piano from 'components/global/piano.vue'
export default {
  components: {
    tips,
    piano
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
  height: 100%
  width: 100%
  .piano
    height: 100%
    width: 100%

</style>
