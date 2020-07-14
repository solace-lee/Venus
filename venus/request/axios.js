import http from './http.js'
import apis from './apis.js'

const error = {
	respCode: 500,
	respMsg: '收到一个错误'
}

class getRequest {

	async selfTestTree() {
		const {
			statusCode,
			data
		} = await http.get(apis.selfTestTree)
		if (statusCode === 200) return data
		return error
	}

	async getUnionid(code) {
		const {
			statusCode,
			data
		} = await http.get(apis.getUnionid, {params: {code}})
		if (statusCode === 200) return data
		return error
	}

	async loginAndRegister(unionId) {
		const {
			statusCode,
			data
		} = await http.post(apis.loginAndRegister, {unionId})
		if (statusCode === 200) return data
		return error
	}
}

export default getRequest
