'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

// import VuexI18n from 'vuex-i18n';

import state from './state';
import actions from './actions';
import mutations from './mutations';
import modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules
});

// Vue.use(VuexI18n.plugin, store);

export default store;
