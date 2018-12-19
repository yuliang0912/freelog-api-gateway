'use strict'

const GatewayUrlRouterMatch = require('../gateway-core/http-proxy/router-match')

module.exports = (option, app) => {

    const gatewayUrlRouterMatchHandler = new GatewayUrlRouterMatch(app)

    return async function (ctx, next) {

        const {routerInfo} = ctx.gatewayInfo

        const {upstream} = await gatewayUrlRouterMatchHandler.getUpstreamInfo(routerInfo, ctx.url, ctx.method)

        ctx.success(upstream)
    }
}