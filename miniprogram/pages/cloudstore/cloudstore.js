// pages/cloudstore/cloudstore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:'',
    videoUrl:'',
    show_img:false,
    show_video:false
  },
  chooseImg() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log('选择图片成功', res)
        this.upload(res.tempFilePaths[0],'test.jpg')
        this.setData({
          show_img:true
        })
      },
      fail: (err) => {
        console.log('选择图片失败', err)
      }
    })
  },
  chooseVideo(){
    wx.chooseVideo({
      camera: 'back',
      sourceType: ['album', 'camera'],
      maxDuration:60,
      success:(res)=>{
        console.log('选择视频成功',res)
        this.upload(res.tempFilePath,'test.mp4')
        this.setData({
          show_video:true
        })
      },
      fail:(err)=>{
        console.log('选择视频失败',err)
      }
    })
  },
  upload(tempFile,filename) {
    wx.cloud.uploadFile({
      cloudPath: filename,
      filePath: tempFile,
      success: (res) => {
        console.log('上传成功', res)
        if(filename.indexOf('jpg')!=-1)
        {
          this.setData({
            imgUrl:res.fileID,
          })
        }
        else if(filename.indexOf('mp4')!=-1)
        {
          this.setData({
            videoUrl:res.fileID
          })
        }
      },
      fail: (err) => {
        console.log('上传失败', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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