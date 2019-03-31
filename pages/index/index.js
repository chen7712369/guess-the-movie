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
    chooseid:(30),

  number:0,

  chname:0,
  },
  changeimage: function () {
    var X=this.data.number;
    X+=1;
    this.setData({number:X})

  },
  newtext:function(){


    
  }
})
