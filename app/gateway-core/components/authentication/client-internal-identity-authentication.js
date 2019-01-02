'use strict'

const ComHandlerResult = require('../com-handle-result')
const {GatewayArgumentError, GatewayAuthenticationError} = require('egg-freelog-base/error')
const cryptoHelper = require('egg-freelog-base/app/extend/helper/crypto_helper')

module.exports = class ClientInternalIdentityAuthenticationComponent {

    constructor(app) {
        this.app = app
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

        const clientId = ctx.checkHeader("clientid").exist().toInt().value
        if (!clientId) {
            comHandlerResult.error = new GatewayArgumentError("参数校验错误", {clientId})
            comHandlerResult.tips = "参数校验失败,details" + JSON.stringify(ctx.errors)
            return comHandlerResult
        }

        const clientInfo = this.app.getClientInfo(clientId)
        if (!clientInfo) {
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
        if (cryptoHelper.hmacSha1(token, clientInfo.privateKey) !== sign) {
            comHandlerResult.error = new GatewayAuthenticationError("内部身份认证失败", {sign: cryptoHelper.hmacSha1(token, clientInfo.privateKey)})
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
        ctx.gatewayInfo.identityInfo = Object.assign(internalIdentityInfo, ctx.gatewayInfo.identityInfo)

        return comHandlerResult
    }
}
