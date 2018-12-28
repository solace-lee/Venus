import {
  HTTP
} from 'http.js'

const time = new Date().getTime()

class GetData extends HTTP {
  getExam(sCallback) {
    this.request({
      url: 'exam.json' + '?time=' + time,
    }).then((res) => {
        sCallback(res)
        wx.showToast({
          title: '获取基础数据成功',
          icon: 'none',
          duration: 1000
        })
      },
      (err) => {
        console.log(err)
      })
  }

  getTeacher(sCallback) {
    this.request({
      url: 'teacher.json' + '?time=' + time,
    }).then((res) => {
        sCallback(res)
        wx.showToast({
          title: '获取教师数据成功',
          icon: 'none',
          duration: 1000
        })
      },
      (err) => {
        console.log(err)
      })
  }
}

export {
  GetData
}