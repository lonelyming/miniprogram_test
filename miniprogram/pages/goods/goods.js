// pages/goods/goods.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  goDetail(e){
    console.log(e.currentTarget.dataset.name)
    wx.navigateTo({
      url: '/pages/demo1-1/demo1-1?name='+e.currentTarget.dataset.name,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection('FoodList').get()
    .then(res=>{
      console.log('数据库获取成功',res)
      this.setData({
        list:res.data
      })
    })
    .catch(err=>{
      console.log('数据库获取失败',err)
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