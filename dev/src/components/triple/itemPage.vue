<template lang="jade">

.app(@click="notsearching")
  div#ecrin-header
    .cntr(@click="searching = 2")
      .cntr-innr
        label.search
          input(id="inpt_search",type="text",v-model="searchMsg",@mouseover="searching = 1",@mouseout="notsearching")
    a.logo(@click = "$router.go('/')") Triple
    ul.catalog
      li.dir
        a.text(@click = "$router.go('/catalog')") home
      li.dir(v-for="cat in catalogs")
        a.text(v-if = "cat == currentcatalog", @click = "changeCatalogs(cat)",id= "current") {{cat}}
        a.text(v-if = "cat != currentcatalog", @click = "changeCatalogs(cat)") {{cat}}
  .wrap(:style = "{'height' : (clientHeight - 120) + 'px', 'width' : (clientWidth - 70) + 'px'}")
    .leftNav
      .preView(v-for= "photo in displayItem.photos",:style = "{'background-image' : 'url(' + photo + ')', width: clientWidth * 0.1 + 'px', height: clientWidth * 0.1 + 'px'}", :id = "$index == currentPhoto ? 'selected': 'nonselected'", @click = "currentPhoto = $index")
    .photoView
      .photo(v-if= "displayItem.photos",:style = "{width: (clientWidth - 70) * 0.4 + 'px', height: (clientWidth - 70) * 0.4 + 'px', 'background-image': 'url(' + displayItem.photos[currentPhoto] + ')'}")
    .instruction


</template>

<script>
import * as actions from 'vuex/actions'
import $ from 'jquery'
import navtool from 'components/global/navtool_px.vue'
import eye from 'components/triple/goods/eye.vue'
export default {
  vuex: {
    getters: {
    },
    actions: {
    }
  },
  components: {
    eye,
    navtool
  },
  data() {
    return {
      currentPhoto: 0,
      currentcatalog : '',
      searching : 0,
      fold : false,
      searchMsg: '',
      clientHeight: 0,
      clientWidth: 0,
      items: [],
      recom: [],
      catalogs: [],
      displayItem: {},
    }
  },
  props: {
  },
  methods: {
    findDisplayItem( id ) {
      for (let i in this.items) {
        if (this.items[i].id == id)
          return this.items[i]
      }
      return {}
    },
    changeCatalogs(cat) {
      this.currentcatalog = cat
      this.showItems = []
      for(let i in this.items) {
        if(this.items[i].catalog == cat) {
          this.showItems.push(this.items[i])
        }
      }
      this.heroPhoto = this.showItems[0].photos[0]
      this.$router.go('/catalog/' + cat)
    },
    IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
                    "SymbianOS", "Windows Phone",
                    "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    notsearching () {
      if ($(".search").hasClass('active'))
        return
      this.searching = 0
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
          console.log(response)
          this.items = response.items
          this.recom = response.recom
          this.catalogs = response.catalogs
          this.displayItem = this.findDisplayItem(this.$route.params.id)
        }
    });
  },
  ready () {
    if (!this.IsPC()) {
      this.$router.go("/index.mobile")
    }
    this.clientHeight = document.body.clientHeight
    this.clientWidth = document.body.clientWidth
    window.onresize = () => {
      this.clientHeight = document.body.clientHeight
      this.clientWidth = document.body.clientWidth
      if (this.clientWidth <= 800) {
        this.clientWidth = 800
      }
    }
  },
  beforeDestroy () {
  }
}
</script>

<style lang="scss" scoped>
@keyframes downtoup
{
  from {
    bottom: -100%
  }
  to {
    bottom: 0%
  }
}

.app {
  min-width: 888px;
  position: relative;
  background-color: white;
  font-family: "Century Gothic","Futura",sans-serif;
  transition: transform 1s;
}

.wrap {
  position: absolute;
  margin-left: 3%;
  margin-top: 110px;
  .leftNav {
    position: absolute;
    border: 1px solid black;
    width: 20%;
    height: 100%;
    left: 0;

  }
  .photoView {
    position: absolute;
    border: 1px solid black;
    width: 40%;
    height: 100%;
    top: 0%;
    left: 20%;
  }
  .instruction{
    position: absolute;
    border: 1px solid black;
    width: 40%;
    left: 60%;
    top: 0%;
    height: 100%;
  }
}


#ecrin-header {
  min-width: 500px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 100px;
  font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
  background: #000000;
  -webkit-backface-visibility: hidden;
  -moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
  padding: 0 5%
}

.logo {
  color: white;
  font-size: 30px;
  line-height: 45px;
  margin-left: 45%;
}

.catalog {
  left: 0;
  position: absolute;
  right: 0;
  text-align: center;
  top: 60px;
  list-style: none;
  li {
    display: inline-block;
    margin: 0 5%;
    font-size: 10px;
    .text {
      font-family: Futura-800-normal, Helvetica, Arial, san-serif;
      font-style: normal;
      font-weight: normal;
      color: #fff;
      display: block;
      font-size: 11px;
      height: 40px;
      letter-spacing: 1px;
      padding: 0 10px;
      position: relative;
      text-transform: uppercase;
      z-index: 19;
    }
    .text:hover:before {
      content: "";
      position: absolute;
      border: 1px solid #ffa906;
      width: 70%;
      height: 0px;
      top: 20px
    }
    :hover {
      color: #ffa906;
    }
    #current {
      text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de;
    }
  }
}


.cntr {
  z-index: 10005;
  display: table;
  position: fixed;
  top: 0;
  right: 10%;
  width: 50px;
  height: 50px;
  .cntr-innr {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    .search {
      color: white;
      display: inline-block;
      position: relative;
      height: 20px;
      width: 20px;
      box-sizing: border-box;
      margin: 0px 0px 1px 1px;
      padding: 0px 0px 0px 0px;
      border: 2px solid #fff;
      border-radius: 25px;
      transition: all 200ms ease;
      cursor: text;
      &:after {
        content: "";
        position: absolute;
        width: 3px;
        height: 14px;
        right: -4px;
        top: 14px;
        background: #fff;
        border-radius: 3px;
        transform: rotate(-45deg);
        transition: all 200ms ease;
      }
      &.active,
      &:hover {
        height: 20px;
        width: 100px;
        transform: translateX(-10px);
        &:after {
          height: 0px;
        }
      }
      input {
        text-align: center;
        transform: translateY(-1px);
        height: 20px;
        color: white;
        width: 100%;
        border: none;
        box-sizing: border-box;
        font-family: Helvetica;
        font-size: 10px;
        color: inherit;
        background: transparent;
        outline-width: 0px;
      }
    }
  }
}

h3 {
  font-weight: normal;
}
h4 {
  font-weight: normal;
}
h1 span {
  display: block;
  font-size: 13px;
  text-align: center;
}
h1 {
  font-size: 25px;
  text-align: center;
  font-weight: normal;
}

h2 span {
  font-size: 13px;
      text-transform: uppercase;
}
h2 {
  font-size: 18px;
  text-transform: uppercase;
  font-weight: normal;

}

</style>
