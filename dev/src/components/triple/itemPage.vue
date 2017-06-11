<template lang="jade">

.app(@click="notsearching")
  #ecrin-header
    .cntr(@click="searching = searchMsg? 1 : 0")
      .cntr-innr
        label.search
          input(id="inpt_search",type="text",v-model="searchMsg",@mouseover="searching = searchMsg? 1 : 0",@mouseout="notsearching",@input = "searching = searchMsg? 1 : 0")
    a.logo(@click = "$router.go('/')") Triple
    ul.catalog
      li.dir
        a.text(@click = "$router.go('/catalog')")#current home
      li.dir(v-for="cat in catalogs")
        a.text(@click = "$router.go('/catalog/' + cat)") {{cat}}
  searching(v-if= "searching",:search-msg = "searchMsg", :items = "items", :catalogs = "catalogs")
  .wrap(v-if= "!searching",:style = "{'height' : (clientHeight - 120) + 'px', 'width' : (clientWidth - 70) + 'px'}")
    .leftNav
      .preView(v-for= "photo in displayItem.photos",:style = "{'background-image' : 'url(' + photo + ')', width: clientWidth * 0.1 + 'px', height: clientWidth * 0.1 + 'px'}", :id = "$index == currentPhoto ? 'selected': 'nonselected'", @click = "currentPhoto = $index")
    .photoView
      .layer(v-if= "displayItem.photos",:style = "{width: (clientWidth - 70) * 0.333 + 'px', height: (clientWidth - 70) * 0.333 + 'px'}", @mousemove = "showDetailPhoto", @mouseout = "photoDetail = 0")
      .photo(v-if= "displayItem.photos",:style = "{width: (clientWidth - 70) * 0.333 + 'px', height: (clientWidth - 70) * 0.333 + 'px', 'background-image': 'url(' + displayItem.photos[currentPhoto] + ')'}")
        .detail(v-if= "photoDetail",:style = "photoDetailStyle")
    .instruction
      .name {{displayItem.name}}
      .price {{displayItem.price}}
      button.contact CONTACT
      .information
        ul.direction
          li(v-for="dir in informationDir",@click="informationIndex = $index")
            span(v-if="$index == informationIndex")#selected {{dir}}
            span(v-if="$index != informationIndex") {{dir}}
        .subInformation displayItem.{{informationDir[informationIndex]}}


</template>

<script>
import * as actions from 'vuex/actions'
import $ from 'jquery'
import navtool from 'components/global/navtool_px.vue'
import eye from 'components/triple/goods/eye.vue'
import searching from 'components/global/searching.vue'
export default {
  vuex: {
    getters: {
    },
    actions: {
    }
  },
  components: {
    eye,
    navtool,
    searching
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
      informationDir: ['Description', 'Details', 'Delivery'],
      informationIndex: 0,
      photoDetail: 0,
      photoDetailStyle: {},
    }
  },
  props: {
  },
  methods: {
    showDetailPhoto(e) {
      console.log(e.offsetY)
      this.photoDetail = 1
      let width = (this.clientWidth - 70) * 0.5 * 0.5
      let top = e.offsetY + 'px'
      let left = e.offsetX + 'px'
      let imgPositionX = -(e.offsetX * 2- width /2)
      let imgPositionY = -(e.offsetY * 2- width /2)
      let imgPosition = ''
      if (imgPositionX < 0) {
        imgPosition = '-' + (- imgPositionX)
      } else {
        imgPosition = '' + imgPositionX
      }
      if (imgPositionY < 0) {
        imgPosition = imgPosition + 'px -' + (- imgPositionY) + 'px'
      } else {
        imgPosition = imgPosition + 'px ' +  imgPositionY + 'px'
      }

      this.photoDetailStyle = {top, left,
        'width': width + 'px',
        'height': width + 'px',
        'background-image' : 'url(' + this.displayItem.photos[this.currentPhoto] + ')',
        'background-size' : '266.4%',
        'background-position' : imgPosition
      }
    },
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
      if ($(".search").hasClass('active') && this.searchMsg)
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
      if (this.clientWidth <= 900) {
        this.clientWidth = 900
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
    // overflow: auto;
    position: absolute;
    width: 20%;
    height: 100%;
    left: 0;
    padding-left: 5%;
    padding-top: 1%;
    .preView {
      border: #e9e9e9 solid 1px;
      margin-top: 10%;
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: 0% 50%;
      opacity: 0.7;
    }
    #selected {
      border: #e9e9e9 solid 2px;
      border-color: #DDB343;
      opacity: 1;
    }
  }
  .photoView {
    position: absolute;
    width: 50%;
    height: 100%;
    top: 0%;
    left: 20%;
    .layer {
      left: 20%;
      top: 15%;
      z-index: 8;
      position: absolute;
    }
    .photo {
      left: 20%;
      top: 15%;
      z-index: 7;
      position: absolute;
      background-repeat: no-repeat;
      background-size: 100%;
      .detail {
        background-color: white;
        z-index: 9;
        position: absolute;
        border: #DDB343 solid 1px;
        transform: translate(-50%, -50%);
        background-repeat: no-repeat;
      }
    }
  }
  .instruction{
    position: absolute;
    width: 25%;
    left: 75%;
    top: 0%;
    height: 100%;
    .name {
      text-align: center;
      height: 60px;
      text-transform: uppercase;
      line-height: 70px;
      font-size: 30px;
      font-weight: bold;
    }
    .price {
      text-align: center;
      height: 50px;
      text-transform: uppercase;
      line-height: 50px;
      font-size: 15px;
    }
    .contact {
      position: absolute;
      left: 50%;
      width: 124px;
      margin-left: -65px;
      cursor: pointer;
      text-align: center;
      background-color: black;
      border: black solid 1px;
      padding: 0 30px;
      display: inline-block;
      color: white;
      font-size: 12px;
      font-weight: 900;
      line-height: 40px;
      height: 40px;
      text-transform: uppercase;
    }
    .contact:hover {
      color: #DDB343;
    }
    .information {
      margin-top: 70px;
      border-top: 1px solid lightgrey;
      .direction {
        text-transform: uppercase;
        li {
          display: inline-block;
          margin-right: 10px;
          text-decoration: none;
          padding: 10px 20px 10px 1px;
          cursor: pointer;
        }
        #selected {
          color: #DDB343;
        }
      }
      .subInformation {
        margin-top: 20px;
        line-height: 1.7;
        font-weight: 900;
        font-size: 12px;
      }
    }
  }
}


#ecrin-header {
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
