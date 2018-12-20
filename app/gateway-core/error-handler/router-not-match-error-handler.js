'use strict'

const {GatewayRouterMatchError} = require('egg-freelog-base/error')

module.exports = (ctx) => {

    ctx.status = 404

    throw new GatewayRouterMatchError('网关服务未能匹配到可用的路由', {path: ctx.path, method: ctx.method})

}