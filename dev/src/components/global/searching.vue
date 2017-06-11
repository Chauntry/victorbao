<template lang="jade">
.cp-searching
  .header
    span SEARCH RESULTS FOR '{{searchMsg}}'
  .filter
    .upper
      .nav
        navtool
      .text(v-if = "fold") FILTER
      .text(v-if = "!fold")#orange HIDE FILTER
    ul.list(v-if = "!fold")
      li(v-for="cata in selectedCatalogs")
        div(v-if="cata.selected",class="tickbox",@click="tickChecked(cata)")
          svg(width="100%" height="100%" viewBox="0 0 140 100")
            path(class="tick checked" d="M10,50 l25,40 l95,-70")
        div(v-if="!cata.selected",class="tickbox",@click="tickUnChecked(cata)")
          svg(width="100%" height="100%" viewBox="0 0 140 100")
            path(class="tick" d="M10,50 l25,40 l95,-70")
        .text {{cata.name}}
  .content
    .item(v-for = "item in searchItems", @click = "$router.go('/item/' + item.id)")
      .img(:style = "{'background-image' : 'url(' + item.photos[0] + ')'}")
      .name(v-html = "item.name") {{item.name}}
      .price(v-html = "item.price") {{item.price}}
      .des {{item.descr}}
  .noResult(v-if = "!searchItems.length") Your search yielded no results
</template>

<script>
import navtool from 'components/global/navtool_search.vue'

export default {
  components: {
    navtool
  },
  props: {
    searchMsg: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    catalogs: {
      type: Array,
      required: true
    },
  },
  watch : {
    searchMsg : function (value) {
      this.searchItems = this.updateSearchItems()
    }
  },
  data() {
    return {
      fold: true,
      selectedCatalogs: [],
      searchItems: []
    }
  },
  ready () {
    $(".nav").click(() => {
      $(".menu").toggleClass("active");
      this.fold = this.fold ? false : true
    });

    for (let i in this.catalogs) {
      const obj = {
        name: this.catalogs[i],
        selected: true,
      }
      this.selectedCatalogs.push(obj)
    }

    this.searchItems = this.updateSearchItems()
  },
  computed: {
  },
  methods: {
    tickChecked (cata) {
      cata.selected = false
      this.searchItems = this.updateSearchItems()
    },
    tickUnChecked (cata) {
      cata.selected = true
      this.searchItems = this.updateSearchItems()
    },
    catalogSelected (cata) {
      for (let i in this.selectedCatalogs) {
        if (cata = this.selectedCatalogs[i]) {
          return true
        }
      }
      return false
    },
    updateSearchItems() {
      let startString = '<span style="background-color: #d7d7bc">'
      let endString = '</span>'

      if (this.searchMsg == '') return this.items
      let items = this.items
      let list = []
      let selectedCatalogs = this.selectedCatalogs
      for (let i in items) {
        items[i].name = items[i].name.split(startString).join('')
        items[i].name = items[i].name.split(endString).join('')

        for (let j in selectedCatalogs) {
          if (items[i].catalog == selectedCatalogs[j].name && selectedCatalogs[j].selected) {
            if (items[i].name.toUpperCase().search(this.searchMsg.toUpperCase()) != -1){
              let split =items[i].name.toUpperCase().split(this.searchMsg.toUpperCase())

              let newItem = split[0]
              for (let i = 1; i < split.length; i++) {
                newItem = newItem + startString + this.searchMsg.toUpperCase() + endString + split[i]
              }
              items[i].name = newItem
              list.push(items[i])
            }
          }
        }
      }
      return list
    }
  },
}
</script>

<style lang="sass" scoped>
@import 'config'
@keyframes draw
  to
    stroke-dashoffset: 0

.cp-searching
  position: absolute
  top: 100px
  width: 100%
  .header
    text-align: center
    text-transform: uppercase
    padding-top: 30px
    padding-bottom: 10px
    span
      font-size: 20px
      line-height: 20px
  .filter
    margin-left: 15%
    width: 70%
    text-transform: uppercase
    .upper
      border-bottom: 1px solid #9c8c9c
      padding-bottom: 10px
      .nav
        position: relative
        top: 0
        left: 0
      .text
        position: relative
        top: 0
        left: 50px
        font-size: 20px
        line-height: 20px
      #orange
        color: #ddb343
        transition: color 1s
    .list
      li
        margin-left: 10px
        margin-top: 5px
        height: 23px
        .text
          left: 31px
          position: relative
          top: -18px
          height: 23px
        .tickbox
          margin-right: 10px
          position: relative
          background: #333
          width: 22px
          height: 22px
          .tick
            width: 100%
            height: 100%
            fill: none
            stroke: white
            stroke-width: 20
            stroke-linecap: round
            stroke-dasharray: 180
            stroke-dashoffset: 180
            position: absolute
          .checked
            animation: draw 0.4s ease forwards
  .content
    margin-top: 30px
    margin-left: 15%
    width: 70%
    .item
      position: relative
      height: 150px
      width: 100%
      .img
        position: absolute
        top: 0
        left: 0
        height: 150px
        width: 150px
        background-repeat: no-repeat
        background-size: 100%
        background-position: 50% 50%
      .name
        position: absolute
        top: 0
        left: 170px
        height: 15px
        line-height: 15px
      .price
        position: absolute
        top: 20px
        left: 170px
        height: 15px
        line-height: 15px
      .descr
        position: absolute
        top: 50px
        left: 170px
        height: 15px
        line-height: 15px
  .noResult
    margin-top: 30px
    margin-left: 15%
    width: 70%
    font-size: 20px
</style>
