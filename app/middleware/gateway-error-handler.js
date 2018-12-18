'use strict'

module.exports = (option, app) => {

    return async function (ctx, next) {
        try {
            ctx.error = ctx.error.bind(ctx)
            ctx.success = ctx.success.bind(ctx)
            await next()
        }
        catch (e) {
            ctx.error(e)
        }
    }
}