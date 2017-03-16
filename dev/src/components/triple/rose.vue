<template lang="html">
<div class="app">
  <div class = "rose">
<!--     <div class = "petal" v-for = "i in 30" :style = "{'background-image':'radial-gradient(bottom left, ellipse cover, red 0%, blue 70%, red 95%)'}"></div> -->
    <div class = "petal" v-for = "i in 30" :style = "{'background-image':'-webkit-radial-gradient(bottom left, ellipse cover,' + roselight +' 0%, ' + rosedark + ' 70%, '+ roselight+ ' 95%)'}"></div>
  </div>
  <svg id="leaf" viewBox="0 0 300 100" height = "90px" width = "90px">
        <path id="leaf-base" style="fill:#43d95e" d="M191.82-15c19.79-19.79,22.39-64.82,22.39-64.82s-45,2.61-64.82,22.39-6.84,49.26-6.84,49.26S172,4.81,191.82-15Z" transform="translate(-350 150),scale(3)"></path>
        <path id="leaf-shadow" style="fill:#29cc60" d="M191.82-15c19.79-19.79,22.39-64.82,22.39-64.82L142.56-8.14S172,4.81,191.82-15Z" transform="translate(-350 150),scale(3)"></path>
      </g>
  </svg>
  <svg id="leaf2" viewBox="0 0 300 100" height = "85px" width = "85px">
        <path id="leaf-base" style="fill:#43d95e" d="M191.82-15c19.79-19.79,22.39-64.82,22.39-64.82s-45,2.61-64.82,22.39-6.84,49.26-6.84,49.26S172,4.81,191.82-15Z" transform="translate(-350 150),scale(3)"></path>
        <path id="leaf-shadow" style="fill:#29cc60" d="M191.82-15c19.79-19.79,22.39-64.82,22.39-64.82L142.56-8.14S172,4.81,191.82-15Z" transform="translate(-350 150),scale(3)"></path>
      </g>
  </svg>
  <div class= "picker-compont">
    <div id="picker-wrapper">        <div id="picker" :style = "{'background-color': 'rgb(226, 9, 9)'}"></div>
        <div id="picker-indicator"></div>
    </div>
    <div id="slider-wrapper">
        <div id="slider" ></div>
        <div id="slider-indicator"></div>
    </div>
  </div>
</div>
</template>

<script>
import 'common/colorpicker.min.js'
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
      roseColor: {r:225, g:0, b:36}
    }
  },
  props: {
  },
  methods: {
    notexist () {
      this.exist = false
    },
  },
  computed: {
    roselight () {
      return 'rgb('+ this.roseColor.r + ',' + this.roseColor.g + ',' + this.roseColor.b + ')'
    },
    rosedark () {
      return 'rgb('+ Math.floor(this.roseColor.r/2) + ',' + Math.floor(this.roseColor.g/2)+ ',' + Math.floor(this.roseColor.b/2) + ')'
    }
  },
  route: {
  },
  created () {
  },
  ready () {
  ColorPicker.fixIndicators(
      document.getElementById('slider-indicator'),
      document.getElementById('picker-indicator'));
   // that = this
    ColorPicker(
      document.getElementById('slider'),
      document.getElementById('picker'),
      (hex, hsv, rgb, pickerCoordinate, sliderCoordinate) => {
          ColorPicker.positionIndicators(
              document.getElementById('slider-indicator'),
              document.getElementById('picker-indicator'),
              sliderCoordinate, pickerCoordinate
          );
          // console.log(rgb);
          // console.log(this.roseColor)
          this.roseColor = rgb;
          // document.body.style.backgroundColor = hex;
   });

  },
  beforeDestroy () {
  }
}
</script>

<style lang="scss" scoped>
.app {
  position: relative;
}

$petals: 30;
$scale1: 0.02;
$scale2: 0.04;
$rotation: 3;

@import url(http://fonts.googleapis.com/css?family=Arizonia|Montserrat:700,400);


.rose {
  z-index: 10001;
  position: relative;
  width: 100px;
  height: 100px;
  top: 40%;
  left: 51%;
  margin-left: -50px;
  margin-top: -50px;

  &+span {
    position: absolute;
    font-family: "Montserrat", san-serif;
    font-weight: bold;
    font-size: 18px;
    color: #64b5ce;
    text-transform: uppercase;
    text-align: center;
    width: 100px;
    height: 20px;
    line-height: 20px;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: 80px;
  }

  $r: 80;

  @for $i from 1 through $petals {
      &>.petal:nth-child(#{$i}){
        z-index: $petals - $i;
        transition: transform 1s;
        transform: scale(#{$i*$scale1}, #{$i*$scale1}) rotate(#{$i*$r}deg);
      }
      &:hover>.petal:nth-child(#{$i}){
        transform: scale(#{$i*$scale2}, #{$i*$scale2}) rotate(#{$i*($r+$rotation)}deg);
      }
    }

  .petal {
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
    // transform-origin: bottom center;
    transform-origin: 10% 80%;
    height: 100%;
    width: 100%;
    position: absolute;
    // background-image: radial-gradient(bottom left, ellipse cover, #e20909 0%, #810404 70%, #e20909 95%);
    // &:before {
    display: block;
    content: "";
    background-color: #8b0000;
    border-top-left-radius: 50% 35%;
    border-bottom-right-radius: 35% 50%;
    border-top-right-radius: 45%;
    border-bottom-left-radius: 10%;
    transform: rotate(-45deg);

  }
}

#leaf{
  z-index: 2;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-20px, -90px);
}

#leaf2{
  z-index: 1;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-20px, -60px) rotate(20deg);
}

.picker-compont {
  width: 300px;
  height: 150px;
  position: absolute;
  overflow: hidden;
  left: 50%;
  top: 60%;
  transform: translateX(-50%);

}

  #picker-wrapper {
    width: 200px;
    height: 200px;
    position: absolute;
    cursor: crosshair;
  }
  #slider-wrapper {
    cursor: crosshair;
    width: 30px;
    height: 200px;
    position: absolute;
    right: 1px;
  }
  #picker-indicator {
    // left: 116.5px;
    right: 0px;
    top: 0px;
    width: 8px;
    height: 8px;
    border: 2px solid lightblue;
    border-radius: 5px;
    opacity: .5;
    position: absolute;
    background-color: white;
  }
  #slider-indicator {
    top: 137px;
    opacity: .6;
    border: 3px solid lightblue;
    border-radius: 4px;
    background-color: white;
    width: 100%;
    height: 12px;
    position: absolute;
  }
</style>
