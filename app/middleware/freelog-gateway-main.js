'use strict'

const lodash = require('lodash')
const {ApplicationError} = require('egg-freelog-base/error')
const GatewayUrlRouterMatch = require('../gateway-core/http-proxy/router-match')
const routerNotMatchErrorHandler = require('../gateway-core/error-handler/router-not-match-error-handler')

/**
 * 代理中间件入口,必须放在代理中间件的前面位置
 * @param option
 * @param app
 * @returns {Function}
 */
module.exports = (option, app) => {

    const gatewayUrlRouterMatchHandler = new GatewayUrlRouterMatch(app)

    return async function (ctx, next) {

        const {path, method} = ctx
        const [first, second] = lodash.trimStart(path.toLowerCase(), '/').split('/')

        if (!app.isLoadCompleteRouterInfo()) {
            throw Object.assign(new ApplicationError('网关正在初始化中'), {retCode: app.retCodeEnum.agentError})
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