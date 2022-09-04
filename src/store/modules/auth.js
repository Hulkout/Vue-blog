import auth from '../../api/auth' //request

const state = {
  user:null,
  isLogin:false
}

const getters = {
  user:state=>state.user,
  isLogin:state=>state.isLogin
}


const mutations = {
  setUser(state,payload){//action里面就可以commit一个setUser,参数为payload
    state.user = payload.user
  },

  setLogin(state,payload){
    state.isLogin = payload.isLogin
  }
}


const actions = {//异步操作有哪些呢、 提供方法供组件使用
  login({commit},{username,password}){
     return auth.login({username,password}) //我们这里返回的是一个Promise对象,当别人调用login传用户名和密码得到一个对象 之后就可以then了,学promise就是学的异步
      .then(res=>{
        commit('setUser',{user:res.data})
        commit('setLogin',{isLogin:true})
      })
  },
  //我们这里用另一种语法 async await,这个就是对promise的一种改进，回头看异步相关的视频
  //在其他地方就可以调用register，返回的还是一个promise对象
  async register({commit},{username,password}){
   let res = await auth.register({username,password})
    commit('setUser',{user:res.data})
    commit('setLogin',{isLogin:true})
    return res.data //后续在then里面得到他的东西，不知道说啥的
  },

  async checkLogin({commit,state}){//判断是否登录 没什么参数 需要用到state
    if (state.isLogin) return true//如果已经登录了返回true
    let res = await auth.getInfo()//判断用户是否登录
    commit('setLogin',{isLogin:res.isLogin})
    if(!res.isLogin) return false//如果没有登录返回false
    commit ('setUser',{user:res.data})//登录了的话就要把user拿到
    return true
  },
  /* 第三方就可以调用 它返回一个promise对象 就可以，then  this.logout().then(isLogin=>{
   这样就和第一种写法一样了
  )*/
  //注销
  async logout({commit}){
    await auth.logout()
    commit('setUser',{user:null})
    commit('setLogin',{isLogin:false})
  }

}


export default {
  state,
  getters,
  mutations,
  actions
}
