// components/search/index.js
import {
  ExamModel
} from '../../modules/exam.js'

const examModel = new ExamModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    text: '',
    showList: []
  },


  /**
   * 组件的方法列表
   */
  methods: {
    searchInput(event) {
      let text = event.detail.value
      let arr = text.split(' ')
      if (arr.length == 1 && arr[0] == '') {
        this.setData({
          showList: []
        })
      } else {
        this.search(arr)
      }
    },

    search(event) {
      let list = []
      let database = examModel.getDatabase()
      database.forEach(element => {
        let firstList = []
        for (let j in element) {
          let a = element[j].toString()
          firstList.push(a)
        }
        let isThis = false
        for (let i in event) {
          if (!(firstList.indexOf(event[i]) == -1)) {
            isThis = true
          } else {
            isThis = false
          }
          if (!isThis) {
            break
          }
        }
        if (isThis) {
          list.push(element)
        }
      })
      this.setData({
        showList: list
      })
    },

    clean() {
      this.setData({
        text: '',
        showList: []
      })
    }
  }
})