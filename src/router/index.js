import Vue from 'vue'
import Router from 'vue-router'
/*
import Index from '@/pages/Index/template.vue' //@指的就是src
import Login from "../pages/Login/template.vue";
import Detail from "../pages/Detail/template.vue";
import Create from "../pages/Create/template.vue";
import Edit from "../pages/Edit/template.vue";
import User from "../pages/User/template.vue";
import My from "../pages/My/template.vue";
import Register from "../pages/Register/template.vue";
*/

import store from "../store"; //其实是store下的index

Vue.use(Router)
const router =  new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/pages/Index/template.vue')
    },
    {
      path: '/login',
      component: () => import('@/pages/Login/template.vue')
    },
    {
      path: '/detail/:blogId',
      component: () => import('@/pages/Detail/template.vue')
    },
    {
      path: '/edit/:blogId',
      component: () => import('@/pages/Edit/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      component: () => import('@/pages/Create/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:userId',
      component: () => import('@/pages/User/template.vue')
    },
    {
      path: '/my',
      component: () => import('@/pages/My/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      component: () => import('@/pages/Register/template.vue')
    }
  ]
})
/*
const router = new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
   {
     path: '/login',
     component: Login
   },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/detail/:blogId',
      component: Detail
    },
    {
      path: '/user/:userId',
      component: User
    },
    {
      path: '/my',
      component: My,
      meta:{requiresAuth:true}
    },
    {
      path: '/create',
      component: Create,
      meta:{requiresAuth:true}
    },
    {
      path: '/edit/:blogId',
      component: Edit,
      meta:{requiresAuth:true}
    }
  ]
})
*/

//router就是上面我们要导出的对象，我们现在要对他做一个处理,此时我们取消它的导出 处理再导出
//beforeEach 是什么？ 每次路由切换都会执行对应的函数.对router里面的每一个path这些东西进行遍历，当路由切换就执行
// to.matched 就是我们匹配到的路由，看看record 里面的meta
// 比如 路径 到了 detail/3
/*
  {
      path: '/detail/:blogId',
      component: Detail
    } 我们就匹配到这个

    因为匹配的时候可能会匹配到很多 所以他是一个数组
    数组中找某些 some 某些什么呢？ 它里面有一个meta,且meta.requiresAuth还要是true
    所以detail/3下就没有找到，如果我匹配到 /create这时候就找到了，找到之后看看 auth.isLogin 是否登录
    如果没有登录就跳转到 path 然后 路径后面加上 query 这个参数 这个参数的意思就是 你登录之后再跳回个页面    如果登录了就直接下一步

    那如何判断是否登录呢？我们api里有一个判断用户是否登录的方法。但是这个方法是异步的，我么每一次路由切换都要查询一次是否登录 太麻烦了。
    所以我们使用vuex中的对象，那我们如何得到store中的东西呢？ 之前我们只学习了再vue组件中如何使用 这里又没有.具体操作看有道笔记 图片
    1、拿到是store
*/
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('checkLogin').then(isLogin=>{
      if (!isLogin) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  } else {
    next() // 确保一定要调用 next()
  }
})


export default router
