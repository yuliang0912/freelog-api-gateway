'use strict'

module.exports = (option, app) => {

    return async function (ctx, next) {

        const {routerInfo} = ctx.gatewayInfo

        if (!routerInfo.mockStatus) {
            return await next()
        }

        ctx.body = {msg: "mock data"}
    }
}
