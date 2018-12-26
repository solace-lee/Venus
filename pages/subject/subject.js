// pages/subject/subject.js
import {
  ExamModel
} from '../../modules/exam.js'

const examModel = new ExamModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    subNameZH: '',
    subName: '',
    userType: null,
    userExamList: {},
    showList: [],
    show: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userType: examModel.getUserType(),
      userExamList: examModel.getUserExamList()
    })
  },

  onclick(event) {
    let subNameZH = event._relatedInfo.anchorTargetText
    let subName = this._changeName(subNameZH)
    if (this.data.userType) {
      // 教师用户
      wx.navigateTo({
        url: '/pages/subject-list/subject-list?subName=' + subName + '&subNameZH=' + subNameZH
      })
    } else {
      // 家长用户
      this.showInfo(subNameZH, subName)
    }
  },

  showInfo(subZH, sub) {
    let list = []
    const arr = this.data.userExamList
    arr.forEach(element => {
      let obj = {}
      obj.examName = element.examName
      obj.subInfo = element[sub]
      list.push(obj)
    })
    this.setData({
      showList: list,
      subNameZH: subZH,
      show: false
    })
  },

  onclickhidden() {
    this.setData({
      show: true
    })
  },

  _changeName(event) {
    switch (event) {
      case '语文':
        return 'chinese'
        break
      case '数学':
        return 'math'
        break
      case '英语':
        return 'english'
        break
      case '政治':
        return 'politics'
        break
      case '生物':
        return 'biology'
        break
      case '地理':
        return 'geography'
        break
      case '历史':
        return 'history'
        break
      case '物理':
        return 'physics'
        break
      case '化学':
        return 'chemistry'
        break
    }
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