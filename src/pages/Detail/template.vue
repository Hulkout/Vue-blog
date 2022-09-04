<template>
  <div id="detail">
    <section class="user-info">
<!--      我们这应该是v-bind 简化为：里面是变量-->
      <img :src="user.avatar" :alt="user.username" :title="user.username" class="avatar">
      <h3>{{title}}</h3>
      <p><router-link :to="`/user/${user.id}`">{{user.username}}</router-link> 发布于{{friendlyDate(createdAt)}}</p>
    </section>
<!--    加v-html 内容转化才成功  直接写{{markdown}}不行的-->
    <section class="article" v-html="markdown"></section>
  </div>
</template>

<script src = "./template.js">

</script>


<style lang="less" src= "./template.less">

</style>
