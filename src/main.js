import Vue from 'vue';
import moment from 'moment';
import { Scrollbar } from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

moment.locale('zh-cn');
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;
Vue.use(Scrollbar);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
