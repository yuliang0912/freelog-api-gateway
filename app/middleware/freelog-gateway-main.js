'use strict'

const {ApplicationError} = require('egg-freelog-base/error')
const GatewayUrlRouterMatch = require('../gateway-core/http-proxy/router-match')
const routerNotMatchErrorHandler = require('../gateway-core/error-handler/router-not-match-error-handler')

module.exports = (option, app) => {

    const gatewayUrlRouterMatchHandler = new GatewayUrlRouterMatch(app)

    return async function (ctx, next) {

        const {path, method} = ctx
        const [_null, first, second] = path.toLowerCase().split('/')

        if (!app.__cache__.routerPrefixGroup) {
            throw new ApplicationError('网关正在初始化中')
        }

        const routerList = await ctx.service.gatewayService.getRouterListByPrefix(`/${first}/${second}/`, method)

        const routerInfo = await gatewayUrlRouterMatchHandler.matchRouterInfo(routerList, path)

        if (!routerInfo) {
            return routerNotMatchErrorHandler(ctx)
        }

        ctx.gatewayInfo = {routerInfo, identityInfo: {}, componentProcessResult: []}

        await next()
    }
}