function tologon() {//初次的静默登录。用户获取session并缓存本地

  wx.login({
    success(res) {
      if (res.code) {
        wx.request({
          url: 'https://www.612star.cn/login-wx.php',
          data: {
            code: res.code,
          },//校验所需的信息
          success(res) {
            wx.setStorage({
              key: "token",
              data: res.data.token,
            })
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
}
module.exports = {
  tologon: tologon
}