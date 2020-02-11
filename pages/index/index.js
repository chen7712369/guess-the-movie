

Page({
  /**
   * 页面的初始数据
   */
  data: {
    lalala:[],//用来储存切割后的备选项
    img_src:'',//储存后台回传的图片地址
    movie_name:'',//储存后台回传的电影名字【与chooseworld重复，暂且不用】
    chooseid:(10),//生成30个备选项方框
    binded: [],//记录选项的点击与否
    choosetxt:'', //记录30个备选项的文本
    nameme: '',//选择的答案
    xuanxiang:0,//已选答案数
    //number:0,//记录当前题目在数据库中的id，同时作为启动小程序时的初始号码，考虑到数据库未规范排序，为了召唤出热门电影，因此预设为5
    nameLength:'',//记录电影名字长度
    movie_id: '',//记录当前题目在数据库中的id
    hunxiao:'的一是了我不人在他有这个上们来到时大地为子中你说生国年着就那和要她出也得里后自以会家可下而过天去能对小多然于心学么之都好看起发当没成只如事把还用第样道想作种开美总从无情己面最女但现前些所同日手又行意动方期它头经长儿回位分爱老因很给名法间斯知世什两次使身者被高已亲其进此话常与活正感',//储存常用字的字库
    changetxt:'点击跳过当前题目',
    hasUserInfo:false,
  //  haslogined:false,
    canIUseButton:wx.canIUse('button.open-type.getUserInfo'),
  },
getinformation : function(){//获取后台的电影信息
  var thispage = this;
  //console.log('提交的题号' + this.data.number);

  wx.request({//从服务器获取电影信息
   
    url: 'https://www.612star.cn/newmovie.php',
    data: {
      user_id_token: wx.getStorageSync('token')//将用户加密token传给服务器
    },
    success: function (res) {
      console.log(res)//获取到了电影信息
      thispage.setData({ img_src: res.data.movie_imgg });//修改当前电影图片
      console.log(res.data.movie_imgg )
      thispage.setData({ movie_name:res.data.movie_namee });//修改当前电影名字
      thispage.setData({ choosetxt: res.data.movie_namee });//将电影名字置入备选项
      thispage.setData({ nameLength: res.data.movie_namee.length });//计算当前电影名字总长.
      thispage.setData({movie_id:res.data.movie_idd})//将当前电影编号记录下来
//-------------------------------------从外部移入的代码，解决json传输延迟所致的bug
      thispage.setData({ xuanxiang: 0 })
      //将该变量重置为一串和答案等长的空格
      var txt = ''
      for (var i = 0; i < thispage.data.nameLength; i++) {
        txt += ' '
      }
      thispage.setData({ nameme: txt })
//----------------------------------------------
      thispage.newtext()
    }
  })
},
//==============================================
changeimage: function () { 
  this.getinformation()
  this.newbindedtap()
},


newtext: function () {//随机生成字符补充缺位
    var txt=this.data.choosetxt;//缓存备选项的字符串
    for (var i = this.data.choosetxt.length;i<30;i++){//补足缺位
      var X=Math.round(Math.random()*139)
      txt += this.data.hunxiao[X];
    }
    console.log(txt)//检查字符串
    function upsetArr(arr) {//乱序函数
      return arr.sort(function () { return Math.random() - 0.5 });
    }
    var txt = upsetArr(txt.split("")).join("");//txt为打乱的字符串
    this.setData({ choosetxt: txt })
    var mimi=new Array()//暂存切分下来的字符串
      mimi[0]= txt.substring(0,10)
      mimi[1]=txt.substring(10,20)
      mimi[2]=txt.substring(20,30)
    this.setData({lalala:mimi})
    this.setData({changetxt:"点击跳过当前题目"});
},
 // -----------------------------------------------------------------------------
  onLoad: function () {//加载完成后先扫一遍
  this.tologin()
  //this.changeimage()
  },


  newbindedtap: function () {//将备选框点击状态置0---------------------------------------------------
    for (var m = 0; m < 30; m++) {
      this.data.binded[m] = 0
    }
  },



  andaole: function (e) {//处理点击备选框的事件-----------------------------------------------------------------------------
    if(this.data.binded[Number(e.currentTarget.dataset.bindedtap)]==0){//判断选项未被点击过
   // console.log("选项、name长度"+this.data.xuanxiang+this.data.nameLength);
      if ( this.data.xuanxiang <this.data.nameLength){//判断选项是否已满
        for(var i=0;i<this.data.nameLength;i++){//寻找空位
            var W=this.data.nameme[i]
          if(W==' '){
            var txt = this.data.nameme.substring(0, i) + e.currentTarget.dataset.textt + this.data.nameme.substring(i+1, this.data.nameLength)
            this.setData({ nameme: txt })
            this.data.binded[Number(e.currentTarget.dataset.bindedtap)]=1//修改为已点击
            this.data.xuanxiang++;
            break;
          }
        }
  //--------------------------
  if(this.data.xuanxiang==this.data.nameLength){
    console.log("数据检查")
        var X = this.data.number;//结果判定
          if (this.data.nameme == this.data.movie_name) {//*
          this.setData({changetxt:'答对了，点击进入下一题'})
          ////////////////////////////////////////////////////
            wx.request({//从服务器获取电影信息
              url: 'https://www.612star.cn/GetScore.php',
              data: {
                movie_id: this.data.movie_id,
                user_id_token: wx.getStorageSync('token'),
                score:true
              },
              success: function (res) {
              console.log('获取到的值为'+ res.data),
              this.changeimage()
              }

            })
/////////////////////////////////////////////////
          //this.changeimage()
        }
       }
      }
    }
  },


  xiugai: function (e) {//处理点击答案框的修改事件-----------------------------------------------------------------------------
    if (this.data.nameme[e.currentTarget.dataset.number]!=' '){
      for (var i = 0; i < 30; i++) {
        if (this.data.choosetxt[i] == this.data.nameme[e.currentTarget.dataset.number] && this.data.binded[i] == 1) {//寻找当前删除的地府对应的第一个点击过的备选字
          this.data.binded[i] = 0//修改为未点击
          break;
        }
      }
      var W = e.currentTarget.dataset.number//取出被点击的放个所在位
      var txt = this.data.nameme.substring(0, W) +' '  + this.data.nameme.substring(W + 1, this.data.nameLength)
      this.setData({ nameme: txt })
      this.data.xuanxiang--;
    }
  },



  tologin:function(){//静默登陆
    var thispage = this;
      wx.checkSession({
        success() {//判断session未过期，上传token校验
          var logtowx=require('../../js/request.js')
          logtowx.denglu().then(function (value) { thispage.changeimage() }) //为防止登录信息回传过慢，变成同步处理。
        },
        fail(){//判断session过期，重新登录
          var logtowx = require('../../js/logon.js')
          logtowx.tologon().then(function (value){thispage.changeimage()})//为防止登录信息回传过慢，变成同步处理。
        }
      })
  },

  toUserInfoPage:function(){//跳转到用户信息页
    wx.navigateTo({
      url: '../userinfopage/userinfopage',
    })
    /*
    wx.redirectTo({
      url: '../userinfopage/userinfopage',
    })
    也是跳转，用于跳到非tabBar页面
    */
  },

  getUserInfoNow:function(e){//初次登录的校验信息
    var thispage = this;//保存一个指向page的链接，方便后续修改
   //wx.//此处需要增加一个弹出菜单，用以在用户处于未登录状态，而点击了登陆按钮后封堵用户的操作
   /*
   wx.showModal({
     title: '是否登陆？',
     content: '',
     success(res){
       if(res.confirm){
         wx.showLoading({
           title: '',
         })
     */
      //   wx.getUserInfo({         })


    wx.login({
      success(res) {
        if (res.code) {
          console.log(res)
          wx.request({
            url: 'https://www.612star.cn/login-wx.php',
            data: {
              code: res.code,
              rawData: e.detail.rawData,
              signature: e.detail.signature,
            },//校验所需的信息
            success(res) {
              console.log(res);//获取到的openid
              console.log("搞定了登陆流程");
              //    thispage.setData({ hasUserInfo: true})//这是一个有返回值的场景，this指向返回值，因此通过之前定义的thispage来修改hasuserinfo的值。
              //此处还需要优化，解决用户进入页面前就已授权的状况。和用户使用不同设备登录的问题。
            }
          })
        } else {
          console.log("登陆失败")
        }//获取登录code失败
      }
    })
  //     wx.hideLoading()

 //      }
  //   }
  // })

/*
    var thispage = this;//更新登陆态信息
    wx.getSetting({
      success(res) {
        console.log(res.authSetting)
        var txt = res.authSetting;
        console.log(txt);
        if (res.authSetting["scope.userInfo"]) {
          console.log("找到了userinfo");
          thispage.setData({ hasUserInfo: true })
        }
      }
    })
 */
  
    
  },
})
