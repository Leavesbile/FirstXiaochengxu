// goods.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "className" : "chang",
    "getData":{},
    "filterList": [
      { 
        "className":"choose",
        "type" : "默认",
        "sort":"new",
        "orderBy":true
      },
      {
        "type": "热销",
        "sort": "sell",
        "orderBy": true
      },
      {
        "type": "新品推荐",
        "sort": "new",
        "orderBy": true
        },
      {
        "type": "价格",
        "sort": "price",
        "orderBy": true
        }
      ],
    "goodsSynopsis":[
      // {
      //   "className":"goodsSynopsis",
      //   "goodsImage":"../images/dog.png",
      //   "goodsName":"家居老虎摆件",
      //   "description":"纸匠纸品饰品家居生肖摆件老虎3D拼装瓦楞纸手工制品创意新年礼物",
      //   "price":"56",
      //   "id":"008580f3a2004554a9ca2745c1f59e70"
      // }
    ],
    clicks : true
  },
  /**
   * 跳转事件
   */
  goodsDetails: function(e) {
    let goodsId = e.target.dataset.id;
    wx.navigateTo({
      url: '../goodsDetails/goodsDetails?goodsId=' + goodsId
    })
  },
  // 切换排版
  qiehuan: function () {
    let len = this.data.goodsSynopsis;
    if(this.data.clicks) {
      this.setData({className : "duan"});
      for (var i = 0; i < len.length; i++) {
        len[i].className = "long"
      } 
    }else{
      console.log(len);
      this.setData({ className: "chang" });
      for (var j = 0; j < len.length; j++) {
        len[j].className = "goodsSynopsis"
      } 
    }
    this.setData({
      goodsSynopsis: len,
      clicks: !this.data.clicks
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let data = {
      pageNo:1,
      series:"",
      sort:""
    }
    if(options.key){
      data.key = options.key;
    }
    if (options.sort) {
      data.sort = options.sort;
    }
    if (options.series) {
      data.series = options.series;
    }
    _this.getProduct(data)
  },
//获取商品列表
  getProduct: function (option){
  //获取数据库 商品列表 
    let _this = this;
  app.getData("get", "goods/all", option, function (res) {
    console.log(res);
    if (res.data.code == 0) {
      let data = res.data.data.goodsList;
      let goodsData = _this.data.goodsSynopsis;
      for (let i = 0; i < data.length; i++) {
        let obj = new Object;
        obj.className = "goodsSynopsis";
        obj.id = data[i].id;
        obj.price = data[i].chinaNewPrice;
        obj.goodsName = data[i].name;
        obj.goodsImage = data[i].showImage;
        obj.description = '描述：后台缺字段';
        goodsData.push(obj);//保存数据
      }
      _this.setData({
        goodsSynopsis: goodsData,
        getData:option,
        totalPage: res.data.data.totalPage
      })
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh();
    }
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
    let option = this.data.getData;
    let _this = this;
    _this.setData({
      goodsSynopsis: []
    })
    option.pageNo = 1;
    _this.getProduct(option);
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    let totalPage = this.data.totalPage;
    let option = this.data.getData;
    option.pageNo++;
    if (option.pageNo > totalPage){
      wx.showToast({
        title: '没有更多了,亲',
        icon:"success",
        duration:500
      })
      wx.hideNavigationBarLoading() //完成停止加载
      return;
    }
    this.getProduct(option);
  },
//商品筛选
srotGoods:function(e){
  let sort = e.target.dataset.sort;
  let orderBy = e.target.dataset.orderBy;
  let index = e.target.dataset.index;
  let filterList = this.data.filterList;
  filterList.forEach(function (value, item){
    value.className = "";
    if (index == item){
      value.orderBy = !orderBy;
      value.className = "choose"
    }
  })
  this.setData({
    filterList: filterList,
    goodsSynopsis: []
  })
  let getData = this.data.getData;
  if (orderBy){
    getData.order = "asc";
  }else{
    getData.order = "desc";
  }
  getData.pageNo = 1;
  getData.sort = sort;
  this.getProduct(getData);
},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})