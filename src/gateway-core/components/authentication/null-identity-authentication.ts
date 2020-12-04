import {provide, inject, scope, ScopeEnum} from 'midway';
import {
    ICommonComponentHandler, IComponentHandleResult
} from '../../../interface';
import {RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum} from '../../../enum';
import {FreelogContext} from "egg-freelog-base";

@scope(ScopeEnum.Singleton)
@provide(`gateway_com_${RouterComponentNameEnum.Null_Identity_Authentication}`)
export class NullIdentityAuthentication implements ICommonComponentHandler {

    comName = RouterComponentNameEnum.Null_Identity_Authentication;
    comType = RouterComponentTypeEnum.Authentication;
    comLevel = RouterComponentLevelEnum.RequestBefore;

    @inject()
    componentHandleResult: IComponentHandleResult;

    async handle(ctx: FreelogContext, config?: object): Promise<IComponentHandleResult> {

        return this.componentHandleResult.build(this.comName, this.comType).setHandleResult(true);

    }
}
