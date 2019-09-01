// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import qs from 'qs';
import moment from 'moment';
import store from './vuex/store';
import Print from 'vue-print-nb';
import htmlToPdf from '@/htmlToPdf';
import './assets/icon/iconfont.css'

Vue.use(iView);
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(htmlToPdf);
Vue.use(Print); //注册
Vue.config.productionTip = false;
Vue.prototype.$axios = axios; //axios不能使用use方法，转而应该进行此操作
Vue.prototype.$qs = qs;
Vue.prototype.$moment = moment //赋值使用
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY年MM月DD日 HH:mm:ss') {
  return moment(dataStr).format(pattern)
})
Vue.filter('dateweek', function (dataStr, pattern = 'dddd') {
  return moment(dataStr).format(pattern)
})
Vue.filter('datetime', function (dataStr) {
  return moment(dataStr).format('YYYY年MM月DD日 HH:mm:ss')
})
// axios.defaults.headers.common['token'] = 'f4c902c9ae5a2a9d8f84868ad064e706';
// axios.defaults.headers.post["Content-type"] = "application/json"
// Vue.prototype.$url = 'http://192.168.1.50:8080/vas';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
