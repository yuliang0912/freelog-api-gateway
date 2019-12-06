'use strict'

const lodash = require('lodash')
const {ApplicationError} = require('egg-freelog-base/error')
const GatewayUrlRouterMatch = require('../gateway-core/http-proxy/router-match')
const routerNotMatchErrorHandler = require('../gateway-core/error-handler/router-not-match-error-handler')
const {GatewayInfoUpdateEvent} = require('../enum/app-event-emitter-enum')

/**
 * 代理中间件入口,必须放在代理中间件的前面位置
 * @param option
 * @param app
 * @returns {Function}
 */
module.exports = (option, app) => {

    const gatewayUrlRouterMatchHandler = new GatewayUrlRouterMatch(app)

    return async function (ctx, next) {

        if (!app.isLoadCompleteRouterInfo()) {
            await ctx.service.gatewayService.getAllRouterInfo().then(gatewayInfo => {
                app.messenger.sendToApp(GatewayInfoUpdateEvent, gatewayInfo)
            })
            throw Object.assign(new ApplicationError('网关正在初始化中'), {retCode: app.retCodeEnum.agentError})
        }

        const {path, method} = ctx
        const routerPrefix = lodash.split(path.toLowerCase(), '/', 3).join('/') + '/'
        const routerList = await ctx.service.gatewayService.getRouterListByPrefix(routerPrefix, method)

        const routerInfo = await gatewayUrlRouterMatchHandler.matchRouterInfo(routerList, path, method)
        if (!routerInfo) {
            return routerNotMatchErrorHandler(ctx)
        }

        ctx.set('x-router-id', routerInfo.routerId)
        ctx.gatewayInfo = {routerInfo, identityInfo: {}, componentProcessResult: []}

        await next()
    }
}