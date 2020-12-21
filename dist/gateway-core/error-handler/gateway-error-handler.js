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
     * @param componentName
     * @param error
     */
    componentInvokingErrorHandle(ctx, componentName, error) {
        ctx.status = 500;
        throw new egg_freelog_base_1.GatewayComponentInvokingError('网关处理组件执行异常', { componentName, error: error.stack || error.message });
    }
    /**
     * 发起http代理请求异常
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
            ETIMEDOU: "连接已经超时",
            ESOCKETTIMEDOUT: "连接已经超时",
            ECONNREFUSED: "不能连接到目标服务器",
            HTTPSTATUSCODEERROR: "http状态码错误"
        };
        return codeMsgMap[errorCode] ?? '';
    }
};
GatewayErrorHandler = __decorate([
    midway_1.provide(),
    midway_1.scope(midway_1.ScopeEnum.Singleton)
], GatewayErrorHandler);
exports.GatewayErrorHandler = GatewayErrorHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZXdheS1lcnJvci1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2dhdGV3YXktY29yZS9lcnJvci1oYW5kbGVyL2dhdGV3YXktZXJyb3ItaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxtQ0FBZ0Q7QUFDaEQsdURBS3lCO0FBS3pCLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBRTVCOztPQUVHO0lBQ0gseUJBQXlCLENBQUMsR0FBbUI7UUFDekMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDakIsTUFBTSxJQUFJLDBDQUF1QixDQUFDLHVCQUF1QixHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRTtZQUNoRixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07U0FDckMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw0QkFBNEIsQ0FBQyxHQUFtQixFQUFFLGFBQXFCLEVBQUUsS0FBWTtRQUNqRixHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNqQixNQUFNLElBQUksZ0RBQTZCLENBQUMsWUFBWSxFQUFFLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO0lBQ2hILENBQUM7SUFFRDs7O09BR0c7SUFDSCwyQkFBMkIsQ0FBQyxHQUFtQixFQUFFLEtBQUs7UUFFbEQsTUFBTSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUMsR0FBRyxLQUFLLENBQUE7UUFFaEMsTUFBTSxHQUFHLEdBQUcsV0FBVyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUVoRSxHQUFHLENBQUMsTUFBTSxHQUFHLFVBQVUsSUFBSSxHQUFHLENBQUM7UUFFL0IsTUFBTSxJQUFJLDBDQUF1QixDQUFDLEdBQUcsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUE7SUFDbkcsQ0FBQztJQUVEOzs7T0FHRztJQUNILDJCQUEyQixDQUFDLFNBQWlCO1FBQ3pDLE1BQU0sVUFBVSxHQUFHO1lBQ2YsUUFBUSxFQUFFLFFBQVE7WUFDbEIsZUFBZSxFQUFFLFFBQVE7WUFDekIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsbUJBQW1CLEVBQUUsV0FBVztTQUNuQyxDQUFDO1FBQ0YsT0FBTyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Q0FDSixDQUFBO0FBbERZLG1CQUFtQjtJQUYvQixnQkFBTyxFQUFFO0lBQ1QsY0FBSyxDQUFDLGtCQUFTLENBQUMsU0FBUyxDQUFDO0dBQ2QsbUJBQW1CLENBa0QvQjtBQWxEWSxrREFBbUIifQ==