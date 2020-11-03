import { ClientInfo, HttpComponentHandleRule, IGatewayConfigService, RouterInfo, ServerGroupInfo } from "../../interface";
export declare class GatewayConfigService implements IGatewayConfigService {
    private _isSetGatewayInfo;
    private _latestUpdateDate;
    private readonly _routerMap;
    private readonly _clientMap;
    private readonly _routerPrefixGroup;
    /**
     * 是否已设置路由配置
     */
    get isSetGatewayInfo(): boolean;
    get latestUpdateDate(): any;
    /**
     * 获取路由信息
     * @param routerId
     */
    getRouterInfo(routerId: string): RouterInfo;
    /**
     * 获取clientInfo
     * @param clientId
     */
    getClientInfo(clientId: string): ClientInfo;
    /**
     * 根据URL路由前缀获取路由分组信息
     * @param routerPrefix
     */
    getRouterListByPrefix(routerPrefix: string, httpMethod: string): RouterInfo[];
    /**
     * 设置路由配置
     * @param routers
     * @param clientInfos
     * @param serverGroups
     * @param httpComponentHandleRules
     */
    setGatewayInfo(routers: RouterInfo[], clientInfos: ClientInfo[], serverGroups: ServerGroupInfo[], httpComponentHandleRules: HttpComponentHandleRule[]): boolean;
    /**
     * 数据正式写入到路由配置中
     * @param routers
     * @param clientInfos
     */
    refreshGatewayConfig(routers: RouterInfo[], clientInfos: ClientInfo[]): boolean;
}
