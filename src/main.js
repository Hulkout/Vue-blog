// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store' //后面没有写东西 就默认是index.js了

//在一开始把这个插件安装进去
import Util from "./helpers/util";
Vue.use(Util)

Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,//引入 页面就可以使用这个东西了
  router,
  components: { App },
  template: '<App/>'
})
