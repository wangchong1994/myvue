<template>
  <div class="yo-scroller" @touchmove="preventMove">
    <div class="yo-scroller-wrapper" :id="`scroller${id}`" @touchmove="touchmove" @touchstart="touchstart" :ref="`scroller${id}`">
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'Scroller',

  data () {
    return {
      id: +new Date(),
      start:'',
    }
  },

  methods: {
    preventMove(e){
      e.preventDefault();
    },

    touchstart(e) {
      console.log("this.id",this.id);
      console.log('touchstart');
      this.oldId = this.id;
      this.start = e.touches[0];
    },
    
    touchmove(e) {
      let touch = e.touches[0];
      // console.log("this.start",this.start);
      // console.log("touch",touch);
      // console.log("target",target);
      let target = this.$refs[`scroller${this.id}`]
      let isAtTop = this.start.screenY<=touch.screenY && target.scrollTop == 0;
      let isAtBottom = this.start.screenY>=touch.screenY && target.scrollTop+ target.offsetHeight>=target.childNodes[0].offsetHeight ;
      // console.log("isAtTop", isAtTop);
      // console.log("isAtBottom", isAtBottom);
      console.log("target.scrollTop",target.scrollTop);
      if(isAtTop || isAtBottom){
          e.preventDefault();
          return
      }

        e.stopPropagation();

    },
    moveToTop(index){
      // console.log("index",index);
      let scroller =  document.getElementsByClassName("yo-scroller-wrapper");
      // console.log("this.oldId",this.oldId);
      let target = scroller[index+1];
      target.scrollTop = 0;
      // console.log("target",target.scrollTop);
    }
  }
}
</script>

<style lang="stylus" scoped>
// .yo-scroller
  // height 100%
.yo-scroller-wrapper
  height 100%
  -webkit-overflow-scrolling touch
  overflow auto
  position relative
</style>