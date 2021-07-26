// pages/database/database.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    good:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    db.collection('FoodList')
    .get()
    .then(res =>{ //请求成功
      console.log('then',res)
      this.setData({
        list: res.data
      })
    })
    .catch(err => { //请求失败
      console.log('catch',err)
    })

    db.collection('FoodList')
    .doc('28ee4e3e60fbf8aa2d4d93d3123c5e1a')
    .get()
    .then(res => {
      console.log('sucess',res)
      this.setData({
        good: res.data
      })
    })
    .catch(err => {
      console.log('fail',err)
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