'use strict'

const lodash = require('lodash')
const uuid = require('node-uuid')
const {ApplicationError, ArgumentError} = require('egg-freelog-base/error')

module.exports = (option, app) => {

    const {retCodeEnum, errCodeEnum} = app

    return async function (ctx, next) {

        try {
            ctx.error = ctx.error.bind(ctx)
            ctx.success = ctx.success.bind(ctx)
            ctx.request.requestId = uuid.v4().replace(/-/g, '')

            if (ctx.request.bodyParserError) {
                throw new ArgumentError('bodyParse数据转换异常,请检查传入的数据是否符合接口规范', {
                    bodyParserError: ctx.request.bodyParserError
                })
            }

            ctx.errors = []

            await next()

            if (ctx.body === undefined && /^(2|3)\d{2}$/.test(ctx.response.status)) {
                ctx.body = ctx.buildReturnObject(retCodeEnum.success, errCodeEnum.success, 'success', null)
            }
        } catch (e) {
            if (lodash.isUndefined(e) || lodash.isNull(e)) {
                e = new ApplicationError("not defined error")
            }
            if (lodash.isString(e)) {
                e = new ApplicationError(e)
            }
            if (!lodash.isInteger(e.retCode)) {
                e.retCode = retCodeEnum.serverError
            }
            if (!lodash.isInteger(e.errCode)) {
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