import {isArray} from 'lodash';
import {inject, provide, scope, ScopeEnum} from 'midway';
import {
    ClientInfo, HttpComponentHandleRule,
    IGatewayConfigService, IGatewayService, RouterInfo, ServerGroupInfo
} from "../../../interface";

@provide()
@scope(ScopeEnum.Singleton)
export class GatewayService implements IGatewayService {

    @inject()
    apiRouterProvider;
    @inject()
    clientInfoProvider;
    @inject()
    serverGroupProvider;
    @inject()
    httpComponentHandleRuleProvider;
    @inject()
    gatewayConfigService: IGatewayConfigService;

    async updateRouterConfig(): Promise<boolean> {

        const condition = {status: 1};
        const routerTask = this.findRouters(condition);
        const clientTask = this.findClients(condition);
        const serverGroupTask = this.findServerGroups(condition);
        const httpComponentHandleRuleTask = this.findHttpComponentHandleRules(condition);

        const [routers, clients, serverGroups, httpComponentHandleRules] = await Promise.all([routerTask, clientTask, serverGroupTask, httpComponentHandleRuleTask]);

        const routerList = this.toObjects(routers) as RouterInfo[];
        const clientList = this.toObjects(clients) as ClientInfo[];
        const serverGroupList = this.toObjects(serverGroups) as ServerGroupInfo[];
        const httpComponentHandleRuleList = this.toObjects(httpComponentHandleRules) as HttpComponentHandleRule[];

        return this.gatewayConfigService.setGatewayInfo(routerList, clientList, serverGroupList, httpComponentHandleRuleList);
    }

    async findRouters(condition: object): Promise<RouterInfo[]> {
        return this.apiRouterProvider.find(condition);
    }

    async findClients(condition: object): Promise<ClientInfo[]> {
        return this.clientInfoProvider.find(condition);
    }

    async findServerGroups(condition: object): Promise<ServerGroupInfo[]> {
        return this.serverGroupProvider.find(condition);
    }

    async findHttpComponentHandleRules(condition: object): Promise<HttpComponentHandleRule[]> {
        return this.httpComponentHandleRuleProvider.find(condition);
    }

    toObjects(target: object | object[]) {
        if (isArray(target)) {
            return target.map(x => (<any>x).toObject())
        }
        return (<any>target)?.toObject();
    }
}