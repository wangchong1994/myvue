<template>
<div>
  <p>{{ count }}</p>
  <p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
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
        computed: mapState({
            // 箭头函数可使代码更简练
            count: state => state.count,
        
            // 传字符串参数 'count' 等同于 `state => state.count`
            countAlias: 'count',
        
            // 为了能够使用 `this` 获取局部状态，必须使用常规函数
            countPlusLocalState (state) {
              return state.count + this.localCount
            }
        }),
        methods: {
          ...mapActions(['decrement','increment'])
          // increment () {
          //   store.commit('increment')
          // },
          // decrement () {
          //     store.commit('decrement')
          // }
        },
    }
</script>
