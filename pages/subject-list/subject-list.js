import {
  ExamModel
} from "../../modules/exam";

const examModel = new ExamModel()
// pages/subject-list/subject-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examList: [],
    classList: [],
    examIndex: 0,
    classIndex: 0,
    subName: '',
    subNameZH: '',
    showList: [],
    flat: 0,
    pass: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let classList = examModel.getClassList()
    let classIndex = wx.getStorageSync('index') || 0
    let examIndex = wx.getStorageSync('examIndex') || 0
    let first = ['所有班级']
    if (!(classList[0] == '所有班级')) {
      first = first.concat(classList)
    }
    this.setData({
      classList: first,
      subName: options.subName,
      subNameZH: options.subNameZH,
      examList: examModel.getExamList(),
      classIndex: classIndex,
      examIndex: examIndex
    })
    this.loadFirstList()
  },

  loadFirstList() {
    wx.showLoading()
    // 1.根据选择的考试名筛选列表
    const firstList = examModel.getExamNameOfData(this.data.examList[this.data.examIndex])
    this.loadLastList(firstList)
  },

  loadLastList(event) {
    // 2.根据班级从上面筛选的列表中继续筛选
    let lastList = []
    if (this.data.classIndex == 0) {
      lastList = event
    } else {
      lastList = examModel.getClassNameOfData(event, this.data.classList[this.data.classIndex])
    }
    this.loadFinalLast(lastList)
  },

  loadFinalLast(event) {
    // 3对列表对应科目进行排序
    let arr = event
    let value = this.data.subName
    arr.sort(function(a, b) {
      return b[value] - a[value]
    })
    this.setData({
      showList: arr
    })
    this.calculation(arr)
  },

  calculation(event) {
    // 计算平均分，及格率
    let sum = 0
    let count = 0
    let flat = 0
    let subName = this.data.subName
    event.forEach(element => {
      sum += element[subName]
      if (element[subName] >= 60) {
        count++
      }
    })
    flat = sum / event.length
    count = count / event.length * 100
    this.setData({
      flat: flat.toFixed(2),
      pass: count.toFixed(2)
    })
    wx.hideLoading()
  },

  bindExamChange(event) {
    this.setData({
      examIndex: event.detail.value
    })
    wx.setStorageSync("examIndex", event.detail.value)
    this.loadFirstList()
  },

  bindClassChange(event) {
    this.setData({
      classIndex: event.detail.value,
    })
    wx.setStorageSync("index", event.detail.value)
    this.loadFirstList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})