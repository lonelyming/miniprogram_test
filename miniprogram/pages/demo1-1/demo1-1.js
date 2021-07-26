// pages/demo1-1/demo1-1.js
let price = 0
let good_name = ''
const db = wx.cloud.database().collection('FoodList')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good: {},
  },
  getPrice(e) {
    price = e.detail.value
    console.log(price)
  },
  //用云函数更新价格
  update_cloud() {
    if (price == '') {
      wx.showToast({
        title: '输入为空',
        icon: 'error'
      })
    }
    else {
      wx.cloud.callFunction({
        name: 'update0725',
        data: {
          name: good_name,
          price: parseInt(price)
        },
        success: (res) => {
          console.log('云函数调用成功', res)
          this.getList(good_name)
        },
        fail: (res) => {
          console.log('云函数调用失败', res)
        },
      })
    }
  },
  //用本地数据库函数更新价格
  update() {
    if (price == '') {
      wx.showToast({
        title: '输入为空',
        icon: 'error'
      })
    }
    else {
      db.where({
        name: good_name
      })
        .update({
          data: {
            price: parseInt(price)
          }
        })
        .then(res => {
          console.log('价格已更新', good_name, price)
          this.getList(good_name)
        })
        .catch(res => {
          console.log('价格更新失败', price)
        })
    }

  },
  getList: function (name) {
    db.where({
      name: name
    })
      .get()
      .then(res => {
        console.log('商品详情页请求成功', res)
        this.setData({
          good: res.data[0]
        })
      })
      .catch(err => {
        console.err('商品详情页请求失败', err)
      })
  },
  delete_cloud() {
    wx.showModal({
      cancelColor: 'cancelColor',
      title: "是否确定删除",
      success(res) {
        if (res.confirm == true) {
          wx.cloud.callFunction({
            name: 'delete0725',
            data: {
              name: good_name
            },
            success: (res) => {
              console.log('删除云函数调用成功', res)
              wx.reLaunch({
                url: '/pages/demo1/demo1',
              })
            },
            fail: (err) => {
              console.log('删除云函数调用失败', err)
            },
          })
        }
      }
    })
  },
  //删除商品
  delete() {
    wx.showModal({
      cancelColor: 'cancelColor',
      title: "是否确定删除",
      success(res) {
        if (res.confirm == true) {
          db.where({
            name: good_name
          })
            .remove()
            .then(res => {
              console.log('删除成功', res)
            })
            .catch(err => {
              console.log('删除失败', err)
            })
          wx.reLaunch({
            url: '/pages/demo1/demo1',
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    good_name = options.name
    this.getList(good_name)
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