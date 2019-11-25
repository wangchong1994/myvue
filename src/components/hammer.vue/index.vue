<template>
  <div class="RandomPurchase" ref="drag" @click="goto" @touchmove="preventDefault">
  </div>
</template>

<script>
import Hammer from 'hammerjs'
const winW = window.innerWidth,
      winH = window.innerHeight;
export default {

  name: 'RandomPurchase',

  props: ['url'],

  data () {
    return {
      lastEndCenter: {},
      // url: window.PARAMS
    }
  },

  methods: {
    goto() {
      window.location.href = this.url;
    },

    preventDefault(e) {
      e.preventDefault();
    },

    initEvent() {
      const $dom  = this.$refs.drag;
      const hammer = new Hammer($dom);
      hammer.get('pan').set({
        threshold: 0
      });
      let startCenter = null;
      let x = 0,
          y = 0;
      let distanceX = 0;
      let distanceY = 0;
      hammer.on('panmove', (e)=>{
        if(!startCenter){
          startCenter = e.center;
        }
        if(!(this.touchStartPoint && this.touchStartPoint.x)) {
          this.touchStartPoint = e.center;
          if(this.lastEndCenter.x) {
            distanceX = this.lastEndCenter.x - this.touchStartPoint.x;
            distanceY = this.lastEndCenter.y - this.touchStartPoint.y;
          }
        }
        x = e.center.x - startCenter.x + distanceX;
        y = e.center.y - startCenter.y + distanceY;

        if(!this.checkBoundary({x,y})) return;

        Object.assign($dom.style, {
          transform: `translate3d(${x}px,${y}px,0)`
        });
      }).on('panend', (e)=>{
        this.touchStartPoint = null;
        this.lastEndCenter = e.center;
        this.lastEndCenter.x = this.lastEndCenter.x + distanceX;
        this.lastEndCenter.y = this.lastEndCenter.y + distanceY;
      })
    },

    checkBoundary({x,y}) {
      // item position is right=10px, bottom=10px
      if(x>10||y>10) return false;
      if(x<(80-winW+10) || y<(80-winH+10)) return false;
      return true;
    }
  },

  mounted() {
    this.initEvent();
  }
}
</script>

<style lang="stylus" scoped>
.RandomPurchase
  position absolute
  // background-color red
  right 10px
  bottom 10px
  width 80px
  height 80px
  background-image url('./images/icon_01_200x200.png')
  background-size 80px 80px
  background-position center
  background-repeat no-repeat
  z-index 200
  filter: drop-shadow(0 0 3px #777);
</style>