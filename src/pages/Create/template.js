import blog from '../../api/blog'

export default {
  data () {
    return {
      title: '',
      description: '',
      content: '',
      atIndex: false
    }
  },

  methods: {
    //用户点击确认之后会去提交
    onCreate() {
      blog.createBlog({ title: this.title, content: this.content, description: this.description, atIndex: this.atIndex})
        .then(res => { //出错自动有提示所以我们就先不管了
          this.$message.success(res.msg)//之前约定 成功之后数据中有一个message字段，就是个成功提示？
          this.$router.push({ path: `/detail/${res.data.id}`})//跳转到刚创建的详情页面，这个博客的id就在res.data中
        })
    }
  }
}
