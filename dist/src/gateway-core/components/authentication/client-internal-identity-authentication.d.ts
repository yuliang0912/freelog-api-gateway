import { Context } from 'midway';
import { ICommonComponentHandler, IComponentHandleResult, IGatewayConfigService } from '../../../../interface';
import { RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum } from '../../../../enum';
export declare class ClientInternalIdentityAuthentication implements ICommonComponentHandler {
    comName: RouterComponentNameEnum;
    comType: RouterComponentTypeEnum;
    comLevel: RouterComponentLevelEnum;
    gatewayConfigService: IGatewayConfigService;
    componentHandleResult: IComponentHandleResult;
    handle(ctx: Context, config?: object): Promise<IComponentHandleResult>;
}
