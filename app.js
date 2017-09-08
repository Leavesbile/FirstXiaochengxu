//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    userId:""
  },
  //向服务器发起网络请求的函数封装
  getData: function (types, urls, datas, callback, error){
    let _this = this;
    _this.request(types, urls, datas, callback, error);
    
  },
  request: function (types, urls, datas, callback, error){
    let _this = this;
    if (typeof (datas) == 'function') {
      callback = datas;
      datas = '';
    }
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: 'https://papermaker.cn:8443/mall/' + urls,
      data: datas,
      method: types,
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 0) {
        callback(res)
        } else{
          error(res)
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '网络错误',
          content: '系统繁忙,是否从试',
          showCancel:true,
          cancelColor:"#999999",
          confirmColor:"#ae846c",
          success:function(res){
            if(res.confirm){
              _this.request(types, urls, datas, callback, error);
            }else if(res.cancel){

            }
          }
        })
        error(res)
      },
      complete: function (res) {
        wx.hideLoading();
        console.log("res", res);
        console.log("urls", 'https://papermaker.cn:8443/mall/' + urls);
        console.log("datas", datas)
      }
    })
  },
  //本地缓存异步存储数据
  setStorage:function(options,datas){
    wx.setStorage({
      key: options,
      data: datas,
      success: function (res) {console.log("success") },
      fail: function (res) { console.log("fail") },
      complete: function (res) { console.log("complete")},
    })
  },
  //异步获取本地缓存
  getStorage:function(options){
    wx.getStorage({
      key:options,
      success:function(res){
        return res.data;
        console.log(res)
      },
      fail:function(res){
        return res
        console.log(res)
      }
    })
  },
  // 时间格式化 yyyy-mm-dd
  FormatDate:function (strTime) {
    let date = new Date(strTime);
    let Month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return date.getFullYear() + "-" + Month + "-" + day + "  " + hours + ":" + minute + ":" + second;
  },
  //邮箱正则验证
  isEmail: function (str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
  },
  //手机正则验证
  isPhone: function (str) {
      var reg = /^1[34578]\d{9}$/;
      return reg.test(str);
    }
})




















