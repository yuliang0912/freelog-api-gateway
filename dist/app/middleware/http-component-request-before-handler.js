"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const enum_1 = require("../../enum");
const egg_freelog_base_1 = require("egg-freelog-base");
class HttpComponentRequestBeforeHandler {
    constructor() {
        return this.main.bind(this);
    }
    async main(ctx, next) {
        const routerInfo = ctx.gatewayInfo.routerInfo;
        for (const httpComponentRule of routerInfo.httpComponentRules) {
            await this.recursionInvokingGatewayComponents(ctx, httpComponentRule.httpComponentRules, httpComponentRule.componentConfig, true).then(result => {
                !result && this.gatewayComponentResponseFailedHandle(ctx, httpComponentRule);
            });
        }
        await next();
    }
    /**
     * 递归分析组件调用逻辑并且执行组件调用
     * @param ctx
     * @param comList
     * @param comConfig
     * @param isEvery
     */
    async recursionInvokingGatewayComponents(ctx, comList, comConfig, isEvery = false) {
        if (lodash_1.isEmpty(comList ?? [])) {
            return true;
        }
        for (const componentRule of comList) {
            let currRet = null;
            if (lodash_1.isString(componentRule)) {
                currRet = await this.gatewayComponentInvokingHandle(ctx, componentRule, comConfig);
            }
            else if (lodash_1.isObject(componentRule)) {
                currRet = await this.objectComRuleConditionAnalysisHandle(ctx, componentRule, comConfig);
            }
            else if (lodash_1.isArray(componentRule)) {
                currRet = await this.recursionInvokingGatewayComponents(ctx, componentRule, comConfig, isEvery);
            }
            if (isEvery && !currRet) {
                return false;
            }
            if (!isEvery && currRet) {
                return true;
            }
        }
        return Boolean(isEvery);
    }
    /**
     * object类型的调用逻辑操作解析并且执行组件调用
     * @param ctx
     * @param objectCondition
     * @param comConfig
     */
    async objectComRuleConditionAnalysisHandle(ctx, objectCondition, comConfig) {
        for (const [operator, comList] of Object.entries(objectCondition)) {
            switch (operator.toLowerCase()) {
                case 'must':
                    const mustResult = await this.recursionInvokingGatewayComponents(ctx, comList, comConfig, true);
                    if (!mustResult) {
                        return false;
                    }
                    continue;
                case 'should':
                    const shouldResult = await this.recursionInvokingGatewayComponents(ctx, comList, comConfig, false);
                    if (!shouldResult) {
                        return false;
                    }
                    continue;
                default:
                    console.warn(`不被支持的逻辑操作关键字:${operator}`);
                    return false;
            }
        }
        return true;
    }
    /**
     * 实际执行代理组件调用
     * @param ctx
     * @param comName
     * @param comConfig
     */
    async gatewayComponentInvokingHandle(ctx, comName, comConfig) {
        const gatewayErrorHandler = ctx.requestContext.get('gatewayErrorHandler');
        const gatewayComHandlerFactory = ctx.requestContext.get('gatewayComHandlerFactory');
        const comHandler = gatewayComHandlerFactory(comName);
        // const comHandler = ctx.requestContext.get(`gateway_com_${comName}`)
        if (!comHandler) {
            gatewayErrorHandler.componentInvokingErrorHandle(ctx, comName, new egg_freelog_base_1.GatewayArgumentError(ctx.gettext('params-required-validate-failed', `comName:[${comName}]`)));
        }
        if (comHandler.comLevel !== enum_1.RouterComponentLevelEnum.RequestBefore) {
            return true;
        }
        const comHandlerResult = await comHandler.handle(ctx, comConfig).catch(error => {
            gatewayErrorHandler.componentInvokingErrorHandle(ctx, comName, error);
        });
        ctx.gatewayInfo.componentProcessResults.push(comHandlerResult);
        return comHandlerResult.handleResult;
    }
    /**
     * 组件处理不通过
     */
    gatewayComponentResponseFailedHandle(ctx, httpComponentHandleRule) {
        const gatewayInfo = ctx.gatewayInfo;
        const data = {
            routeId: gatewayInfo.routerInfo.routerId,
            httpComponentRules: httpComponentHandleRule.httpComponentRules,
            componentProcessResults: gatewayInfo.componentProcessResults
        };
        const lastHandleFailedResult = gatewayInfo.componentProcessResults.reverse().find(x => !x.handleResult);
        //目前只有认证与授权.后续如果有流量限制熔断等再拓展
        if (lastHandleFailedResult.comType === enum_1.RouterComponentTypeEnum.Authentication) {
            throw new egg_freelog_base_1.GatewayAuthenticationError('认证失败', data);
        }
        throw new egg_freelog_base_1.GatewayAuthorizationError('授权失败', data);
    }
}
function httpComponentRequestBeforeHandlerMiddleware(_options, _app) {
    return new HttpComponentRequestBeforeHandler();
}
exports.default = httpComponentRequestBeforeHandlerMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jb21wb25lbnQtcmVxdWVzdC1iZWZvcmUtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvbWlkZGxld2FyZS9odHRwLWNvbXBvbmVudC1yZXF1ZXN0LWJlZm9yZS1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQTREO0FBTzVELHFDQUFzRztBQUN0Ryx1REFNMEI7QUFFMUIsTUFBTSxpQ0FBaUM7SUFFbkM7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQW1CLEVBQUUsSUFBSTtRQUNoQyxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQXdCLENBQUM7UUFDNUQsS0FBSyxNQUFNLGlCQUFpQixJQUFJLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRTtZQUMzRCxNQUFNLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDNUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLG9DQUFvQyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2pGLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxNQUFNLElBQUksRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsa0NBQWtDLENBQUMsR0FBbUIsRUFBRSxPQUEwQyxFQUFFLFNBQWtCLEVBQUUsVUFBbUIsS0FBSztRQUVsSixJQUFJLGdCQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxLQUFLLE1BQU0sYUFBYSxJ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