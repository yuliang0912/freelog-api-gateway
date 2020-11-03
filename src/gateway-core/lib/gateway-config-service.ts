import {scope, provide, ScopeEnum} from 'midway';
import {isArray, cloneDeep, groupBy} from 'lodash';
import {
    ClientInfo, HttpComponentHandleRule,
    IGatewayConfigService, RouterInfo, ServerGroupInfo
} from "../../interface";

@provide()
@scope(ScopeEnum.Singleton)
export class GatewayConfigService implements IGatewayConfigService {

    private _isSetGatewayInfo = false;
    private _latestUpdateDate;
    private readonly _routerMap = new Map<string, RouterInfo>();
    private readonly _clientMap = new Map<string, ClientInfo>();
    private readonly _routerPrefixGroup = new Map<string, RouterInfo[]>();

    /**
     * 是否已设置路由配置
     */
    get isSetGatewayInfo(): boolean {
        return this._isSetGatewayInfo;
    }

    get latestUpdateDate() {
        return this._latestUpdateDate;
    }

    /**
     * 获取路由信息
     * @param routerId
     */
    getRouterInfo(routerId: string): RouterInfo {
        return cloneDeep(this._routerMap.get(routerId));
    }

    /**
     * 获取clientInfo
     * @param clientId
     */
    getClientInfo(clientId: string): ClientInfo {
        return cloneDeep(this._clientMap.get(clientId));
    }

    /**
     * 根据URL路由前缀获取路由分组信息
     * @param routerPrefix
     */
    getRouterListByPrefix(routerPrefix: string, httpMethod: string): RouterInfo[] {

        function filterHttpMethod(router: RouterInfo): boolean {
            return router.httpMethod.some(x => x.toUpperCase() === 'ALL' || x.toUpperCase() === httpMethod.toUpperCase())
        }

        return this._routerPrefixGroup.get(routerPrefix)?.filter(filterHttpMethod).map(cloneDeep) ?? [];
    }

    /**
     * 设置路由配置
     * @param routers
     * @param clientInfos
     * @param serverGroups
     * @param httpComponentHandleRules
     */
    setGatewayInfo(routers: RouterInfo[], clientInfos: ClientInfo[], serverGroups: ServerGroupInfo[], httpComponentHandleRules: HttpComponentHandleRule[]): boolean {

        if (![routers, clientInfos, serverGroups, httpComponentHandleRules].every(isArray)) {
            console.log('设置路由配置参数错误', routers, clientInfos, serverGroups, httpComponentHandleRules);
            return;
        }

        for (const router of routers) {
            router.httpComponentRules = [];
            for (const httpComponentRuleId of router.httpComponentRuleIds) {
                const httpComponentHandleRuleInfo = httpComponentHandleRules.find(x => x.ruleId === httpComponentRuleId);
                if (httpComponentHandleRuleInfo) {
                    router.httpComponentRules.push(httpComponentHandleRuleInfo);
                } else {
                    console.log('httpComponentRule not found,ruleId:' + httpComponentRuleId);
                    return false;
                }

            }
            router.routerPrefix = router.routerPrefix.toLowerCase();
            router.upstream.serverGroupInfo = serverGroups.find(x => x.groupName === router.upstream.serverGroupName);
            if (!router.upstream.serverGroupInfo) {
                console.log('serverGroup not found,serverGroupName:' + router.upstream.serverGroupName);
                return false;
            }
            if (!router.upstream.serverGroupInfo.servers?.some(x => x.status === 1)) {
                console.log('no servers are available', router.upstream.serverGroupInfo.servers);
                return false;
            }
        }

        return this.refreshGatewayConfig(routers, clientInfos);
    }

    /**
     * 数据正式写入到路由配置中
     * @param routers
     * @param clientInfos
     */
    refreshGatewayConfig(routers: RouterInfo[], clientInfos: ClientInfo[]): boolean {

        this._clientMap.clear();
        this._routerMap.clear();
        this._routerPrefixGroup.clear();

        for (const router of routers) {
            this._routerMap.set(router.routerId, router);
        }
        for (const clientInfo of clientInfos) {
            this._clientMap.set(clientInfo.clientId, clientInfo)
        }
        for (const [routerPrefix, routerGroup] of Object.entries(groupBy(routers, 'routerPrefix'))) {
            this._routerPrefixGroup.set(routerPrefix, routerGroup);
        }
        this._isSetGatewayInfo = true;
        this._latestUpdateDate = new Date();

        return true;
    }
}
