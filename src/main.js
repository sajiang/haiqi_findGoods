// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'Vuex'
import { InfiniteScroll  } from 'mint-ui'

import Message from 'iview/src/components/message/index.js';
import 'iview/dist/styles/iview.css'


Vue.use(Vuex);
Vue.use(InfiniteScroll);

const store = new Vuex.Store({
  state: {
    url:"http://192.168.0.198:86/api/",
    portlist:[],
    openId:"oRQW6t4QoNaCFWxdCf0CaUeIn1qw",
    isBind:1,
  },
 
})

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$Message = Message;

axios.get(store.state.url+'Common/COM_ProvincesCities')
.then(function (response) {
	var data=response.data.RetData;
	store.state.portlist=data;
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
