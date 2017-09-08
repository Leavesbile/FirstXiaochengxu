// verifyOrder.js
var app = getApp();
const userId = wx.getStorageSync("userId");//同步获取本地缓存数据

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "address": "请选择收货地址",//收货地址
    "addressId":'',
    "price": "0.00",//商品总价
    "quantity":0,//商品件数
    "products":[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload")
    let _this = this;
    let product = wx.getStorageSync("product");//商品列表信息
    let fromCart = options.fromCart;//是否购物车下单
    let productArr = [];
    let address = '请选择收货地址';//收货地址
    let price = 0;//商品总价
    let quantity = 0;//商品件数
    for (let i in product){
      productArr.push(product[i]);
      price += parseFloat(product[i].money);
      quantity += parseInt(product[i].amount);
    }
    app.getData("post","address/load",{userId:userId},function(res){
      console.log(res)
      if(res.data.code == 0){
        let defaultAddressId = res.data.data.defaultAddressId;
        let addressList = res.data.data.addressList;
        for (let i = 0; i < addressList.length; i++){
          if (addressList[i].id == defaultAddressId){
            let area = addressList[i].area.split("|");
            let areaJoin = area.join("  ");
            address = areaJoin + "  " + addressList[i].address + "  " + addressList[i].personName + "  " + addressList[i].phone
          }
        }

        _this.setData({
          products: productArr,
          price: price,
          quantity: quantity,
          address: address,
          addressId: defaultAddressId
        })

      }
    },function(res){})

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onready")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let addressInfo = wx.getStorageSync("addressInfo");
    if (addressInfo != ''){
      let address = addressInfo.userAddress + "  " + addressInfo.userName + "  " + addressInfo.userTel;
      this.setData({
        addressId: addressInfo.addressId,
        address: address
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onhide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("unload")
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
    console.log("onReachBottom")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("onShareAppMessage")
  },
  /**
   * 地址列表
   */
  address: function (e) {
    wx.navigateTo({
      url: '../addressAll/addressList/addressList'
    })
  }
})