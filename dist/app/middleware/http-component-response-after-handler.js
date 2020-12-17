"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const enum_1 = require("../../enum");
const egg_freelog_base_1 = require("egg-freelog-base");
class HttpComponentResponseAfterHandler {
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
     * @param comName
     * @param comConfig
     */
    async gatewayComponentInvokingHandle(ctx, comName, comConfig) {
        const gatewayErrorHandler = ctx.requestContext.get('gatewayErrorHandler');
        const gatewayComHandlerFactory = ctx.requestContext.get('gatewayComHandlerFactory');
        const comHandler = gatewayComHandlerFactory(comName);
        if (!comHandler) {
            gatewayErrorHandler.componentInvokingErrorHandle(ctx, comName, new egg_freelog_base_1.GatewayArgumentError(ctx.gettext('params-required-validate-failed', `comName:[${comName}]`)));
        }
        if (comHandler.comLevel !== enum_1.RouterComponentLevelEnum.ResponseAfter) {
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
function httpComponentRequestAfterHandlerMiddleware(_options, _app) {
    return new HttpComponentResponseAfterHandler();
}
exports.default = httpComponentRequestAfterHandlerMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jb21wb25lbnQtcmVzcG9uc2UtYWZ0ZXItaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvbWlkZGxld2FyZS9odHRwLWNvbXBvbmVudC1yZXNwb25zZS1hZnRlci1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQTREO0FBTTVELHFDQUFzRztBQUN0Ryx1REFNMEI7QUFHMUIsTUFBTSxpQ0FBaUM7SUFFbkM7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQW1CLEVBQUUsSUFBSTtRQUVoQyxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQXdCLENBQUM7UUFDNUQsS0FBSyxNQUFNLGlCQUFpQixJQUFJLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRTtZQUMzRCxNQUFNLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDNUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLG9DQUFvQyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2pGLENBQUMsQ0FBQyxDQUFBO1NBQ0w7UUFDRCxNQUFNLElBQUksRUFBRSxDQUFBO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGtDQUFrQyxDQUFDLEdBQW1CLEVBQUUsT0FBMEMsRUFBRSxTQUFrQixFQUFFLFVBQW1CLEtBQUs7UUFFbEosSUFBSSxnQkFBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFBRTtZQUN4QixPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsS0FBSyxNQUFNLGFBQWEsSUFBSSxPQUFPLEVBQUU7WUFDakMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksaUJBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDekIsT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLDhCQUE4QixDQUFDLEdBQUcsRUFBRSxhQUF3QyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ2pIO2lCQUFNLElBQUksaUJBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDaEMsT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLG9DQUFvQyxDQUFDLEdBQUcsRUFBRSxhQUF1QixFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3RHO2lCQUFNLElBQUksZ0JBQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDL0IsT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtDQUFrQyxDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ25HO1lBQ0QsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ3JCLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBQ0QsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLEVBQUU7Z0JBQ3JCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUVELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLEdBQW1CLEVBQUUsZUFBc0MsRUFBRSxTQUFTO1FBRTdHLEtBQUssTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQy9ELFFBQVEsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUM1QixLQUFLLE1BQU07b0JBQ1AsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsa0NBQWtDLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2hHLElBQUksQ0FBQyxVQUFVLEVBQUU7d0JBQ2IsT0FBTyxLQUFLLENBQUM7cUJBQ2hCO29CQUNELFNBQVM7Z0JBQ2IsS0FBSyxRQUFRO29CQUNULE1BQU0sWUFBWSxHQUFHLE1BQU0sSUFBSSxDQUFDLGtDQUFrQyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNuRyxJQUFJLENBQUMsWUFBWSxFQUFFO3dCQUNmLE9BQU8sS0FBSyxDQUFDO3FCQUNoQjtvQkFDRCxTQUFTO2dCQUNiO29CQUNJLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBQ3pDLE9BQU8sS0FBSyxDQUFDO2FBQ3BCO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxHQUFtQixFQUFFLE9BQWdDLEVBQUUsU0FBa0I7UUFFMUcsTUFBTSxtQkFBbUIsR0FBeUIsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNoRyxNQUFNLHdCQUF3QixHQUFrRSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO1FBQ2xKLE1BQU0sVUFBVSxHQUFHLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJELElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDYixtQkFBbUIsQ0FBQyw0QkFBNEIsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksdUNBQW9CLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsRUFBRSxZQUFZLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BLO1FBQ0QsSUFBSSxVQUFVLENBQUMsUUFBUSxLQUFLLCtCQUF3QixDQUFDLGFBQWEsRUFBRTtZQUNoRSxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzRSxtQkFBbUIsQ0FBQyw0QkFBNEIsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FBMkIsQ0FBQztRQUU3QixHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRS9ELE9BQU8sZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNILG9DQUFvQyxDQUFDLEdBQW1CLEVBQUUsdUJBQWdEO1FBRXRHLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxXQUF5QyxDQUFDO1FBRWxFLE1BQU0sSUFBSSxHQUFHO1lBQ1QsT0FBTyxFQUFFLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUTtZQUN4QyxrQkFBa0IsRUFBRSx1QkFBdUIsQ0FBQyxrQkFBa0I7WUFDOUQsdUJBQXVCLEVBQUUsV0FBVyxDQUFDLHVCQUF1QjtTQUMvRCxDQUFDO1FBRUYsTUFBTSxzQkFBc0IsR0FBRyxXQUFXLENBQUMsdUJBQXVCLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFeEcsMkJBQTJCO1FBQzNCLElBQUksc0JBQXNCLENBQUMsT0FBTyxLQUFLLDhCQUF1QixDQUFDLGNBQWMsRUFBRTtZQUMzRSxNQUFNLElBQUksNkNBQTBCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQ3JEO1FBRUQsTUFBTSxJQUFJLDRDQUF5QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0NBQ0o7QUFFRCxTQUF3QiwwQ0FBMEMsQ0FBQyxRQUF1QixFQUFFLElBQXdCO0lBQ2hILE9BQU8sSUFBSSxpQ0FBaUMsRUFBRSxDQUFDO0FBQ25ELENBQUM7QUFGRCw2REFFQyJ9