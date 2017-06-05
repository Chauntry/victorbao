<template lang="html">
<div class= "app" :style="{'transform': fold ? 'translateX(-15rem)' : ''}">
  <div class="menulist">
    <ul>
      <li>homapage</li>
      <li>contact</li>
    </ul>
  </div>

  <div id="ecrin-header">
  <navtool></navtool>
   <a class="logo">Triple</a>
  </div>

  <div id="page" class="page">


   <div class="content" id="dior-mobile">
    <div id="ecrin-search" class="js-ecrin-search">
     <a class="button-back" href="#/triple.mobile/jewelry">Back</a>

     <div id="ecrin-search-form" class="search-form js-autocomplete-form">
          <div class = "icon"> </div>
      <input type="text" class="text autocomplete-input js-autocomplete-input" name="q" placeholder="Search..." autocomplete="off" v-model="searchMsg"/>
      <ul class="autocomplete-list js-autocomplete-list"></ul>
      <input type="submit" class="ok" value="OK" />
     </div>
    </div>

   <div v-if= "!searchMsg" id="menuOverlay"></div>
   <h3 v-if= "!searchMsg" v-html= "displayItem.name" > {{displayItem.name}} </h3>
   <div v-if= "!searchMsg" id="scroll"><scroll v-if= "displayItem.photos" :photos= "displayItem.photos"></scroll>

    </div>

    <h1 v-if= "!searchMsg" v-html="displayItem.price" >
      {{displayItem.price == 'N/A' ? '' : displayItem.price}}
    </h1>

    <div class="gamme-grid" :style="searchMsg ? '' : {'margin-top': '3rem'}">
      <h3 v-if= "!searchMsg" > <span>SUGGESTIONS</span> </h3>

      <ul data-category="Rose_des_vents" class="js-category">
        <li v-if= "!searchMsg" v-for="id in pageIndex.suggestion">
          <a href="#/triple.mobile/jewelry/{{id}}" class="packshot" @click = "reload(id)" >
          <img :src="findDisplayItem(id).photos[0]" alt="" /></a>
          <div>
           <a  href="#/triple.mobile/jewelry/{{id}}" @click = "reload(id)">
             <h4> {{findDisplayItem(id).name}} </h4>
             <p></p>
             <span class="price" v-html="findDisplayItem(id).price">
               {{findDisplayItem(id).price}}
             </span>
           </a>
          </div>
        </li>
        <li v-if= "searchMsg" v-for="item in searchItems">
          <a @click = "reload(item.id)" href="#/triple.mobile/jewelry/{{item.id}}" class="packshot">
          <img :src="item.photos[0]"/></a>
          <div>
           <a @click = "reload(item.id)" href="#/triple.mobile/jewelry/{{item.id}}">
             <h4 v-html="item.name"> {{item.name}} </h4>
             <p></p>
             <span class="price" v-html= "item.price">{{item.price}}</span>
           </a>
          </div>
        </li>
      </ul>
    </div>


    <div id="ecrin-footer" data-role="footer" class="ecrin-global ecrin-white-footer">

     <div id="ecrin-footer-wrapper" class="border-top">
       <a href="#/triple.mobile/jewelry" class="ecrin-footer-buttons">Contact</a>
     </div>


     <div id="ecrin-footer-links">
      <nav>
       <ul>
        <li> <a href="#/triple.mobile/jewelry">Boutiques</a></li>
        <li> <a href="#/triple.mobile/jewelry">Contact</a></li>
        <li><a href="#/triple.mobile/jewelry">My Account</a></li>
       </ul>
       <ul>
        <li> <a href="#/triple.mobile/jewelry">Legal Terms</a></li>
        <li> <a href="#/triple.mobile/jewelry">Personal Data</a></li>
        <li> <a href="#/triple.mobile/jewelry">CAREERS</a></li>
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
import navtool from 'components/global/navtool.vue'
import eye from 'components/triple/goods/eye.vue'
import scroll from 'components/triple/scrollthree.vue'
import scrollnav from 'components/global/scrollnav.vue'
export default {
  vuex: {
    getters: {
      count: state => state.index.count,
    },
    actions
  },
  components: {
    eye,
    navtool,
    scroll,
    scrollnav
  },
  data() {
    return {
      searchMsg: '',
      pageIndex: {},
      displayItem: {},
      fold : false,
      predisplayControl: {
        eye : 0,
        other : 0
      },
      displayControl: {
        eye : 0,
        other : 0
      },
      eyecolor: '#fff',
      clientHeight: 0,
      clientWidth: 0,
      eyeHeight: 0,
      touching: null,
      mouseDownLocation: [0, 0],
      mouseCurrentLocation: [0, 0],
    }
  },
  props: {
  },
  methods: {
    findDisplayItem( id ) {
      for (let i in this.pageIndex.items) {
        if (this.pageIndex.items[i].id == id)
          return this.pageIndex.items[i]
      }
      return {}
    },
    reload(id) {
      console.log(111)
      this.searchMsg = ''
      this.displayItem = {}
      setTimeout(()=> {this.displayItem = this.findDisplayItem(id)},10)
    }
  },
  computed: {
    searchItems() {
      let startString = '<span style="background-color: #d7d7bc">'
      let endString = '</span>'

      console.log(this.searchMsg)
      let items = this.pageIndex.items
      if (this.searchMsg == '') return this.pageIndex.items
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
          this.pageIndex = response
          //this.pageIndex.suggestion = [1,3,4]
          this.displayItem = this.findDisplayItem(this.$route.params.id)
          console.log(this.displayItem)
        }
    });
  },
  ready () {

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
    this.marilynHeight = this.clientHeight * 0.6
    this.eyeHeight = this.clientHeight * 0.6
    this.eyecolor = this.$route.query.eyecolor ? this.$route.query.eyecolor : this.eyecolor
    $(".trigger").click(() => {
      $(".menu").toggleClass("active");
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

<style lang="css" scoped>
.app {
  position: relative;
  background-color: white;
  font-family: "Century Gothic","Futura",sans-serif;
  box-shadow: 1rem 0rem 1rem #112541;
  transition: transform 1s;
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

h3 {
  font-weight: normal;
  text-align: center;
  text-transform: uppercase;
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

#ecrin-header {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    z-index: 6;
    width: 100%;
    height: 3.8rem;
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
  font-size: 2.3rem;
  line-height: 3.7rem;
  margin-left: 4%;
}

#ecrin-header.hidden {
    transform: translate(0, -3.9rem);
    -webkit-backface-visibility: hidden
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
    padding-top: 3.9rem
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


#scroll {
  margin-top: 1rem;
  margin-bottom: 18rem;
    width: 100%;
    height: 6rem;
    position: relative;
}
#ecrin-search {
    position: relative;
    display: block;
    z-index: 1;
    width: 100%;
    background: #fff;
    padding: 7px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-transition: top,0.5s,ease-in-out;
    -o-transition: top,0.5s,ease-in-out;
    -webkit-transition: top,0.5s,ease-in-out;
    transition: top,0.5s,ease-in-out
}
#ecrin-search .icon{
    height: 35px;
    width: 35px;
    position: absolute;

    display: block;
    background-image: url('~assets/search.png');
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
}
#ecrin-search .search-form {
    position: relative;
    display: block;
    width: 100%;
    height: 35px
}


