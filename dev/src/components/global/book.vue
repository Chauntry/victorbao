<template lang="html">
  <div class="component">
    <figure class='book'>
      <ul class='hardcover_front'>
        <li>
          <div class="coverDesign blue">
            <h1>VICTOR BAO</h1>
            <p>ABOUT ME</p>
          </div>
        </li>
        <li></li>
        <li></li>

      </ul>
      <ul class='page'>
        <li> </li>
        <li>
          <div class="page2">
          I'm study in the University of Manchester, major in computer science. I love computing, I love eating ice cream in winter, I hate reading long article, I play video games like it's my life, my favorite sport is swimming, I my favorite food is garlic pizza and my dream is to make a robot acting like a human being.
          <br>
          <br>
          It is the first time that I develop a self-made website entirely. This website is aim to introducing myself and making friends. If you have any suggestion or question about this website, or you need help to make your own website, please contact me. XD
          <br>Email: baoxiao_tong@hotmail.com
          </div>
          <a class="cta outline fade active" style = "position: absolute; bottom: 0.5rem;"><span>More About</span></a>
        </li>
        <li>
          <div class="coverBackDesign page1">
            <div class= "title"> HI, I'M VCTOR BAO </div>
            <div class= "nexttitle"> WELCOME TO MY WEBSITE!
            <div class= "photo"></div>
            <div class= "text">
              I'm a undergraduate student and non-professional web developer.
            </div>
          </div>
        </li>
        <li></li>
        <li></li>
      </ul>
      <ul class='hardcover_back'>
        <li></li>
        <li></li>
      </ul>
      <ul class='book_spine'>
        <li></li>
        <li></li>
      </ul>
    </figure>
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

