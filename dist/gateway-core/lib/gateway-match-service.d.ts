import { IGatewayMatchService, RouterInfo } from '../../interface';
export declare class GatewayMatchService implements IGatewayMatchService {
    readonly customParamRegExp: RegExp;
    /**
     * 从路由分组中匹配出最佳路由信息
     * @param routerList
     * @param urlPath
     * @param httpMethod
     */
    matchRouter(routerList: RouterInfo[], urlPath: string, httpMethod: string): RouterInfo;
    /**
     * 生成上游URL地址
     * @param routerInfo
     * @param url
     */
    generateUpstreamRouterUrl(routerInfo: RouterInfo, url: string): string;
}
