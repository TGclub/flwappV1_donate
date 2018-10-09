/* 1.获取openid */
import { baseURL } from '../../config/default'

// get openId
const getStorage = () => {};

// wx js bridge
const wx = () => {};

export default (amount) => {
	return new Promise((resolve, reject) => {
		if (getStorage('openId')) {
			// 已经获取过openId
			wx.request({
				url: `${baseURL}/pay/preOrder`,
				method: 'POST',
				data: {
					amount: amount, /* 订单号 */
					openId: getStorage('openId')
				},
				header: {
					'content-type': 'application/json',
					'Authorization': getStorage('token')
				},
				success: function (res) {
					res.data = JSON.parse(res.data.data)

					let config = {
						'timeStamp': res.data.timeStamp,
						'nonceStr': res.data.nonceStr,
						'package': res.data.package,
						'signType': res.data.signType,
						'paySign': res.data.paySign,
						'appId': res.data.appId,
						'totalFee': res.data.totalFee,
						'success': function (res) {
							resolve(res.data)
						},
						'fail': function (err) {
							reject(err)
						}
					}
					wx.requestPayment(config)
				},
				fail: function (err) {
					reject(err)
				}
			})
		} else {
			// 未获取过openId（可能是登录失效）
			reject(new Error('payment fail'))
		}
	})
}
