<template>
  <!-- <swiper class="coupon-swiper" :options='swiperOption' ref='swiper'>
    <swiperSlide  v-if="spoilType === 2" class="discount-slide">
        <header class="goods-name-container"><h3 class="goods-name" v-text="one.title"></h3></header>
        <div class="goods-image" v-if="one.type == 1">
          <p><span v-text="(one.amount/100).toFixed(2)"></span>元</p>
          <img src="/static/images/redemp/img_dikou_296x156.png" />
        </div>
        <div class="goods-image" v-if="one.type == 2">
          <p><span v-text="one.amount/100"></span>折</p>
          <img src="/static/images/redemp/img_zhekou_296x156.png" />
        </div>
       
        <img class="cloud" src="/static/images/redemp/img_cface_482x240.png" />
        <a href="javascript:;" class="goods-btn"
          :class="{'receive': selfRemainingVoucher > 0, 'received': selfRemainingVoucher <= 0, 'empty': one.qty <= 0}"
          @click='getCoupon($event, one)'></a>
      </swiperSlide>
    <swiperSlide v-for="(item, index) in list" v-if="spoilType === 1 && list.length > 0"
      :key="index">
        <header class="goods-name-container"><h3 class="goods-name" v-text="item.Name"></h3></header>
        <img class="goods-image"
          :src="`${item.ImageFixWidthUrl}?x-oss-process=image/resize,p_9`"
          :class="{random: random}" />
        <img class="cloud" src="/static/images/redemp/img_cface_482x240.png" />
        <a href="javascript:;" class="goods-btn"
          :class="{'receive': selfRemainingVoucher > 0, 'received': selfRemainingVoucher <= 0, 'empty': item.Stock <= 0}"
          @click='getCoupon($event, item)'></a>
      </swiperSlide>
  </swiper> -->
  <div>
  <swiper class="coupon-swiper" :options='swiperOption' ref='swiper'>
     <swiperSlide v-for="(item, index) in list" 
      :key="index">
      <div class="goodsboxout">
      {{item.name}}
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
      
    </swiperSlide>
  </swiper>
  <!-- <swiper3d></swiper3d> -->
  <!-- <swiper4></swiper4> -->
</div>

</template>

<script>
import swiper3d from './swiper3d'
import swiper4 from './swiper4'
import linebox from './linebox'
import { swiper, swiperSlide } from "vue-awesome-swiper";
import 'swiper/dist/css/swiper.css'

