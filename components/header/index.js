// components/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userType: {
      type: Number,
      value: 0
    },
    userName: {
      type: String,
      value: '用户名'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showLogin: true
  },

  attached: function (event) {
    this.isLogin()
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
      console.log('登录功能');
    },

    goLoginOut(event){
      console.log('登出功能');
      
    }

  }
})