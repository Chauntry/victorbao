<template lang="jade">
.cp-footnav(:style = "{bottom : bottom + 'rem'}")
  i(v-for = "i in iarray", :class = "{on: index === i}")
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    bottom: {
      type: Number,
      default: 3.75
    },
    needi: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      iarray: [],
    }
  },
  ready () {
    this.iarray = []
    for (let i = 0; i < this.needi; i++) this.iarray.push(i + 1)
  },
  computed: {
  }
}
</script>

<style lang="sass" scoped>
@import 'config'

.cp-footnav
  position: absolute
  bottom: rem(60)
  width: 100%
  text-align: center
  margin: rem(10) 0px
  overflow: hidden
  i
    display: inline-block
    width: rem(10)
    height: rem(10)
    border: solid rem(2) #a0a0a0
    border-radius: 50%
    margin-left: rem(6)
    &.on
      background-color: #a0a0a0

</style>
