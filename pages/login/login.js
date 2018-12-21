// pages/login/login.js
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
    database: [],
    userName: '',
    teacherName: '',
    password: '',
    userType: false,
    isLogin: false
    // false代表为家长账户
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onLoadData()
  },

  onLoadData() {
    getData.getExam((res) => {
      this.data.database = res
      examModel.loadData(res)
      this.autoLogin()
    })
  },

  autoLogin() {
    if (this.data.isLogin) {
      return
    } else {
      const userInfo = wx.getStorageSync("login") || null
      if (!(userInfo == null)) {
        // 如果存在保存的登录数据
        if (!userInfo.userType) {
          // 家长登录
          this.data.userName = userInfo.userName
          this.data.password = userInfo.password
          this.data.userType = userInfo.userType
          this.login()
        } else if (userInfo.userType) {
          // 教师登录
          this.data.teacherName = userInfo.userName
          this.data.password = userInfo.password
          this.data.userType = userInfo.userType
          this.login()
        }
      }
    }
  },

  changeType() {
    this.setData({
      userType: !this.data.userType,
      userName: '',
      teacherName: '',
    })
  },

  refresh() {
    this.onLoadData()
  },

  clean() {
    this.setData({
      userName: '',
      teacherName: '',
      password: ''
    })
  },

  userNameInput(event) {
    this.data.userName = event.detail.value
  },

  teacherNameInput(event) {
    this.data.teacherName = event.detail.value
  },

  passwordInput(event) {
    this.data.password = event.detail.value
  },

  login(event) {
    // wx.showLoading()
    let list = []
    if (!this.data.userType) {
      const data = this.data.database
      if (data.length == 0) {
        const msg = '请刷新数据后重试'
        this._showMsg(msg)
        return
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].name == this.data.userName && data[i].studentID == this.data.password) {
          list.push(data[i])
          this.setData({
            userType: false,
            isLogin: true
          })
          this.setToken()
          wx.setStorageSync("login", {
            "userName": this.data.userName,
            "password": this.data.password,
            "userType": this.data.userType,
          })
        }
      }
      // wx.hideLoading()
      if (list.length == 0) {
        const msg = '用户名或密码错误'
        this._showMsg(msg)
      } else {
        const msg = '登录成功'
        this._showMsg(msg)
        examModel.setExamList(list)
        this.goNext()
      }
      // 家长登录功能结束
    } else if (this.data.userType) {
      getData.getTeacher((res) => {
        res.forEach(element => {
          if (element.name == this.data.teacherName && element.teacherid == this.data.password) {
            this.setData({
              userType: true,
              isLogin: true
            })
            this.setToken()
            wx.setStorageSync("login", {
              "userName": this.data.teacherName,
              "password": this.data.password,
              "userType": this.data.userType,
            })
            const msg = '登录成功'
            this._showMsg(msg)
            this.goNext()
          }
        });
      })
    }
  },

  _showMsg(event) {
    wx.showToast({
      title: event,
      icon: 'none',
      duration: 1500
    })
  },

  goNext(){
    wx.redirectTo({
      url: '/pages/exam/exam'
    })
  },

  setToken(){
    examModel.setUserType(this.data.userType)
    examModel.setIsLogin(this.data.isLogin)
    if(this.data.userType){
      examModel.setUserName(this.data.teacherName)
    }else{
      examModel.setUserName(this.data.userName)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.onLoadData()
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