// shopInfo.js
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:app.globalData.userId,
    "totals":0,
    "number":0,
    "value":[],
    "carts":false,
    "shopProducts":[
      // {
      //   "img":"../../images/dog.png",
      //   "productNmae": "家居老虎挂件",
      //   "money": 40,
      //   "amount": 1,
      //   "animation": '',
      //   "type": false,
      //   "color":"",
      //   "size":""
      // }
    ],
    //动画数据
    "startPoint":[],
    "args":0,
    "allCheck":false//全选状态
  },
  //购物车商品选中
  checkbox:function(e){
    console.log(e)
    let index = e.target.dataset.indexs;
    this.data.shopProducts[index].type = !this.data.shopProducts[index].type;
    this.setData({
      shopProducts: this.data.shopProducts
    });
  },
  //计算件数 
  numbers:function(e){
    console.log(e)
    let value = e.detail.value;
    let data = this.data.shopProducts;
    this.setData({
      number: value.length,
      value: value
    })
    // setTimeout(this.total,500)
    this.total();//计算价格
  },
  //计算价格
  total:function(e){
      let data = this.data.shopProducts;
      
      let totals = 0;
      for (let i = 0; i < data.length;i++){
        if(data[i].type){
          totals += data[i].amount * data[i].money
        }
      }
      this.setData({
        totals: totals
      })
  },
  //全选
  allCheckTap:function(event){
    let allCheck = this.data.allCheck;
    let data = this.data.shopProducts;
    for (let i = 0; i < data.length; i++) {
      data[i].type = !data[i].type
    }
    this.setData({
      allCheck: !allCheck,
      shopProducts:data
    })
    this.total();//计算价格
  },
  //全删
  deleteAll:function(){
    let that = this;
    let shopProducts = [].concat(that.data.shopProducts);
    let goodsIds = "";
    let colors = "";
    let sizes = "";
    for (let i = 0; i < shopProducts.length;i++){
      if (shopProducts[i].type){
        goodsIds += ("|" + shopProducts[i].goodsId);
        colors += ("|" + shopProducts[i].color);
        sizes += ("|" + shopProducts[i].size);
        delete shopProducts[i]  //删除的元素变为undefined  不改变元数组的长度
      }
    }
    // 去除数组元素值为undefined
    let newArr = [];
    for (let i = 0; i < shopProducts.length; i++){
      if (typeof (shopProducts[i]) != "undefined"){
        newArr.push(shopProducts[i]);
      }
    }
    app.getData("post", "cart/del", { userId: app.globalData.userId, goodsIds: goodsIds, sizes: sizes, colors: colors }, function (res) {
      console.log(res)
      if(res.data.code == 0){
        that.setData({
          shopProducts: newArr
        })
      }
    }, function (res) {

    })

    this.total();
  },
  // 减
  "minus": function (event) {
    let indexproduct = event.currentTarget.dataset.indexproduct;//当前下标
    this.data.shopProducts.forEach(function (value, index) {
      if (index == indexproduct) {
        if (value.amount > 1) { value.amount--; }
      }
    })
    this.setData({
      shopProducts: this.data.shopProducts
    })
    this.total();//计算价格
  },
  // 加
  "plus": function (event) {
    let indexproduct = event.currentTarget.dataset.indexproduct;//当前下标
    this.data.shopProducts.forEach(function (value, index) {
      if (index == indexproduct) {
        value.amount++;
      }
    })
    this.setData({
      shopProducts: this.data.shopProducts
    })
    this.total();//计算价格
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
    if (this.data.shopProducts[indexproduct].animation != ''){
      // 删除按钮显示时滑动操作
      if (this.data.args == -48) {
        if (valuePoint < 0){

        } else {
          valuePoint = valuePoint - 48 ;
          if (valuePoint > 0) { valuePoint = 0}
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
    }else{
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
    } else if (valuePoint <= -24){
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
    console.log(valuePoint)
    
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
  "delete":function(event){
    let that = this;
    console.log(event);
    let indexproduct = event.currentTarget.dataset.indexproduct;//当前下标
    let goodsId = event.currentTarget.dataset.goodsId;//当前GOODS
    let color = that.data.shopProducts[indexproduct].color;
    let size = that.data.shopProducts[indexproduct].size;
    app.getData("post","cart/del",{userId:app.globalData.userId,goodsIds:goodsId,sizes:size,colors:color},function(res){
      that.data.shopProducts.splice(indexproduct, 1);
      this.setData({
        shopProducts: this.data.shopProducts
      })
      this.total();
    },function(res){

    })
    

  },
  /**
   * 查看商品
   */
  goodsDetails:function(e){
    let goodsId = e.target.dataset.goodsId;
    wx.navigateTo({
      url: '../../goodsDetails/goodsDetails?goodsId=' + goodsId,
    })
  },
  //去结算
  goToSettlement:function(event){
    let that = this;
    let shopProducts = [].concat(that.data.shopProducts);
    let product = {};
    for (let i = 0; i < shopProducts.length; i++) {
      if (shopProducts[i].type) {
        let productDetail = {
          goodsIds : shopProducts[i].goodsId,
          colors: shopProducts[i].color,
          sizes: shopProducts[i].size,
          name: shopProducts[i].productNmae,
          img: shopProducts[i].img,
          money: shopProducts[i].money,
          amount: shopProducts[i].amount
        }
        product[i] = productDetail;
      }
    }
    wx.setStorageSync("product", product);//将数据存入缓存，利用缓存技术用来页面之间传参
    if (JSON.stringify(product) == "{}") { return }
    wx.navigateTo({
      url: '../../verifyOrder/verifyOrder?fromCart=true'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userId == "") {
      wx.navigateTo({
        url: '../../login/login',
      })
      return;
    }
    app.getData('post','cart/load',{userId:app.globalData.userId},function(res){
      console.log(res);
      if(res.data.code == 0){
        let data = res.data.data;
        for(let i = 0;i < data.length; i++){
          let Obj = new Object;
          Obj.img = data[i].showImage;
          Obj.productNmae = data[i].goodsName;
          Obj.money = data[i].chinaNewPrice;
          Obj.amount = parseFloat(data[i].count);
          Obj.animation = '';
          Obj.type = false;
          Obj.color = data[i].color;
          Obj.size = data[i].size;
          Obj.goodsId = data[i].goodsId;
          _this.data.shopProducts.push(Obj);
        }
        _this.setData({
          shopProducts: _this.data.shopProducts,
          carts: true
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
    app.getData('post', 'cart/load', { userId: app.globalData.userId }, function (res) {
      console.log(res);
      if (res.data.code == 0) {
        let data = res.data.data;
        for (let i = 0; i < data.length; i++) {
          let Obj = new Object;
          Obj.img = data[i].showImage;
          Obj.productNmae = data[i].goodsName;
          Obj.money = data[i].chinaNewPrice;
          Obj.amount = parseFloat(data[i].count);
          Obj.animation = '';
          Obj.type = false;
          Obj.color = data[i].color;
          Obj.size = data[i].size;
          Obj.goodsId = data[i].goodsId;
          _this.data.shopProducts.push(Obj);
        }
        _this.setData({
          shopProducts: _this.data.shopProducts,
          carts: true,
          userId: app.globalData.userId
        })
        wx.stopPullDownRefresh()
      }
    }, function (res) {
      wx.stopPullDownRefresh()
    })
    
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