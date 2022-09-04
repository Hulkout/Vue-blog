import { marked } from 'marked'
import blog from '@/api/blog'

export default {
  data () {
    return {
      title: '',
      rawContent: '',//内容 我们一开始得到的原始内容需要markDown转换
      user: {},//所有用户信息
      createdAt: ''
    }
  },

  created() {
    this.blogId = this.$route.params.blogId
    blog.getDetail({ blogId: this.blogId}).then(res => {
      console.log(res)
      this.title = res.data.title
      this.rawContent = res.data.content
      this.createdAt = res.data.createdAt
      this.user = res.data.user
    })
  },

  computed: {
    markdown() {// markDown转换内容
      return marked(this.rawContent)
    }
  }
}
