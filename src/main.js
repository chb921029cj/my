// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios';
import echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
import * as custom from './filter/time';
import $ from 'jquery'
import './assets/libs/jquery/jQuery.print.js'

  

Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
import Element from 'element-ui';
Vue.use(Element, {
  size: 'small',
  zIndex: 3000
});

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
