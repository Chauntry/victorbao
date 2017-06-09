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
  .hero(v-if= "recom[0]", :style = "{'background-image' : 'url(' + heroPhoto + ')', height: clientHeight - 1 + 'px'}")
  .warp(:style = "{width: clientWidth - 10 + 'px', height: clientHeight * (catalogs.length + 1) + 'px', 'top': 100+ 'px', left: '10px'}")
    .information(:style="{'line-height' : clientHeight * 0.6 + 'px'}") {{currentcatalog}}
      .line
      .subinfo Lorem ipsum dolor sit amet, id pro quis vivendum singulis,
    .gutter-background(:style = "{width: clientWidth - 10 + 'px',height: clientHeight * catalogs.length + 100 + 'px', 'top': clientHeight * 0.7 + 'px'}")
    .gutter(:style = "{width: clientWidth - 10 + 'px',height: clientHeight * catalogs.length + 100 + 'px', 'top': clientHeight * 0.7 + 'px'}")
      .block(v-for = "item in showItems",:style = "{'background-image' : 'url(' + item.photos[0] + ')', width: (clientWidth - 10) * 0.315 + 'px', height: (clientWidth - 10) * 0.315+ 'px'}", @mouseover= "currentTouchBlock = $index", @mouseout= "currentTouchBlock = -1", @click = "$router.go('/item/' + item.id)")
        .layer(:style = "{animation : currentTouchBlock== $index ? 'downtoup 0.2s' : '', bottom: currentTouchBlock== $index ? 0 : '-100%'}")
        .text(:style = "{animation : currentTouchBlock== $index ? 'downtoup 0.2s' : '', bottom: currentTouchBlock== $index ? 0 : '-100%'}")
          {{item.name}}

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
      currentTouchBlock: -1,
      currentcatalog : '',
      searching : 0,
      fold : false,
      searchMsg: '',
      clientHeight: 0,
      clientWidth: 0,
      items: [],
      recom: [],
      showItems: [],
      catalogs: [],
      heroPhoto: '',
    }
  },
  props: {
  },
  methods: {
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
    searchItems() {
      let startString = '<span style="background-color: #d7d7bc">'
      let endString = '</span>'

      console.log(this.searchMsg)
      if (this.searchMsg == '') return this.items
            let items = this.items
      let list = []
      for (let i in items) {
        items[i].name = items[i].name.split(startString).join('')
        items[i].name = items[i].name.split(endString).join('')
        console.log(items[i].name)
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
          console.log(response)
          this.items = response.items
          this.recom = response.recom
          this.catalogs = response.catalogs
          this.changeCatalogs(this.$route.params.cata)
        }
    });
  },
  ready () {

    if (!this.IsPC()) {
      this.$router.go("/index.mobile")
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
      if (this.clientWidth <= 800) {
        this.clientWidth = 800
      }
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
  box-shadow: 1rem 0rem 1rem #112541;
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
  min-width: 888px;
  position: absolute;
  z-index: 10;
  width: 100%;
  .information {
    text-transform: uppercase;
    font-size: 50px;
    text-align: center;
    line-height: 100px;
    color: white;
    .line {
      position: absolute;
      height: 0px;
      width: 400px;
      border: 1px solid white;
      left: 50%;
      transform: translateX(-200px);
      top: 250px
    }
    .subinfo {
      position: absolute;
      height: 100px;
      width: 300px;
      left: 50%;
      transform: translateX(-150px);
      top: 260px;
      line-height: 15px;
      font-size: 15px;
    }
  }
  .gutter-background {
    position: absolute;
    opacity: 0.2;
    background-color: white;
  }
  .gutter {
    position: absolute;
    .block {
      min-width: 200px;
      height: 500px;
      position: relative;
      width: 30%;
      background-color: #e7e7e7;
      margin-top: 1%;
      margin-left: 1%;
      float: left;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      overflow: hidden;
      .layer {
        position: absolute;
        height: 100%;
        width: 100%;
        opacity: 0.8;
        background-color: white;
        bottom: -100%;
      }
      .text{
        position: absolute;
        font-size: 30px;
        text-transform: uppercase;
        color: black;
        padding-bottom: 20px;
        left: 20px;
        font-family: TrumpGothicEas;
        font-weight: 400;
      }
    }
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
