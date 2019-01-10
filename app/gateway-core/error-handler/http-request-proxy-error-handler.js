'use strict'

const {GatewayUpstreamApiError} = require('egg-freelog-base/error')

const codeMsgMap = {
    ETIMEDOU: "连接已经超时",
    ESOCKETTIMEDOUT: "连接已经超时",
    ECONNREFUSED: "不能连接到目标服务器",
    HTTPSTATUSCODEERROR: "http状态码错误"
}

module.exports = (ctx, error) => {

    const {code, statusCode} = error

    const msg = `上游服务器错误。${codeMsgMap[code] || ''}`

    console.log(error)

    ctx.status = statusCode || 404

    throw new GatewayUpstreamApiError(msg, {code, statusCode, error: error.stack || error.message})
}
