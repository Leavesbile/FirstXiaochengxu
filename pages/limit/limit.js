// limit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hours:'01',
    miutes:'01',
    second:'00',
    shoppingItem:[
      {
        img:'../images/ma.png',
        name:'马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马马',
        desc:'纸匠纸品饰品家居生肖摆件老虎3D拼装瓦楞纸手工制品创意新年礼物,纸匠纸品饰品家居生肖摆件老虎3D拼装瓦楞纸手工制品创意新年礼物',
        total:100,
        oldTotal:130
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