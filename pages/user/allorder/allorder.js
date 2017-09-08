// allorder.js
  var app = getApp();
  var userId = wx.getStorageSync("userId");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav:[
      {
        id:"allorder",
        content:"全部订单",
        className:"allorder",
        actives:"actives"
      },
      {
        id: "wait",
        content: "待付款",
        className: "wait",
        actives:''
      },
      {
        id: "receipt",
        content: "待收货",
        className: "receipt",
        actives: ''
      },
      {
        id: "sales",
        content: "售后订单",
        className: "receipt",
        actives: ''
      }
    ],
    scrollView:"allorder",
    scrollViewList: ["allorder", "allorder", "wait","sales"],
    orderList : [],
    options:{},
    totalPage:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var userId = wx.getStorageSync("userId");
    let option = parseInt(options.option);
    let optionss = {
      option: option,
      pageNo: 1
    }
    this.setData({
      options: optionss
    })
    console.log(userId);
    this.getOrder(optionss);
  },
  getOrder:function(options){

    let _this = this;
    let nav = this.data.nav;
    for (let i = 0; i < nav.length; i++) {
      nav[i].actives = '';
    }
    nav[options.option].actives = 'actives'
    app.getData("post", "deal/load", { userId: userId, pageNo: options.pageNo}, function (res) {
      let orderList = _this.data.orderList;
      let list = res.data.data.list;
      for (let i = 0; i < list.length; i++) {
        let obj = new Object;
        obj.product = [];
        obj.dealId = list[i].dealId;
        obj.dealNumber = list[i].dealNumber;
        obj.status = list[i].dealStatus;
        obj.dealTime = list[i].dealTime;
        let goodsArr = list[i].goodsList;
        for (let j = 0; j < goodsArr.length; j++) {
          let goodsList = new Object;
          goodsList.goodsImage = goodsArr[j].showImage;
          goodsList.goodsName = goodsArr[j].goodsName;
          goodsList.color = goodsArr[j].color;
          goodsList.size = goodsArr[j].size;
          goodsList.price = goodsArr[j].chinaNewPrice;
          goodsList.quantity = goodsArr[j].count;
          obj.product.push(goodsList);
        }

        if (obj.status == "待付款") {
          obj.btn1 = "取消订单";
          obj.btn2 = "去付款";
          obj.navTo1 = "cancel";
          obj.navTo2 = "payTo";
        } else if (obj.status == "待发货") {
          obj.btn1 = "取消订单";
          obj.btn2 = "申请退款";
          obj.navTo1 = "cancel";
          obj.navTo2 = "refunds";
        } else if (obj.status == "已发货") {
          obj.btn1 = "确认收货";
          obj.btn2 = "申请退款";
          obj.navTo1 = "success";
          obj.navTo2 = "refunds";
        } else {
          obj.btn1 = "查看订单";
          obj.btn2 = "";
          obj.navTo1 = "receipt";
          obj.navTo2 = "";
        }
        // if (obj.status == "交易完成" || obj.status == "交易关闭" || obj.status == "订单取消" || obj.status == "退款中")

        orderList.push(obj)
      }
      _this.setData({
        orderList: orderList,
        scrollView: _this.data.scrollViewList[options.option],
        nav: nav,
        totalPage: res.data.data.totalPage
      })
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh();
    }, function (res) { 
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh();
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
    this.data.options.pageNo = 1;
    let _this = this
    this.setData({
      orderList:[],
      options: _this.data.options
   })
    this.getOrder(this.data.options)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    let options = this.data.options;
    options.pageNo++;
    this.setData({
      options: options
    })
    if (options.pageNo > this.data.totalPage) {
      wx.showToast({
        title: '没有更多了,亲',
        icon: "success",
        duration: 500
      })
      wx.hideNavigationBarLoading() //完成停止加载
      return;
    }
    this.getOrder(options)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 付款
   */
  payTo:function(){
    
  },
  /**
   * 退款
   */
  refunds:function(){
    wx.navigateTo({
      url: '../refunds/refunds',
    })
  },
  /**
   * 确认收货
   */
  success:function(){
    wx.navigateTo({
      url: '../../success/success',
    })
  },
  /**
   * 订单详情
   */
  receipt: function(event) {
    let dealId = event.target.dataset;
    if (dealId.list){
      wx.navigateTo({
        url: '../receipt/receipt?dealId=' + dealId.list,
      })
    }
    
  },
  //取消订单
  cancel:function(res){

  },
  //tab切换
  tabOrder:function(event){
    let index = event.target.dataset.index;
    let _this = this;
    this.data.options.option = index;
    this.data.options.pageNo = 1;
    this.setData({
      options: _this.data.options
    })
    this.getOrder(this.data.options);
  }
})