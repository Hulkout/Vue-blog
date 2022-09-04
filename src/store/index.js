import Vue from "vue";
import Vuex from 'vuex'
import auth from "./modules/auth"; //登录注册相关vuex
import blog from "./modules/blog"; //博客相关

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth:auth, //两种写法
    blog
  }
})
