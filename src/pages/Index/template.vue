
<template>
  <div id="index">
    <section class="blog=posts">
<!--      用个for循环来展示每一项  to前加：表示后面不是字符串 是变量-->
      <router-link :to="`/detail/${blog.id}`" class="item" v-for="blog in blogs" :key="blog.id">
<!--        使用 <figure> 元素标记文档中的一个图像：-->
        <figure class="avatar">
          <img :src="blog.user.avatar" :alt="blog.user.username">
<!--          <figcaption>用作文档中插图的图像，带有一个标题：：-->
          <figcaption>{{ blog.user.username }}</figcaption>
        </figure>
        <h3>{{ blog.title }}<span>{{ friendlyDate(blog.createdAt) }}</span> </h3>
        <p>{{ blog.description }}</p>
      </router-link>
    </section>
    <section class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        @current-change="onPageChange"
      >
<!--        total是 默认的有多少数据-->
      </el-pagination>
    </section>
  </div>
</template>



<script src = "./template.js"></script>
<style lang="less" scoped src="./template.less"></style>
