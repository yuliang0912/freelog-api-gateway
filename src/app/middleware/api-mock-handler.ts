module.exports = (option, app) => {

    return async function (ctx, next) {

        if (!ctx.gatewayInfo?.routerInfo?.mockStatus) {
            return await next()
        }

        ctx.body = {msg: "mock data"};
    }
}
