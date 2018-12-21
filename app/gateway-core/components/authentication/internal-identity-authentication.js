'use strict'

const ComHandlerResult = require('../com-handle-result')
const {GatewayAuthenticationError} = require('egg-freelog-base/error')

module.exports = class InternalIdentityAuthenticationComponent {

    constructor(app) {
        this.comName = "internal-identity"
        this.comType = "authentication"
        this.clientInfoProvider = app.dal.clientInfoProvider
    }

    /**
     * 内部身份认证,一般用于内部API之间调用,已经做过身份认证,直接使用之前的认证信息模式
     * 为解决数据信任问题,一般配合client或者白名单认证一起使用
     */
    async handle(ctx, config) {

        const tokenInfo = ctx.get('authentication')
        const comHandlerResult = new ComHandlerResult(this.comName, this.comType)

        if (!tokenInfo) {
            comHandlerResult.error = new GatewayAuthenticationError("内部身份认证失败", {tokenInfo})
            comHandlerResult.tips = "内部身份认证失败,未获取到有效内部身份"
            return comHandlerResult
        }

        try {
            const clientTokenInfo = JSON.parse(new Buffer(tokenInfo, 'base64').toString())
            comHandlerResult.attachData = clientTokenInfo.userInfo
        } catch (e) {
            comHandlerResult.error = new GatewayAuthenticationError("内部身份认证失败", {e})
            comHandlerResult.tips = "内部身份认证失败,数据解析失败"
            return comHandlerResult
        }

        comHandlerResult.handleResult = true

        ctx.gatewayInfo.identityInfo.userInfo = comHandlerResult.attachData

        return comHandlerResult
    }
}
