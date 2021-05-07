import {parse} from 'url';
import {isEmpty, pick} from 'lodash';
import {provide, inject, scope, ScopeEnum} from 'midway';
import {GatewayArgumentError, GatewayAuthenticationError, CryptoHelper, FreelogContext} from 'egg-freelog-base';
import {
    ICommonComponentHandler, IComponentHandleResult, IGatewayConfigService
} from '../../../interface';
import {RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum} from '../../../enum';

@scope(ScopeEnum.Singleton)
@provide(`gateway_com_${RouterComponentNameEnum.Client_Authentication}`)
export class ClientCredentialsAuthentication implements ICommonComponentHandler {

    comName = RouterComponentNameEnum.Client_Authentication;
    comType = RouterComponentTypeEnum.Authentication;
    comLevel = RouterComponentLevelEnum.RequestBefore;

    @inject()
    gatewayConfigService: IGatewayConfigService;
    @inject()
    componentHandleResult: IComponentHandleResult;

    async handle(ctx: FreelogContext, config?: object): Promise<IComponentHandleResult> {

        const comHandlerResult = this.componentHandleResult.build(this.comName, this.comType);
        const clientId = ctx.checkHeader('clientid').exist().notEmpty().toInt().value;
        const timeLine: number = ctx.checkHeader('timeline').exist().notEmpty().toInt().value;
        const sign = ctx.checkHeader('sign').exist().notEmpty().value;
        const currentUnixTime = Math.round(new Date().getTime() / 1000);

        if (!isEmpty(ctx.errors)) {
            return comHandlerResult.setError(new GatewayArgumentError(ctx.gettext('params-validate-failed', 'clientId,timeline,sign'), {
                clientId, timeLine, sign
            }));
        }
        if (Math.abs(currentUnixTime - timeLine) > 180) {
            return comHandlerResult.setError(new GatewayAuthenticationError(ctx.gettext('params-validate-failed', 'timeline'), {
                timeLine, currentUnixTime
            })).setTips('时间戳校验失败');
        }

        const clientInfo = this.gatewayConfigService.getClientInfo(clientId);
        if (!clientInfo) {
            return comHandlerResult.setError(new GatewayAuthenticationError(ctx.gettext('params-validate-failed', 'clientId'), {clientId}))
                .setTips('客户端认证失败或未找到客户端信息');
        }

        const text = `${parse(ctx.url).path}&timeline=${timeLine}`;
        if (CryptoHelper.hmacSha1(text, clientInfo.privateKey) !== sign) {
            return comHandlerResult.setError(new GatewayAuthenticationError(ctx.gettext('params-validate-failed', 'sign'), {
                clientId, sign: CryptoHelper.hmacSha1(text, clientInfo.privateKey)
            })).setTips('签名校验失败');
        }

        ctx.gatewayInfo.identityInfo.clientInfo = pick(clientInfo, ['clientId', 'clientName']);

        return comHandlerResult.setHandleResult(true).setAttachData({clientInfo});
    }
}
