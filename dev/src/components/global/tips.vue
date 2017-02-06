<template lang="html">
<div class="container">
  <h1>Guided tour tooltip</h1>
  <span class="close"></span>

  <div class="slider-container">
    <div class="slider-turn">
      <p>
        Guided tour tooltip inspired by Jonathan Moreira
      </p>

      <p>
        Dribbble shot visible at
        <a href="http://dribbble.com/shots/1216346-Guided-tour-tooltip" title="Dribbble shot" target="_blank">this link</a>
      </p>

      <p>
        Codepen by Yoann Helin
      </p>

      <p>
        <a href="https://twitter.com/YoannHELIN" title="Twitter" target="_blank">Twitter : @YoannHELIN</a>

      </p>

      <p>Thank you !</p>
    </div>
  </div>

  <div class="bottom">
    <div class="step">
      <span></span>
      <ul>
        <li data-num="1"></li>
        <li data-num="2"></li>
        <li data-num="3"></li>
        <li data-num="4"></li>
        <li data-num="5"></li>
      </div>
    </ul>
    <button class="btn">Next</button>
  </div>
</div>
<button class="open">Open</button>

</template>

<script>
import * as actions from 'vuex/actions'
export default {
  vuex: {
    getters: {
      count: state => state.index.count,
    },
    actions
  },
  components: {
  },
  data() {
    return {
    }
  },
  props: {
    exist: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: "I don't known this instruction"
    }
  },
  methods: {
    notexist () {
      this.exist = false
    },
  },
  computed: {
  },
  route: {
  },
  created () {
  },
  ready () {
//  Inspired by Jonathan Moreira

//  http://dribbble.com/shots/1216346-Guided-tour-tooltip

// code by YoannHELIN http://yoannhelin.fr/

  // $(document).ready(function () {
  //   var nbP = $('.container p').length;
  //   var w = parseInt($('.container p').css("width"));
  //   var max = (nbP - 1) * w;
  //   $("ul li[data-num='1']").addClass('active');
  //   $('.step span').html('Step 1');

  //   $('body').on('click','.btn', function(){
  //     var margL = parseInt($('.slider-turn').css('margin-left'));
  //     var modulo = margL%w;
  //     if (-margL < max && modulo == 0) {
  //       margL -= w;

  //       $('.slider-turn').animate({
  //         'margin-left':margL
  //       },300);
  //       $('ul li.active').addClass('true').removeClass('active');
  //       var x = -margL/w +1;
  //       $('ul li[data-num="'+x+'"]').addClass('active');
  //       $('.step span').html("Step "+x);
  //     }
  //     else  {}
  //   });

  //   $('body').on('click','.close',function(){
  //     $('.container').animate({
  //       'opacity':0
  //     },600);
  //     $('.container').animate({
  //       'top':-1200
  //     }, {
  //       duration: 2300,
  //       queue: false
  //     });
  //     $('.open').animate({
  //       'top':'50%'
  //     });
  //   });

  //   $('body').on('click','.open',function() {
  //     $('.open').animate({
  //       'top':-1000
  //     });
  //     $('.container').animate({
  //       'opacity':1
  //     },400);
  //     $('.container').animate({
  //       'top':'50%'
  //     }, {
  //       duration: 800,
  //       queue: false
  //     });
  //   });
  // });
  },
  beforeDestroy () {
  }
}
</script>

<style lang="css" scoped>
@import url(http://fonts.googleapis.com/css?family=Muli);
body {
  width:100%;
  height:100%;
  margin:0;
  padding:0;
  background-color:#B6BCC9;
  font-family:'Muli';
}

* {outline:none}

h1 {
  font-size: 25px;
  font-weight: 100;
  color: #2C2C2C;
  margin: 20px 25px;
}

a {
  text-decoration:none;
  color:#3476CA;

  &:hover {
    color:#6CB5F3;
  }
}

.open{
  position:fixed;
  width:100px;
  height:40px;
  left:50%;
  top:-1000px;
  margin-left:-80px;
  margin-top:-30px;
  border:1px solid #ccc;
  background-color:#fff;
  border-radius:6px;
  padding:10px 30px;
  color:#444;
  transition:all ease-out .6s;

  &:hover {
    border:1px solid #aaa;
    box-shadow:0 0 8px #ccc inset;
    transition:all ease-out .6s;
  }
}

.container {
  position:fixed;
  width:400px;
  height:238px;
  left:50%;
  top:50%;
  margin-top:-119px;
  margin-left:-200px;
  background-color:#F3F3F3;
  border-radius:6px;
  box-shadow:0px 0px 24px rgba(0, 0, 0, 0.4);

  &:before {
    content: '';
    position: absolute;
    left: -14px;
    top: 28px;
    border-style: solid;
    border-width: 10px 14px 10px 0;
    border-color: rgba(0, 0, 0, 0) #F3F3F3 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
  }

  & p {
    width:350px;
    font-size: 16px;
    color: #a8aab2;
    font-weight: 400;
    line-height: 28px;
    float:left;
    margin:0;
  }

  & .bottom{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display:flex;
    width:100%;
    bottom:0;
    position:absolute;

    & .step {
      flex:3;
      -webkit-flex:3;
      -ms-flex:3;
      width:100%;
      height:54px;
      background-color:#373942;
      border-bottom-left-radius:6px;
      display:flex;

      & span {
        flex:1;
        -webkit-flex:1;
        -ms-flex:1;
        line-height:54px;
        color:#fff;
        margin-left:25px;
        font-size:18px;
      }
      & ul {
        flex:2;
        -webkit-flex:2;
        -ms-flex:2;
        list-style:none;
        height: 10px;
        margin: 23px 0;
        padding-left: 15px;

        & li {
          position:relative;
          height:7px;
          width:7px;
          margin:0 10px;
          float:left;
          border-radius:50%;
          background-color:none;
          border:1px solid #535560;

          &:first-child:before {
            width:0;
          }

          &:before {
           content: '';
           position: absolute;
           width: 20px;
           border-top: 1px solid #535560;
           left: -21px;
           top: 3px;
          }

          &.true {
            background-color:#7a7d86;
          }

          &.active {
            background-color:#fff;
            box-shadow:0 0 6px rgba(255, 255, 255, 0.78);
          }
        }
      }
    }
  }
}

.close {
  cursor:pointer;

  &:before, &:after{
    content: "";
    position: absolute;
    height: 13px;
    width: 13px;
    top: 26px;
    right: 31px;
    border-top: 2px solid #7c7c7c;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  &:before {
    right: 40px;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}
.btn {
  flex:1;
  background-color:#6cb5f3;
  border:0;
  margin:0;
  padding:0;
  text-transform:uppercase;
  color:#fff;
  font-weight:bold;
  border-bottom-right-radius:6px;
  cursor:pointer;
  transition:all .3s;
}
.btn:hover {
  background-color:#6BA5D6;
  transition:all .3s;
}
.btn:active {
  background-color:#5F8AAF;
}

.slider-container {
  width:350px;
  margin:0 25px;
  overflow:hidden;
}
.slider-turn{
  width:10000px;
}
</style>
