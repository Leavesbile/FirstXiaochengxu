// address.js
var app = getApp();
const userId = wx.getStorageSync("userId");//同步获取本地缓存数据
const cityData = require("../../../utils/citys.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressId:"",
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    address:"请选择地址",//省市县
    condition: false,
    addActive:false,
    name:"",//姓名
    tel:"",//电话
    detailAdd:"",//详细地址
    code:""//邮政编码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(cityData);
    // 初始化地址
    let provinces = [];
    let citys = [];
    let countys = [];
    for(let i=0;i<cityData.cityData.length;i++){
      provinces.push(cityData.cityData[i].name)
    }
    for (let i = 0; i < cityData.cityData[0].sub.length;i++){
      citys.push(cityData.cityData[0].sub[i].name)
    }
    for (let i = 0; i < cityData.cityData[0].sub[0].sub.length;i++){
      countys.push(cityData.cityData[0].sub[0].sub[i].name)
    }

    let addressId = "";
    let userName = "";
    let userTel = "";
    let address = "请选择地址";
    let detailAdd = ""
    if (options.userName){
      userName = options.userName;
    }
    if (options.userTel){
      userTel = options.userTel;
    }
    if (options.addressId){
      addressId = options.addressId;
    }
    if(options.address){
      address = options.address.split("   ")[0];
      detailAdd = options.address.split("   ")[1];
    }
    this.setData({
      provinces: provinces,
      citys: citys,
      countys: countys,
      name: userName,
      tel: userTel,
      addressId: addressId,
      address: address,
      detailAdd: detailAdd
    })
  },
  //地址选择
  bindchange:function(e){
    console.log(e);
    let citys = [];
    let countys = [];
    let value = e.detail.value;
    for (let i = 0; i < cityData.cityData[value[0]].sub.length; i++) {
      citys.push(cityData.cityData[value[0]].sub[i].name)
    }
    for (let i = 0; i < cityData.cityData[value[0]].sub[value[1]].sub.length; i++) {
      countys.push(cityData.cityData[value[0]].sub[value[1]].sub[i].name)
    }
    this.setData({
      citys: citys,
      countys: countys,
      values: value
    })
    console.log(cityData.cityData[value[0]].name);
    console.log(cityData.cityData[value[0]].sub[value[1]].name)
    console.log(cityData.cityData[value[0]].sub[value[1]].sub[value[2]].name)
  },
  //地址选择框 调出地址选择器/关闭选择器
  addressTap:function(event){
    this.setData({
      condition: !this.data.condition
    })
    let value = this.data.value;
    let citys = [];
    let countys = [];
    for (let i = 0; i < cityData.cityData[value[0]].sub.length; i++) {
      citys.push(cityData.cityData[value[0]].sub[i].name)
    }
    for (let i = 0; i < cityData.cityData[value[0]].sub[value[1]].sub.length; i++) {
      countys.push(cityData.cityData[value[0]].sub[value[1]].sub[i].name)
    }
    this.setData({
      citys: citys,
      countys: countys,
      values:value
    })
  },
  //确认地址 省市区
  confrim:function(e){
    let value = this.data.values;
    let address = cityData.cityData[value[0]].name + "  " + cityData.cityData[value[0]].sub[value[1]].name + "  " + cityData.cityData[value[0]].sub[value[1]].sub[value[2]].name;
    this.setData({
      addActive:true,
      address: address,
      condition: !this.data.condition,
      value:value
    })
  },
  //确定所有信息
  confrimAddress:function(event){
    let _this = this;
    if(this.data.name == ''){
      wx.showToast({
        title: '用户名为空',
        icon:"loading",
        duration:500      
      })
      return;
    }
    let reg = /^1[34578]\d{9}$/;
    if (!reg.test(this.data.tel)){
      wx.showToast({
        title: '手机号码有误',
        icon: "loading",
        duration: 500
      })
      return;
    }
    if (this.data.address == '请选择地址'){
      wx.showToast({
        title: '地区为空',
        icon: "loading",
        duration: 500
      })
      return;
    }
    if (this.data.detailAdd == '') {
      wx.showToast({
        title: '地址为空',
        icon: "loading",
        duration: 500
      })
      return;
    }
    
    if (this.data.addressId != ''){
      //修改地址
      console.log("修改地址")
      let addressObj = {
        userId: userId,
        personName: _this.data.name,
        phone: _this.data.tel,
        area: _this.data.address,
        address: _this.data.detailAdd,
        zipCode: _this.data.code,
        addressId: _this.data.addressId
      };
      app.getData("post", "address/update", addressObj, function(res){
        if(res.data.code == 0){
          wx.setStorageSync("addressObj", addressObj)
          wx.navigateBack({
            delta: 1
          })
        }
        
      },function(res){})
      
    }else{
      //新增地址
      console.log("新增地址")
      let addressObj = {
        userId: userId,
        personName: _this.data.name,
        phone: _this.data.tel,
        area: _this.data.address,
        address: _this.data.detailAdd,
        zipCode: _this.data.code
      };
      app.getData("post", "address/add", addressObj,function(res){
        if(res.data.code == 0){
          wx.removeStorageSync("addressObj");
          wx.redirectTo({
            url: '../addressList/addressList',
          })
        }
      },function(res){})
    }
    
  },
  //收货人姓名
  name:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  //收货人电话
  tel:function(e){
    this.setData({
      tel: e.detail.value
    })
  },
  //详细地址
  detailAdd:function(e){
    this.setData({
      detailAdd: e.detail.value
    })
  },
  //邮政编码
  code:function(e){
    this.setData({
      code: e.detail.value
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
  
  }
})