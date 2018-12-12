<template>
  <div>
    <div class="line-box" :style="{'width': `${width}px`, 'top':`${position}px`}">
      <div class="goodsboxout">
        <slot name="content"></slot>
      </div>
      <div class="goodsboxin">
      </div>
      <div class="cover-circle up-right">
      </div>
      <div class="cover-circle up-left">
      </div>
      <div class="cover-circle bottom-right">
      </div>
      <div class="cover-circle bottom-left">
      </div>
      <!-- <div class="goods-btn">{{buttonInfo}}</div> -->
    </div>
<!--     <div class="tips" :style="{'margin-top': `${tipsmargin}px`}">{{tips}}</div>
 -->  </div>
</template>

<script>
export default {

  name: 'NotStart',
  props: {
    'buttonInfo': {
      type: String
    },
    'tips': {
      type: String
    },
    'width': {
      type: Number,
      default: 310
    },
    'position': {
      type: Number,
      default: -25
    },
    'tipsmargin': {
      type: Number,
      default: 25
    }
  },
  data () {
    return {
      
    };
  },
};
</script>
<style lang="stylus" scoped>
  .line-box {
    height: 180px;
    width: 310px;
    padding: 15px 5px;
    position: relative;
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
    top: -25px;
    background: #fff;
    border-radius: 4px;
    margin: 0px auto;
    .goods-btn {
      text-align:center;
      position: absolute;
      top: 155px;
      left: calc(50% - 65px);
      width: 130px;
      height: 40px;
      color: #fff;
      margin:0 auto;
      font-size: 16px;
      border-radius: 20px;
      padding: 10px 0;
      z-index: 10;
      /*transform: scale(0) translateY(-86px);*/
      transition: all 0.3s ease-in;
      transform-origin: 50% -64px;
      background: rgba(186,186,186,1);
      //box-shadow: inset 0 0 4px 4px rgba(174,174,174,1);
    }
    .goodsboxout {
      position: absolute;
      border: 1px solid rgb(254,230,222);
      width: calc(100% - 10px);
      height: calc(100% - 10px);
       top: 5px;
        left: 5px;
    }
    .goodsboxin {
        border: 1px solid rgb(254,230,222);
        width: calc(100% - 20px);
        position: absolute;
        top: 10px;
        left: 10px;
        border-radius: 2px;
        height: calc(100% - 20px);
      }
    .cover-circle {
      height: 15px;
      width:  15px;
      display: block;
      position: absolute;
      /*background: #ffc543 !important;*/
      z-index: 2;
    }
    .up-right {
      right: 5px;
      top: 5px;
      border-radius: 0 0 0 100%;
      border-top: 1px solid #fff;
      border-right: 1px solid #fff;
      border-left: 1px solid rgb(254,230,222);
      border-bottom: 1px solid rgb(254,230,222);
    }
    .up-left {
      left: 5px;
      top: 4.5px;
      border-radius: 0 0 100% 0 ;
      border-top: 1px solid #fff;
      border-left: 1px solid #fff;
      border-right: 1px solid rgb(254,230,222);
      border-bottom: 1px solid rgb(254,230,222);
    }
    .bottom-left {
      left: 4.5px;
      bottom: 5px;
      border-radius: 0 100% 0 0;
      border-bottom: 1px solid #fff;
      border-left: 2px solid #fff;
      border-right: 1px solid rgb(254,230,222);
      border-top: 1px solid rgb(254,230,222);
    }
    .bottom-right{
      bottom: 5px;
      right: 5px;
      border-radius: 100% 0 0 0 ;
      border-bottom: 1px solid #fff;
      border-right: 1px solid #fff;
      border-left: 1px solid rgb(254,230,222);
      border-top: 1px solid rgb(254,230,222);
    }
  }
</style>
<style lang="stylus" scoped>
  .tips
    text-align center 
    color rgba(0,0,0,0.5)
    margin-top 15px
</style>
