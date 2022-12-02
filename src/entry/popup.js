import Vue from 'vue';
import App from '../view/popup/popup.vue'
import store from '../store';
import router from '../view/popup/router/index';

import $g from '../global/index';
Vue.$g = Vue.prototype.$g = $g
import axios from 'axios';
Vue.axios = Vue.prototype.$axios = axios

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

store.commit('getLang');

import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: store.state.lang,
  messages: {
    'en-US': require('../lang/en')
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  router,
  render: h => h(App),
});
