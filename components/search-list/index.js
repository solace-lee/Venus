// components/search-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showList: {
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
    onclick() {
      wx.setStorageSync('info', this.properties.showList)
      wx.navigateTo({
        url: '/pages/student-info/student-info',
      })
    }
  }
})