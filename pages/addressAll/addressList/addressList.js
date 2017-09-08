// addressList.js
var app = getApp();
const userId = wx.getStorageSync("userId");//同步获取本地缓存数据

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopProducts:[],
   //动画数据
    "startPoint": [],
    "args": 0
  },
  // 触摸开始
  "mytouchstart": function (event) {

    let indexproduct = event.currentTarget.dataset.indexproduct;
    if (this.data.shopProducts[indexproduct].animation != '') {
      // 保存判断删除按钮是否显示
      let args = this.data.shopProducts[indexproduct].animation.actions[0].animates[0].args[0];
      this.setData({
        args: args
      })
    }
    this.setData({
      startPoint: [event.touches[0].pageX, event.touches[0].pageY]
    })
  },
  // 触摸移动
  "mytouchmove": function (event) {
    // console.log(event);
    let indexproduct = event.currentTarget.dataset.indexproduct;//当前下标
    let curPoint = [event.touches[0].pageX, event.touches[0].pageY];//当前触摸坐标
    let startPoint = this.data.startPoint;//开始触摸坐标
    let valuePoint = curPoint[0] - startPoint[0];//计算触摸滑动距离
    //判断删除按钮是否显示
    if (this.data.shopProducts[indexproduct].animation != '') {
      // 删除按钮显示时滑动操作
      if (this.data.args == -48) {
        if (valuePoint < 0) {

        } else {
          valuePoint = valuePoint - 48;
          if (valuePoint > 0) { valuePoint = 0 }
          //循环判断当前应操作的DOM数据
          this.data.shopProducts.forEach(function (value, index) {

            if (index == indexproduct) {
              //创建滑动动画
              value.animation = wx.createAnimation({
                duration: 0,
                timingFunction: 'linear'
              })
              //动画动作
              value.animation.translateX(valuePoint).step()
              //写入动画
              value.animation = value.animation.export()
            }
          })
          //动画编写完，更新数据执行动画
          this.setData({
            "shopProducts": this.data.shopProducts
          })
        }
      } else {
        // 删除按钮隐藏时滑动操作
        if (valuePoint < -48) {
          valuePoint = -48;
        } else if (valuePoint > 0) {
          valuePoint = 0;
        }

        //循环判断当前应操作的DOM数据
        this.data.shopProducts.forEach(function (value, index) {

          if (index == indexproduct) {
            //创建滑动动画
            value.animation = wx.createAnimation({
              duration: 0,
              timingFunction: 'linear'
            })
            //动画动作
            value.animation.translateX(valuePoint).step()
            //写入动画
            value.animation = value.animation.export()
          }
        })
        //动画编写完，更新数据执行动画
        this.setData({
          "shopProducts": this.data.shopProducts
        })
      }
    } else {
      if (valuePoint < -48) {
        valuePoint = -48;
      } else if (valuePoint > 0) {
        valuePoint = 0;
      }

      //循环判断当前应操作的DOM数据
      this.data.shopProducts.forEach(function (value, index) {

        if (index == indexproduct) {
          //创建滑动动画
          value.animation = wx.createAnimation({
            duration: 0,
            timingFunction: 'linear'
          })
          //动画动作
          value.animation.translateX(valuePoint).step()
          //写入动画
          value.animation = value.animation.export()
        }
      })
      //动画编写完，更新数据执行动画
      this.setData({
        "shopProducts": this.data.shopProducts
      })
    }
  },
  // 触摸结束
  "mytouchend": function (event) {
    let indexproduct = event.currentTarget.dataset.indexproduct;//当前下标
    let curPoint = [event.changedTouches[0].pageX, event.changedTouches[0].pageY];//当前触摸坐标
    let startPoint = this.data.startPoint;//开始触摸坐标
    let valuePoint = curPoint[0] - startPoint[0];//计算触摸滑动距离
    //根据滑动方向及距离 判断按钮显示隐藏
    if (valuePoint > -24 && valuePoint < 0) {
      valuePoint = 0;
    } else if (valuePoint <= -24) {
      valuePoint = -48;
    } else if (valuePoint >= 24) {
      valuePoint = 0;
    } else if (valuePoint < 24 && valuePoint > 0) {
      valuePoint = -48;
    } else if (valuePoint == 0) {
      if (this.data.args == -48) {
        valuePoint = -48
      }
    }

    //循环判断当前应操作的DOM数据
    this.data.shopProducts.forEach(function (value, index) {

      if (index == indexproduct) {
        //创建滑动动画
        value.animation = wx.createAnimation({
          duration: 0,
          timingFunction: 'linear'
        })
        //动画动作
        value.animation.translateX(valuePoint).step()
        //写入动画
        value.animation = value.animation.export()
      }
    })
    //动画编写完，更新数据执行动画
    this.setData({
      "shopProducts": this.data.shopProducts
    })
  },
  //删除
  "delete": function (event) {
    let that = this;
    let indexproduct = event.currentTarget.dataset.indexproduct;//当前下标
    this.data.shopProducts.forEach(function (value, index) {
      if (index == indexproduct) {
        that.data.shopProducts.splice(index, 1)
      }
    })
    this.setData({
      shopProducts: this.data.shopProducts
    })
  },
  //设置默认地址
  setDefalut:function(res){
    let _this = this;
    let index = parseInt(res.detail.value);
    let addressId = this.data.shopProducts[index].addressId;
    app.getData("post", "address/default", { addressId: addressId, userId: userId},function(res){
      console.log(res)
      if(res.data.code == 0){
        for (let i = 0; i < _this.data.shopProducts.length; i++){
          _this.data.shopProducts[i].checked = false;
        }
        _this.data.shopProducts[index].checked = true;
        _this.setData({
          shopProducts: _this.data.shopProducts
        })
      }
    },function(res){})
  },
  //地址选中  返回上级页面
  addressChecked:function(res){
    let index = parseInt(res.target.dataset.index);
    let addressInfo = this.data.shopProducts[index];
    wx.setStorageSync("addressInfo", addressInfo);
    wx.navigateBack({
      dalta:1
    })
  },
  // 编辑地址
  edit:function(event) {
    let addressId = event.target.dataset.addressId;
    let index = event.target.dataset.index;
    let _this = this;
    let data = _this.data.shopProducts[index];
    console.log(data);
    wx.navigateTo({
      url: '../address/address?addressId=' + addressId + "&userName=" + data.userName 
      + "&userTel=" + data.userTel + "&address=" + data.userAddress
     })
  },
  //新增地址
  add:function(event){
    wx.navigateTo({
      url: '../address/address',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    //获取地址列表
    app.getData("post","address/load",{userId:userId},function(res){
      if(res.data.code == 0){
        let addressList = res.data.data.addressList;
        for (let i = addressList.length - 1; i > -1; i--){
          let obj = new Object;
          let area = addressList[i].area.split("|").join("  ");//省市区
          obj.animation = '';
          obj.userName = addressList[i].personName;//用户名
          obj.userTel = addressList[i].phone;//手机号码
          obj.addressId = addressList[i].id;//地址ID
          obj.userAddress = area + "   " + addressList[i].address;//省市区+详细
          if (res.data.data.defaultAddressId == addressList[i].id){
            obj.checked = true;
          }else{
            obj.checked = false;
          }
          _this.data.shopProducts.push(obj)
        }
        _this.setData({
          shopProducts: _this.data.shopProducts
        })
      }
    },function(res){

    })
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
    let _this = this;
    let addressObj =  wx.getStorageSync("addressObj")
    if (addressObj != ''){
      //判断是否是修改地址回来的参数
      let data = _this.data.shopProducts;
      for(let i = 0; i < data.length; i++){
        if(addressObj.addressId == data[i].addressId){
          data[i].userName = addressObj.personName;
          data[i].userTel = addressObj.phone;
          data[i].userAddress = addressObj.area + "   " + addressObj.address
        }
      }
        _this.setData({
          shopProducts: data
        })
      }
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