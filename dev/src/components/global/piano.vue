<template lang="html">
<div class = "ground">
  <div class= "display"> {{letterList}} </div>
  <div class = "film" v-if= "enablelogin" @click = "reinit"></div>
  <login v-if= "enablelogin"> </login>
  <div class="keyboard">
    <button class="key" data-bind="L" data-note="B" data-octave="4"></button>
    <button class="key" data-bind="O" data-note="c" data-octave="5"></button>
    <button class="key" data-bind="R" data-note="c#" data-octave="5"></button>
    <button class="key" data-bind="G" data-note="d" data-octave="5"></button>
    <button class="key" data-bind="E" data-note="d#" data-octave="5"></button>
    <button class="key" data-bind="I" data-note="e" data-octave="5"></button>
    <button class="key" data-bind="N" data-note="f" data-octave="5"></button>
    <button class="key" data-bind="G" data-note="f#" data-octave="5"></button>
    <button class="key" data-bind="T" data-note="g" data-octave="5"></button>
    <button class="key" data-bind="S" data-note="g#" data-octave="5"></button>
    <button class="key" data-bind="O" data-note="a" data-octave="5"></button>
    <button class="key" data-bind="E" data-note="a#" data-octave="5"></button>
    <button class="key" data-bind="U" data-note="b" data-octave="5"></button>
    <button class="key" data-bind="R" data-note="C" data-octave="6"></button>
  </div>

  <span class="arrow arrow-animate" @click = "letterList = 'VICTOR BAO'">
    <span class="arrow-item"><span class="curve"></span></span>
    <i></i>
    <span class="arrow-item"><span class="curve"></span></span>
  </span>

</div>
</template>

