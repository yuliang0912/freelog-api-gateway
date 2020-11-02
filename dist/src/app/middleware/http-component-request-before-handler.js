"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const enum_1 = require("../../../enum");
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
module.exports = (option) => {
    return new HttpComponentRequestBeforeHandler();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jb21wb25lbnQtcmVxdWVzdC1iZWZvcmUtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvbWlkZGxld2FyZS9odHRwLWNvbXBvbmVudC1yZXF1ZXN0LWJlZm9yZS1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUNBQTREO0FBTzVELHdDQUF5RztBQUN6Ryx1REFBNkc7QUFHN0csTUFBTSxpQ0FBaUM7SUFFbkM7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJO1FBRWhCLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBd0IsQ0FBQztRQUM1RCxLQUFLLE1BQU0saUJBQWlCLElBQUksVUFBVSxDQUFDLGtCQUFrQixFQUFFO1lBQzNELE1BQU0sSUFBSSxDQUFDLGtDQUFrQyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRSxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUM1SSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsb0NBQW9DLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDakYsQ0FBQyxDQUFDLENBQUE7U0FDTDtRQUNELE1BQU0sSUFBSSxFQUFFLENBQUE7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsa0NBQWtDLENBQUMsR0FBWSxFQUFFLE9BQTBDLEVBQUUsU0FBa0IsRUFBRSxVQUFtQixLQUFLO1FBRTNJLElBQUksZ0JBQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLEVBQUU7WUFDeEIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUVELEtBQUssTUFBTSxhQUFhLElB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