// components/show-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    studentList: {
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
    onclicktap() {
      wx.setStorageSync('info', this.properties.studentList)
      const name = this.properties.studentList.name
      const examName = this.properties.studentList.examName
      wx.navigateTo({
        url: '/pages/student-info/student-info?name=' + name + '&examName=' + examName
      })
    }
  }
})