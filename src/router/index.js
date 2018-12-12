
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import vuexcount from '@/view/vuexcount.vue'
import draggable from '@/view/draggable'
import swiper from '@/components/swiper'
import koaapiget from '@/components/koaapiget'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/vuexcount',
      name: 'vuexcount',
      component: vuexcount
    },
    {
      path: '/draggable',
      name: 'draggable',
      component: draggable
    },
    {
      path: '/swiper',
      name: 'swiper',
      component: swiper
    },
    {
      path: '/koaapiget',
      name: 'koaapiget',
      component: koaapiget
    }
  ]
})
