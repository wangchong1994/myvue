/*
 * @Author: pandaj
 * @Date:   2017-05-25 10:02:15
 * @Last Modified by:   pandaj
 * @Last Modified time: 2017-05-25 15:36:30
 */

'use strict';

import Vue from 'vue';

import * as types from '@/store/mutation-types.js';



const state = {
  number:null,
};

const actions = {
  setinitnumber({
    dispatch,
    commit,
    state
  },n){
    commit('setinitnumber', n)
  },
  addcount({
    dispatch,
    commit,
    state
  },n) {
    commit(types.ADD_COUNT, n)
  },
  decount({
    dispatch,
    commit,
    state
  },n) {
    commit(types.DECREASE_COUNT, n)
  }
};

const mutations = {
  setinitnumber(state,n){
    state.number = n;
  },
  [types.ADD_COUNT](state,n){
    state.number += n;
  },
  [types.DECREASE_COUNT](state,n){
    state.number -= n;
  }
};

export default {
  state,
  actions,
  mutations
}
