// components/exam-list/index.js
import {
  ExamModel
} from '../../modules/exam.js'

const examModel = new ExamModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    examInfo: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onExam(event) {
      const userInfo = wx.getStorageSync('login')
      const examName = this.properties.examInfo.examName
      const isLogin = examModel.getIsLogin()
      if (isLogin) {
        if (userInfo.userType) {
          wx.navigateTo({
            url: '/pages/student-list/student-list?examName=' + examName,
          })
        } else {
          const list = examModel.getUserExamList()
          let info = {}
          list.forEach(element => {
            if (element.examName == examName) {
              info = element
            }
          })
          wx.setStorageSync('info', info)
          wx.navigateTo({
            url: '/pages/student-info/student-info?examName=' + examName,
          })
        }
      } else {
        wx.radirectTo({
          url: '/pages/login/login'
        })
      }
      // 判断登录用户是否登陆及登录类型--跳转不同的界面
    }
  }
})