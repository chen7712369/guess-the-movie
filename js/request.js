function denglu() {//用户已登录之后，二次提交数据进行交互

  var session
  wx.getStorage({
    key: 'token',
    success(res) {
      session = res.data
      
      if(!session){
        var logtowx = require('/logon.js')
        logtowx.tologon()
        console.log('进入路径')
        return;
      }

      
      console.log(session+'位于request.js')

    }
   
  })
  wx.login({
    success(res) {
      if (res.code) {
  //      console.log(res)
        wx.request({
          url: 'https://www.612star.cn/todo.php',
          header: {},
          data: {
            code: res.code,
            token: session
          },//校验所需的信息
          success(res) {
            if(res.data=='查询失败'){
              var logtowx = require('/logon.js')//当查询失败时重启初次登陆
              logtowx.tologon()
            }
            wx.setStorage({
            key: "token",
            data: res.data,
            })
            console.log('这也能输出？？？？？' + res.data + '位于request.js')
         //   console.log(res.data.token + '位于request.js')
            //此处还需要优化，解决用户进入页面前就已授权的状况。和用户使用不同设备登录的问题。
          }
        })
      } else {
        console.log("登陆失败" + '位于request.js')
      }//获取登录code失败
    }
  })
}

module.exports = {
  denglu: denglu
}

