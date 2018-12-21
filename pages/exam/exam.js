// pages/exam/exam.js
import {
  ExamModel
} from '../../modules/exam.js'
import {
  GetData
} from '../../util/getData.js'

const examModel = new ExamModel()
const getData = new GetData()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    isLogin: null,
    database: [],
    List: [{
      examName: "第一次月考",
      sum: "510",
      schoolRank: "44",
      max: "555",
      Average: "500",
      min: "320"
    }, {
      examName: "第二次月考",
      sum: "25",
      schoolRank: "46",
      max: "575",
      Average: "540",
      min: "420"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getData() {
    this.setData({
      userName: examModel.getUserName(),
      userType: examModel.getUserType(),
      isLogin: examModel.getIsLogin(),
      database: examModel.getDatabase(),
      examList: examModel.getExamList()
    })
    this.list()
  },

  list() {
    let exam = this.data.examList
    let data = this.data.database
    for (let i = 0; i < exam.length; i++) {
      let arr = []
      data.forEach(element => {
        if (element.examName == exam[i]){
          arr.push(element.sum)
        }
      })
      console.log(arr);
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
    this.getData()
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