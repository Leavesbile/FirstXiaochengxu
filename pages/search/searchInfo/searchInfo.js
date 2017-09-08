// searchInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      "historyList":["恐龙","兔子","老虎"],
      "historyProjucts": [
        {
          "name": "家居老虎摆件",
          "desc": "纸匠纸品饰品家居生肖摆件老虎3D拼装瓦楞纸手工制品创意新年礼物楞纸手工制品创意新年礼物楞纸手工制品创意新年礼物楞纸手工制品创意新年礼物",
          "img": "../../images/dog.png",
          "money": 56,
          "sales": 2345
        },
        {
          "name": "家居老虎摆件",
          "desc": "纸匠纸品饰品家居生肖摆件老虎3D拼装瓦楞纸手工制品创意新年礼物",
          "img": "../../images/dog.png",
          "money": 56,
          "sales": 2345
        }
      ],
      "searchKey":""
  },
  //input输入
  inputValue:function(e){
    this.setData({
      searchKey: e.detail.value
    })
  },
  //点击键盘 搜索按钮
  inputConfirm:function(e){
    wx.redirectTo({
      url: '../../goodsList/goodsList?key=' + e.detail.value,
    })
  },
  //点击搜索按钮
  searchBtn:function(){
    let key = this.data.searchKey
    wx.redirectTo({
        url: '../../goodsList/goodsList?key=' + key,
    })
  },
  //历史搜索
  history:function(e){
    let key = e.target.dataset.key;
    wx.redirectTo({
      url: '../../goodsList/goodsList?key=' + key,
    })
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
  
  }
})