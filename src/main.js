// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex';
import storeOpt from './store';

// 先全量引入
Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
});
Vue.config.productionTip = false
Vue.use(Vuex);

const store = new Vuex.Store(storeOpt);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})
