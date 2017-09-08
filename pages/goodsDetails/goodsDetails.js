// goodsDetails.js
var app = getApp();
var userId = wx.getStorageSync("userId");
var WxParse = require('../../wxParse/wxParse.js');//富文本解析
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId:'',
    flag: true,
    index: true,
    now: true,
    imgUrls: [
      // 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 500,
    amount:1,
    "goodsName":"",
    "price":"0.00",//现价
    "total":0,//总价
    "priceList":[],//价格列表
    "oldPrice":"0.00",//原价
    "oldPriceList":[],
    "adress" : "福建 泉州",//商家发货地区
    "postageNum":"0.00",//快递费
    "sales":"0",//销量
    "article" : '',
    "chooseColor":'颜色',
    "chooseSize":'尺寸',
    "colorImage":'',
    "colorImageList":[],
    "orderColor": [//颜色
      ],
    "orderSize": [//规格
      ],
    "parameter":{//详情描述特征
      },
  },
  // 更改颜色
  chooseColor:function(e){
    console.log(e);
    let index = e.target.dataset.index;
    console.log(index);
    for (let i = 0; i < this.data.orderColor.length;i++){
      this.data.orderColor[i].className="";
    };
    this.data.orderColor[index].className = "inChoose";
    let chooseColor = this.data.orderColor[index].color;
    let colorImage = this.data.colorImageList[index];
    this.setData({
      orderColor: this.data.orderColor,
      chooseColor: chooseColor,
      colorImage: colorImage
    })
  },
  //选择尺寸
  chooseSize:function(e) {
    let index = e.target.dataset.index;
    let _this = this;
    for (let i = 0; i < this.data.orderSize.length; i++) {
      this.data.orderSize[i].className = "";
    };
    this.data.orderSize[index].className = "inChoose";
    let chooseSize = this.data.orderSize[index].size
    //根据尺寸改变价格
    let price = this.data.price;
    let oldPrice = this.data.oldPrice
    if(this.data.priceList.length > index){
      price = this.data.priceList[index]
    }
    if (this.data.oldPriceList.length > index) {
      oldPrice = this.data.oldPriceList[index]
    }
    let total = price * this.data.amount;
    this.setData({
      orderSize: _this.data.orderSize,
      oldPrice: oldPrice,
      price: price,
      chooseSize: chooseSize,
      total: total
    })
  },
  // 减
  "minus": function (event) {
    let amount = this.data.amount - 1;
    let total = parseFloat(this.data.price) * amount;
    if (this.data.amount > 1){
      this.setData({
        amount: amount,
        total: total
      })
    }
  },
  // 加
  "plus": function (event) {
    let amount = this.data.amount + 1;
    let total = parseFloat(this.data.price) * amount;
    this.setData({
      amount: amount,
      total: total
    })
  },
  //去购物车
  goToCart:function(res){
    wx.switchTab({
      url: '../shopping/shopInfo/shopInfo',
    })
  },
  //加入购物车
  addCart:function(res){
    if (app.globalData.userId == "") {
      wx.navigateTo({
        url: '../login/login',
      })
      return;
    }
    let thisData = this.data;
    let goodsId = thisData.goodsId;
    let color = thisData.chooseColor;
    let size = thisData.chooseSize;
    let num = thisData.amount;
    let data = {
      userId:app.globalData.userId,
      goodsId:goodsId,
      color:color,
      size:size,
      number:num
    }
    app.getData("post","cart/add",data,function(res){
      wx.showToast({
        title: '添加成功',
        icon:"success"
      })
    },function(res){
      wx.showToast({
        title: '添加失败',
        icon: "loading"
      })
    })
  },
  /**
   * 立即购买
   */
  verifyOrder: function () {
    let _this = this;
    let shopProducts = _this.data;
    if (app.globalData.userId == "") {
      wx.navigateTo({
        url: '../login/login',
      })
      return;
    }
    if (shopProducts.chooseColor == "颜色" || shopProducts.chooseSize == "尺寸" ) {
      wx.showToast({
        title: '请选择产品参数',
        icon: 'loading',
        duration : 500
      })
      return 
     } else {
        let product = {};
        let productDetail = {
          goodsIds: shopProducts.goodsId,
          colors: shopProducts.chooseColor,
          sizes: shopProducts.chooseSize,
          name: shopProducts.goodsName,
          img: shopProducts.imgUrls[0],
          money: shopProducts.price,
          amount: shopProducts.amount
        }
        product["i"] = productDetail;
        wx.setStorageSync("product", product);//将数据存入缓存，利用缓存技术用来页面之间传参
        wx.navigateTo({
          url: '../verifyOrder/verifyOrder?fromCart=false'
        })
     }
  },
  // 下单蒙版
  choose: function () {
    this.setData({ flag: false,index: false})
  }, 
  // 参数蒙版
  parameter: function () {
    this.setData({ flag: false, now: false })
  },
// 关闭蒙版
  closeRemake: function () {
    console.log(0);
    this.setData({flag:true,now:true,index:true})
  },
  prevent:function(e) {
    return
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    this.getLoad(_this,options.goodsId);
  },
  getLoad: function (_this,ev){
    app.getData("get", "goods/info", { goodsId: ev }, function (res) {
      
      if (res.data.code == 0) {
        let color = res.data.data.color.split("|");
        let colorImageList = res.data.data.colorImage.split("|");
        let size = res.data.data.productSize.split("|");
        let priceList = res.data.data.chinaNewPrice.split("|");//现价格
        let oldPriceList = res.data.data.chinaFakePrice.split("|");//原价格
        let article = res.data.data.goodsDetail.replace(/src="/g, 'src="http://papermaker.cn:8080'); //富文本内容
        WxParse.wxParse('article', 'html', article,_this, 5);//富文本解析
        let colorList = [];
        let sizeList = [];
        //尺寸
        for (let i = 0; i < size.length; i++) {
          let sizeObj = new Object;
          sizeObj.className = "unChoose";
          sizeObj.size = size[i];
          sizeList.push(sizeObj);
        }
        //颜色
        for (let i = 0; i < color.length; i++) {
          let colorObj = new Object;
          colorObj.className = "unChoose";
          colorObj.color = color[i];
          colorList.push(colorObj);
        }
        //滑动大图
        let imgUrls = [].concat([
          res.data.data.showImage,
          res.data.data.front45Image,
          res.data.data.frontImage,
          res.data.data.back45Image,
          res.data.data.sideImage,
          res.data.data.topImage,
          res.data.data.backImage
        ]);

        _this.setData({
          goodsId: ev,
          price: priceList[0],
          priceList: priceList,
          oldPrice: oldPriceList[0],
          oldPriceList: oldPriceList,
          goodsName: res.data.data.name,
          sales: res.data.data.sellCount,
          orderColor: colorList,
          orderSize: sizeList,
          imgUrls: imgUrls,
          colorImageList: colorImageList,
          colorImage: colorImageList[0],
          parameter: {
            //详情描述特征
            "brand": res.data.data.brand,
            "model": res.data.data.goodsNumber,
            "installation": res.data.data.installDetail,
            "classification": res.data.data.color,
            "style": res.data.data.style,
            "pattern": res.data.data.pattern,
            "Origin": res.data.data.productPlace,
            "feasibility": res.data.data.diy
          }
        })
        wx.stopPullDownRefresh()
      }
    }, function (res) {

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
    
    let _this = this;
    this.getLoad(_this,_this.data.goodsId);
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