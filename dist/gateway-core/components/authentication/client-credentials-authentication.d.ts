import { FreelogContext } from 'egg-freelog-base';
import { ICommonComponentHandler, IComponentHandleResult, IGatewayConfigService } from "../../../interface";
import { RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum } from '../../../enum';
export declare class ClientCredentialsAuthentication implements ICommonComponentHandler {
    comName: RouterComponentNameEnum;
    comType: RouterComponentTypeEnum;
    comLevel: RouterComponentLevelEnum;
    gatewayConfigService: IGatewayConfigService;
    componentHandleResult: IComponentHandleResult;
    handle(ctx: FreelogContext, config?: object): Promise<IComponentHandleResult>;
}
