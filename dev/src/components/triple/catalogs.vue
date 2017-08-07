<template lang="jade">

.app(@click="notsearching")
  #ecrin-header
    .cntr(@click="searching = searchMsg? 2 : 0")
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
  .hero(v-if= "recom[0] && !searching", :style = "{'background-image' : 'url(' + recom[0].photos[0] + ')', height: clientHeight - 1 + 'px'}")
  .warp(v-if="!searching",:style = "{width: clientWidth - 10 + 'px', height: clientHeight * (catalogs.length + 1) + 'px', 'top': 100+ 'px', left: '10px'}")
    .information(:style="{'line-height' : clientHeight * 0.6 + 'px'}") Lorem Ipsum
      .line
      .subinfo Lorem ipsum dolor sit amet, id pro quis vivendum singulis,
    .gutter(:style = "{width: clientWidth - 10 + 'px',height: clientHeight * catalogs.length + 100 + 'px', 'top': clientHeight * 0.7 + 'px'}")
      .block(:style = "{height : clientHeight + 'px'}")
      .block(:style = "{height : clientHeight + 'px'}")
      .block(:style = "{height : clientHeight + 'px'}")
</template>

<script>
import * as actions from 'vuex/actions'
import $ from 'jquery'
import navtool from 'components/global/navtool_px.vue'
import searching from 'components/global/searching.vue'
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
    navtool,
    searching
  },
  data() {
    return {
      searching : 0,
      fold : false,
      searchMsg: '',
      clientHeight: 0,
      clientWidth: 0,
      items: [],
      recom: [],
      catalogs: [],
    }
  },
  props: {
  },
  methods: {
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
    searchItems() {
      let startString = '<span style="background-color: #d7d7bc">'
      let endString = '</span>'


      if (this.searchMsg == '') return this.items
            let items = this.items
      let list = []
      for (let i in items) {
        items[i].name = items[i].name.split(startString).join('')
        items[i].name = items[i].name.split(endString).join('')
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
      return list
    }
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
          this.items = response.items
          this.recom = response.recom
          this.catalogs = response.catalogs
        }
    });
  },
  ready () {
    if (!this.IsPC()) {
      console.log("hi")
      this.$router.go("/catalog.mobile")
    }

  var p=0,t=0;
  $("#app").scroll(function(e){
    p = $("#app").scrollTop();
    if(t<=p && t> 1){
       $("#ecrin-header").addClass("hidden");
    }
    else{
        $("#ecrin-header").removeClass("hidden");
    }
    setTimeout(function(){t = p;},0);
  });

    this.clientHeight = document.body.clientHeight
    this.clientWidth = document.body.clientWidth
    window.onresize = () => {
      this.clientHeight = document.body.clientHeight
      this.clientWidth = document.body.clientWidth
    }
    $(".trigger").click(() => {
      $(".menu").toggleClass("active");
      console.log(this.fold)
      this.fold = this.fold ? false : true
    });
    $("#inpt_search").on('focus', function () {
      $(this).parent('label').addClass('active');
    });

    $("#inpt_search").on('blur', function () {
      if($(this).val().length == 0)
        $(this).parent('label').removeClass('active');
    });

  },
  beforeDestroy () {
  }
}
</script>

<style lang="scss" scoped>

.app {
  position: relative;
  background-color: white;
  font-family: "Century Gothic","Futura",sans-serif;
  transition: transform 1s;
}


.hero {
  min-width: 888px;
  position: fixed;
  top: 100px;
  width: 100%;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 0px -120px
}

.warp {
  position: absolute;
  z-index: 10;
  width: 100%;
  .information {
    font-size: 50px;
    text-align: center;
    line-height: 100px;
    color: white;
    position: relative;
    .line {
      position: absolute;
      height: 0px;
      width: 400px;
      border: 1px solid white;
      left: 50%;
      transform: translateX(-200px);
      top: 60%
    }
    .subinfo {
      position: absolute;
      height: 100px;
      width: 300px;
      left: 50%;
      transform: translateX(-150px);
      top: 65%;
      line-height: 15px;
      font-size: 15px;
    }
  }
  .gutter {
    position: absolute;
    background-color: white;
    .block {
      width: 96%;
      background-color: #e7e7e7;
      margin: 1%;
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
