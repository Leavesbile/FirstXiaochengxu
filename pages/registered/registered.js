// registered.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    email:"",
    code:"",
    passwordOne:"",
    passwordTwo:"",
    servicesCode:"",
    getCode:true,
    time:60
  },
  //手机号码
  phone:function(e){
    this.setData({
      phone: e.detail.value
    })
  },

  //验证码
  code:function(e){
 
    this.setData({
      code: e.detail.value
    })
  },

  //邮箱
  email:function(e){

    this.setData({
      email: e.detail.value
    })
  },

  //密码
  passwordOne:function(e){
    this.setData({
      passwordOne: e.detail.value
    })
  },
  //确认密码
  passwordTwo:function(e){
    this.setData({
      passwordTwo: e.detail.value
    })
  },

  //获取验证码
  getCode:function(){
    let _this = this;
    let phone = _this.data.phone;
    if(app.isPhone(phone)){
      app.getData("post", "sms/code", { phone : phone },function(res){
        _this.setData({
          servicesCode:res.data.data.code,
          getCode: !_this.data.getCode
        })
        //定时器倒计时
        var intervalTime = setInterval(function(){
          let timer = _this.data.time;
          timer--;
          if (timer < 0){
            clearInterval(intervalTime);
            _this.setData({
              time: 60,
              getCode: !_this.data.getCode
            })
          }else{
            _this.setData({
              time: timer
            })
          }
          
        },1000)
      },function(res){})
    }else{
      wx.showToast({
        title: '手机号码有误',
        icon:"loading"
      })
      return;
    }
  },

  //注册
  registered:function(res){
    if (this.data.code != this.data.servicesCode || this.data.servicesCode == "") {
      wx.showToast({
        title: '验证码有误',
        icon: "loading"
      })
      return;
    }
    if (!app.isEmail(this.data.email)) {
      wx.showToast({
        title: '邮箱格式有误',
        icon: "loading"
      })
      return;
    }
    if (this.data.passwordOne != this.data.passwordTwo){
      wx.showToast({
        title: '两次密码不一致',
        icon: "loading"
      })
      return;
    }
    if (this.data.passwordOne.length < 5){
      wx.showToast({
        title: '密码太简单',
        icon: "loading"
      })
      return;
    }
    let useerData = { phone: this.data.phone, password: this.data.passwordOne, code: this.data.servicesCode, email: this.data.email }
    app.getData("post", "user/register", useerData, function(res){
      wx.navigateBack({
        delta:1
      })
    },function(res){
      wx.showToast({
        title: res.data.data,
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
  
  }
})