<script>
import * as actions from 'vuex/actions'
import login from 'components/global/login.vue'
import $ from 'jquery'
export default {
  vuex: {
    getters: {
      count: state => state.index.count,
    },
    actions
  },
  components: {
    login,
  },
  data() {
    return {
      letterList: 'VICTOR BAO',
      enablelogin: false,
    }
  },
  props: {
    exist: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    reinit () {
      this.enablelogin = false
      this.letterList = 'VICTOR BAO'
    }
  },

  computed: {
  },
  route: {
  },
  created () {
  },
  ready () {
    var notes = ['B','c','c#','d','d#','e','f','f#','g','g#','a','a#','b','C'];
    var keybind = ['S','D','R','F','T','G','H','U','J','I','K','O','L','º'];

    $(function(){
      setup();


      $('input[type="radio"]').change(function(){
        var checked = $('input[type="radio"]:checked').attr("id");
          $("html").addClass("keybind");
      });


      $(document).keydown(function(e){
        var pressed = String.fromCharCode(e.which);

        if(keybind.indexOf(pressed) !== -1){
          var index = keybind.indexOf(pressed);

          $('.key[data-note="' + notes[index] + '"]').mousedown();


          setTimeout(function(){
            $(".key").removeClass("active").unbind("mouseover");
          }, 300);
        }
      });

      $(".key").mousedown(function(){
        var $this = $(this);
        var note = $(this).attr("data-note");
        var octave = $(this).attr("data-octave");
        var keyboard = $(this).attr("data-bind");
        play($this, note, octave, keyboard);

        $(".key").mouseover(function(){
          var $this = $(this);
          var note = $(this).attr("data-note");
          var octave = $(this).attr("data-octave");
          var keyboard = $(this).attr("data-bind");
          play($this, note, octave, keyboard);
        });

        $(document).mouseup(function(){
          $(".key").unbind("mouseover");
        });
      });
    });

    function setup() {
    }

    that = this;
    function addANewNote (keyboard) {
      console.log(that.letterList);
      if (that.letterList === 'VICTOR BAO') {
        that.letterList = '' + keyboard;
      }
      else {
        that.letterList = that.letterList + keyboard;
      }
      const orderText = that.letterList;
      if (orderText === 'LOGIN' || orderText === 'REGISTER' || orderText === 'TOUR' || orderText === 'REGSE' || orderText === 'VISITOR' || orderText === 'LOGON' || orderText === 'TOURIST' || orderText === 'SIGNIN'|| orderText === 'SIGNUP' || orderText === 'TOUR') {
        that.enablelogin = true;
      }
    }

    function play($this, note, octave, keyboard) {
      if (that.enablelogin == true) return
      $this.addClass("active");
      window.setTimeout(() => {$this.removeClass("active");}, 300);
      addANewNote(keyboard);
      var play = beeplay().play(note + octave, 3/4);
    }

    /* beeplay.min.js --------- */
    !function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a){window.beeplay=function(b){"use strict";var c=a("./modules/main");return c.prototype.isArray=a("./modules/isArray"),c.prototype.nn=a("./modules/nn"),c.prototype.pd=a("./modules/pd"),c.prototype.pn=a("./modules/pn"),c.prototype.play=a("./modules/play"),c.prototype.start=a("./modules/start"),c.prototype.put=a("./modules/put"),c.prototype.toJSON=a("./modules/toJSON"),new c(b)}},{"./modules/isArray":2,"./modules/main":3,"./modules/nn":4,"./modules/pd":5,"./modules/play":6,"./modules/pn":7,"./modules/put":8,"./modules/start":9,"./modules/toJSON":10}],2:[function(a,b){b.exports=function(a){return Array.isArray?Array.isArray(a):"[object Array]"===Object.prototype.toString.call(a)}},{}],3:[function(a,b){b.exports=function(a){a="object"==typeof a?a:{},this.bpm=a.bpm||120,this.sampleRate=a.sampleRate||44100,this.key=a.key||"C",this.time=a.time||"4/4",this.volume=a.volume||1,this.stack=[],this.currentTime=0;try{var b=window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.oAudioContext||window.msAudioContext;this.context=window.__audioContext__||new b,this.context.sampleRate=this.sampleRate,window.__audioContext__=this.context}catch(c){console.error(c.message)}return this}},{}],4:[function(a,b){b.exports=function(a){var b=["c","c#","d","d#","e","f","f#","g","g#","a","a#","b"],c=-1!==a.indexOf("#")?2:1,d=a.substring(0,c).toLowerCase(),e=Number(a.substring(c))+1;return b.indexOf(d)+12*e}},{}],5:[function(a,b){b.exports=function(a){var b=this.volume/7,c=["pp","p","mp","m","mf","f","ff"];a=a.toLowerCase();var d=(c.indexOf(a)+1)*b;return d}},{}],6:[function(a,b){b.exports=function(a,b,c){return a=this.isArray(a)?a:[a],c=c||"m",this.put(a,b,c),this.start(a,b,c),this}},{}],7:[function(a,b){b.exports=function(a){if(null===a)return-1;var b=this.nn(a),c=this.sampleRate/100,d=b-69,e=Math.abs(d);if(69===b)return c;if(d>0)for(;e--;)c*=Math.pow(2,1/12);else for(;e--;)c/=Math.pow(2,1/12);return c}},{}],8:[function(a,b){b.exports=function(a,b,c){this.stack.push({notes:a,length:b,dynamics:c})}},{}],9:[function(a,b){b.exports=function(a,b,c){var d=this.context,e=this.sampleRate,f=this.bpm,g=this;return a.forEach(function(a){var h=d.createBuffer(1,e,e),i=h.getChannelData(0),j=g.pn(a);if(-1!==j){for(var k=0;60/f*b*e>k;k++)i[k]=Math.sin(2*Math.PI*j*(k/e));var l=d.createGain();l.gain.value=g.pd(c),l.connect(d.destination);var m=d.createBufferSource();m.buffer=h,m.connect(l),m.start(g.currentTime)}}),this.currentTime+=60/f*b,this.time}},{}],10:[function(a,b){b.exports=function(){var a={key:this.key,bpm:this.bpm,frequency:this.frequency,time:this.time,notes:JSON.stringify(this.stack)};return JSON.stringify(a)}},{}]},{},[1,2,3,4,5,6,7,8,9,10]);
  },
  beforeDestroy () {

  }
}
</script>

<style lang="scss" scoped>
@import url(http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300);

$blue : #22475E;
$yellow : #4C4A30;
$red : #421D26;
$radius : 0.2rem;
.ground {
  width: 100%;
  height: 100%;
  background: $blue;
  position: relative;
  overflow: hidden;
}

.display {
  position: absolute;
  color: white;
  display: block;
  font-family: "Open Sans Condensed";
  font-size: 2rem;
  line-height: 2;
  text-align: center;
  top: 0rem;
  width: 100%;
  letter-spacing: 0.5rem;
}

.film {
  height: 100%;
  width: 100%;
  background-color: black;
  position: fixed;
  top: 0;
  right: 0;
  opacity: 0.4;
  z-index: 10;
  cursor: pointer;
}
.keyboard {
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 11rem;
}

