// pages/exam/exam.js
import {
  ExamModel
} from '../../modules/exam.js'
// import {
//   GetData
// } from '../../util/getData.js'

const examModel = new ExamModel()
// const getData = new GetData()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userType: null,
    isLogin: null,
    database: [],
    examList: [],
    userExamList: [],
    List: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  loadData() {
    this.setData({
      userName: examModel.getUserName(),
      userType: examModel.getUserType(),
      isLogin: examModel.getIsLogin(),
      database: examModel.getDatabase(),
      examList: examModel.getExamList(),
      userExamList: examModel.getUserExamList()
    })
    this.data.List = []
    this.list()
  },

  list() {
    let exam = this.data.examList //考试名称列表
    let data = this.data.database //基础数据
    let userData = this.data.userExamList //家长账户中获取的学生信息
    let listInfo = [] //最终生成的数据
    for (let i = 0; i < exam.length; i++) {
      let arr = []
      let sum = 0
      let examCell = {}
      data.forEach(element => {
        if (element.examName == exam[i]) {
          arr.push(element.sum)
          sum += element.sum
        }
      })
      examCell.examName = exam[i]
      if (this.data.userType) {
        examCell.Average = (sum / arr.length).toFixed(2)
        examCell.max = Math.max.apply(Math, arr)
        examCell.min = Math.min.apply(Math, arr)
      }
      //以上是根据考试名生成改考试的学生总分平均分，最高分，最低分
      //以下是获取该学生在对于考试名中的总分，级排名，班排名
      if (!this.data.userType) {
        let userSum = 0
        let userSchoolRank = 0
        let userClassRank = 0
        userData.forEach(element => {
          if (element.examName == exam[i]) {
            userSum = element.sum
            userSchoolRank = element.schoolRank
            userClassRank = element.classRank
          }
        })
        examCell.sum = userSum
        examCell.schoolRank = userSchoolRank
        examCell.classRank = userClassRank
      }
      listInfo.push(examCell)
    }
    this.setData({
      List: listInfo
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
    this.loadData()
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