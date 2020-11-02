import { Context } from 'midway';
import { ICommonComponentHandler, IComponentHandleResult } from "../../../../interface";
import { RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum } from '../../../../enum';
export declare class JwtNodeAuthentication implements ICommonComponentHandler {
    comName: RouterComponentNameEnum;
    comType: RouterComponentTypeEnum;
    comLevel: RouterComponentLevelEnum;
    RasSha256Key: any;
    componentHandleResult: IComponentHandleResult;
    handle(ctx: Context, config?: object): Promise<IComponentHandleResult>;
    /**
     * 获取有效期
     */
    _getExpire(expireSpan?: number): number;
}
