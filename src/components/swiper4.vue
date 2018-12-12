<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide class="swiper-slide" v-for="(activity,index) in list" :key="index">
        <div class="activity-info">
          <a class="cover">
           {{activity.name}}
          </a>
        </div>
      </swiper-slide>
      <!-- Add Pagination -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
export default {
  data () {
    return {
      list:[{name:'1'},{name:'2'},{name:'3'},{name:'4'},{name:'5'},{name:'6'}],
      swiperOption: {
        spaceBetween: 5,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="stylus">
.my-bullet
  border-radius .02rem
  width .04rem
  height .04rem
  margin 0 .03rem
  display inline-block
  background rgba(0,0,0,0.20)
.my-bullet-active
  background #3CDBC0
  width .16rem
</style>
