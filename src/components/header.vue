<template>
  <header :class="{login:isLogin,'no-login':!isLogin}">
    <template v-if="!isLogin">
      <h1>Let's share</h1>
      <p>精品博客汇</p>
      <div class="btns">
<!--        按钮里不要有链接 链接中可有按钮-->
        <router-link to="/login"><el-button >立即登录</el-button></router-link>
        <router-link to="/register"><el-button >注册账号</el-button></router-link>
      </div>
    </template>
<!--    不可以直接写两个header报错 所以用到两个template 或者 v-else-if-->
   <template v-if="isLogin">
     <h1><router-link to="/">Let's share</router-link></h1>
     <router-link to="/create"><i class="el-icon-plus edit"></i></router-link>
     <div class="user">
       <img class="avatar" :src="user.avatar" :alt="user.username" :title="user.username">
       <ul>
         <li><router-link to="/my">我的</router-link></li>
         <li><a href="#" @click=lo>注销</a></li>
       </ul>
     </div>
   </template>
  </header>
</template>

<script lang="js">
import {mapState,mapGetters,mapActions} from 'vuex'

export default {
  data(){
    return{
      //isLogin:false 这里我们之前设定的就不需要了 直接可以从vuex中拿到
    }
  },
  computed:{//我们从get中拿出来减少层级。
    ...mapGetters([
      'isLogin',
      'user'
    ])
  },
  methods:{
    ...mapActions([
      'checkLogin',
      'logout'
    ]),
    lo(){
      this.logout()
      this.$router.push({ path: '/'})
    }
  },
  created() {
    this.checkLogin().then()
  }
};
</script>

<style lang="less" scoped>
@import "../assets/base";
 header.no-login {
   display: grid;
   justify-items: center;
   padding: 0 12% 30px 12%;
   background: @bgColor;

   h1 {
     color: #fff;
     font-size: 40px;
     margin: 60px 0 0 0;
     text-transform: uppercase; //变成大写

   }

   p {
     margin: 15px 0 0 0;
     color: #fff;
   }

   button {
     margin: 25px 5px 0;
   }
 }
   header.login {
     display: flex;
     align-items: center;
     background: @bgColor;
     h1 {
       margin: 0;
       padding: 0;
       color: #fff;
       font-size: 40px;
       text-transform: uppercase; //变成大写
       flex: 1;//这一步就左右分开了 不太清楚
       a{
         color: #ffffff;
       }
     }
     .edit{
        color: #fff;
       font-size: 30px;
     }

     .avatar{
       width: 40px;
       height: 40px;
       border: 1px solid #fff;
       border-radius: 50%;
       margin-left: 15px;
     }
     .user {
       position: relative;

       ul {
         display: none;
         position: absolute;
         right: 0;
         list-style: none;
         border: 1px solid #eaeaea;
         margin: 0;
         padding: 0;
         background-color: #fff;
          a{
            text-decoration: none;
            color: #333;
            font-size: 12px;
            display: block;
            padding: 5px 10px;
            &:hover{
              background-color: #eaeaea;
            }
          }
       }
       &:hover {
         ul{
           display: block;
         }
       }
     }

 }
</style>
