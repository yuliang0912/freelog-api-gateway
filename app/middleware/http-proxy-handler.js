'use strict'

const HttpRequestProxy = require('../gateway-core/http-proxy/request-proxy')
const GatewayUrlRouterMatch = require('../gateway-core/http-proxy/router-match')
const httpRequestProxyErrorHandler = require('../gateway-core/error-handler/http-request-proxy-error-handler')
const identityTransmit = require('../gateway-core/http-proxy/identity-transmit')

module.exports = (option, app) => {

    const httpRequestProxy = new HttpRequestProxy(app)
    const gatewayUrlRouterMatchHandler = new GatewayUrlRouterMatch(app)

    return async function (ctx, next) {

        const {routerInfo} = ctx.gatewayInfo

        const {upstream} = await gatewayUrlRouterMatchHandler.getUpstreamInfo(routerInfo, ctx.url, ctx.method)

        if (routerInfo.routerId.toString() === "5c2317767363e3002cc5933a") {
            console.log(ctx.url, ctx.method, JSON.stringify(upstream))
        }

        ctx.set('x-router-id', routerInfo.routerId)

        identityTransmit(ctx)

        await httpRequestProxy.httpProxy(ctx, upstream).then(response => {
            ctx.proxyResponse = response
        }).catch(error => httpRequestProxyErrorHandler(ctx, error))

        await next()
    }
}