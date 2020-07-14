import Request from '../js_sdk/luch-request/luch-request/index.js'
import { Base64 } from 'js-base64';

const http = new Request();

http.setConfig((config) => {
	config.baseURL = 'https://napi.feiyanmath.com'
	// config.baseURL = 'http://10.10.10.19:9900'
	return config
})

http.interceptors.request.use((config) => {
	const token = uni.getStorageSync('access_token')
	if (!token) {
		config.header['Authorization'] = token
	} else {
		const an = Base64.encode('teacher:teacher')
		const bn = 'Basic ' + an
		config.header['Authorization'] = token
	}
	return config
})

http.interceptors.response.use(res => {
	if (res.data.respCode === 401) {
		console.log('没有登录')
	}
	return res
})

export default http