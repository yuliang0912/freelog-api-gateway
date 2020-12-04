"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const lodash_1 = require("lodash");
const egg_freelog_base_1 = require("egg-freelog-base");
function buildApiFormatData(ret, errCode, msg, data) {
    return {
        ret, errCode, msg, data: data ?? null
    };
}
function gatewayErrorHandlerMiddleware(_options, app) {
    return async (ctx, next) => {
        try {
            ctx.error = ctx.error.bind(ctx);
            ctx.success = ctx.success.bind(ctx);
            ctx.requestId = uuid_1.v4().replace(/-/g, '').substr(0, 12); //请求ID由代理服务器分配
            ctx.traceId = ctx.get('traceId') || uuid_1.v4().replace(/-/g, '').substr(2, 12); //链路追踪ID如果请求方不传递,则自动生成一个
            if (ctx.bodyParserError) {
                throw new egg_freelog_base_1.ArgumentError('bodyParse数据转换异常,请检查传入的数据是否符合接口规范', {
                    bodyParserError: ctx.request['bodyParserError']
                });
            }
            ctx.errors = [];
            await next();
            if (lodash_1.isUndefined(ctx.body) && /^(2|3)\d{2}$/.test(ctx.response?.status.toString())) {
                ctx.body = ctx.buildReturnObject(egg_freelog_base_1.RetCodeEnum.success, egg_freelog_base_1.ErrCodeEnum.success, 'success', null);
            }
        }
        catch (error) {
            error = error ?? new egg_freelog_base_1.ApplicationError("not defined error");
            if (lodash_1.isString(error)) {
                error = new egg_freelog_base_1.ApplicationError(error);
            }
            if (!lodash_1.isInteger(error.retCode)) {
                error.retCode = egg_freelog_base_1.RetCodeEnum.serverError;
            }
            if (!lodash_1.isInteger(error.errCode)) {
                error.errCode = egg_freelog_base_1.ErrCodeEnum.autoSnapError;
            }
            if (app.config.env === 'local' || app.config.env === 'test') {
                ctx.body = buildApiFormatData(error.retCode, error.errCode, error.stack || error.message || error.toString(), error.data);
            }
            else {
                ctx.body = buildApiFormatData(error.retCode, error.errCode, error.message || error.toString(), error.data);
            }
        }
    };
}
exports.default = gatewayErrorHandlerMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZXdheS1lcnJvci1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9taWRkbGV3YXJlL2dhdGV3YXktZXJyb3ItaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUF3QjtBQUN4QixtQ0FBd0Q7QUFDeEQsdURBUXlCO0FBR3pCLFNBQVMsa0JBQWtCLENBQUMsR0FBZ0IsRUFBRSxPQUFvQixFQUFFLEdBQVcsRUFBRSxJQUFTO0lBQ3RGLE9BQU87UUFDSCxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxJQUFJLElBQUk7S0FDeEMsQ0FBQTtBQUNMLENBQUM7QUFFRCxTQUF3Qiw2QkFBNkIsQ0FBQyxRQUF1QixFQUFFLEdBQXVCO0lBRWxHLE9BQU8sS0FBSyxFQUFFLEdBQW1CLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFFdkMsSUFBSTtZQUNBLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQyxHQUFHLENBQUMsU0FBUyxHQUFHLFNBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWM7WUFDcEUsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLHdCQUF3QjtZQUVsRyxJQUFJLEdBQUcsQ0FBQyxlQUFlLEVBQUU7Z0JBQ3JCLE1BQU0sSUFBSSxnQ0FBYSxDQUFDLGtDQUFrQyxFQUFFO29CQUN4RCxlQUFlLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztpQkFDbEQsQ0FBQyxDQUFBO2FBQ0w7WUFDRCxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNoQixNQUFNLElBQUksRUFBRSxDQUFBO1lBRVosSUFBSSxvQkFBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7Z0JBQy9FLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixDQUFDLDhCQUFXLENBQUMsT0FBTyxFQUFFLDhCQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQTthQUM5RjtTQUVKO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFFWixLQUFLLEdBQUcsS0FBSyxJQUFJLElBQUksbUNBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUUzRCxJQUFJLGlCQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2pCLEtBQUssR0FBRyxJQUFJLG1DQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFBO2FBQ3RDO1lBQ0QsSUFBSSxDQUFDLGtCQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMzQixLQUFLLENBQUMsT0FBTyxHQUFHLDhCQUFXLENBQUMsV0FBVyxDQUFBO2FBQzFDO1lBQ0QsSUFBSSxDQUFDLGtCQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMzQixLQUFLLENBQUMsT0FBTyxHQUFHLDhCQUFXLENBQUMsYUFBYSxDQUFBO2FBQzVDO1lBQ0QsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxPQUFPLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssTUFBTSxFQUFFO2dCQUN6RCxHQUFHLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUM1SDtpQkFBTTtnQkFDSCxHQUFHLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDN0c7U0FDSjtJQUVMLENBQUMsQ0FBQTtBQUNMLENBQUM7QUEzQ0QsZ0RBMkNDIn0=