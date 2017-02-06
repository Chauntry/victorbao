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
    state: {
      type: String,
      default: '0'
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

body {
  background: green;
}

.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.menu {
  @extend .absolute-center;
  width: 1.5rem;
  height: 1.5rem;

  .btn {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(255,255,255, 0.15);
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

    &:hover .fa {
      color: rgba(255,255,255, 0.7);
    }

    &.trigger {
      opacity: 1;
      z-index: 100;
      cursor: pointer;
      transition: transform 0.3s;

      &:hover {
        transform: scale(1.2);

        .line {
          background-color: rgba(255,255,255, 0.7);

          &:before, &:after {
            background-color: rgba(255,255,255, 0.7);
          }
        }
      }

      .line {
        @extend .absolute-center;
        width: 60%;
        height: 6px;
        background: #000;
        border-radius: 6px;
        transition: background-color 0.3s, height 0.3s, top 0.3s;

        &:before, &:after {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          width: 100%;
          height: 6px;
          background: #000;
          border-radius: 6px;
          transition: background-color 0.3s, transform 0.3s;
        }
        &:before {
          top: -0.22rem;
          transform-origin: 15% 100%;
        }
        &:after {
          top: 0.22rem;
          transform-origin: 25% 30%;
        }
      }
    }
  }

  &.active {
    .trigger {
      .line {
        height: 0px;
        top: 45%;
        &:before {
          transform: rotate(45deg);
          width: 110%;
        }
        &:after {
          transform: rotate(-45deg);
          width: 110%;
        }
      }
    }
  }
}
</style>
