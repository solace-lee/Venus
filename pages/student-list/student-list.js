// pages/student-list/student-list.js
import {
  ExamModel
} from '../../modules/exam.js'

const examModel = new ExamModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    examName: '',
    classList: [],
    index: 0,
    studentList: [],
    examNameOfData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */

  //教师账户独享功能
  onLoad: function (options) {
    this.loadData(options)
  },

  loadData(options) {
    let classList = examModel.getClassList()
    let first = ['所有班级']
    if (!(classList[0] == '所有班级')) {
      first = first.concat(classList)
    }
    this.setData({
      examName: options.examName,
      classList: first,
      examNameOfData: examModel.getExamNameOfData(options.examName)
    })
    this.loadIndex()
  },

  loadIndex() {
    let index = wx.getStorageSync('index') || 0
    if (index == 0) {
      let arr = examModel.getExamNameOfData(this.data.examName)
      arr.sort(function (a, b) {
        return a.schoolRank - b.schoolRank
      })
      this.setData({
        studentList: arr
      })
    } else {
      this.setData({
        index: index,
        studentList: examModel.getClassNameOfData(this.data.examNameOfData, this.data.classList[index])
      })
    }
  },

  bindClassListChange(event) {
    wx.showLoading()
    if ((event.detail.value) == 0) {
      let arr = examModel.getExamNameOfData(this.data.examName)
      arr.sort(function (a, b) {
        return a.schoolRank - b.schoolRank
      })
      this.setData({
        index: event.detail.value,
        studentList: arr
      })
    } else {
      this.setData({
        index: event.detail.value,
        studentList: examModel.getClassNameOfData(this.data.examNameOfData, this.data.classList[event.detail.value])
      })
    }
    wx.setStorageSync("index", event.detail.value)
    wx.hideLoading()
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