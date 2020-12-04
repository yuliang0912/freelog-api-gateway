import { MongodbOperation } from 'egg-freelog-base';
import { ClientInfo, HttpComponentHandleRule, IGatewayConfigService, IGatewayService, RouterInfo, ServerGroupInfo } from "../../interface";
export declare class GatewayService implements IGatewayService {
    gatewayConfigService: IGatewayConfigService;
    apiRouterProvider: MongodbOperation<RouterInfo>;
    clientInfoProvider: MongodbOperation<ClientInfo>;
    serverGroupProvider: MongodbOperation<ServerGroupInfo>;
    httpComponentHandleRuleProvider: MongodbOperation<HttpComponentHandleRule>;
    updateRouterConfig(): Promise<boolean>;
    findRouters(condition: object): Promise<RouterInfo[]>;
    findClients(condition: object): Promise<ClientInfo[]>;
    findServerGroups(condition: object): Promise<ServerGroupInfo[]>;
    findHttpComponentHandleRules(condition: object): Promise<HttpComponentHandleRule[]>;
    toObjects(target: object | object[]): any;
}
