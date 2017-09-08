// classification.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "sort":[
      {
        "className": "white",
        "src": "../images/dog.png",
        "en": "OFFICE　SERIES",
        "ch": "办公系列",
        "series":"office"
      },
      {
        "src": "../images/dog.png",
        "en": "LIFE HOME SERIES",
        "ch": "家居系列",
        "series": "life"
      },
      {
        "src": "../images/dog.png",
        "en": "EDUCATIONAL TOYS",
        "ch": "益智玩具系列",
        "series": "toy"
      },
      {
        "className": "white",
        "src": "../images/dog.png",
        "en": "LUGGAGE CLOTHING",
        "ch": "收纳系列",
        "series": "storage"
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 跳转至商品列表页
   */
  goodsList:function (e) {
    let series = e.target.dataset.series
    console.log(series);
    
    wx.navigateTo({
      url: '../goodsList/goodsList?series=' + series +"&sort=new",
    })
  }
})
