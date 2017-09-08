//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    "swiperUrls": [
      // 轮播图
      {
        "img": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714135219-966.jpg",
      },
      {
        "img": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714135219-966.jpg",
      },
      {
        "img": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714135219-966.jpg",
      }
       ],
    "newsUrls":[
      { "title": "放假啦！是时候给自己的房间修正一下了！纸匠… "},
      { "title": "放假啦！是时候给自己的房间修正一下了！纸匠… " },
    ],
    "qianggou":[
      {
        "gongneng":"新品发布",
        "gongnengEn":"NEW PRODUCT",
        "event":"goToNewProduct",
        "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714154057-125.png"
      },
      {
        "gongneng": "在线客服",
        "gongnengEn": "ONLINE SERVICE",
        "event": "goToNewKeFu",
        "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714154157-407.png"
      }
    ],
    "goods" : [
      {
        "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714153727-159.jpg",
      },
      {
        "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714153727-159.jpg",
      },
      {
        "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714153727-159.jpg",
      }
    ],
    "qianggouSrc": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714153915-492.png",
    "goodsBox" : [
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714151420-968.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714151517-830.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714151536-963.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714151615-755.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714151635-681.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714151712-575.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714151747-620.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714151818-710.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714151842-611.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714151955-164.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714152102-382.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714152128-967.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714152209-336.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714152340-385.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714152400-116.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714152423-961.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714152446-461.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714152514-179.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714152545-252.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714152610-90.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714152645-52.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714152736-770.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714152809-669.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714155012-820.jpg"} ,

      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714155125-874.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714155206-914.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714155259-88.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714155410-464.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714155452-104.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714155536-234.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714155701-328.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714155758-443.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714155845-940.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714155942-628.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714160004-791.jpg"} ,
      { "src": "http://papermaker.cn/files/papermaker/applyImages/20170714/20170714160024-770.jpg"} ,
        
        ]
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goToLimit:function(e){
    wx.navigateTo({
      url: '../limit/limit',
    })
  },
  goToNewKeFu:function(){

  },
  goToNewProduct:function(){
    wx.navigateTo({
      url: '../goodsList/goodsList?sort=new&series=""',
    })
  },
  goodsList:function () {
    wx.navigateTo({
      url: '../goodsList/goodsList',
    })
  },
  // 跳转至商品详情
  goodsDetails:function(){
    wx.navigateTo({
      url: '../goodsDetails/goodsDetails',
    })
  },
  //忘记密码
 
  onLoad: function () {
    console.log('onLoad')

    // wx.navigateTo({
    //   url: '../login/login',
    // })


    // wx.navigateTo({
    //   url: '../success/success',
    // })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

  //  wx.setStorageSync('userId','6f4c3203c85245ffac56f2d51ab0cf27')
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
})
