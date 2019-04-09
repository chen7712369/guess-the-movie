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
    lalala:[],
    chooseid:(10),//生成30个备选项方框
    chooseworld:'', //记录备选项的文本
    nameme: '',//选择的答案
    xuanxiang:0,//已选答案数
    number:0,//第几道题
    nameLength:3,//记录电影名字长度
  },
  changeimage: function () {
    var X=this.data.number;
    X+=1;
    this.setData({number:X})
    this.setData({nameLength: this.data.Array[X].name.length})//计算当前电影名字总长。
    this.setData({nameme:''})
    this.setData({xuanxiang:0})
    this.newtext()
  },
  newtext:function(){//随机生成字符补充缺位
    /*测试代码。无用
    //Unicode 中文范围 4E00 - 9FA5：CJK 统一表意符号(CJK Unified Ideographs)
    //转换为10进制后中文范围从19968到40869
  */ 
  this.data.chooseworld=this.data.Array[this.data.number].name//将电影名称输入字符串
    for(var i=this.data.chooseworld.length;i<30;i++){//补足缺位
      var X=Math.round(Math.random()*20901+19968)
      this.data.chooseworld +=String.fromCharCode(X)
    }
    var X = this.data.chooseworld
    this.setData({chooseworld:X})//生成第一串字符串
    console.log(this.data.chooseworld)//检查字符串
    function upsetArr(arr) {//乱序函数
      return arr.sort(function () { return Math.random() - 0.5 });
    }
    var txt=upsetArr(this.data.chooseworld.split("")).join("");//txt为打乱的字符串
 var mimi=new Array()//暂存切分下来的字符串
   mimi[0]= txt.substring(0,10)
   mimi[1]=txt.substring(10,20)
   mimi[2]=txt.substring(20,30)
   this.setData({lalala:mimi})
  console.log(this.data.lalala)
  },
  onLoad: function(){
    this.newtext()
  },
  andaole:function(e){
    if ( this.data.xuanxiang <this.data.nameLength){
      this.data.nameme += e.currentTarget.dataset.textt;
      var txt=this.data.nameme
      this.setData({nameme:txt})
      console.log(this.data.nameme);
      this.data.xuanxiang++;
//--------------------------
      var X = this.data.number;//结果判定
      if (this.data.nameme == this.data.Array[X].name) {
        console.log('答对了')
        this.changeimage()
      }
    }
  },
  xiugai:function(e){

  }
})
