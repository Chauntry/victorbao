<template lang="html">

  <div id="loginform">
    <div id="facebook"><i class="fa fa-facebook"></i>
    <div id="connect">Connect with Facebook</div>

    </div>
    <div id="mainlogin">
    <div id="or">or</div>
    <h1>Log in with your account</h1>
    <form action="">
      <input id= "toptext" type="text" placeholder="username or email" value="" required>
      <input id= "password"type="password" placeholder="password" value="" required>
      <button v-on:mouseover= "change" v-on:mouseout= "changeBack" type="submit" @click = "$route.router.go('/about')">
        <div v-bind:style= "styleObject" class="arrow-right" ></div>
        <div v-bind:style= "styleObject" class="arrow-right-2"></div>
     </button>
    </form>
    <div id="note"><a href="#">Forgot your password?</a></div>
    </div>
  </div>
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
      styleObject: {'border-color': 'white'},
    }
  },
  props: {
    exist: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    notexist () {
      this.exist = false
    },
    change () {
      this.styleObject= {'border-color':'#ff5f32'}
    },
    changeBack () {
      this.styleObject= {'border-color':'white'}
    }
  },

  computed: {
  },
  route: {

  },
  created () {

  },
  ready () {

  },
  beforeDestroy () {
  }
}
</script>

<style lang="css" scoped>
*
{
margin:0px;
padding:0px;
}

body{
position:relative;
font-family: verdana;
}


#loginform
{
z-index: 10001;
height: auto;
top: 0px;
position: fixed;
margin: 0 auto;
left: 50%;
top: 50%;
margin: -100px 0 0 -250px;
/*transform: translate(-50%, -50%);*/
}

input
{
display:block;
margin:0px auto 15px;
border-radius:5px;
background: #333333;
width:85%;
padding:12px 20px 12px 10px;
border:none;
color:#929999;
box-shadow:inset 0px 1px 5px #272727;
font-size:0.8em;
-webkit-transition:0.5s ease;
-moz-transition:0.5s ease;
-o-transition:0.5s ease;
-ms-transition:0.5s ease;
transition:0.5s ease;
font-family: verdana;
}

input:focus
{
-webkit-transition:0.5s ease;
-moz-transition:0.5s ease;
-o-transition:0.5s ease;
-ms-transition:0.5s ease;
transition:0.5s ease;
box-shadow: 0px 0px 5px 1px #161718;
}

button
{
background: #ff5f32;
border-radius:50%;
border:10px solid #222526;
font-size:0.9em;
color:#fff;
font-weight:bold;
cursor:pointer;
width:85px;
height:85px;
position:absolute;
right: -42px;
top: 54px;
text-align:center;
-webkit-transition:0.5s ease;
-moz-transition:0.5s ease;
-o-transition:0.5s ease;
-ms-transition:0.5s ease;
transition:0.5s ease;
}

button:hover
{
background:#222526;
border-color:#ff5f32;
-webkit-transition:0.5s ease;
-moz-transition:0.5s ease;
-o-transition:0.5s ease;
-ms-transition:0.5s ease;
transition:0.5s ease;
}

button i
{
font-size:20px;
-webkit-transition:0.5s ease;
-moz-transition:0.5s ease;
-o-transition:0.5s ease;
-ms-transition:0.5s ease;
transition:0.5s ease;
}

button:hover i
{
color:#ff5f32;
-webkit-transition:0.5s ease;
-moz-transition:0.5s ease;
-o-transition:0.5s ease;
-ms-transition:0.5s ease;
transition:0.5s ease;
}

.arrow-right
{
  width: 13px;
  height: 13px;
  border: solid 4px white;
  position: absolute;
  right: 38%;
  top: 41.5%;
  transform: rotate(45deg);
  border-bottom: transparent;
  border-left: transparent;
}
.arrow-right-2
{
  width: 12px;
  height: 3px;
  border-top: solid 2px white;
  border-bottom: solid 1px white;
  position: absolute;
  right: 43%;
  top: 49%;
}

*:focus{outline:none;}
::-webkit-input-placeholder {
color:#929999;
}

:-moz-placeholder { /* Firefox 18- */
color:#929999;
}

::-moz-placeholder {  /* Firefox 19+ */
color:#929999;
}

:-ms-input-placeholder {
color:#929999;
}

h1
{
text-align:center;
color:#fff;
font-size:13px;
padding:12px 0px;
font-family: verdana;
}

#note
{
width: 100%;
color:#88887a;
font-size: 0.8em;
text-align:left;
position: absolute;
bottom: 20px;
color: #9fa0a0;
}

#facebook
{
text-align:center;
float:left;
background:#365195;
padding:35px 10px 20px 10px;
width:190px;
height:190px;
border-radius:3px;
cursor:pointer;
box-shadow: 0px 0px 10px 2px #161718;
margin-right:10px;
-webkit-transition:0.5s ease;
-moz-transition:0.5s ease;
-o-transition:0.5s ease;
-ms-transition:0.5s ease;
transition:0.5s ease;
background-image: url('~assets/facebook.png');
background-repeat: no-repeat;
background-position: 50% 30%;
}

#facebook:hover
{
box-shadow: 0px 0px 0px 0px #161718;
-webkit-transition:0.5s ease;
-moz-transition:0.5s ease;
-o-transition:0.5s ease;
-ms-transition:0.5s ease;
transition:0.5s ease;
}

.fa-facebook
{
color:#fff;
font-size:7em;
display:block;
}

a
{
color:#9fa0a0;
text-decoration:none;
-webkit-transition:0.5s ease;
-moz-transition:0.5s ease;
-o-transition:0.5s ease;
-ms-transition:0.5s ease;
transition:0.5s ease;
font-family: verdana;
}

a:hover
{
color:#fff;
margin-left:5px;
-webkit-transition:0.5s ease;
-moz-transition:0.5s ease;
-o-transition:0.5s ease;
-ms-transition:0.5s ease;
transition:0.5s ease;
}

#mainlogin
{
float:left;
width:280px;
height:190px;
padding:10px 15px;
position:relative;
background:#555555;
border-radius:3px;
}

#connect
{
position: absolute;
font-weight: bold;
color: #fff;
font-size: 13px;
text-align: left;
font-family: verdana;
bottom: 20px;
}

#or
{
position:absolute;
left: -25px;
top: 10px;
background:#222222;
text-shadow:0 2px 0px #121212;
color:#999999;
width:40px;
height:40px;
text-align:center;
border-radius:50%;
font-weight:bold;
line-height:38px;
font-size: 13px;
}

#toptext
{
position:absolute;
top: 50px;
}

#password
{
position:absolute;
top: 100px;
}


</style>