#ecrin-search input[type='text'],#ecrin-search .button-back {
    height: 100%;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #8e8e8e;
    font-size: 13px;
    font-family: "Century Gothic","Futura",sans-serif;
    text-transform: uppercase;
    text-decoration: none;
    color: #8e8e8e;
    cursor: pointer
}

#ecrin-search input[type=text] {
    width: 100%;
    outline: 0;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 40px
}

#ecrin-search input::-webkit-input-placeholder {
    color: #8e8e8e
}

#ecrin-search input[type="submit"] {
    visibility: hidden;
    height: 0;
    width: 0
}

#ecrin-search .button-back {
    position: absolute;
    left: 7px;
    top: 7px;
    width: 90px;
    height: 35px;
    line-height: 35px;
    vertical-align: middle;
    text-align: center;
    z-index: 2
}

#ecrin-search .button-back+.search-form {
    width: 100%;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 100px
}

#ecrin-search .button-back+.search-form:before {
    left: 110px
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
  color: #8e8e8e;
  font-family: "Century Gothic","Futura",sans-serif
}

.gamme-grid a {
  color: #8e8e8e;
  font-family: "Century Gothic","Futura",sans-serif
}

.gamme-grid h3 {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  padding: 17.5px 5%;
  display: table;
  text-transform: uppercase;
  border-bottom: 1px solid #e6e6e6;
  font-size: 15px;
  color: #000;
  -webkit-transition: 0.4s opacity ease-in-out;
  -moz-transition: 0.4s opacity ease-in-out;
  -ms-transition: 0.4s opacity ease-in-out;
  -o-transition: 0.4s opacity ease-in-out;
  transition: 0.4s opacity ease-in-out
}

