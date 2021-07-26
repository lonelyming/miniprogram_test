// pages/adddata/adddata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:10
  },
  add: function(){
    const db = wx.cloud.database()
    db.collection('FoodList')
    .add({
      data:{
        name:'watermelon',
        number:5,
        price:20
      }
    })
    .then(res=>{
      console.log('添加成功',res)
    })
    .catch(err=>{
      console.error('添加失败',err)
    })
  },
  //更新修改数据
  update: function(){
    const db = wx.cloud.database()
    db.collection('FoodList').where({
      name:'watermelon'
    })
    .update({
      data:{
        number:this.data.number-1,
        price:20
      }
    })
    .then(res=>{
      this.setData({
        number : this.data.number-1
      })
      console.log('修改成功',this.data.number)
    })
    .catch(err=>{
      console.error('修改失败',err)
    })
  },
    //删除数据
    delete: function(){
      const db = wx.cloud.database()
      db.collection('FoodList').where({
        name:'watermelon'
      })
      .remove()
      .then(res=>{
        console.log('删除成功',res)
      })
      .catch(err=>{
        console.error('删除失败',err)
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    db.collection('FoodList')
    .where({
      name:'watermelon'
    })
    .get()
    .then(res=>{

      console.log('获取成功',res.data[0].number)
      this.setData({
        number:res.data[0].number
      })
      
    })
    .catch(err=>{
      console.log('获取失败',err)
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