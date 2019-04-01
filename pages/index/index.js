Page({

  /**
   * 页面的初始数据
   */

  data: {
    Array:[
      {
        src:'../image/小飞象.jpg',
        name:'小飞象'
      },
      {
        src: '../image/惊奇队长.jpg',
        name: '惊奇队长'
      },
      {
        src: '../image/流浪地球.jpg',
        name: '流浪地球'
      },
      {
        src: '../image/疯狂的外星人.jpg',
        name: '疯狂的外星人'
      },
    ],
    chooseid:(10),//生成30个备选项方框
    chooseworld:'这是象备选飞项的内小容哈哈,',//记录备选项的文本
    nameme: '',//选择的答案
    xuanxiang:0,//已选答案数

  number:0,//第几道题
  nameLength:3,//记录电影名字长度

  chname:0,
  },
  changeimage: function () {
    var X=this.data.number;
    X+=1;
    this.setData({number:X})
    this.setData({nameLength: this.data.Array[X].name.length})//计算当前电影名字总长。
    this.setData({nameme:''})
    this.setData({xuanxiang:0})
  },
  newtext:function(){
    
    var W=this.data.chooseworld[5];
    this.setData({nameme:W})
  

    
  },
  andaole:function(e){

    if ( this.data.xuanxiang <this.data.nameLength){
    var W=e.currentTarget.dataset.textt;
    W=this.data.nameme+W;
    this.setData({nameme:W});
    console.log(this.data.nameme);
    this.data.xuanxiang++;

//--------------------------
      var X = this.data.number;//结果判定
      if (this.data.nameme == this.data.Array[X].name) {
        console.log('答对了')
      }
    }

  }
})
