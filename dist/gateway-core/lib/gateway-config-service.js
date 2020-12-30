"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayConfigService = void 0;
const midway_1 = require("midway");
const lodash_1 = require("lodash");
let GatewayConfigService = class GatewayConfigService {
    constructor() {
        this._isSetGatewayInfo = false;
        this._routerMap = new Map();
        this._clientMap = new Map();
        this._routerPrefixGroup = new Map();
    }
    /**
     * 是否已设置路由配置
     */
    get isSetGatewayInfo() {
        return this._isSetGatewayInfo;
    }
    get latestUpdateDate() {
        return this._latestUpdateDate;
    }
    /**
     * 获取路由信息
     * @param routerId
     */
    getRouterInfo(routerId) {
        return lodash_1.cloneDeep(this._routerMap.get(routerId));
    }
    /**
     * 获取clientInfo
     * @param clientId
     */
    getClientInfo(clientId) {
        return lodash_1.cloneDeep(this._clientMap.get(clientId));
    }
    /**
     * 根据URL路由前缀获取路由分组信息
     * @param routerPrefix
     */
    getRouterListByPrefix(routerPrefix, httpMethod) {
        function filterHttpMethod(router) {
            return router.httpMethod.some(x => x.toUpperCase() === 'ALL' || x.toUpperCase() === httpMethod.toUpperCase());
        }
        return this._routerPrefixGroup.get(routerPrefix)?.filter(filterHttpMethod).map(lodash_1.cloneDeep) ?? [];
    }
    /**
     * 设置路由配置
     * @param routers
     * @param clientInfos
     * @param serverGroups
     * @param httpComponentHandleRules
     */
    setGatewayInfo(routers, clientInfos, serverGroups, httpComponentHandleRules) {
        if (![routers, clientInfos, serverGroups, httpComponentHandleRules].every(lodash_1.isArray)) {
            console.log('设置路由配置参数错误', routers, clientInfos, serverGroups, httpComponentHandleRules);
            return;
        }
        for (const router of routers) {
            router.httpComponentRules = [];
            for (const httpComponentRuleId of router.httpComponentRuleIds) {
                const httpComponentHandleRuleInfo = httpComponentHandleRules.find(x => x.ruleId === httpComponentRuleId);
                if (httpComponentHandleRuleInfo) {
                    router.httpComponentRules.push(httpComponentHandleRuleInfo);
                }
                else {
                    console.log('httpComponentRule not found,ruleId:' + httpComponentRuleId);
                    return false;
                }
            }
            router.routerPrefix = router.routerPrefix.toLowerCase();
            if (!router.upstream.serverGroupName) {
                continue;
            }
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
    refreshGatewayConfig(routers, clientInfos) {
        this._clientMap.clear();
        this._routerMap.clear();
        this._routerPrefixGroup.clear();
        for (const router of routers) {
            this._routerMap.set(router.routerId, router);
        }
        for (const clientInfo of clientInfos) {
            this._clientMap.set(clientInfo.clientId, clientInfo);
        }
        for (const [routerPrefix, routerGroup] of Object.entries(lodash_1.groupBy(routers, 'routerPrefix'))) {
            this._routerPrefixGroup.set(routerPrefix, routerGroup);
        }
        this._isSetGatewayInfo = true;
        this._latestUpdateDate = new Date();
        return true;
    }
};
GatewayConfigService = __decorate([
    midway_1.provide(),
    midway_1.scope(midway_1.ScopeEnum.Singleton)
], GatewayConfigService);
exports.GatewayConfigService = GatewayConfigService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZXdheS1jb25maWctc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9nYXRld2F5LWNvcmUvbGliL2dhdGV3YXktY29uZmlnLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbUNBQWlEO0FBQ2pELG1DQUFtRDtBQVFuRCxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQUFqQztRQUVZLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUVqQixlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQXNCLENBQUM7UUFDM0MsZUFBVSxHQUFHLElBQUksR0FBRyxFQUFzQixDQUFDO1FBQzNDLHVCQUFrQixHQUFHLElBQUksR0FBRyxFQUF3QixDQUFDO0lBK0cxRSxDQUFDO0lBN0dHOztPQUVHO0lBQ0gsSUFBSSxnQkFBZ0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUVELElBQUksZ0JBQWdCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxhQUFhLENBQUMsUUFBZ0I7UUFDMUIsT0FBTyxrQkFBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7T0FHRztJQUNILGFBQWEsQ0FBQyxRQUFnQjtRQUMxQixPQUFPLGtCQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gscUJBQXFCLENBQUMsWUFBb0IsRUFBRSxVQUFrQjtRQUUxRCxTQUFTLGdCQUFnQixDQUFDLE1BQWtCO1lBQ3hDLE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FB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