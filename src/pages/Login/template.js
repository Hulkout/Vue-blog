import { mapActions } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    onLogin() {
      this.login({username: this.username, password: this.password})
        .then(()=>{//注册成功之后跳转 因为我们一开始使用了vue router 每一个组件都会有 .$router 属性，对应vue router实例 它有一个push方法 这样就能跳转到首页
          this.$router.push({path: this.$route.query.redirect || '/'})
        })
    }
  }
}
