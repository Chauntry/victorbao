<template lang="html">
<div class="app">
<div class="marilyn" :style="{height: marilynHeight + 'px', width: marilynHeight + 'px', transform: 'translate(-'+ marilynHeight /2 +'px ,-'+ marilynHeight /2 +'px)'}"> </div>
<div class="eye1" :style="{transform:'translate(-'+ (eyeHeight /2 + marilynHeight*0.3) +'px ,-'+ eyeHeight /2 +'px)'}">
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
   :width="eyeHeight + 'px'" :height="eyeHeight + 'px'" viewBox="0 0 205.000000 360.000000" z-index="2">
  <g transform="translate(0.000000,360.000000) scale(0.100000,-0.100000)"
  :fill="eyecolor" stroke="none">
  <path d="M860 3590 c-119 -17 -214 -41 -320 -83 -162 -64 -257 -133 -426 -312
  -110 -115 -132 -153 -103 -170 6 -4 13 -15 17 -25 11 -30 142 -133 228 -179
  43 -24 98 -57 122 -73 123 -84 311 -147 506 -169 l106 -12 0 -1018 0 -1017
  -37 -13 c-46 -15 -118 -81 -146 -134 -17 -31 -22 -58 -22 -115 0 -90 22 -138
  89 -197 98 -86 244 -86 342 0 67 59 88 107 89 197 0 65 -4 82 -29 128 -31 56
  -87 104 -143 123 l-33 11 0 1018 0 1019 58 6 c184 20 362 74 486 146 52 30
  115 86 239 209 92 93 167 175 167 183 0 15 -171 180 -209 201 -11 6 -55 36
  -98 67 -148 106 -253 152 -428 190 -104 23 -354 33 -455 19z m296 -248 c205
  -104 206 -405 2 -506 -66 -33 -170 -36 -234 -7 -126 57 -194 216 -150 349 28
  82 102 156 186 183 43 14 152 4 196 -19z m373 -42 c92 -48 251 -173 251 -198
  0 -13 -115 -121 -175 -164 -55 -39 -187 -108 -208 -108 -9 0 -2 23 22 72 35
  70 36 75 36 188 0 110 -2 119 -31 179 l-32 63 51 -6 c27 -4 66 -16 86 -26z
  m-859 17 c0 -2 -9 -22 -20 -45 -59 -121 -47 -325 22 -399 21 -22 21 -23 2 -23
  -58 0 -373 166 -387 204 -7 17 31 57 115 120 101 76 268 165 268 143z"/>
  </g>
  </svg>
</div>
<div class="eye2" :style="{transform:'translate('+ (marilynHeight*0.3 - eyeHeight /2) +'px ,-'+ eyeHeight /2 +'px)'}">
  <svg class= "eye2" version="1.0" xmlns="http://www.w3.org/2000/svg"
   :width="eyeHeight + 'px'" :height="eyeHeight + 'px'" viewBox="0 0 321.000000 484.000000" stytle = "z-index:10001">
  <g transform="translate(0.000000,484.000000) scale(0.100000,-0.100000)"
  :fill="eyecolor" stroke="none">
    <path d="M1420 4671 c-86 -28 -150 -82 -191 -161 -35 -67 -34 -186 3 -255 25
    -49 75 -103 111 -122 15 -7 -10 -41 -174 -237 l-191 -228 51 -45 51 -45 301 2
    300 1 -12 -23 c-7 -13 -79 -139 -161 -280 l-148 -257 0 -856 0 -857 -42 7
    c-79 12 -151 36 -238 80 -148 74 -264 223 -293 373 l-12 62 -272 0 c-224 0
    -273 -2 -273 -14 0 -7 7 -53 15 -101 25 -144 107 -316 203 -425 l44 -50 -18
    -28 c-9 -15 -67 -96 -127 -181 -60 -85 -111 -159 -113 -165 -3 -9 297 -158
    322 -160 4 -1 56 67 114 149 78 111 111 150 125 149 11 -1 57 -18 102 -39 69
    -30 171 -60 306 -89 l27 -6 0 -215 0 -215 195 0 195 0 0 213 0 214 108 22 c59
    12 148 38 198 57 51 19 96 34 100 34 5 -1 68 -86 139 -190 91 -134 135 -189
    147 -187 28 3 317 141 318 151 0 4 -67 104 -149 221 l-150 213 41 43 c150 161
    238 343 263 542 l7 57 -274 0 -273 0 -12 -62 c-18 -93 -66 -181 -147 -266 -59
    -62 -85 -82 -156 -115 -75 -35 -210 -77 -247 -77 -11 0 -13 145 -13 844 l0
    845 191 331 c105 182 190 332 188 334 -2 1 -26 16 -54 32 l-50 29 -283 5 -283
    5 147 175 c120 143 153 177 183 186 95 29 159 81 202 164 35 67 34 186 -3 255
    -52 99 -140 156 -248 161 -36 2 -76 0 -90 -5z m140 -176 c79 -41 79 -179 0
    -220 -90 -46 -190 11 -190 110 0 99 100 156 190 110z"/>
  </g>
  </svg>
</div>
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
      eyecolor: '#fff',
      marilynHeight: 0,
      clientHeight: 0,
      eyeHeight: 0,
      cookies: [
        {id: 'eye1', location: [65, 362]},
        {id: 'eye2', location: [-28, 357]},
      ],
      touching: null,
      mouseDownLocation: [0, 0],
      mouseCurrentLocation: [0, 0],
    }
  },
  props: {
  },
  methods: {
  },
  computed: {
  },
  route: {
  },
  created () {
  },
  ready () {
    this.clientHeight = document.body.clientHeight
    this.marilynHeight = this.clientHeight * 0.6
    this.eyeHeight = this.clientHeight * 0.15
    this.eyecolor = this.$route.query.eyecolor ? this.$route.query.eyecolor : this.eyecolor
  },
  beforeDestroy () {
  }
}
</script>

<style lang="sass" scoped>
.app
  position: relative
  .marilyn
    z-index: 0
    position: absolute
    left: 50%
    top: 50%
    background:
      image: url(~assets/marilynmonroe.png)
      repeat: no-repeat
      size: 100%
  .eye1
    position: absolute
    z-index: 100001
    left: 50%
    top: 65%
  .eye2
    position: absolute
    z-index: 100001
    left: 50%
    top: 65%
</style>
