import {v4} from 'uuid';
import {isString, isInteger, isUndefined} from 'lodash';
import {ApplicationError, ArgumentError} from 'egg-freelog-base/error'
import * as retCodeEnum from 'egg-freelog-base/app/enum/ret_code';
import * as errCodeEnum from 'egg-freelog-base/app/enum/err_code';

module.exports = (options?: object) => {

    return async (ctx, next) => {

        try {
            ctx.error = ctx.error.bind(ctx);
            ctx.success = ctx.success.bind(ctx);
            ctx.requestId = v4().replace(/-/g, '').substr(0, 12); //请求ID由代理服务器分配
            ctx.traceId = ctx.get('traceId') || v4().replace(/-/g, '').substr(2, 12); //链路追踪ID如果请求方不传递,则自动生成一个

            if (ctx.request['bodyParserError']) {
                throw new ArgumentError('bodyParse数据转换异常,请检查传入的数据是否符合接口规范', {
                    bodyParserError: ctx.request['bodyParserError']
                })
            }
            ctx.errors = [];
            await next()

            if (isUndefined(ctx.body) && /^(2|3)\d{2}$/.test(ctx.response?.status.toString())) {
                ctx.body = ctx.buildReturnObject(retCodeEnum.success, errCodeEnum.success, 'success', null)
            }

        } catch (error) {

            error = error ?? new ApplicationError("not defined error");

            if (isString(error)) {
                error = new ApplicationError(error)
            }
            if (!isInteger(error.retCode)) {
                error.retCode = retCodeEnum.serverError
            }
            if (!isInteger(error.errCode)) {
                error.errCode = errCodeEnum.autoSnapError
            }
            if (ctx.config.env === 'local' || ctx.config.env === 'test') {
                ctx.body = ctx.buildReturnObject(error.retCode, error.errCode, error.stack || error.message || error.toString(), error.data)
            } else {
                ctx.body = ctx.buildReturnObject(error.retCode, error.errCode, error.message || error.toString(), error.data)
            }
        }

    }
}