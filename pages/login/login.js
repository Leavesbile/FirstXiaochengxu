// login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    passwordtype:true,
    user:"",
    password:""
  },
  //用户名
  userName:function(e){
    this.setData({
      user:e.detail.value
    })
  },

  //密码
  password:function(e){
    this.setData({
      password: e.detail.value
    })
  },

  //登录
  login:function(){
    let _this = this;
    app.getData("post", "user/login", { loginName: _this.data.user, password: _this.data.password },function(res){
      wx.showToast({
        title: '登录成功',
        icon:"success"
      })
      wx.setStorageSync("userId", res.data.data.userId);
      //保存为全局变量
      app.globalData.userId = res.data.data.userId;
      wx.navigateBack({
        delta:1
      })
    },function(res){
      wx.showToast({
        title: res.data.msg,
        icon: "loading"
      })
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
  
  },
  /**
   * 注册
   */
  registered:function(){
    wx.navigateTo({
      url: '../registered/registered',
    })
  },
  /**
   * 忘记密码
   */
  forget: function () {
    wx.navigateTo({
      url: '../forget/forget',
    })
  },
})