.gamme-grid h3 > span {
  display: table-cell;
  vertical-align: middle
}

.gamme-grid h3 > span span {
  display: block;
  color: #8e8e8e;
  text-transform: none;
  margin-top: 8px;
  font-size: 10px
}

.gamme-grid h3.hidden {
  display: none;
  opacity: 0
}

.gamme-grid p {
  text-transform: uppercase;
  line-height: 16px
}

.gamme-grid .logo {
  margin-top: 20px;
  max-width: 90%
}

.gamme-grid ul {
  overflow: hidden;
  font-family: "Century Gothic","Futura",sans-serif
}

.gamme-grid > ul > li,.gamme-grid > ul > .more-zone > li {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  padding: 30px 5% 0;
  display: table;
  overflow: hidden;
  font-size: 13px;
  visibility: visible;
  opacity: 1;
  -webkit-transition: 0.6s opacity ease-in-out;
  -moz-transition: 0.6s opacity ease-in-out;
  -ms-transition: 0.6s opacity ease-in-out;
  -o-transition: 0.6s opacity ease-in-out;
  transition: 0.6s opacity ease-in-out
}

.gamme-grid > ul > li:not(:last-of-type),.gamme-grid > ul > .more-zone > li:not(:last-of-type) {
  border-bottom: 1px solid #e6e6e6
}

.gamme-grid > ul > li div,.gamme-grid > ul > .more-zone > li div {
  width: 60%;
  display: table-cell;
  vertical-align: middle;
  overflow: hidden
}

.gamme-grid > ul > li a.packshot,.gamme-grid > ul > .more-zone > li a.packshot {
  width: 40%;
  display: table-cell;
  vertical-align: middle;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-right: 5%
}

.gamme-grid > ul > li a.packshot img,.gamme-grid > ul > .more-zone > li a.packshot img {
  display: block;
  width: 100%;
  min-width: 100%;
  margin-bottom: 30px
}

.gamme-grid > ul > li span,.gamme-grid > ul > .more-zone > li span {
  display: block;
  margin-top: 15px
}

.gamme-grid > ul > li h4,.gamme-grid > ul > .more-zone > li h4 {
  margin-bottom: 5px;
  line-height: 18px;
  font-size: 14px;
  text-transform: uppercase;
  color: #000
}

.gamme-grid > ul > li h4 span,.gamme-grid > ul > .more-zone > li h4 span {
  display: block
}

.gamme-grid > ul > .more-zone {
  display: none
}

.gamme-grid > ul > .more-zone > li:first-of-type {
  border-top: 1px solid #e6e6e6
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
  float: left;
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

</style>
