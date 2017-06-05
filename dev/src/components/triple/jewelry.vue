<template lang="html">
<div class= "app" @click="notsearching">
  <div class="menulist" :style="{'transform': fold ? 'translateX(-15rem)' : ''}">
    <ul>
      <li>homapage</li>
      <li>contact</li>
    </ul>
  </div>
  <div id="ecrin-header">
    <navtool :style="{visibility: !searching ? 'visible' : 'hidden'}"></navtool>
    <div class="cntr" @click="searching = 2">
      <div class="cntr-innr">
        <label class="search">
        <input id="inpt_search" type="text" v-model="searchMsg" @mouseover="searching = 1"  @mouseout="notsearching"></input>
        </label>
      </div>
    </div>
    <a class="logo">Triple</a>
  </div>
  <div id="page" class="page">
    <div id="menuOverlay"></div>
    <div class="content" id="dior-mobile">
      <div v-if= "!searchMsg" id="wrapper" class="page-home-news" data-page="home-news" data-track-univers="CDC" data-track-page="PDG">
        <div class="padded-content border-bottom">
          <h1 class="title centered">
          <a v-if = "recom[0]" class="new-campaign" href="#/index/{{recom[0].id}}">
          <img :src="recom[0].photos[0]"/>
          </a>
        </div>
      </div>
      <div class="gamme-grid" :style="!searchMsg ? '' : {'margin-top': '100px'}">
        <h3 class="grid_header" v-if= "!searchMsg" > <span>THE COLLECTION</span> </h3>
        <ul data-category="Rose_des_vents" class="js-category">
          <li v-for="item in searchItems">
            <a href="#/index/{{item.id}}" class="packshot">
              <div class="dsimg" ><img :src="item.photos[0]"/></img> </div>
              <div>
            <a href="#/index/{{item.id}}">
            <h1 v-html= "item.name"> {{item.name}} </h1>
            <p></p>
            <span class="price" v-html= "item.price">{{item.price}}</span>
            </a>
            </div>
          </li>
        </ul>
      </div>
      <div id="ecrin-footer" data-role="footer" class="ecrin-global ecrin-white-footer">
        <div id="ecrin-footer-wrapper" class="border-top">
          <a href="#/index" class="ecrin-footer-buttons">Contact</a>
        </div>
        <div id="ecrin-footer-links">
          <nav>
            <ul>
              <li> <a href="#/index">Boutiques</a></li>
              <li> <a href="#/index">Contact</a></li>
              <li><a href="#/index">My Account</a></li>
            </ul>
            <ul>
              <li> <a href="#/index">Legal Terms</a></li>
              <li> <a href="#/index">Personal Data</a></li>
              <li> <a href="#/index">CAREERS</a></li>
            </ul>
          </nav>
        </div>
      </div>
      <!-- END FOOTER -->
    </div>
    <!-- END CONTENT -->
  </div>
</div>

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
      searching : 0,
      fold : false,
      searchMsg: '',
      clientHeight: 0,
      clientWidth: 0,
      items: [],
      recom: []
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
          // console.log(response)
          this.items = response.items
          this.recom = response.recom
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
  box-shadow: 1rem 0rem 1rem #112541;
    transition: transform 1s;
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

.menulist{
  position: absolute;
  transform: translateX(110%);
  height: 100%;
  color: white;
  width: 100%;
  font-size: 2rem;
  text-transform: uppercase;
}

#ecrin-header {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    z-index: 6;
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

#ecrin-header a{
  color: white;
  font-size: 70px;
  line-height: 90px;
  margin-left: 0%;
}


#page {
    width: 100%;
    max-width: 100%;
    position: relative;
    z-index: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
    padding-top: 65px
}
#menuOverlay {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
    z-index: 1;
    background: rgba(0,0,0,0.6);
    display: none;
    -moz-transition: opacity 0.5s ease-in;
    -o-transition: opacity 0.5s ease-in;
    -webkit-transition: opacity 0.5s ease-in;
    transition: opacity 0.5s ease-in
}

.page-home-news {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
}

.padded-content {
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px
}

img {
      max-width: 100%;
}
h1 {
  text-transform: uppercase;
  margin-bottom: 7px;
  padding: 20px;
  width: 100%;
  font-size: 25px;
  text-transform: uppercase;
}

.gamme-grid {
  clear: both;
  width: 80%;
  min-width: 800px;
  position: relative;
  padding-bottom: 100px;
  margin: 0 auto;
}

.gamme-grid h3 {
  text-align: center;
  border-bottom: 1px solid #cccccc;
  letter-spacing: -0.02em;
  font-weight: normal;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  text-transform: uppercase;

  font-size: 40px;
  color: #000;
  transition: 0.4s opacity ease-in-out;
  padding-bottom: 4px;
}



.gamme-grid ul {
  margin-top: 20px;
}

.gamme-grid ul li {
  border: 1px solid #e5e5e5;
  min-width: 200px;
  height: 500px;
  position: relative;
  width: 30%;
  float: left;
  text-align: center;
  color: #040a2b;
  margin-bottom: 50px;
  .dsimg {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    transform: translateY(50%);
    img {
      transform: translateY(-50%);
      position: relative;
      width: 100%;
    }
  }
}

.gamme-grid ul li:nth-child(3n+1) {
  margin-right: 5%;
}
.gamme-grid ul li:nth-child(3n+2) {
}
.gamme-grid ul li:nth-child(3n) {
  margin-left: 5%;
}



