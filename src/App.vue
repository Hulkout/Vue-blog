<template>
  <div id="app">
    <Header id = "header"></Header>
    <main id = "main">
      <router-view/>
    </main>
    <Footer id = "footer"></Footer>
  </div>
</template>

<script>
import Header from './components/header'
import Footer from './components/footer'
import auth from './api/auth'
import blog from './api/blog'
window.auth = auth
window.blog = blog
export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  data() {
      return {
        username: ''
      }
    },
    methods: {
      login() {
        auth.login({username: 'hunger', password: '123456'})
          .then(res => {
            console.log(res)
            this.username = res.data.username
          })
      }
    }

}
</script>

<style lang="less">
@import "./assets/common.less";
  #app{
    display: grid;
    grid-template-columns: 12% auto 12%;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:"header header header"
                         ".       main      ."
                        "footer footer footer";

    #header{
      grid-area: header;
      padding-left:12% ;
      padding-right:12% ;
    }
    #main{
      grid-area: main;
    }
    #footer{
      grid-area: footer;
      padding-left:12% ;
      padding-right:12% ;
    }
  }

  @media (max-width: 768px){
    #app{
      grid-template-columns: 100px auto 100px;
      #header,#footer{
        padding-left:10px ;
        padding-right:10px ;
      }
    }
  }
</style>
