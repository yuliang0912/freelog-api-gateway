'use strict'

const lodash = require('lodash')
const moment = require("moment")
const ComHandlerResult = require('../com-handle-result')
const {GatewayArgumentError, GatewayAuthenticationError} = require('egg-freelog-base/error')
const cryptoHelper = require('egg-freelog-base/app/extend/helper/crypto_helper')

module.exports = class ClientCredentialsAuthenticationComponent {

    constructor(app) {
        this.app = app
        this.comName = "client"
        this.comType = "authentication"
    }

    /**
     * client证书认证组件处理函数
     */
    async handle(ctx, config) {

        const comHandlerResult = new ComHandlerResult(this.comName, this.comType)

        const clientId = ctx.checkHeader("clientid").exist().notEmpty().toInt().value
        const timeLine = ctx.checkHeader("timeline").exist().notEmpty().toInt().value
        const sign = ctx.checkHeader("sign").exist().notEmpty().value

        if (ctx.errors.length) {
            comHandlerResult.error = new GatewayArgumentError("参数校验错误", {clientId, timeLine, sign})
            comHandlerResult.tips = "参数校验失败,details" + JSON.stringify(ctx.errors)
            return comHandlerResult
        }

        if (Math.abs(moment().format('X') - timeLine) > 180) {
            comHandlerResult.error = new GatewayAuthenticationError("参数timeLine验证失败,timeLine校验不通过", {
                timeLine, currentTime: moment().format('X')
            })
            comHandlerResult.tips = "客户端认证失败"
            return comHandlerResult
        }

        const clientInfo = this.app.getClientInfo(clientId)
        if (!clientInfo) {
            comHandlerResult.error = new GatewayAuthenticationError("client认证失败,未获取到有效的clientInfo", {clientId})
            comHandlerResult.tips = "客户端认证失败"
            return comHandlerResult
        }

        const text = ctx.url + "&timeline=" + timeLine
        if (cryptoHelper.hmacSha1(text, clientInfo.privateKey) !== sign) {
            comHandlerResult.error = new GatewayAuthenticationError("client认证失败,签名不匹配", {
                clientId, sign: cryptoHelper.hmacSha1(text, clientInfo.privateKey)
            })
            console.log(text, clientInfo.privateKey, sign, cryptoHelper.hmacSha1(text, clientInfo.privateKey))
            comHandlerResult.tips = "客户端认证失败,签名不匹配"
            return comHandlerResult
        }

        comHandlerResult.handleResult = true
        comHandlerResult.attachData = {clientInfo}

        ctx.gatewayInfo.identityInfo.clientInfo = lodash.pick(clientInfo, ['clientId', 'clientName'])

        return comHandlerResult
    }
}