.gamme-grid .generic-more {
  margin-top: 15px;
  position: relative;
  left: 50%;
  -webkit-transform: translate(-50%,0);
  -moz-transform: translate(-50%,0);
  -ms-transform: translate(-50%,0);
  -o-transform: translate(-50%,0);
  transform: translate(-50%,0)
}

.gamme-grid .covering {
  font-family: "Century Gothic","Futura",sans-serif
}

.gamme-grid .covering b {
  width: 8px;
  height: 8px;
  display: inline-block;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  -moz-background-clip: padding;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  background: #cecece
}

.gamme-grid .covering b:after {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  -webkit-border-radius: 8px 8px 8px 8px;
  -moz-border-radius: 8px 8px 8px 8px;
  border-radius: 8px 8px 8px 8px;
  -moz-background-clip: padding;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  background: #363739
}

.gamme-grid .covering b.half:after {
  width: 4px;
  -webkit-border-radius: 8px 0 0 8px;
  -moz-border-radius: 8px 0 0 8px;
  border-radius: 8px 0 0 8px;
  -moz-background-clip: padding;
  -webkit-background-clip: padding-box;
  background-clip: padding-box
}

.gamme-grid .covering b.empty:after {
  display: none
}

.gamme-grid .shade-list {
  width: 155px;
  margin-top: 20px;
  margin-bottom: -2px
}

.gamme-grid .shade-list li {
  width: 27px;
  height: auto;
  margin: 2px;
  padding: 0;
  display: block;
  float: left;
  border: 0
}

.gamme-grid .shade-list img {
  display: block;
  width: 100%;
  height: auto
}

.gamme-grid .cta {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 151px;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 2px;
  display: block;
  float: left;
  line-height: 13px;
  text-transform: none;
  text-align: center;
  font-size: 11px;
  color: #8e8e8e;
  border: 1px solid #e6e6e6
}

.gamme-grid .price {
  font-size: 20px;
  clear: left;
  color: #000;
  margin-bottom: 30px;
  margin-top: 20px;
  font-family: "Century Gothic","Futura",sans-serif
}

.gamme-grid .unavailable {
  clear: left;
  float: left;
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 10px;
  font-family: "Century Gothic","Futura",sans-serif
}

.gamme-grid ul.tag-list {
  position: relative;
  display: block;
  clear: both;
  font-family: "Century Gothic","Futura",sans-serif
}

.gamme-grid ul.tag-list li {
  padding: 0 10px;
  text-transform: uppercase;
  margin-bottom: 5px;
  font-size: 11px;
  line-height: 11px
}

.gamme-grid ul.tag-list li.exclu {
  color: #c29b6d
}

.gamme-grid ul.tag-list li:before {
  content: "#";
  display: block;
  position: absolute;
  left: 0
}

.gamme-grid.has-filters > ul > li {
  display: none
}

.gamme-grid.has-filters.show-exclu > ul > li.exclu {
  display: block;
  opacity: 1
}

.gamme-grid.has-filters.show-new > ul > li.new {
  display: block;
  opacity: 1
}


#ecrin-footer-wrapper {
    width: 100%;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 20px 20px 0;
    overflow: hidden
}
.ecrin-footer-buttons{
    background-color: #fff;
    color: #000;
    border: 1px solid #e0e0e0;
    padding-top: 20px;
    padding-bottom: 20px;
    display: block;
    width: 50%;
    margin-left: 25%;
    margin-bottom: 2rem;
    font-size: 15px;

    text-transform: uppercase;
    text-align: center;
    text-decoration: none;
}


#ecrin-footer-links{
    width: 100%;
    padding: 30px 35px;
    background-color: #000;
    display: block;
    float: left;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

#ecrin-footer-links li{
    min-height: 26px;
    padding: 5px 0;
        position: relative;
    min-height: 25px;
    font-size: 12px;
    vertical-align: middle;
}
#ecrin-footer-links ul{
    width: 45%;
    float: left;
        list-style: none;
}

#ecrin-footer-links li a{
    display: block;
    line-height: 13px;
    width: 100%;
    color: #e0e0e0;
    text-decoration: none;
    text-transform: uppercase;
}

.cntr {
  z-index: 10005;
  display: table;
  position: fixed;
  top: 0;
  right: 10%;
  width: 100px;
  height: 100px;
  .cntr-innr {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    .search {
      color: white;
      display: inline-block;
      position: relative;
      height: 35px;
      width: 35px;
      box-sizing: border-box;
      margin: 0px 8px 7px 0px;
      padding: 7px 9px 0px 9px;
      border: 5px solid #fff;
      border-radius: 25px;
      transition: all 200ms ease;
      cursor: text;
      &:after {
        content: "";
        position: absolute;
        width: 5px;
        height: 20px;
        right: -5px;
        top: 21px;
        background: #fff;
        border-radius: 3px;
        transform: rotate(-45deg);
        transition: all 200ms ease;
      }
      &.active,
      &:hover {
        height: 50px;
        width: 500px;
        transform: translateX(-300px);
        &:after {
          height: 0px;
        }
      }
      input {
        text-align: center;
        transform: translateY(-10px);
        height: 50px;
        color: white;
        width: 100%;
        border: none;
        box-sizing: border-box;
        font-family: Helvetica;
        font-size: 30px;
        color: inherit;
        background: transparent;
        outline-width: 0px;
      }
    }
  }
}
</style>