.key {
  margin-left: 0;
  margin-right: 0;
  display: inline-block;
  position: relative;
  width: 10%;
  padding-bottom: 35%;
  box-shadow: inset 0 0 0 0.1px rgba(0,0,0,.3);
  background: ivory;
  vertical-align: top;
  cursor: pointer;
  border-radius: $radius;
  border: 0px transparent ;
  transition: 1s;
  color: rgba(255,255,255, .3);

  &:after {
    display: block;
    font-family: "Open Sans Condensed";
    font-size: 1.5rem;
    line-height: 2;
    text-align: center;
    content: attr(data-bind);
    position: absolute;
    left: 0;
    right: 0;
    top: 90%;
  }

  &:hover {
    background: #e6e6d8;
    transition: .2s;
  }

  &.active {
    animation: blacks 300ms;
  }

  &:focus { outline: 0; }

  &:first-child,
  &:last-child {
    opacity: 1;

    // &.active {
    //   animation: secrets 300ms;
    // }
  }
}



[data-note*="#"] {
  position: absolute;
  z-index: 100;
  width: 12.5%;
  background: #111;
  transform-origin: center top;
  transform: translateX(-50%) scale(.6);
  border-radius: 0 0 $radius*1.6 $radius*1.6;

  &:after {
    font-size: 2.5rem;
    top: inherit;
    bottom: 80%;
  }

  &:hover {
    background: #565650;
  }

  &.active {
    animation: whites 300ms;
  }
}

@keyframes secrets {
  to {
    opacity: .2;
    background: #e6e6d8;
  }
}
@keyframes whites {
  from {
    background: #65686b;
    color: ivory;
    text-shadow: 0 0 1rem, 0 0 2rem, 0 0 3rem;
  }
}
@keyframes blacks {
  0% {
    background: ivory;
    color: ivory;
    text-shadow: 0 0 0, 0 0 0, 0 0 0;
  }
  100% {
    background: #e6e6d8;
    color: ivory;
    text-shadow: 0 0 1rem, 0 0 2rem, 0 0 3rem;
  }
}

// width of the arrow (icon)
$w: 0.4rem;
// height of the arrow (icon)
$h: $w;
// color of the arrow (icon)
$c: #fff;



.arrow{
  width: $w;
  height: $h;
  position: absolute;
  display: inline-block;
  right: 5%;
  bottom: 5%;
  cursor: pointer;
  &:before,
  &:after{
    content:'';
    border-color:transparent;
    border-style:solid;
    position: absolute;
  }
  .curve{
    position: absolute;
    overflow: hidden;
    &:before{
      content:'';
      position:absolute;
    }
  }
}
// * * * ARROW ANIMATE * * * (Just for fun)
.arrow-animate{
  -webkit-animation: spin 8s infinite linear;
  margin-left:$w/2;

  $h:$h*3+$h*1.25;
  $w:$w*3+$w*1.25;

  height: $h;
  width: $w;
  /*
    i{
    @include border-radius(2000px);
    position: absolute;
    top: $h*.115;
    left:$h*.115;
    width: $w*.57;
    height: $h*.57;
    border:$h*.1 solid rgba(255,0,0,.5);
    z-index: 1000;
  }*/

  .arrow-item{
    width: $w;
    height: $h*.5;
    position: absolute;
    &:before{
      content:'';
      height: 0;
      width: 0;
      position: absolute;
      border:$h*.18 solid transparent;
    }

    .curve{
       height: $h*.42;
       width: $w;
        //background-color: rgba(255,0,0,.2);
       &:before{
         border-radius: 2000px;
         border:$w*.1 solid $c;
         height:$h*.57;
         width:$w*.57;
         left:$w*.115;

       }
    }
    &:first-child{
      top:0;
      left:0;
      &:before{
        border-top-color:$c;
        bottom: -$h*.18;
      }
      .curve{
        top: 0;
        left: 0;
        &:before{
          top: $h*.115;
        }
      }
    }
    &:last-child{
       top:$h/2;
       left:0;
       &:before{
        border-bottom-color:$c;
        top: -$h*0.2;
        right:0;
      }
      .curve{
        bottom: 0;
        left: 0;
        &:before{
          bottom: $h*.115;
        }
      }
    }
  }
}

@-webkit-keyframes spin {
  0% {transform : rotate(0deg);}
  100% {transform: rotate(-360deg);}
}

// arrow
@mixin arrow( $width , $height , $top , $left, $way){
  left: $left;
  top: $top;
  border-width:$height $width;
  border-#{$way}-color:$c;
}
// bodyCurve
@mixin bodyCurve( $width , $height, $top , $left, $border  ,$btop ,$bleft){
  height: $height;
  width: $width;
  top: $top;
  left: $left;
  &:before{
    border-radius: 2000px;
    border:$border solid $c;
    height: $height*2 -$border*2;
    width:  $width*2 -$border*2;
    top: $btop;
    left:$bleft;
  }
}

</style>
