import blog from '../../api/blog'

export default {
  data () {
    return { //这里要有一个博客列表
      blogs:[],
      total:0,
      page:1,

    }
  },
  created() {
    //进来的时候看一下他链接上有没有页数
    this.page = parseInt(this.$route.query.page)||1
    //一开始进来要发请求获取数据 获取到数据之后复制给blogs
    blog.getBlogs({page:this.page}).then(res=>{
      console.log(res) //打印出来看看res有什么
      this.blogs = res.data
      this.total = res.total
      this.page = res.page
    })
  },
  methods:{
    //当页数改变的时候 newPage就是你改变到的那一页  我们把页数传递进去
    onPageChange(newPage) {
      console.log(newPage)
      blog.getBlogs({page:newPage}).then(res=>{
        console.log(res) //打印出来看看res有什么
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        // 能不能第二页　的时候我复制链接　人家能直接跳转到第二页
        // 可以把页数放到URL中
        this.$router.push({path:'/',query:{page:newPage}})

      })
    }
  }
}
