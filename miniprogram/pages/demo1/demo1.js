// pages/demo1/demo1.js
const db = wx.cloud.database().collection('FoodList')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    addname:'',
    addnumber:0,
    addprice:0
  },
  goDetail(e){
    console.log(e.currentTarget.dataset.name)
    wx.navigateTo({
      url: '/pages/demo1-1/demo1-1?name=' + e.currentTarget.dataset.name,
      events: e,
      success: (result) => {console.log('跳转成功')},
      fail: (res) => {console.log('跳转失败')},
      complete: (res) => {},
    })
  },

  getName(e){
    this.setData({
      addname:e.detail.value
    })
  },
  getNumber(e){
  this.setData({
    addnumber:e.detail.value
  })
  },
  getPrice(e){
    this.setData({
      addprice:e.detail.value
    })
  },
  addGood(e){
    if(this.data.addname == '' || this.data.addnumber == '' || this.data.addprice == ''){
      wx.showToast({
        title: '输入为空',
        icon:  'error'
      })
    }
    else{
      console.log('最后结果',this.data.addname,this.data.addnumber,this.data.addprice)
      const db = wx.cloud.database()
      db.collection('FoodList')
      .add({
        data:{
          name:this.data.addname,
          number:parseInt(this.data.addnumber),
          price:parseInt(this.data.addprice)
        }
      })
      .then(res => {
        console.log('添加商品成功',res)
        this.getList()
      })
      .catch(err => {
        console.log('添加商品失败',err)
      })
    }
  },
  order(e){
    db.orderBy("price",e.currentTarget.dataset.flag)
    .get()
    .then(res => {
      console.log('商品排序成功',res)
      this.setData({
        list:res.data
      })

    })
    .catch(err => {
      console.log('商品排序失败',err)
    })
  },
  limit(){
    db.limit(3)
    .get()
    .then(res => {
      console.log('返回指定条数数据成功',res)
      this.setData({
        list:res.data
      })
    })
    .catch(err => {
      console.log('返回指定条数数据失败',err)
    })
  },
  getList(){
    db.get()
    .then(res => {
      console.log('商品列表请求成功',res)
      this.setData({
        list : res.data
      })
    })
    .catch(err => {
      console.err('商品列表请求失败',err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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