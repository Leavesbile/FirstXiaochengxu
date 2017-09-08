// track.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "status": "卖家已发货",
    "orderNumber": "39182754891247",
    "shipmentNumber": "(顺丰速运)4321465432132",
    "orderTime": "2017-05-30",
    "trackDetails":[
      {
        "content":"您提交了订单，请等待系统确认",
        "times":"2017-05-28 14:23:34"
      },
      {
        "content":"您提交了订单，请等待系统确认",
        "times":"2017-05-28 14:23:34"
      },
      {
        "content":"您提交了订单，请等待系统确认",
        "times":"2017-05-28 14:23:34"
      },
      {
        "content":"您提交了订单，请等待系统确认",
        "times":"2017-05-28 14:23:34"
      },
      {
        "content":"您提交了订单，请等待系统确认",
        "times":"2017-05-28 14:23:34"
      },
      {
        "content":"您提交了订单，请等待系统确认",
        "times":"2017-05-28 14:23:34"
      },
      {
        "content":"您提交了订单，请等待系统确认",
        "times":"2017-05-28 14:23:34"
      },
      {
        "content":"您提交了订单，请等待系统确认",
        "times":"2017-05-28 14:23:34"
      },
      {
        "content":"您提交了订单，请等待系统确认",
        "times":"2017-05-28 14:23:34"
      }
    ]
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
    wx.stopPullDownRefresh()
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
  
  }
})