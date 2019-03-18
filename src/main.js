// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import echarts from 'echarts'
import store from './store'
import axios from 'axios'
import YpI18n from 'pkg-error-msg-hello';
import VueI18n from 'vue-i18n';
import * as Sentry from '@sentry/browser';


Sentry.init({
  dsn: 'https://a70d03d73ad74eb591a4475977435d7c@sentry.io/1335695',
  integrations: [new Sentry.Integrations.Vue({ 
    Vue,
    attachProps: true
  })]
})

Vue.use(VueI18n);

Vue.prototype.$echarts = echarts
axios.defaults.withCredentials = true; //配置为true
Vue.prototype.$http = axios
Vue.use(iview)

Vue.config.productionTip = false

const langMessages = {
  en: {

  },
  zh: {

  }
}

YpI18n('en')
    .then((msg) => {
      console.log("msg", msg);
      Object.assign(langMessages.en, msg);
      const i18n = new VueI18n({
        locale: 'en',
        messages: langMessages,
        fallbackLocale: 'en',
        sync: true,
      });
      /* eslint-disable no-new */
      new Vue({
        el: '#app',
        router,
        i18n,
        store,
        template: '<App/>',
        components: {
          App,
        },
      });
    });

/* eslint-disable no-new */

