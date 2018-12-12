<template>
<div>
  <p>{{ number }}</p>
  <p>
    <button type="primary" @click="setinitnumber(3)">设置初始值</button>
    <button @click="addcount(3)">+</button>
    <button @click="decount(2)">-</button>
  </p>
</div>
</template>
<script>
    // import store from '@/store'
    import { mapMutations } from 'vuex';
    import { mapActions } from 'vuex';
    import { mapState } from 'vuex'
    export default{
        data(){
            return{
                msg:'Hello Vuex',
            }
        },
        computed: {
            // 箭头函数可使代码更简练
            number() {
              return this.$store.state.incrase.number;
            },
            // 为了能够使用 `this` 获取局部状态，必须使用常规函数
            // countPlusLocalState (state) {
            //   return state.count + this.localCount
            // }
        },
        methods: {
          ...mapActions(['decrement','increment','addcount','decount','setinitnumber'])
        },
    }
</script>
