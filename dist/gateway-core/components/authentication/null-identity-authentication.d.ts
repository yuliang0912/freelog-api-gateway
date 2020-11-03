import { Context } from 'midway';
import { ICommonComponentHandler, IComponentHandleResult } from '../../../interface';
import { RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum } from '../../../enum';
export declare class NullIdentityAuthentication implements ICommonComponentHandler {
    comName: RouterComponentNameEnum;
    comType: RouterComponentTypeEnum;
    comLevel: RouterComponentLevelEnum;
    componentHandleResult: IComponentHandleResult;
    handle(ctx: Context, config?: object): Promise<IComponentHandleResult>;
}
