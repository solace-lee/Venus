import {
  config
} from '../config.js'

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
      header: { 'content-type': 'application/json'},
      method: method,
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
}