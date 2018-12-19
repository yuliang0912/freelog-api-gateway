'use strict'

const {ApplicationError} = require('egg-freelog-base/error')

module.exports = (option, app) => {

    const {retCodeEnum, errCodeEnum, type} = app

    return async function (ctx, next) {

        try {
            ctx.error = ctx.error.bind(ctx)
            ctx.success = ctx.success.bind(ctx)

            if (ctx.request.bodyParserError) {
                throw Object.assign(ctx.request.bodyParserError, {
                    retCode: retCodeEnum.success,
                    errCode: errCodeEnum.argumentError,
                    data: 'bodyParse数据转换异常,请检查传入的数据是否符合接口规范'
                })
            }

            ctx.errors = []

            await next()

            if (ctx.body === undefined && /^(2|3)\d{2}$/.test(ctx.response.status)) {
                ctx.body = ctx.buildReturnObject(
                    retCodeEnum.success,
                    errCodeEnum.success, 'success', null)
            }
        } catch (e) {
            if (type.nullOrUndefined(e)) {
                e = new ApplicationError("not defined error")
            }
            if (type.string(e)) {
                e = new ApplicationError(e)
            }
            if (!type.int32(e.retCode)) {
                ctx.app.emit('error', e, ctx);
                e.retCode = retCodeEnum.serverError
            }
            if (!type.int32(e.errCode)) {
                e.errCode = errCodeEnum.autoSnapError
            }

            if (ctx.config.env === 'local' || ctx.config.env === 'test') {
                ctx.body = ctx.buildReturnObject(e.retCode, e.errCode, e.stack || e.message || e.toString(), e.data)
            } else {
                ctx.body = ctx.buildReturnObject(e.retCode, e.errCode, e.message || e.toString(), e.data)
            }
        }
    }
}