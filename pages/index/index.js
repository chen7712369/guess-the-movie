var movietxt=require('/movie.js');//载入目录文件
//var moviejson=require('/movie.json')


Page({

  /**
   * 页面的初始数据
   */
  data: {
      Array:movietxt.indid,//将json发送的电影信息数据载入
 //     TTTT:JSON.parse(url='/movie.json'),
/*    Array:[
      {
        src:'../image/xfx.jpg', 
        name:'小飞象'
      },
      {
        src: '../image/jqdz.jpg',
        name: '惊奇队长'
      },
      {
        src: '../image/lldq.jpg',
        name: '流浪地球'
      },
      {
        src: '../image/fkdwxr.jpg',
        name: '疯狂的外星人'
      },
    ],
    */
    lalala:[],//用来储存切割后的备选项
    chooseid:(10),//生成30个备选项方框
    binded: [],//记录选项的点击与否
    chooseworld:'', //记录备选项的文本
    nameme: '',//选择的答案
    xuanxiang:0,//已选答案数
    number:-1,//第几道题，因为启动时自动调用切入下一道题的函数，因此预设为-1
    nameLength:3,//记录电影名字长度
    hunxiao:'的一是了我不人在他有这个上们来到时大地为子中你说生国年着就那和要她出也得里后自以会家可下而过天去能对小多然于心学么之都好看起发当没成只如事把还用第样道想作种开美总从无情己面最女但现前些所同日手又行意动方期它头经长儿回位分爱老因很给名法间斯知世什两次使身者被高已亲其进此话常与活正感',//储存常用字的字库
    changetxt:'',
    hasUserInfo:false,
    canIUseButton:wx.canIUse('button.open-type.getUserInfo'),


    movie:movietxt.indid,//把目录置入数据

  },
  changeimage: function () {    //-----------------------------------------------------------------------------
    var X=this.data.number;
    X+=1;
    this.setData({number:X})
    this.setData({nameLength: this.data.Array[X].name.length})//计算当前电影名字总长。
    this.setData({ xuanxiang: 0 })
    this.setData({ changetxt: '点击切换下一张图片'})
    this.newtext()
    //将该变量重置为一串和答案等长的空格
    var txt = ''
    for (var i = 0; i < this.data.nameLength; i++) {
      txt += ' '
    }
    this.setData({ nameme: txt })
    //
    this.newbindedtap()
  },
  newtext: function () {//随机生成字符补充缺位-----------------------------------------------------------------------------
  this.data.chooseworld=this.data.Array[this.data.number].name//将电影名称输入字符串
    for(var i=this.data.chooseworld.length;i<30;i++){//补足缺位
      var X=Math.round(Math.random()*139)
      this.data.chooseworld +=this.data.hunxiao[X]
    }
    var X = this.data.chooseworld
    this.setData({chooseworld:X})//生成第一串字符串
    console.log(this.data.chooseworld)//检查字符串
    function upsetArr(arr) {//乱序函数
      return arr.sort(function () { return Math.random() - 0.5 });
    }
    var txt=upsetArr(this.data.chooseworld.split("")).join("");//txt为打乱的字符串
    this.setData({chooseworld:txt})//将打乱后的字符再写入chooseworld方便后续删除字符时超找位置。
    var mimi=new Array()//暂存切分下来的字符串
   mimi[0]= txt.substring(0,10)
   mimi[1]=txt.substring(10,20)
   mimi[2]=txt.substring(20,30)
   this.setData({lalala:mimi})
  //console.log(this.data.lalala)//检测词条生成状况
  },
  onLoad: function () {//加载完成后先扫一遍-----------------------------------------------------------------------------
    this.changeimage()
 
  //  var mivie=this.data.moviee.indid
  //  console.log(this.data.movie[0].src)

  },
  newbindedtap: function () {//将备选框点击状态置0-----------------------------------------------------------------------------
    for (var m = 0; m < 30; m++) {
      this.data.binded[m] = 0
    }
  },
  andaole: function (e) {//处理点击备选框的事件-----------------------------------------------------------------------------
    if(this.data.binded[Number(e.currentTarget.dataset.bindedtap)]==0){//判断选项未被点击过
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
        var X = this.data.number;//结果判定
        if (this.data.nameme == this.data.Array[X].name) {
          this.setData({changetxt:'答对了，点击进入下一题'})
          //this.changeimage()
        }
       }
      }
    }
  },
  xiugai: function (e) {//处理点击答案框的修改事件-----------------------------------------------------------------------------
    if (this.data.nameme[e.currentTarget.dataset.number]!=' '){
      for (var i = 0; i < 30; i++) {
        if (this.data.chooseworld[i] == this.data.nameme[e.currentTarget.dataset.number] && this.data.binded[i] == 1) {//寻找当前删除的地府对应的第一个点击过的备选字
          this.data.binded[i] = 0//修改为未点击
          break;
        }
      }
   //   console.log('跳出')
      var W = e.currentTarget.dataset.number//取出被点击的放个所在位
      var txt = this.data.nameme.substring(0, W) +' '  + this.data.nameme.substring(W + 1, this.data.nameLength)
      this.setData({ nameme: txt })
    //  console.log(this.data.nameme)
      this.data.xuanxiang--;
    }
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
    console.log(e)
    console.log(e.detail.rawData);
    wx.login({
      success(res){
        if(res.code){
          console.log(res)
          wx.request({
            url: 'https://www.612star.cn/login-wx.php',
            data: {
              code: res.code,
              rawData: e.detail.rawData, 
              signature: e.detail.signature, 
            //  iv: e.detail.iv,
            //  encryptedData: e.detail.encryptedData
            },//校验所需的信息
          
            success(res){
              console.log(res)//获取到的openid
            }

          
          })

        }else{}


      }

      
    })
        
    


  },
})
