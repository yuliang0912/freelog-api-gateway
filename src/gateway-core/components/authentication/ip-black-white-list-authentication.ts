import {provide, inject, scope, ScopeEnum} from 'midway';
import {ICommonComponentHandler, IComponentHandleResult} from '../../../interface';
import {RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum} from '../../../enum';
import {FreelogContext} from 'egg-freelog-base';

@scope(ScopeEnum.Singleton)
@provide(`gateway_com_${RouterComponentNameEnum.IP_Black_White_List_Authentication}`)
export class IpBlackWhiteListAuthentication implements ICommonComponentHandler {

    comName = RouterComponentNameEnum.IP_Black_White_List_Authentication;
    comType = RouterComponentTypeEnum.Authentication;
    comLevel = RouterComponentLevelEnum.RequestBefore;

    @inject()
    componentHandleResult: IComponentHandleResult;

    async handle(ctx: FreelogContext, config?: object): Promise<IComponentHandleResult> {
        return this.componentHandleResult.build(this.comName, this.comType).setHandleResult(false).setTips('黑白名单功能暂未实现');
    }
}
