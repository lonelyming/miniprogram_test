// pages/cloudfunction/cloudfunction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'111',
    name:'orange',
    price:2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'update0725',
      data:{
        name:this.data.name
      },
      success:(res)=>{
        console.log('请求云函数成功',res)
      },
      fail:(err)=>{
        console.log('请求云函数失败',err)
      },     
    })

    //数据库获取数据
    wx.cloud.database().collection('num').get({
      success:(res=>{
        console.log('数据库获取成功',res)
      }),
      fail:(err=>{
        console.log('数据库获取失败',err)
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