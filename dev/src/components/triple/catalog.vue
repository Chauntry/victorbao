<template lang="jade">

.app(@click="notsearching")
  div#ecrin-header
    .cntr(@click="searching = 2")
      .cntr-innr
        label.search
          input(id="inpt_search",type="text",v-model="searchMsg",@mouseover="searching = 1",@mouseout="notsearching")
    a.logo Triple
    //- .catalog
    //-   .dir()
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
      recom: [],
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

#ecrin-header {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 6;
  width: 100%;
  height: 50px;
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
  font-size: 30px;
  line-height: 45px;
  margin-left: 45%;
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
</style>
