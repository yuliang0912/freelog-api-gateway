import { Context } from 'midway';
import { IHttpRequestProxy, UpstreamInfo } from '../../interface';
export declare class AxiosProxy implements IHttpRequestProxy {
    /**
     * httpClient请求处理
     * @param ctx
     * @param upstreamRouterInfo
     * @returns {Promise<any>}
     */
    httpProxy(ctx: Context, upstreamRouterInfo: UpstreamInfo): Promise<void>;
    _httpRequest(ctx: Context, options: any): Promise<void>;
}
