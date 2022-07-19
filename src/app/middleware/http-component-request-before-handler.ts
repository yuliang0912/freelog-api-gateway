import {isArray, isEmpty, isObject, isString} from 'lodash';
import {
    HttpComponentHandleRule, HttpComponentRuleInfo,
    ICommonComponentHandler,
    IComponentHandleResult,
    IGatewayErrorHandler, IRequestContextGatewayInfo, RouterInfo
} from '../../interface';
import {RouterComponentLevelEnum, RouterComponentNameEnum, RouterComponentTypeEnum} from '../../enum';
import {
    FreelogApplication,
    FreelogContext,
    GatewayArgumentError,
    GatewayAuthenticationError,
    GatewayAuthorizationError
} from 'egg-freelog-base';

class HttpComponentRequestBeforeHandler {

    constructor() {
        return this.main.bind(this);
    }

    async main(ctx: FreelogContext, next) {
        const routerInfo = ctx.gatewayInfo.routerInfo as RouterInfo;
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
    async recursionInvokingGatewayComponents(ctx: FreelogContext, comList: Array<string | string[] | object>, comConfig?: object, isEvery: boolean = false) {

        if (isEmpty(comList ?? [])) {
            return true;
        }

        for (const componentRule of comList) {
            let currRet = null;
            if (isString(componentRule)) {
                currRet = await this.gatewayComponentInvokingHandle(ctx, componentRule as RouterComponentNameEnum, comConfig);
            } else if (isObject(componentRule)) {
                currRet = await this.objectComRuleConditionAnalysisHandle(ctx, componentRule as object, comConfig);
            } else if (isArray(componentRule)) {
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
    async objectComRuleConditionAnalysisHandle(ctx: FreelogContext, objectCondition: HttpComponentRuleInfo, comConfig): Promise<boolean> {

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
    async gatewayComponentInvokingHandle(ctx: FreelogContext, comName: RouterComponentNameEnum, comConfig?: object): Promise<boolean> {

        const gatewayErrorHandler: IGatewayErrorHandler = ctx.requestContext.get('gatewayErrorHandler');
        const gatewayComHandlerFactory: (comName: RouterComponentNameEnum) => ICommonComponentHandler = ctx.requestContext.get('gatewayComHandlerFactory');
        const comHandler = gatewayComHandlerFactory(comName);
        // const comHandler = ctx.requestContext.get(`gateway_com_${comName}`)

        if (!comHandler) {
            gatewayErrorHandler.componentInvokingErrorHandle(ctx, comName, new GatewayArgumentError(ctx.gettext('params-required-validate-failed', `comName:[${comName}]`)));
        }
        if (comHandler.comLevel !== RouterComponentLevelEnum.RequestBefore) {
            return true;
        }

        const comHandlerResult = await comHandler.handle(ctx, comConfig).catch(error => {
            gatewayErrorHandler.componentInvokingErrorHandle(ctx, comName, error);
        }) as IComponentHandleResult;

        ctx.gatewayInfo.componentProcessResults.push(comHandlerResult);

        return comHandlerResult.handleResult;
    }

    /**
     * 组件处理不通过
     */
    gatewayComponentResponseFailedHandle(ctx: FreelogContext, httpComponentHandleRule: HttpComponentHandleRule): void {

        const gatewayInfo = ctx.gatewayInfo as IRequestContextGatewayInfo;

        const data = {
            routeId: gatewayInfo.routerInfo.routerId,
            httpComponentRules: httpComponentHandleRule.httpComponentRules,
            componentProcessResults: gatewayInfo.componentProcessResults
        };

        const lastHandleFailedResult = gatewayInfo.componentProcessResults.reverse().find(x => !x.handleResult);

        //目前只有认证与授权.后续如果有流量限制熔断等再拓展
        if (lastHandleFailedResult.comType === RouterComponentTypeEnum.Authentication) {
            throw new GatewayAuthenticationError('认证失败', data);
        }

        throw new GatewayAuthorizationError('授权失败', data);
    }
}

export default function httpComponentRequestBeforeHandlerMiddleware(_options: object | null, _app: FreelogApplication): any {
    return new HttpComponentRequestBeforeHandler();
}
