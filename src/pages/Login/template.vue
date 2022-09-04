<template>
  <div id="login">
    <h4>用户名</h4>
<!--    用model绑定 当用户输入user name的时候会修改我们的数据 所以JS中必须写上数据空的-->
    <input v-model="username" placeholder="用户名">
    <h4>密码</h4>
    <input v-model="password" type="password" placeholder="密码" @key.enter="onLogin">
    <el-button size="medium" @click="onLogin">立即登录</el-button>
<!--    点击立即登录或者在密码框按回车 执行onLogin方法-->
    <p class="notice">没有账号？<router-link to="/register">注册新用户</router-link></p>
  </div>
</template>

<script src = "./template.js">

</script>


<style src= "./template.less">

</style>
