
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import vuexcount from '@/components/vuextest'
import draggable from '@/view/draggable'
import timer from '@/view/timer'
import form from '@/view/form'
import swiper from '@/components/swiper'
import koaapiget from '@/components/koaapiget'
import learnSomeJsFunc from '@/view/learnSomeJsFunc'
import canvasLearning from '@/view/canvasLearning'
import dragula from '@/view/dragula'

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
      path: '/canvas-learn',
      name: 'canvas-learn',
      component: canvasLearning
    },
    {
      path: '/draggable',
      name: 'draggable',
      component: draggable
    },
    {
      path: '/dragula',
      name: 'dragula',
      component: dragula
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
    },
    {
      path: '/form',
      name: 'form',
      component: form
    },
    {
      path: '/timer',
      name: 'timer',
      component: timer
    },
    {
      path: '/learnSomeJsFunc',
      name: 'learnSomeJsFunc',
      component: learnSomeJsFunc
    }
  ]
})
