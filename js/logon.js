function tologon() {
  //初次的静默登录。用户获取session并缓存本地
 return new Promise(function (resolve, reject) {//由于异步代码会导致拉取电影信息时缺少用户信息，因此变为同步代码

  wx.login({
    success(res) {
      if (res.code) {
        wx.request({
          url: 'https://www.612star.cn/login-wx.php',
          data: {
            code: res.code,
          },//校验所需的信息
          success(res) {
            console.log(res.data)
            wx.setStorage({
              key: "token",
              data: res.data.token,
              //key:"coin",
              //data: res.data.user_coin ,
            })
            //this.setData({ coin: res.data.user_coin });
            resolve(res.data)
            wx.getStorage({
              key: 'token',
              success(res) {
                console.log('登录成功' + '位于logon.js')
                console.log(res.data + '位于logon.js')
              }
            })


            //此处还需要优化，解决用户进入页面前就已授权的状况。和用户使用不同设备登录的问题。
          }
        })
      } else {
        console.log("登陆失败" + '位于logon.js')
      }//获取登录code失败
    }
  })
 })


}
module.exports = {
  tologon: tologon
}