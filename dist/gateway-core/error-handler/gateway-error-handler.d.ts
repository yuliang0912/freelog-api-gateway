import { FreelogContext } from 'egg-freelog-base';
import { IGatewayErrorHandler } from "../../interface";
export declare class GatewayErrorHandler implements IGatewayErrorHandler {
    /**
     * 未匹配到路由错误处理
     */
    routerNotMatchErrorHandle(ctx: FreelogContext): void;
    /**
     * 组件调用异常处理
     * @param componentName
     * @param error
     */
    componentInvokingErrorHandle(ctx: FreelogContext, componentName: string, error: Error): void;
    /**
     * 发起http代理请求异常
     * @param error
     */
    httpRequestProxyErrorHandle(ctx: FreelogContext, error: any): void;
    /**
     * http代理错误码对应的错误消息(后续可做i18n)
     * @param errorCode
     */
    getHttpRequestProxyErrorMsg(errorCode: string): any;
}
