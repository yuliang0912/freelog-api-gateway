import { ClientInfo, HttpComponentHandleRule, IGatewayConfigService, IGatewayService, RouterInfo, ServerGroupInfo } from "../../interface";
export declare class GatewayService implements IGatewayService {
    apiRouterProvider: any;
    clientInfoProvider: any;
    serverGroupProvider: any;
    httpComponentHandleRuleProvider: any;
    gatewayConfigService: IGatewayConfigService;
    updateRouterConfig(): Promise<boolean>;
    findRouters(condition: object): Promise<RouterInfo[]>;
    findClients(condition: object): Promise<ClientInfo[]>;
    findServerGroups(condition: object): Promise<ServerGroupInfo[]>;
    findHttpComponentHandleRules(condition: object): Promise<HttpComponentHandleRule[]>;
    toObjects(target: object | object[]): any;
}
