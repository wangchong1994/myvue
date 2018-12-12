
'use strict';

// 全局state
const actions = {
  increment (context) {
      context.commit('increment')
    },
    decrement (context) {
      context.commit('decrement')
    },
}


export default actions;

