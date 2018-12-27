// pages/more/more.js
import {
  random
} from '../../util/common.js'

import {
  ExamModel
} from '../../modules/exam.js'

const examModel = new ExamModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    caidanShow: false,
    userType: false,
    redNum: [],
    blueNum: [],
    type: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.surprise()
    const isLogin = examModel.getIsLogin()
    if (isLogin) {
      this.setData({
        userType: examModel.getUserType()
      })
    }
  },

  surprise() {
    const login = wx.getStorageSync('login')
    if (login.userName == '陈福兰' || login.userName == '李祖明') {
      this.setData({
        caidanShow: true
      })
    }
    if (this.data.type) {
      this.typeA()
    } else {
      this.typeB()
    }
  },

  typeA() {
    this.setData({
      redNum: random(6, 33),
      blueNum: random(1, 16)
    })
  },

  typeB() {
    this.setData({
      redNum: random(5, 35),
      blueNum: random(2, 12)
    })
  },

  cut() {
    this.setData({
      type: !this.data.type
    })
    this.surprise()
  },

  change() {
    this.surprise()
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
    wx.setTabBarStyle({
      selectedColor: '#50bba7'
    })
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