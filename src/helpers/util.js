function friendlyDate(datsStr){ //参数可以是一个字符串 也可以是一个日期对象
  let dateObj = typeof datsStr ==='object'?datsStr: new Date(datsStr);//不是的话变成日期对象
  let time = dateObj.getTime()//获取时间
  let now = Date.now()//获取现在的时间
  let space = now-time //看看差多少
  let str = ''

  switch (true){
    case space < 60000: //小于60秒
      str = '刚刚'
      break
    case space <1000*3600: //一小时以内
      str = Math.floor(space/60000)+'分钟前'
      break
    case space <1000*3600*24:
      str = Math.floor(space/(1000*3600))+'小时前'
      break
    default:
      str = Math.floor(space/(1000*3600*24))+'天前'
  }
  return str
}

//Vue中的插件 就是一个对象  有一个属性叫install 默认参数Vue  第二个是一些配置信息，这个里面就是对vue做一些事情
//写好之后在main.js中 import use  此时所有Vue实例中都有friendlyDate这个方法
export default {
  install(Vue,options){
    Vue.prototype.friendlyDate = friendlyDate
  }
}
