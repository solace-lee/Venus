import {
  config
} from '../config.js'

const tips = {
  1: '出现一个错误',
  2: '网络异常'
}

class HTTP {
  request({
    url,
    data = {},
    method = {}
  }) {
    return new Promise((resolve, reject) => {
      this._request({
        url,
        resolve,
        reject,
        data,
        method
      })
    })
  }

  _request({
    url,
    resolve,
    reject,
    data = {},
    method = 'GET'
  }) {
    if (!method) {
      method = 'GET'
    }
    wx.request({
      url: config.api_base_url + url,
      data: data,
      header: {
        'content-type': 'application/json'
      },
      method: method,
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          // console.log(res)
          resolve(res.data)
        } else {
          reject()
          const error_code = 1
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject(err)
        const error_code = 2
        this._show_error(error_code)
      },
      complete: function(res) {},
    })
  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tip[1],
      icon: 'none',
      duration: 2000
    })
  }
}


export {
  HTTP
}