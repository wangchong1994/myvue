import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
    decrement (context) {
      context.commit('decrement')
    },
    // decrement ({commit}) {
    //   commit('decrement')
    // }
  }
})

// export default {
//   store,
// }
export default store;