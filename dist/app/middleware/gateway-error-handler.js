"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const lodash_1 = require("lodash");
const error_1 = require("egg-freelog-base/error");
const retCodeEnum = require("egg-freelog-base/app/enum/ret_code");
const errCodeEnum = require("egg-freelog-base/app/enum/err_code");
module.exports = (options) => {
    return async (ctx, next) => {
        try {
            ctx.error = ctx.error.bind(ctx);
            ctx.success = ctx.success.bind(ctx);
            ctx.requestId = uuid_1.v4().replace(/-/g, '').substr(0, 12); //请求ID由代理服务器分配
            ctx.traceId = ctx.get('traceId') || uuid_1.v4().replace(/-/g, '').substr(2, 12); //链路追踪ID如果请求方不传递,则自动生成一个
            if (ctx.request['bodyParserError']) {
                throw new error_1.ArgumentError('bodyParse数据转换异常,请检查传入的数据是否符合接口规范', {
                    bodyParserError: ctx.request['bodyParserError']
                });
            }
            ctx.errors = [];
            await next();
            if (lodash_1.isUndefined(ctx.body) && /^(2|3)\d{2}$/.test(ctx.response?.status.toString())) {
                ctx.body = ctx.buildReturnObject(retCodeEnum.success, errCodeEnum.success, 'success', null);
            }
        }
        catch (error) {
            error = error ?? new error_1.ApplicationError("not defined error");
            if (lodash_1.isString(error)) {
                error = new error_1.ApplicationError(error);
            }
            if (!lodash_1.isInteger(error.retCode)) {
                error.retCode = retCodeEnum.serverError;
            }
            if (!lodash_1.isInteger(error.errCode)) {
                error.errCode = errCodeEnum.autoSnapError;
            }
            if (ctx.config.env === 'local' || ctx.config.env === 'test') {
                ctx.body = ctx.buildReturnObject(error.retCode, error.errCode, error.stack || error.message || error.toString(), error.data);
            }
            else {
                ctx.body = ctx.buildReturnObject(error.retCode, error.errCode, error.message || error.toString(), error.data);
            }
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZXdheS1lcnJvci1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9taWRkbGV3YXJlL2dhdGV3YXktZXJyb3ItaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUF3QjtBQUN4QixtQ0FBd0Q7QUFDeEQsa0RBQXNFO0FBQ3RFLGtFQUFrRTtBQUNsRSxrRUFBa0U7QUFFbEUsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLE9BQWdCLEVBQUUsRUFBRTtJQUVsQyxPQUFPLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFFdkIsSUFBSTtZQUNBLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQyxHQUFHLENBQUMsU0FBUyxHQUFHLFNBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWM7WUFDcEUsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLHdCQUF3QjtZQUVsRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDaEMsTUFBTSxJQUFJLHFCQUFhLENBQUMsa0NBQWtDLEVBQUU7b0JBQ3hELGVBQWUsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDO2lCQUNsRCxDQUFDLENBQUE7YUFDTDtZQUNELEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sSUFBSSxFQUFFLENBQUE7WUFFWixJQUFJLG9CQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRTtnQkFDL0UsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQTthQUM5RjtTQUVKO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFFWixLQUFLLEdBQUcsS0FBSyxJQUFJLElBQUksd0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUUzRCxJQUFJLGlCQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2pCLEtBQUssR0FBRyxJQUFJLHdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFBO2FBQ3RDO1lBQ0QsSUFBSSxDQUFDLGtCQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMzQixLQUFLLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUE7YUFDMUM7WUFDRCxJQUFJLENBQUMsa0JBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzNCLEtBQUssQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQTthQUM1QztZQUNELElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssT0FBTyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLE1BQU0sRUFBRTtnQkFDekQsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQy9IO2lCQUFNO2dCQUNILEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDaEg7U0FDSjtJQUVMLENBQUMsQ0FBQTtBQUNMLENBQUMsQ0FBQSJ9