<style lang="scss" scoped>
/*@import 'config'*/
::before,
::after {
  content: "";
}
.page1 {
  padding: 0.4rem;
  position: relative;
  width: 100%;
  height: 100%;
  .photo {
    margin-top: 5%;
    margin-bottom: 5%;
    margin-left: 10%;
    width: 4rem;
    height: 4rem;
    background-image: url('~assets/4341.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .title {
    font-size: 0.4rem;
  }
  .nexttitle {
    font-size: 0.3rem;
  }
  .text {
    font-size: 0.25rem;
  }
}

.page2 {
  font-size: 0.25rem;
  padding: 0.4rem;
  position: relative;
  width: 100%;
  height: 100%;
  text-align: left;
}

body {
  background: #deebef;
  color: #34495e;
  font-family: 'Lato', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.2;
  text-align: left;
}

a {
  color: #2c3e50;
  text-decoration: none;
  text-align: left;
}

.btn {
  display: inline-block;
  text-transform: uppercase;
  border: 2px solid #2c3e50;
  margin-top: 100px;
  font-size: 0.7em;
  font-weight: 700;
  padding: 0.1em 0.4em;
  text-align: center;
  -webkit-transition: color 0.3s, border-color 0.3s;
  -moz-transition: color 0.3s, border-color 0.3s;
  transition: color 0.3s, border-color 0.3s;
}

.btn:hover {
  border-color: #16a085;
  color: #16a085;
}


.align {
  clear: both;
  margin: 90px auto 20px;
  width: 100%;
  max-width: 1170px;
  text-align: center;
}

.align > li {
  width: 500px;
  min-height: 300px;
  display: inline-block;
  margin: 30px 20px 30px 30px;
  padding: 0 0 0 60px;
  vertical-align: top;
}

/* ///////////////////////////////////////////////////

HARDCOVER
Table of Contents

1. container
2. background & color
3. opening cover, back cover and pages
4. position, transform y transition
5. events
6. Bonus
  - Cover design
  - Ribbon
  - Figcaption
7. mini-reset

/////////////////////////////////////////////////////*/

/*
  1. container
*/

.book {
  position: relative;
  width: 360px;
  height: 390px;
  -webkit-perspective: 1200px;
  -moz-perspective: 1200px;
  perspective: 1200px;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

/*
  2. background & color
*/

/* HARDCOVER FRONT */
.hardcover_front li:first-child {
  background-color: #eee;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;
}

/* reverse */
.hardcover_front li:last-child {
  background: #fffbec;
}

/* HARDCOVER BACK */
.hardcover_back li:first-child {
  background: #fffbec;
}

/* reverse */
.hardcover_back li:last-child {
  background: #fffbec;
}

.book_spine li:first-child {
  background: #eee;
}
.book_spine li:last-child {
  background: #333;
}

/* thickness of cover */

.hardcover_front li:first-child:after,
.hardcover_front li:first-child:before,
.hardcover_front li:last-child:after,
.hardcover_front li:last-child:before,
.hardcover_back li:first-child:after,
.hardcover_back li:first-child:before,
.hardcover_back li:last-child:after,
.hardcover_back li:last-child:before,
.book_spine li:first-child:after,
.book_spine li:first-child:before,
.book_spine li:last-child:after,
.book_spine li:last-child:before {
  background: #999;
}

/* page */

.page > li {
  background: -webkit-linear-gradient(left, #e1ddd8 0%, #fffbf6 100%);
  background: -moz-linear-gradient(left, #e1ddd8 0%, #fffbf6 100%);
  background: -ms-linear-gradient(left, #e1ddd8 0%, #fffbf6 100%);
  background: linear-gradient(left, #e1ddd8 0%, #fffbf6 100%);
  box-shadow: inset 0px -1px 2px rgba(50, 50, 50, 0.1), inset -1px 0px 1px rgba(150, 150, 150, 0.2);
  border-radius: 0px 5px 5px 0px;
}

/*
  3. opening cover, back cover and pages
*/

.hardcover_front {
  -webkit-transform: rotateY(-34deg) translateZ(8px);
  -moz-transform: rotateY(-34deg) translateZ(8px);
  transform: rotateY(-34deg) translateZ(8px);
  z-index: 100;
}

.hardcover_back {
  -webkit-transform: rotateY(-15deg) translateZ(-8px);
  -moz-transform: rotateY(-15deg) translateZ(-8px);
  transform: rotateY(-15deg) translateZ(-8px);
}

.page li:nth-child(1) {
  -webkit-transform: rotateY(-28deg);
  -moz-transform: rotateY(-28deg);
  transform: rotateY(-28deg);
}

.page li:nth-child(2) {
  -webkit-transform: rotateY(-30deg);
  -moz-transform: rotateY(-30deg);
  transform: rotateY(-30deg);
}

.page li:nth-child(3) {
  -webkit-transform: rotateY(-32deg);
  -moz-transform: rotateY(-32deg);
  transform: rotateY(-32deg);
}

.page li:nth-child(4) {
  -webkit-transform: rotateY(-34deg);
  -moz-transform: rotateY(-34deg);
  transform: rotateY(-34deg);
}

.page li:nth-child(5) {
  -webkit-transform: rotateY(-36deg);
  -moz-transform: rotateY(-36deg);
  transform: rotateY(-36deg);
}

/*
  4. position, transform & transition
*/

.hardcover_front,
.hardcover_back,
.book_spine,
.hardcover_front li,
.hardcover_back li,
.book_spine li {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.hardcover_front,
.hardcover_back {
  -webkit-transform-origin: 0% 100%;
  -moz-transform-origin: 0% 100%;
  transform-origin: 0% 100%;
}

.hardcover_front {
  -webkit-transition: all 0.8s ease, z-index 0.6s;
  -moz-transition: all 0.8s ease, z-index 0.6s;
  transition: all 0.8s ease, z-index 0.6s;
}

/* HARDCOVER front */
.hardcover_front li:first-child {
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  -webkit-transform: translateZ(2px);
  -moz-transform: translateZ(2px);
  transform: translateZ(2px);
}

.hardcover_front li:last-child {
  -webkit-transform: rotateY(180deg) translateZ(2px);
  -moz-transform: rotateY(180deg) translateZ(2px);
  transform: rotateY(180deg) translateZ(2px);
}

/* HARDCOVER back */
.hardcover_back li:first-child {
  -webkit-transform: translateZ(2px);
  -moz-transform: translateZ(2px);
  transform: translateZ(2px);
}

.hardcover_back li:last-child {
  -webkit-transform: translateZ(-2px);
  -moz-transform: translateZ(-2px);
  transform: translateZ(-2px);
}

/* thickness of cover */
/*.hardcover_front li:first-child:after,
.hardcover_front li:first-child:before,
/*.hardcover_front li:last-child:after,*/
/*.hardcover_front li:last-child:before,*/
/*.hardcover_back li:first-child:after,
.hardcover_back li:first-child:before,
.hardcover_back li:last-child:after,
.hardcover_back li:last-child:before,*/
.book_spine li:first-child:after
/*.book_spine li:first-child:before,
.book_spine li:last-child:before,*/
/*.book_spine li:last-child:after,*/
 {
  position: absolute;
  top: 0;
  left: 0;
}

/* HARDCOVER front */
.hardcover_front li:first-child:after,
.hardcover_front li:first-child:before {
  width: 4px;
  height: 100%;
}

.hardcover_front li:first-child:after {
  -webkit-transform: rotateY(90deg) translateZ(-2px) translateX(2px);
  -moz-transform: rotateY(90deg) translateZ(-2px) translateX(2px);
  transform: rotateY(90deg) translateZ(-2px) translateX(2px);
}

.hardcover_front li:first-child:before {
  -webkit-transform: rotateY(90deg) translateZ(158px) translateX(2px);
  -moz-transform: rotateY(90deg) translateZ(158px) translateX(2px);
  transform: rotateY(90deg) translateZ(158px) translateX(2px);
}

.hardcover_front li:last-child:after,
.hardcover_front li:last-child:before {
  width: 4px;
  height: 360px;
}

.hardcover_front li:last-child:after {
  -webkit-transform: rotateX(90deg) rotateZ(90deg) translateZ(80px) translateX(-2px) translateY(-78px);
  -moz-transform: rotateX(90deg) rotateZ(90deg) translateZ(80px) translateX(-2px) translateY(-78px);
  transform: rotateX(90deg) rotateZ(90deg) translateZ(80px) translateX(-2px) translateY(-78px);
}
.hardcover_front li:last-child:before {
  box-shadow: 0px 0px 30px 5px #333;
  transform: rotateX(90deg) rotateZ(90deg) translateZ(-190px) translateX(-100px) translateY(-78px);
}

/* thickness of cover */

.hardcover_back li:first-child:after,
.hardcover_back li:first-child:before {
  width: 4px;
  height: 100%;
}

.hardcover_back li:first-child:after {
  -webkit-transform: rotateY(90deg) translateZ(-2px) translateX(2px);
  -moz-transform: rotateY(90deg) translateZ(-2px) translateX(2px);
  transform: rotateY(90deg) translateZ(-2px) translateX(2px);
}
.hardcover_back li:first-child:before {
  -webkit-transform: rotateY(90deg) translateZ(158px) translateX(2px);
  -moz-transform: rotateY(90deg) translateZ(158px) translateX(2px);
  transform: rotateY(90deg) translateZ(158px) translateX(2px);
}

.hardcover_back li:last-child:after,
.hardcover_back li:last-child:before {
  width: 4px;
  height: 360px;
}

.hardcover_back li:last-child:after {
  -webkit-transform: rotateX(90deg) rotateZ(90deg) translateZ(80px) translateX(2px) translateY(-78px);
  -moz-transform: rotateX(90deg) rotateZ(90deg) translateZ(80px) translateX(2px) translateY(-78px);
  transform: rotateX(90deg) rotateZ(90deg) translateZ(80px) translateX(2px) translateY(-78px);
}

.hardcover_back li:last-child:before {
  box-shadow: 10px -1px 80px 20px #666;
  -webkit-transform: rotateX(90deg) rotateZ(90deg) translateZ(-140px) translateX(2px) translateY(-78px);
  -moz-transform: rotateX(90deg) rotateZ(90deg) translateZ(-140px) translateX(2px) translateY(-78px);
  transform: rotateX(90deg) rotateZ(90deg) translateZ(-140px) translateX(2px) translateY(-78px);
}

/* BOOK SPINE */
.book_spine {
  -webkit-transform: rotateY(60deg) translateX(-5px) translateZ(-12px);
  -moz-transform: rotateY(60deg) translateX(-5px) translateZ(-12px);
  transform: rotateY(60deg) translateX(-5px) translateZ(-12px);
  width: 16px;
  z-index: 0;
}

.book_spine li:first-child {
  -webkit-transform: translateZ(2px);
  -moz-transform: translateZ(2px);
  transform: translateZ(2px);
}

.book_spine li:last-child {
  -webkit-transform: translateZ(-2px);
  -moz-transform: translateZ(-2px);
  transform: translateZ(-2px);
}

/* thickness of book spine */
.book_spine li:first-child:after,
.book_spine li:first-child:before {
  width: 4px;
  height: 100%;
}

.book_spine li:first-child:after {
  -webkit-transform: rotateY(90deg) translateZ(-2px) translateX(2px);
  -moz-transform: rotateY(90deg) translateZ(-2px) translateX(2px);
  transform: rotateY(90deg) translateZ(-2px) translateX(2px);
}

.book_spine li:first-child:before {
  -webkit-transform: rotateY(-90deg) translateZ(-12px);
  -moz-transform: rotateY(-90deg) translateZ(-12px);
  transform: rotateY(-90deg) translateZ(-12px);
}

.book_spine li:last-child:after,
.book_spine li:last-child:before {
  width: 4px;
  height: 16px;
}

.book_spine li:last-child:after {
  -webkit-transform: rotateX(90deg) rotateZ(90deg) translateZ(8px) translateX(2px) translateY(-6px);
  -moz-transform: rotateX(90deg) rotateZ(90deg) translateZ(8px) translateX(2px) translateY(-6px);
  transform: rotateX(90deg) rotateZ(90deg) translateZ(8px) translateX(2px) translateY(-6px);
}

.book_spine li:last-child:before {
  box-shadow: 5px -1px 100px 40px rgba(0, 0, 0, 0.2);
  -webkit-transform: rotateX(90deg) rotateZ(90deg) translateZ(-210px) translateX(2px) translateY(-6px);
  -moz-transform: rotateX(90deg) rotateZ(90deg) translateZ(-210px) translateX(2px) translateY(-6px);
  transform: rotateX(90deg) rotateZ(90deg) translateZ(-210px) translateX(2px) translateY(-6px);
}

.page,
.page > li {
  position: absolute;
  top: 0;
  left: 0;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.page {
  width: 100%;
  height: 98%;
  top: 1%;
  left: 3%;
  z-index: 10;
}

.page > li {
  width: 100%;
  height: 100%;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  transform-origin: left center;
  -webkit-transition-property: transform;
  -moz-transition-property: transform;
  transition-property: transform;
  -webkit-transition-timing-function: ease;
  -moz-transition-timing-function: ease;
  transition-timing-function: ease;
}

.page > li:nth-child(1) {
  -webkit-transition-duration: 0.6s;
  -moz-transition-duration: 0.6s;
  transition-duration: 0.6s;
}

.page > li:nth-child(2) {
  -webkit-transition-duration: 0.6s;
  -moz-transition-duration: 0.6s;
  transition-duration: 0.6s;
}

.page > li:nth-child(3) {
  -webkit-transition-duration: 0.4s;
  -moz-transition-duration: 0.4s;
  transition-duration: 0.4s;
}

.page > li:nth-child(4) {
  -webkit-transition-duration: 0.5s;
  -moz-transition-duration: 0.5s;
  transition-duration: 0.5s;
}

.page > li:nth-child(5) {
  -webkit-transition-duration: 0.6s;
  -moz-transition-duration: 0.6s;
  transition-duration: 0.6s;
}

/*
  5. events
*/

.book:hover > .hardcover_front {
  -webkit-transform: rotateY(-175deg) translateZ(0);
  -moz-transform: rotateY(-175deg) translateZ(0);
  transform: rotateY(-175deg) translateZ(0);
  z-index: 0;
}

.book:hover > .page li:nth-child(1) {
  -webkit-transform: rotateY(-24deg);
  -moz-transform: rotateY(-24deg);
  transform: rotateY(-24deg);
  -webkit-transition-duration: 1.5s;
  -moz-transition-duration: 1.5s;
  transition-duration: 1.5s;
}

.book:hover > .page li:nth-child(2) {
  -webkit-transform: rotateY(-26deg);
  -moz-transform: rotateY(-26deg);
  transform: rotateY(-26deg);
  -webkit-transition-duration: 1.8s;
  -moz-transition-duration: 1.8s;
  transition-duration: 1.8s;
}

.book:hover > .page li:nth-child(3) {
  -webkit-transform: rotateY(-148deg);
  -moz-transform: rotateY(-148deg);
  transform: rotateY(-148deg);
  -webkit-transition-duration: 1.6s;
  -moz-transition-duration: 1.6s;
  transition-duration: 1.6s;
}

.book:hover > .page li:nth-child(4) {
  -webkit-transform: rotateY(-150deg);
  -moz-transform: rotateY(-150deg);
  transform: rotateY(-150deg);
  -webkit-transition-duration: 1.4s;
  -moz-transition-duration: 1.4s;
  transition-duration: 1.4s;
}

.book:hover > .page li:nth-child(5) {
  -webkit-transform: rotateY(-160deg);
  -moz-transform: rotateY(-160deg);
  transform: rotateY(-160deg);
  -webkit-transition-duration: 1.2s;
  -moz-transition-duration: 1.2s;
  transition-duration: 1.2s;
}

/*
  6. Bonus
*/

/* cover CSS */

.coverDesign {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;
}

.coverDesign::after {
  background-image: -webkit-linear-gradient( -135deg, rgba(255, 255, 255, 0.45) 0%, transparent 100%);
  background-image: -moz-linear-gradient( -135deg, rgba(255, 255, 255, 0.45) 0%, transparent 100%);
  background-image: linear-gradient( -135deg, rgba(255, 255, 255, 0.45) 0%, transparent 100%);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.coverDesign h1 {
  color: #fff;
  font-size: 2.2em;
  letter-spacing: 0.05em;
  text-align: center;
  margin: 54% 0 0 0;
  text-shadow: -1px -1px 0 rgba(0,0,0,0.1);
}

.coverDesign p {
  color: #f8f8f8;
  font-size: 1em;
  text-align: center;
  text-shadow: -1px -1px 0 rgba(0,0,0,0.1);
}

.coverBackDesign{
  text-align: left;
}

.coverBackDesign h1 {
  color: #fff;
  font-size: 2.2em;
  letter-spacing: 0.05em;
  text-align: left;
  margin: 54% 0 0 0;
  text-shadow: -1px -1px 0 rgba(0,0,0,0.1);
  backface-visibility: hidden;
}

.coverBackDesign p {
  color: #f8f8f8;
  font-size: 1em;
  text-align: center;
  text-shadow: -1px -1px 0 rgba(0,0,0,0.1);
  backface-visibility: hidden;
}
.coverBackDesign {
  backface-visibility: hidden;
  transform: rotateY(180deg);
}


.yellow {
  background-color: #f1c40f;
  background-image: -webkit-linear-gradient(top, #f1c40f 58%, #e7ba07 0%);
  background-image: -moz-linear-gradient(top, #f1c40f 58%, #e7ba07 0%);
  background-image: linear-gradient(top, #f1c40f 58%, #e7ba07 0%);
}

.blue {
  background-color: #3498db;
  background-image: -webkit-linear-gradient(top, #3498db 58%, #2a90d4 0%);
  background-image: -moz-linear-gradient(top, #3498db 58%, #2a90d4 0%);
  background-image: linear-gradient(top, #3498db 58%, #2a90d4 0%);
}

.grey {
  background-color: #f8e9d1;
  background-image: -webkit-linear-gradient(top, #f8e9d1 58%, #e7d5b7 0%);
  background-image: -moz-linear-gradient(top, #f8e9d1 58%, #e7d5b7 0%);
  background-image: linear-gradient(top, #f8e9d1 58%, #e7d5b7 0%);
}

/* Basic ribbon */

.ribbon {
  background: #c0392b;
  color: #fff;
  display: block;
  font-size: 0.7em;
  position: absolute;
  top: 11px;
  right: 1px;
  width: 40px;
  height: 20px;
  line-height: 20px;
  letter-spacing: 0.15em;
  text-align: center;
  -webkit-transform: rotateZ(45deg) translateZ(1px);
  -moz-transform: rotateZ(45deg) translateZ(1px);
  transform: rotateZ(45deg) translateZ(1px);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;
  z-index: 10;
}

.ribbon::before,
.ribbon::after{
  position: absolute;
  top: -20px;
  width: 0;
  height: 0;
  border-bottom: 20px solid #c0392b;
  border-top: 20px solid transparent;
}

.ribbon::before{
  left: -20px;
  border-left: 20px solid transparent;
}

.ribbon::after{
  right: -20px;
  border-right: 20px solid transparent;
}

/* figcaption */

figcaption {
  padding-left: 40px;
  text-align: left;
  position: absolute;
  top: 0%;
  left: 360px;
  width: 310px;
}

figcaption h1 {
  margin: 0;
}

figcaption span {
  color: #16a085;
  padding: 0.6em 0 1em 0;
  display: block;
}

figcaption p {
  color: #63707d;
  line-height: 1.3;
}

/* Media Queries */
@media screen and (max-width: 37.8125em) {
  .align > li {
    width: 100%;
    min-height: 440px;
    height: auto;
    padding: 0;
    margin: 0 0 30px 0;
  }

  .book {
    margin: 0 auto;
  }

  figcaption {
    text-align: center;
    width: 390px;
    top: 250px;
    padding-left: 0;
    left: -80px;
    font-size: 90%;
  }
}

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
  // transition: 0.2s all ease-out;
  // -webkit-transition: 0.2s all ease-out;
  // -moz-transition: 0.2s all ease-out;
  // color: #fff;
  // transition: 0.3s all ease-out;
  // -webkit-transition: 0.3s all ease-out;
  // -moz-transition: 0.3s all ease-out;
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



</style>
