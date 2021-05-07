"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayErrorHandler = void 0;
const midway_1 = require("midway");
const egg_freelog_base_1 = require("egg-freelog-base");
let GatewayErrorHandler = class GatewayErrorHandler {
    /**
     * 未匹配到路由错误处理
     */
    routerNotMatchErrorHandle(ctx) {
        ctx.status = 404;
        throw new egg_freelog_base_1.GatewayRouterMatchError(`网关服务未能匹配到可用的路由,path(${ctx.method}:${ctx.path})`, {
            path: ctx.path, method: ctx.method
        });
    }
    /**
     * 组件调用异常处理
     * @param ctx
     * @param componentName
     * @param error
     */
    componentInvokingErrorHandle(ctx, componentName, error) {
        ctx.status = 500;
        throw new egg_freelog_base_1.GatewayComponentInvokingError('网关处理组件执行异常', { componentName, error: error.stack || error.message });
    }
    /**
     * 发起http代理请求异常
     * @param ctx
     * @param error
     */
    httpRequestProxyErrorHandle(ctx, error) {
        const { code, statusCode } = error;
        const msg = `上游服务器错误。${this.getHttpRequestProxyErrorMsg(code)}`;
        ctx.status = statusCode || 404;
        throw new egg_freelog_base_1.GatewayUpstreamApiError(msg, { code, statusCode, error: error.stack || error.message });
    }
    /**
     * http代理错误码对应的错误消息(后续可做i18n)
     * @param errorCode
     */
    getHttpRequestProxyErrorMsg(errorCode) {
        const codeMsgMap = {
            ETIMEDOU: '连接已经超时',
            ESOCKETTIMEDOUT: '连接已经超时',
            ECONNREFUSED: '不能连接到目标服务器',
            HTTPSTATUSCODEERROR: 'http状态码错误'
        };
        return codeMsgMap[errorCode] ?? '';
    }
};
GatewayErrorHandler = __decorate([
    midway_1.provide(),
    midway_1.scope(midway_1.ScopeEnum.Singleton)
], GatewayErrorHandler);
exports.GatewayErrorHandler = GatewayErrorHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZXdheS1lcnJvci1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dhdGV3YXktY29yZS9lcnJvci1oYW5kbGVyL2dhdGV3YXktZXJyb3ItaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxtQ0FBaUQ7QUFDakQsdURBSzBCO0FBSzFCLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBRTVCOztPQUVHO0lBQ0gseUJBQXlCLENBQUMsR0FBbUI7UUFDekMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDakIsTUFBTSxJQUFJLDBDQUF1QixDQUFDLHVCQUF1QixHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRTtZQUNoRixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07U0FDckMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsNEJBQTRCLENBQUMsR0FBbUIsRUFBRSxhQUFxQixFQUFFLEtBQVk7UUFDakYsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDakIsTUFBTSxJQUFJLGdEQUE2QixDQUFDLFlBQVksRUFBRSxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztJQUNoSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDJCQUEyQixDQUFDLEdBQW1CLEVBQUUsS0FBSztRQUVsRCxNQUFNLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQyxHQUFHLEtBQUssQ0FBQztRQUVqQyxNQUFNLEdBQUcsR0FBRyxXQUFXLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBRWhFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsVUFBVSxJQUFJLEdBQUcsQ0FBQztRQUUvQixNQUFNLElBQUksMENBQXVCLENBQUMsR0FBRyxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsMkJBQTJCLENBQUMsU0FBaUI7UUFDekMsTUFBTSxVQUFVLEdBQUc7WUFDZixRQUFRLEVBQUUsUUFBUTtZQUNsQixlQUFlLEVBQUUsUUFBUTtZQUN6QixZQUFZLEVBQUUsWUFBWTtZQUMxQixtQkFBbUIsRUFBRSxXQUFXO1NBQ25DLENBQUM7UUFDRixPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkMsQ0FBQztDQUNKLENBQUE7QUFwRFksbUJBQW1CO0lBRi9CLGdCQUFPLEVBQUU7SUFDVCxjQUFLLENBQUMsa0JBQVMsQ0FBQyxTQUFTLENBQUM7R0FDZCxtQkFBbUIsQ0FvRC9CO0FBcERZLGtEQUFtQiJ9