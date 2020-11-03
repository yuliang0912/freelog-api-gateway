import {provide, inject, scope, ScopeEnum} from 'midway';
import {
    ICommonComponentHandler, IComponentHandleResult
} from '../../../interface';

import {RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum} from '../../../enum';

@scope(ScopeEnum.Singleton)
@provide(`gateway_com_${RouterComponentNameEnum.Refuse_All_Request_Authorization}`)
export class RefuseAllRequestAuthorization implements ICommonComponentHandler {

    comName = RouterComponentNameEnum.Refuse_All_Request_Authorization;
    comType = RouterComponentTypeEnum.Authorization;
    comLevel = RouterComponentLevelEnum.RequestBefore;

    @inject()
    componentHandleResult: IComponentHandleResult;

    async handle(config?: object): Promise<IComponentHandleResult> {

        return this.componentHandleResult.build(this.comName, this.comType).setHandleResult(false).setTips('未授权的请求');

    }
}