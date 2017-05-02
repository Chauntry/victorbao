<template lang="jade">
.app

</template>

<script>
import * as actions from 'vuex/actions'
import $ from 'jquery'

export default {
  vuex: {
    getters: {
    },
    actions
  },
  components: {
  },
  data() {
    return {
      json: {},
    }
  },
  props: {
  },
  methods: {
    update(json) {
      $.ajax({
          url: "http://www.victorbao.co.uk/data/update.php",
          type: 'POST',
          data: json,
          dataType: "json",
          success: (response) => {
            console.log(response)
          }
      });
    }
  },
  computed: {
  },
  route: {
  },
  created () {
    $.ajax({
        url: "http://www.victorbao.co.uk/data/index.php",
        type: 'GET',
        dataType: "json",
        success: (response) => {
          // console.log(response)
          this.json = response
        }
    });
  },
  ready () {
    let test = {'hello' : 1}
    this.update(test)
  },
  beforeDestroy () {
  }
}
</script>

<style lang="sass" scoped>
.app


</style>
