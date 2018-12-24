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

  getUserExamList() {
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

  getExamNameOfData(examName) {
    // 根据考试名从基础数据筛选出对应数据
    let list = []
      database.forEach(element => {
        if (element.examName == examName) {
          list.push(element)
        }
      })
      return list
    }

    getClassNameOfData(arr, className){
      // 根据给定的班级名从给定的数组筛选
      let list = []
      arr.forEach(element => {
        if (element.className == className) {
          list.push(element)
        }
      })
      return list
    }

    getStudentInfo(name, examName){
      // 根据给定的名字和考试名，从基础数据中筛选
      let list = []
      database.forEach(element => {
        if (element.examName == examName && element.name == name) {
          list.push(element)
        }
      })
      return list
    }

}



export {
  ExamModel
}