<template>
  <div style="width:400px;text-align:left;margin-left: 100px">
    <!-- fade -->
    <div id="demo">
    <button v-on:click="show = !show">
      Toggle
    </button>
    <transition name="fade">
      <p v-if="show">hello</p>
    </transition>
  </div>
  <!-- 过度的移开 -->

  <div id="example-1">
    <button @click="show1 = !show1">
      Toggle render
    </button>
    <transition name="slide-fade">
      <p v-if="show1">hello</p>
    </transition>
  </div>
  
<!-- 动画 -->
  <div id="example-2">
  <button @click="show3 = !show3">Toggle show</button>
  <transition name="bounce">
    <p v-if="show3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
  </transition>
</div>
<!-- 引用animate。css -->
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css"/>

<div id="example-3">
  <button @click="show4 = !show4">
    Toggle render
  </button>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show4">hello</p>
  </transition>
</div>

</div>
</template>

<script>
export default {

  name: 'index',

  data() {
    return {
       show: true,
       show1: true,
       show3: true,
       show4: true
    };
  },
};
</script>

<style lang="css" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
