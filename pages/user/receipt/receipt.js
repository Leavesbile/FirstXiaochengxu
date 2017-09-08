// receipt.js
var app = getApp();
var userId = wx.getStorageSync("userId");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "status": "",
    "orderNumber": "",
    "shipmentNumber":"(顺丰速运)4321465432132",
    "orderTime": "",
    "name": "",
    "phone": "",
    "adress": "",
    product:[],
    "company": "第三方配送",
    "fare": "0.00",
    "total": "100",
    "quantity": "1",
    "action1":"",
    "action2":"",
    "actionFun1":"",
    "actionFun2":""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dealId = options.dealId;
    let _this = this;
    app.getData("post", "deal/info", { dealId: dealId, userId: userId }, function (res) {},function(res){
      console.log(res.data)
      let dealStatus = res.data.dealStatus;
      let orderNumber = res.data.dealNumber;
      let orderTime = app.FormatDate(res.data.dealTime);
      let user = res.data.address.split(",");
      let total = res.data.chinaTotalPrice;
      let freight = "0.00";
      // freight = res.data.freight == "" ? "0.00" : res.data.freight;
      let product = res.data.goodsList;
      let productArr = [];
      let quantity = 0;
      let action1 = "";
      let action2 = "";
      let actionFun1 = "";
      let actionFun2 = "";
      for (let i = 0; i < product.length; i++){
        let list = new Object;
        list.goodsImage = product[i].showImage;
        list.goodsName = product[i].goodsName;
        list.size = product[i].size;
        list.color = product[i].color;
        list.price = product[i].chinaNewPrice;
        list.goodsId = product[i].goodsId;
        quantity += parseInt(product[i].count);
        productArr.push(list)
      }
      if (dealStatus == "待付款") {
        action1 = "取消订单";
        action2 = "去付款";
        actionFun1 = "cancel";
        actionFun2 = "payTo";
      } else if (dealStatus == "待发货") {
        action1 = "取消订单";
        action2 = "申请退款";
        actionFun1 = "cancel";
        actionFun2 = "refunds";
      } else if (dealStatus == "已发货") {
        action1 = "确认收货";
        action2 = "申请退款";
        actionFun1 = "success";
        actionFun2 = "refunds";
      } 
      _this.setData({
        status: dealStatus,
        orderNumber: orderNumber,
        orderTime: orderTime,
        name: user[0],
        phone: user[1],
        adress: user[2] + " " + user[3],
        product: productArr,
        total: total,
        fare: freight,
        quantity: quantity,
        action1: action1,
        action2: action2,
        actionFun1: actionFun1,
        actionFun2: actionFun2
      })
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
   * 订单跟踪
   */
  more: function() {
    wx.navigateTo(
      {
        url: '../track/track',
      }
    )
  },
  /**
   * 申请退款
   */
  refunds: function() {
    wx.navigateTo({
      url: '../refunds/refunds'
    })
  },
  /**
   * 确认收货
   */
  success: function () {
    wx.navigateTo({
      url: '../../success/success',
    })
  },
  /**
   * 付款
   */
  payTo:function () {
    
  },
  //取消订单
  cancel:function (res) {

  },
  //查看商品详情
  checkGoods:function(res){
    let goodsId = res.target.dataset.goodsId;
    console.log(res);
    wx.redirectTo({
      url: '../../goodsDetails/goodsDetails?goodsId=' + goodsId,
    })
  },
})