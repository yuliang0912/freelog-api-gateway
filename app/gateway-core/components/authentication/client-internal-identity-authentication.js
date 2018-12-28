'use strict'

const ComHandlerResult = require('../com-handle-result')
const {GatewayAuthenticationError} = require('egg-freelog-base/error')
const cryptoHelper = require('egg-freelog-base/app/extend/helper/crypto_helper')

module.exports = class InternalIdentityAuthenticationComponent {

    constructor(app) {
        this.comName = "client-internal-identity"
        this.comType = "authentication"
    }

    /**
     * 内部身份认证,一般用于内部API之间调用,已经做过身份认证,直接使用之前的认证信息模式
     * 为解决数据信任问题,需要使用client的私钥进行hmacSha1签名
     */
    async handle(ctx, config) {

        const tokenInfo = ctx.get('authentication')
        const comHandlerResult = new ComHandlerResult(this.comName, this.comType)

        if (!tokenInfo) {
            comHandlerResult.error = new GatewayAuthenticationError("内部身份认证失败", {tokenInfo})
            comHandlerResult.tips = "内部身份认证失败,未获取到有效内部身份"
            return comHandlerResult
        }

        const gatewayIdentityInfo = ctx.gatewayInfo.identityInfo
        if (!gatewayIdentityInfo.clientInfo) {
            comHandlerResult.error = new GatewayAuthenticationError("内部身份认证失败,未获得client信息")
            comHandlerResult.tips = "内部身份认证失败,未获得client信息"
            return comHandlerResult
        }

        const [token, sign] = tokenInfo.split(':')
        if (!token || !sign) {
            comHandlerResult.error = new GatewayAuthenticationError("内部身份认证失败")
            comHandlerResult.tips = "内部身份认证失败,数据格式错误"
            return comHandlerResult
        }
        if (cryptoHelper.hmacSha1(token, gatewayIdentityInfo.clientInfo.privateKey) !== sign) {
            comHandlerResult.error = new GatewayAuthenticationError("内部身份认证失败")
            comHandlerResult.tips = "内部身份认证失败,签名校验失败"
            return comHandlerResult
        }

        var internalIdentityInfo = {}
        try {
            internalIdentityInfo = JSON.parse(Buffer.from(token, "base64").toString())
        } catch (e) {
            comHandlerResult.error = new GatewayAuthenticationError("内部身份认证失败", {e})
            comHandlerResult.tips = "内部身份认证失败,数据解析失败"
            return comHandlerResult
        }

        comHandlerResult.handleResult = true
        comHandlerResult.attachData = internalIdentityInfo

        //透传的认证信息级别低于经过组件认证过的信息级别
        const {userInfo, nodeInfo, clientInfo} = internalIdentityInfo
        if (userInfo) {
            gatewayIdentityInfo.userInfo = gatewayIdentityInfo.userInfo || userInfo
        }
        if (nodeInfo) {
            gatewayIdentityInfo.nodeInfo = gatewayIdentityInfo.nodeInfo || nodeInfo
        }
        if (clientInfo) {
            gatewayIdentityInfo.clientInfo = gatewayIdentityInfo.clientInfo || clientInfo
        }

        return comHandlerResult
    }
}
