// import axios from 'axios'
// import { Message } from 'element-ui'
//
//
// //发送请求的类型   application/x-www-form-urlencoded
// //全局配置 这样发请求不需要单独配置了，每个请求头的 Content-Type就都是这个东西
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// //接口地址 //表示当前发送请求的协议 接口的协议和当前页面要保持一致 ，这样在用axios之后就不需要写完整URL只需要写路径即可
// axios.defaults.baseURL = '//blog-server.hunger-valley.com'
//
// window.request = request
//
// //把整体的当前模块导出一个函数 需要三个参数，url type data
// export default function request(url, type = 'GET', data = {}) {
//   return new Promise((resolve, reject) => {
//     let option = {
//       url,
//       method: type,
//     }//根据文档 get 的时候 参数 url method params POST 的参数叫data
//     if(type.toLowerCase() === 'get') {
//       option.params = data
//     }else {
//       option.data = data
//     }
//
//     //token 和后端交互涉及到用户的身份信息的传递  登录注册 可以用cookie session
//     //比如 我发送请求 填写用户名密码登录，发送到服务器 服务器收到请求然后进行验证，通过之后给我一个响应，在服务端生成session  然后把session ID作为cookie发送到浏览器
//     //浏览器收到之后自动保存到自己的cookie里 下次发请求自动带上cookie，服务端就可以识别 认为用户登录 给其响应的权限
//     //另一种方式就是 JWT 我发送请求给服务器 服务器返回给我token 下次发其他请求的时候自己主动带上token,而不是像cookie一样自动带
//     //当我们发送请求之后 如果请求数据中有tonken ,那我就把他保存到localstorage里面，下次再发请求的时候 如果有tonken,我们设置请求头字段 Auth 把tonke放进去 发出去，
//     //第一次之后 每次发请求都经过这里，所以我们主动的把tonken带上发给服务器 服务器使用tonken做验证
//     if(localStorage.token) {
//       axios.defaults.headers.common['Authorization']  = localStorage.token
//     }
//     // axios(option).then就是发送请求,请求到来之后获取到数据
//     axios(option).then(res=>{
//       console.log(res.data)
//       //这里等于’ok‘是我们和后端的约定，由此判断我们得到的数据是否合法
//       if (res.data.status === 'ok'){
//         ////第一次请求的时候是肯定没有tonken的 ，发送请求 服务端验证 然后把tonken发给我们，我们把他保存到本地
//         if (res.data.token){
//           localStorage.token = res.data.token
//         }
//         //如果数据对，就把它resolve
//         resolve(res.data)
//       }else{
//         //出错之后element 里面的  弹出一个错误信息  再reject出去
//         Message.error(res.data.msg)
//         reject(res.data)
//       }
//     }).catch(err=>{
//       Message.error('网络异常')
//       reject({msg:'网络异常'})
//     })
//
//   })
// }

// 用法如下
// request('/auth/login','POST',{username:'hunger',password:'123456'})
//   .then(data=>{
//     console.log(data)
//   }).catch  (catch可以弄可以不弄)


import axios from 'axios'
import { Message } from 'element-ui'
// 发送请求的类型   application/x-www-form-urlencoded,全局配置 这样发请求不需要单独配置了，每个请求头的 Content-Type就都是这个东西
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//接口地址 //表示当前发送请求的协议 接口的协议和当前页面要保持一致 ，这样在用axios之后就不需要写完整URL只需要写路径即可
axios.defaults.baseURL = '//blog-server.hunger-valley.com'


window.request = request
//把整体的当前模块导出一个函数 需要三个参数，url type data
export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
    }
    if(type.toLowerCase() === 'get') {
      option.params = data
    }else {
      option.data = data
    }
    if(localStorage.token) {
      axios.defaults.headers.common['Authorization']  = localStorage.token
    }

    axios(option).then(res => {
      console.log(res.data)
      if(res.data.status === 'ok') {
        if(res.data.token) {
          localStorage.token = res.data.token
        }
        resolve(res.data)
      }else{
        Message.error(res.data.msg)
        reject(res.data)
      }
    }).catch(err => {
      Message.error('网络异常')
      reject({ msg: '网络异常' })
    })
  })
}

