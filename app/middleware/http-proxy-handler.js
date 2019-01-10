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

        const upstream = await gatewayUrlRouterMatchHandler.getUpstreamInfo(routerInfo, ctx.url, ctx.method)

        identityTransmit(ctx)

        //修改为直接pipe(ctx.res),如果进入此处,则所有中间件不能在处理控制body了
        //await httpRequestProxy.httpProxy(ctx, upstream).catch(error => httpRequestProxyErrorHandler(ctx, error))

        await httpRequestProxy.httpProxy(ctx, upstream).then(response => {
            ctx.proxyResponse = response
            ctx.set('x-proxy-time', Date.now() - ctx.startProxyStartTime)
        }).catch(error => httpRequestProxyErrorHandler(ctx, error))

        await next()
    }
}