import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
const state = {
        count: 3
    }
    export default new Vuex.Store({
        state
    });