import {provide, scope, ScopeEnum} from 'midway';
import {
    GatewayRouterMatchError,
    GatewayComponentInvokingError,
    GatewayUpstreamApiError,
    FreelogContext
} from 'egg-freelog-base';
import {IGatewayErrorHandler} from '../../interface';

@provide()
@scope(ScopeEnum.Singleton)
export class GatewayErrorHandler implements IGatewayErrorHandler {

    /**
     * 未匹配到路由错误处理
     */
    routerNotMatchErrorHandle(ctx: FreelogContext) {
        ctx.status = 404;
        throw new GatewayRouterMatchError(`网关服务未能匹配到可用的路由,path(${ctx.method}:${ctx.path})`, {
            path: ctx.path, method: ctx.method
        });
    }

    /**
     * 组件调用异常处理
     * @param ctx
     * @param componentName
     * @param error
     */
    componentInvokingErrorHandle(ctx: FreelogContext, componentName: string, error: Error) {
        ctx.status = 500;
        throw new GatewayComponentInvokingError('网关处理组件执行异常', {componentName, error: error.stack || error.message});
    }

    /**
     * 发起http代理请求异常
     * @param ctx
     * @param error
     */
    httpRequestProxyErrorHandle(ctx: FreelogContext, error) {

        const {code, statusCode} = error;

        const msg = `上游服务器错误。${this.getHttpRequestProxyErrorMsg(code)}`;

        ctx.status = statusCode || 404;

        throw new GatewayUpstreamApiError(msg, {code, statusCode, error: error.stack || error.message});
    }

    /**
     * http代理错误码对应的错误消息(后续可做i18n)
     * @param errorCode
     */
    getHttpRequestProxyErrorMsg(errorCode: string) {
        const codeMsgMap = {
            ETIMEDOU: '连接已经超时',
            ESOCKETTIMEDOUT: '连接已经超时',
            ECONNREFUSED: '不能连接到目标服务器',
            HTTPSTATUSCODEERROR: 'http状态码错误'
        };
        return codeMsgMap[errorCode] ?? '';
    }
}
