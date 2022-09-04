import blog from '@/api/blog'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      blogs: [],
      page: 1,
      total: 0
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  created() {
    this.page = parseInt(this.$route.query.page) || 1
    blog.getBlogsByUserId(this.user.id, { page: this.page })
      .then(res => {
        console.log(res)
        this.page = res.page
        this.total = res.total
        this.blogs = res.data
      })
  },

  methods: {
    onPageChange(newPage) {
      blog.getBlogsByUserId(this.user.id, { page: newPage }).then(res => {
        console.log(res)
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        this.$router.push({ path: "/my", query: { page: newPage}})
      })
    },
    // onDelete(blogId) {
    //   this.$confirm('此操作将永久删除文件','Warning',{  //这里就是elementUi 当你点击确定执行then 取消执行catch 我们这里取消什么也不干就没有
    //     confirmButtonText:'确定',
    //     cancelButtonText:'取消',
    //     type:'warning'
    //   }).then(()=>{
    //     blog.deleteBlog({blogId}).then(()=>{
    //       this.$message({
    //         type:"success",
    //         message:'删除成功'
    //       })
    //     })
    //   })
    // }, 这个写法很笨重
//反正后续不需要catch 就按照下面这个写法
    async onDelete(blogId) {
      await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await blog.deleteBlog({ blogId })
      this.$message.success('删除成功')
      //删除之后需要刷新才没 此时我应该DOM中页删除掉，把你要删除的过滤出来，剩下的东西重新复制给blogs
      this.blogs = this.blogs.filter(blog => blog.id != blogId)
    },

    splitDate(dataStr) {
      let dateObj = typeof dataStr === 'object' ? dataStr : new Date(dataStr)
      return {
        date: dateObj.getDate(),
        month: dateObj.getMonth() + 1,
        year: dateObj.getFullYear()
      }
    }
  }
}
