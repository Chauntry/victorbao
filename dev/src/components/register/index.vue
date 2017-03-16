<template lang="jade">
.app
  div(
    class="fb-like"
    data-share="true"
    data-width="450"
    data-show-faces="true")

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
  FB.init({
            appId: '280211065746246', // App ID
            channelUrl: 'http://localhost:3000/', // Channel File
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true,  // parse XFBML
            oauth : true
        });

  function Test() {
      FB.login(function (response) {
          if (response.authResponse) {
              alert('Welcome!  Fetching your information.... ');
              FB.api('/me', function (response) {
                  alert('Good to see you, ' + response.name + '.');
              });
          } else {
              alert('User cancelled login or did not fully authorize.');
          }
      }, { scope: 'email,user_location,offline_access,publish_stream' });
  }

  }
}
</script>
<style lang="sass" scoped>
.app
  position: relative
  height: 100%
  width: 100%

</style>
