<template lang="jade">
  #app
    router-view.view
  </div>
</template>

<script>
import Vue from 'vue'
import store from 'vuex/store'
import App from 'common/app.js'
import config from 'config/'
import { tele, mem } from '../vuex/actions'

export default {
  store,
  vuex: {
    getters: {
      telecasts: state => state.index.telecasts,
      member: state => state.index.member
    },
  },
  methods: {
    initSetUpParams () {
      if (this.$route.query.id) {
        const setUpParams = {
          id: this.$route.query.id,
          ism: this.$route.query.ism,
        }
        App.ls.set('setUpParams', setUpParams)
        App.setUpParams = setUpParams
      } else if (App.ls.get('setUpParams')) {
        App.setUpParams = App.ls.get('setUpParams')
      } else {
        // App.go('/error/403')
      }
    },
  },
  computed: {
  },
  created () {
    // this.getRequset ()
    // console.log(this.telecasts)
    // this.initSetUpParams()
    this.initSetUpParams ()
  },
  ready () {
  }
}
</script>
<style lang="sass">
@import "config"
@import "base/base"

*
  font-family: verdana
#app
  background: white
  -webkit-overflow-scrolling: touch
</style>
