import { ICommonComponentHandler, IComponentHandleResult } from '../../../interface';
import { RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum } from '../../../enum';
import { FreelogContext } from "egg-freelog-base";
export declare class IpBlackWhiteListAuthentication implements ICommonComponentHandler {
    comName: RouterComponentNameEnum;
    comType: RouterComponentTypeEnum;
    comLevel: RouterComponentLevelEnum;
    componentHandleResult: IComponentHandleResult;
    handle(ctx: FreelogContext, config?: object): Promise<IComponentHandleResult>;
}