export default {
  data() {
    return {
      list:[{name:'1'},{name:'2'},{name:'3'},{name:'4'},{name:'5'},{name:'6'}],
      swiperOption: {
        effect: "cube",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        autoplay: 4000,
        speed: 500,
        onlyExternal: true,
        // loop: true,
        coverflow: {
          rotate: 0,
          stretch: -290,
          depth: 2500,
          modifier: 1,
          slideShadows: false
        }
      }
    };
  },

  props: {
    getCoupon: {
      type: Function,
      default() {}
    },
    // list: {
    //   type: Array,
    //   default() {
    //     return [];
    //   }
    // },
    selfRemainingVoucher: {
      type: Number,
      default: 0
    },
    random: Boolean,
    one: {
      type: Object,
      default() {
        return {};
      }
    },
    spoilType: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    buttonInfo(selfRemainingVoucher,Stock){
      console.log('selfRemainingVoucher,Stock',selfRemainingVoucher,Stock);
      if(selfRemainingVoucher > 0 && Stock > 0) {
        return '领取'
      }else if (selfRemainingVoucher <= 0 && Stock > 0){
        return '已领取'
      }else if (Stock <= 0 ){
        return '已领完'
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
    linebox,
    swiper3d,
    swiper4,
  }
};
</script>

<style lang='stylus'>
.coupon-swiper {
  height: 230px;
  width: 260px;
  overflow: hidden;
  padding: 10px 0px;
  margin-left: 20px;
  .swiper-slide {
    height: calc(100% - 20px);
    margin: 10px 6px;
    width: 300px;
    background: #fff;
    max-width: 250px;
    border-radius: 4px;
    /*background: url('/static/images/redemp/img_cback_482x240.png') center 180px no-repeat / 92%;*/
    text-align: center;
    opacity: 0.7;
    padding: 5px;
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
   
    .goodsboxout {
      border: 1px solid rgb(254,230,222);
      width: 100%;
      height: 100%;
      .goods-btn-new {
        position: absolute;
        top: 165px;
        left: calc(50% - 65px);
        width: 130px;
        height: 40px;
        background: rgb(249,95,46);
        color: #fff;
        margin:0 auto;
        font-size: 16px;
        border-radius: 20px;
        padding: 10px 0;
        z-index: 10;
        /*transform: scale(0) translateY(-86px);*/
        transition: all 0.3s ease-in;
        transform-origin: 50% -64px;
  
        &.receive {
          background: #f95f2f;
        }
  
        &.received {
          background: rgba(186,186,186,1);
          box-shadow: inset 0 0 4px 4px rgba(174,174,174,1);
        }
  
        &.empty {
          background: rgba(186,186,186,1);
          box-shadow: inset 0 0 4px 4px rgba(174,174,174,1);
        }
      }
      .goods-image {
      position: absolute;
      top: 25px;
      left: 50%;
      // height 80px
      transform: translateX(-50%) ;
      transform-origin: 50% 100%;
      height: 85px;
      p {
        position: absolute;
        top: 5px;
        left: 5px;
        font-weight: 600;
        color: #fff;
        font-size: 28px;
        span {
          font-size: 28px;
        }
      img {
        height: 85px;
      }
      &.random {
        height: 85px;
      }
    }
    }
      .goods-name-new {
      position: relative;
      display: inline-block;
      padding: 9px 20px;
      font-weight: normal;
      font-size: 16px;
      top: 110px;
      color: #333;
    }
    }
    .goodsboxin {
        border: 1px solid rgb(254,230,222);
        width: calc(100% - 20px);
        position: absolute;
        border-radius: 2px;
        top: 10px;
        left: 10px;
        height: calc(100% - 20px);
      }
    .cover-circle {
      height: 25px;
      width: 25px;
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
      top: 5px;
      border-radius: 0 0 100% 0 ;
      border-top: 1px solid #fff;
      border-left: 1px solid #fff;
      border-right: 1px solid rgb(254,230,222);
      border-bottom: 1px solid rgb(254,230,222);
    }
    .bottom-left {
      left: 5px;
      bottom: 5px;
      border-radius: 0 100% 0 0;
      border-bottom: 1px solid #fff;
      border-left: 1px solid #fff;
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
   /* &.swiper-slide-next
    {
      transform: translate3d(82px, 0px, -300px) rotateX(0deg) rotateY(0deg)!important;
      opacity: 1;
    }
    &.swiper-slide-prev
    {
      transform: translate3d(-70px, 0px, -300px) rotateX(0deg) rotateY(0deg)!important;
      opacity: 1;
    }*/
    &.swiper-slide-active {
      opacity: 1;
    }
    &.discount-slide {
      .goods-image {
        bottom: 95px;
      }
    }
  }
}
.swiper-container {
  top: 250px !important;
  position: absolute !important;
}
@keyframes jump {
  0% {
    transform: translateY(170px) scale(0);
  }

  // 60%
  // transform translateY(-20px) scale(1)
  80% {
    transform: translateY(-20px) scale(1.1);
  }

  100% {
    transform: translateY(0px) scale(1);
  }
}

@keyframes move {
  0% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px);
  }

  50% {
    transform: translateX(0);
  }

  75% {
    transform: translateX(5px);
  }

  100% {
    transform: translateX(0);
  }
}

.weui-loading_toast.vux-loading {
  position: relative;
  z-index: 5000;
}


</style>
