// components/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLogin: {
      type: Boolean
    },
    userName: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showLogin: true
  },

  attached: function (event) {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    isLogin(event) {
      if (this.properties.userType == 0) {
        this.setData({
          showLogin: true
        })
      } else {
        this.setData({
          showLogin: false
        })
      }
    },

    goLoginIn(event) {
      wx.nav
    },

    goLoginOut(event){
      wx.setStorageSync('login', null)
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }

  }
})