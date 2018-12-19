'use strict'

const HttpRequestProxy = require('../gateway-core/http-proxy/request-proxy')
const GatewayUrlRouterMatch = require('../gateway-core/http-proxy/router-match')
const httpRequestProxyErrorHandler = require('../gateway-core/error-handler/http-request-proxy-error-handler')

module.exports = (option, app) => {

    const httpRequestProxy = new HttpRequestProxy(app)
    const gatewayUrlRouterMatchHandler = new GatewayUrlRouterMatch(app)

    return async function (ctx, next) {

        const {routerInfo} = ctx.gatewayInfo

        const {upstream} = await gatewayUrlRouterMatchHandler.getUpstreamInfo(routerInfo, ctx.url, ctx.method)

        await httpRequestProxy.httpProxy(ctx, upstream).then(response => {
            Object.keys(response.headers).forEach(header => {
                ctx.set(header, response.headers[header])
            })
            ctx.body = response.body
        }).catch(error => httpRequestProxyErrorHandler(ctx, error))

        await next()
    }
}