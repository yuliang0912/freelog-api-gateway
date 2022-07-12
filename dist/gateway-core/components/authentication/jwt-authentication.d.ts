import { ICommonComponentHandler, IComponentHandleResult } from '../../../interface';
import { FreelogContext } from 'egg-freelog-base';
import { RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum } from '../../../enum';
export declare class JwtAuthentication implements ICommonComponentHandler {
    comName: RouterComponentNameEnum;
    comType: RouterComponentTypeEnum;
    comLevel: RouterComponentLevelEnum;
    RasSha256Key: any;
    componentHandleResult: IComponentHandleResult;
    handle(ctx: FreelogContext, config?: object): Promise<IComponentHandleResult>;
    getUserInfo(ctx: FreelogContext, userId: number): Promise<any>;
    _isJson(headers: object): any;
    /**
     * 获取有效期
     */
    _getExpire(expireSpan?: number): number;
}
