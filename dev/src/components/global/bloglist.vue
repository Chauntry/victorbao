<template lang="html">
<div class = "scroll">
  <section class="first">
    <div class="wrap">
      <h1 class="effect">A Great Title.</h1>
      <p class="fade">For a great CTA hover effect</p>
      <a class="cta outline fade"><span>View more</span></a></div>
  </section>

  <section id="anchor">
     <div class="wrap">
      <h2>Lorem ipsum dolor sit amet</h2>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio nostrum quaerat recusandae quasi officia commodi mollitia, deleniti explicabo similique voluptatum quam accusamus exercitationem quo, ipsa, soluta laborum consequatur sequi quod.</p>
    </div>
  </section>
  <section>
     <div class="wrap">
      <h2>Lorem ipsum dolor sit amet</h2>
       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse dolorum ullam ratione necessitatibus numquam inventore nisi illum natus facilis distinctio. Ea velit corporis fugiat dolorem a ipsum tenetur, distinctio maiores.</p>
    </div>
  </section>
</div>
</template>

<script>
import * as actions from 'vuex/actions'
import $ from 'jquery'
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
    state: {
      type: String,
      default: '1'
    },
    time: {
      type: String,
      default: '2小时21分钟21秒'
    }
  },
  methods: {
    back () {
      history.back()
    },
  },

  computed: {
    head () {
      if (this.state == 1)
        return '距离下一个抽奖还有'
      else if (this.state == 2)
        return '距离本次抽奖还有'
      else
        return '今日抽奖已经结束'
    }
  },
  route: {

  },
  created () {

  },
  ready () {
    // $(window).load(function(){
      $('.effect').each(function(){
        $(this).addClass('active');
      })
      $('.fade').addClass('active');
    // });

    $(document).ready(function(){
      $('.cta').click(function(){
        console.log($("#anchor").offset().top)
        $('.scroll').animate({scrollTop: $("#anchor").offset().top}, 1000)
      })
      // $('.first').bind('mousewheel', function(e){
      //   return false;
      // });
    })
  },
  beforeDestroy () {

  }
}
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css?family=Hind|Montserrat');

* {
  margin:0;
  padding:0;
  outline:none;
  list-style:none;
  text-decoration:none;
  box-sizing:border-box;
  color:#111;
  background: transparent;
  border: none;

}

body {
  background: #FFF;
  font-family: 'Hind', sans-serif;
}

h1, h2, h3 {
  font-family: 'Montserrat', sans-serif;
}

.scroll {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
/* H1 EFFECT */
.effect {
  font-size: 6vw;
  text-transform: uppercase;
  letter-spacing: 0.2vw;
  font-weight: 700;
  display: inline-block;
  position: relative;
 -webkit-background-clip: text;
  background-clip: text;
  background: -webkit-linear-gradient(0deg, #222 50%, transparent 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-position: 100% 0;
  background-size:200% 100%;
  transition: 0.6s all cubic-bezier(0.860, 0.000, 0.070, 1.000) 0.8s;
}

.effect:before{
  content: "";
  height: 100%;
  width: 100%;
  background: #eaeaea;
  z-index: 2;
  display: block;
  position: absolute;
  top: 0;left: 0;
  transform-origin: left;
  transform: scaleX(0);
}
.effect:after{
  content: "";
  height: 100%;
  width: 100%;
  background: #222;
  z-index: 2;
  display: block;
  position: absolute;
  top: 0;left: 0;
  transform-origin: left;
  transform: scaleX(0);
}
.effect.active {
  background-position: 0 0;
}

.effect.active:before {
    animation: anime 1.2s cubic-bezier(0.860, 0.000, 0.070, 1.000) forwards;
}
.effect.active:after {
    animation: anime 1.2s 0.5s cubic-bezier(0.860, 0.000, 0.070, 1.000) forwards;
}
@keyframes anime {
  0% {
    transform-origin: left;
    transform: scaleX(0);
  }
  50% {
    transform-origin: left;
    transform: scaleX(1);
  }
  51%{
    transform-origin: right;
  }
  100% {
    transform-origin: right;
    transform: scaleX(0);
  }
}



/* CTA EFFECT */

.cta {
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  font-size: 0.7em;
  font-weight: 700;
  cursor: pointer;
  display: inline-block;
  line-height: 2em;
  padding: 2px 10px;
  background: #222;
  margin-top: 20px;
  transition: 0.2s all ease-out;
  -webkit-transition: 0.2s all ease-out;
  -moz-transition: 0.2s all ease-out;
  color: #fff;
  transition: 0.3s all ease-out;
  -webkit-transition: 0.3s all ease-out;
  -moz-transition: 0.3s all ease-out;
  letter-spacing: 1px;
}

a.cta.outline {
  position: relative;
  background: transparent;
  border: 1px solid #222;
  overflow: hidden;
}

.cta.outline:before {
  content: "";
  height: 100%;
  z-index: -1;
  width: 100%;
  background: #222;
  display: block;
  top: 0;
  left: 0;
  position: absolute;
  transform: scaleX(0);
  -webkit-transform: scaleX(0);
  -moz-transform: scaleX(0);
  transition: 0.6s transform cubic-bezier(1.000, 0.610, 0.165, 1.000);
  -webkit-transition: 0.6s transform cubic-bezier(1.000, 0.610, 0.165, 1.000);
  -moz-transition: 0.6s transform cubic-bezier(1.000, 0.610, 0.165, 1.000);
  transform-origin:right;
  -webkit-transform-origin:right;
}
.cta.outline span {
  position: relative;
  z-index: 3;
   -webkit-background-clip: text;
  background-clip: text;
  background: -webkit-linear-gradient(0deg, #FFF 50%, #222 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-position: 100% 0;
  background-size:200% 100%;
  color: transparent;
  transition: 0.6s all cubic-bezier(1.000, 0.610, 0.165, 1.000) 0.2s;
  -webkit-transition: 0.6s all cubic-bezier(1.000, 0.610, 0.165, 1.000) 0.2s;
  -moz-transition: 0.6s all cubic-bezier(1.000, 0.610, 0.165, 1.000) 0.2s;
}
.cta.outline:hover:before {
  transform: scaleX(1);
  -webkit-transform: scaleX(1);
  -moz-transform: scaleX(1);
  transform-origin:left;
  -webkit-transform-origin:left;
}
.cta.outline:hover{
  box-shadow: none;
}
.cta.outline:hover span{
  background-position: 0 0;
}

.fade {
  opacity: 0;
  transform: translateY(20px);
  transition: 0.6s all ease-out 2s;
}
a.fade {
  transition: 0.6s all ease-out 2.6s;
}
.fade.active {
  transform: translateY(0);
  opacity: 1;
}


/* bullshit */

section {
  text-align: center;
  padding: 0 20%;
  height: 100vh;
}
.wrap {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
p {
  margin: 10px 0 0 0;
}


</style>
