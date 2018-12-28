// components/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userName: {
      type: String
    },
    isLogin: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showLogin: false,
    out: 0,
    authorized: false,
  },

  attached: function(event) {
    this.userAuthorized()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    userAuthorized() {
      wx.getSetting({
        success: data => {
          if (data.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: data => {
                this.setData({
                  authorized: true,
                  userInfo: data.userInfo
                })
              }
            })
          } else {
            console.log('err')
          }
        }
      })
    },

    onGetUserInfo(event) {
      const userInfo = event.detail.userInfo
      if (userInfo) {
        this.setData({
          authorized: true,
          userInfo
        })
      }
    },

    goLoginOut(event) {
      this.data.out++
        if (this.data.out == 8) {
          wx.setStorageSync('login', null)
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      setTimeout(() => {
        this.data.out = 0
      }, 3000)
    },

    goLogin() {
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }

  }
})