import {provide, inject, scope, ScopeEnum} from 'midway';
import {
    ICommonComponentHandler, IComponentHandleResult
} from '../../../interface';

import {RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum} from '../../../enum';
import {FreelogContext} from "egg-freelog-base";

@scope(ScopeEnum.Singleton)
@provide(`gateway_com_${RouterComponentNameEnum.AdminAccountAuthorization}`)
export class RefuseAllRequestAuthorization implements ICommonComponentHandler {

    comName = RouterComponentNameEnum.AdminAccountAuthorization;
    comType = RouterComponentTypeEnum.Authorization;
    comLevel = RouterComponentLevelEnum.RequestBefore;

    @inject()
    componentHandleResult: IComponentHandleResult;

    async handle(ctx: FreelogContext, config?: object): Promise<IComponentHandleResult> {

        const {userInfo} = ctx.gatewayInfo.identityInfo;
        if (userInfo?.email === 'support@freelog.com') {
            return this.componentHandleResult.build(this.comName, this.comType).setHandleResult(true);
        }

        return this.componentHandleResult
            .build(this.comName, this.comType)
            .setHandleResult(false).setTips('未授权的请求');
    }
}
