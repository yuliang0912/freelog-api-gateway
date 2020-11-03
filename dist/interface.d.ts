import { Context } from "midway";
import { RouterComponentLevelEnum, RouterComponentNameEnum, RouterComponentTypeEnum } from "./enum";
export interface UpstreamInfo {
    serverGroupName: string;
    serverGroupInfo?: ServerGroupInfo;
    protocol: string;
    port: number;
    forwardUriScheme: string;
    method: string | null;
    forwardUrl?: string;
}
export interface HttpComponentRuleInfo {
    must?: string[];
    should?: string[];
}
export interface RouterInfo {
    routerId: string;
    routerPrefix: string;
    routerUrlRule: string;
    upstream: UpstreamInfo;
    httpMethod: string[];
    httpComponentRuleIds: string[];
    httpComponentRules?: HttpComponentHandleRule[];
    customParamsMap?: Map<string, string>;
    routerSchemes?: string[];
    mockStatus: 0 | 1;
    status: 0 | 1;
}
export interface HttpComponentHandleRule {
    ruleId: string;
    ruleName: string;
    httpComponentRules: (string | HttpComponentRuleInfo)[];
    componentConfig?: object;
    status: 0 | 1;
}
export interface ClientInfo {
    clientId: string;
    clientName: string;
    publicKey: string;
    privateKey: string;
    status: 0 | 1;
}
export interface ServerInfo {
    serverName: string;
    serverIp: string;
    weightCoefficient: number;
    status: 0 | 1;
}
export interface ServerGroupInfo {
    groupName: string;
    servers: ServerInfo[];
    status: 0 | 1;
}
/**
 * 读取或更新内存中的路由配置数据,单例模式
 */
export interface IGatewayConfigService {
    latestUpdateDate: Date | null;
    isSetGatewayInfo: boolean;
    getRouterInfo(routerId: string): RouterInfo;
    getClientInfo(clientId: string): ClientInfo;
    getRouterListByPrefix(routerPrefix: string, httpMethod: string): RouterInfo[];
    setGatewayInfo(routers: RouterInfo[], clientInfos: ClientInfo[], serverGroups: ServerGroupInfo[], httpComponentHandleRules: HttpComponentHandleRule[]): boolean;
}
/**
 * 读取原始DB数据
 */
export interface IGatewayService {
    updateRouterConfig(): Promise<boolean>;
    findRouters(condition: object): Promise<RouterInfo[]>;
    findClients(condition: object): Promise<ClientInfo[]>;
    findServerGroups(condition: object): Promise<ServerGroupInfo[]>;
    findHttpComponentHandleRules(condition: object): Promise<HttpComponentHandleRule[]>;
}
export interface IGatewayMatchService {
    matchRouter(routerList: RouterInfo[], urlPath: string, httpMethod: string): RouterInfo;
    generateUpstreamRouterUrl(routerInfo: RouterInfo, url: string): string;
}
export interface IGatewayErrorHandler {
    routerNotMatchErrorHandle(ctx: Context): void;
    componentInvokingErrorHandle(ctx: Context, componentName: string, error: Error): void;
    httpRequestProxyErrorHandle(ctx: Context, error: any): void;
}
export interface IGatewayComponentHandler {
    componentHandle(comName: string, comLevel: RouterComponentLevelEnum, comConfig?: object): Promise<any>;
}
export interface ICommonComponentHandler {
    comName: RouterComponentNameEnum;
    comType: RouterComponentTypeEnum;
    comLevel: RouterComponentLevelEnum;
    handle(ctx: Context, config?: object): Promise<IComponentHandleResult>;
}
export interface IComponentHandleResult {
    comName: string;
    comType: RouterComponentTypeEnum;
    handleResult: boolean;
    attachData: object | null;
    error: Error | null;
    tips?: string;
    build(comName: string, comType: RouterComponentTypeEnum, handleResult?: boolean): IComponentHandleResult;
    setComName(comName: string): IComponentHandleResult;
    setComType(comType: RouterComponentTypeEnum): IComponentHandleResult;
    setHandleResult(handleResult: boolean): IComponentHandleResult;
    setError(error: Error): IComponentHandleResult;
    setTips(tips: string): IComponentHandleResult;
    setAttachData(attachData: any): IComponentHandleResult;
}
export interface IRequestContextGatewayInfo {
    routerInfo: RouterInfo;
    identityInfo: {
        userInfo?: object;
        clientInfo?: object;
        nodeInfo?: object;
    };
    componentProcessResults: IComponentHandleResult[];
}
export interface IHttpRequestProxy {
    httpProxy(ctx: Context, upstreamRouterInfo: UpstreamInfo): Promise<any>;
}
export interface IIdentityTransmit {
    transmit(ctx: Context): void;
}
