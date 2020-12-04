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
     * @param httpComponentRules
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
                    break;
                case 'should':
                    const shouldResult = await this.recursionInvokingGatewayComponents(ctx, comList, comConfig, false);
                    if (!shouldResult) {
                        return false;
                    }
                    break;
                default:
                    console.warn(`不被支持的逻辑操作关键字:${operator}`);
                    break;
            }
            return true;
        }
    }
    /**
     * 实际执行代理组件调用
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
            throw new egg_freelog_base_1.GatewayAuthenticationError("认证失败", data);
        }
        throw new egg_freelog_base_1.GatewayAuthorizationError("授权失败", data);
    }
}
function httpComponentRequestBeforeHandlerMiddleware(_options, _app) {
    return new HttpComponentRequestBeforeHandler();
}
exports.default = httpComponentRequestBeforeHandlerMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jb21wb25lbnQtcmVxdWVzdC1iZWZvcmUtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvbWlkZGxld2FyZS9odHRwLWNvbXBvbmVudC1yZXF1ZXN0LWJlZm9yZS1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQTREO0FBTzVELHFDQUFzRztBQUN0Ryx1REFNMEI7QUFHMUIsTUFBTSxpQ0FBaUM7SUFFbkM7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQW1CLEVBQUUsSUFBSTtRQUVoQyxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQXdCLENBQUM7UUFDNUQsS0FBSyxNQUFNLGlCQUFpQixJQUFJLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRTtZQUMzRCxNQUFNLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDNUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLG9DQUFvQyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2pGLENBQUMsQ0FBQyxDQUFBO1NBQ0w7UUFDRCxNQUFNLElBQUksRUFBRSxDQUFBO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGtDQUFrQyxDQUFDLEdBQW1CLEVBQUUsT0FBMEMsRUFBRSxTQUFrQixFQUFFLFVBQW1CLEtBQUs7UUFFbEosSUFBSSxnQkFBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFBRTtZQUN4QixPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsS0FBSyxNQUFNLGFBQWEsSUFB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