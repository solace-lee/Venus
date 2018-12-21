import {
  GetData
} from '../util/getData.js'

var database = []
var examList = []
var classList = []
var userExamList = []
var userName = ''
var userType = null
var isLogin = false

class ExamModel extends GetData {
  loadData(data) {
    database = data
    this._getList(data)
  }

  _getList(data) {
    examList = []
    classList = []
    data.forEach((item, index) => {
      if (examList.indexOf(item.examName) == -1) {
        examList.push(item.examName)
      } else if (classList.indexOf(item.className) == -1) {
        classList.push(item.className)
      }
      return
    })
  }

  setExamList(event) {
    userExamList = event
  }

  setUserName(event) {
    userName = event
  }

  setUserType(event) {
    userType = event
  }

  setIsLogin(event) {
    isLogin = event
  }

  getUserName() {
    return userName
  }

  getUserType() {
    return userType
  }

  getIsLogin() {
    return isLogin
  }

  getExamList() {
    return userExamList
  }

  getDatabase() {
    return database
  }

  getExamList() {
    return examList
  }

  getClassList() {
    return classList
  }


}



export {
  ExamModel
}