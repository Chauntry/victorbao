<template lang="html">
<div class="menu">
  <div class="btn trigger">
    <span class="line"></span>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
  props: {
    size: {
      type: String,
      default: '0.2rem'
    },
  },
  data() {
    return {
    }
  },
  ready () {

  },
  computed: {
  },
  method: {
  }
}
</script>

<style lang="scss" scoped>

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.absolute-center {
  position: absolute;
  top: 14px;
  left: 20px;
  transform: translateX(-50%) translateY(-50%);
}
.menu {
  @extend .absolute-center;
  width: 35px;
  height: 35px;
  .btn {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 0;
    z-index: -10;
    cursor: pointer;
    transition: opacity 1s, z-index 0.3s, transform 1s;
    transform: translateX(0);

    .fa {
      @extend .absolute-center;
      font-size: 3em;
      transition: color 0.3s;
    }


    &.trigger {
      opacity: 1;
      z-index: 100;
      cursor: pointer;
      transition: transform 0.3s;


      .line {
        @extend .absolute-center;
        width: 60%;
        height: 3px;
        background: black;
        border-radius: 0.2rem;
        transition: background-color 0.3s, height 0.3s, top 0.3s;

        &:before, &:after {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          width: 100%;
          height: 3px;
          background: black;
          border-radius: 0.2rem;
          transition: background-color 0.3s, transform 0.3s;
        }
        &:before {
          top: -7px;
          transform-origin: 10% 100%;
        }
        &:after {
          top: 7px;
          transform-origin: 5% 10%;
        }
      }
    }
  }

  &.active {
    .trigger {
      .line {
        height: 0px;
        background: #ddb343;
        &:before {
          background: #ddb343;
          transform: rotate(45deg);
          width: 110%;
        }
        &:after {
          background: #ddb343;
          transform: rotate(-45deg);
          width: 110%;
        }
      }
    }
  }
}
</style>
