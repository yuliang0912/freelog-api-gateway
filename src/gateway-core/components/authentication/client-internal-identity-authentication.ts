import {provide, inject, scope, ScopeEnum, Context} from 'midway';
import {hmacSha1} from 'egg-freelog-base/app/extend/helper/crypto_helper';
import {GatewayArgumentError, GatewayAuthenticationError} from 'egg-freelog-base';
import {
    ICommonComponentHandler, IComponentHandleResult, IGatewayConfigService
} from '../../../interface';
import {RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum} from '../../../enum';

@scope(ScopeEnum.Singleton)
@provide(`gateway_com_${RouterComponentNameEnum.Client_Internal_Identity_Authentication}`)
export class ClientInternalIdentityAuthentication implements ICommonComponentHandler {

    comName = RouterComponentNameEnum.Client_Internal_Identity_Authentication;
    comType = RouterComponentTypeEnum.Authentication;
    comLevel = RouterComponentLevelEnum.RequestBefore;

    @inject()
    gatewayConfigService: IGatewayConfigService;
    @inject()
    componentHandleResult: IComponentHandleResult;

    async handle(ctx: Context, config?: object): Promise<IComponentHandleResult> {

        const tokenInfo = ctx.get('authentication');
        const comHandlerResult = this.componentHandleResult.build(this.comName, this.comType);
        if (!tokenInfo) {
            return comHandlerResult.setError(new GatewayAuthenticationError(ctx.gettext('user-authentication-failed')))
                .setTips('内部身份认证失败,未获取到有效内部身份');
        }

        const clientId = ctx.checkHeader("clientid").exist().notEmpty().toInt().value;
        if (!clientId) {
            return comHandlerResult.setError(new GatewayArgumentError(ctx.gettext('params-required-validate-failed', 'clientId')))
                .setTips('缺少参数clientid');
        }
        const clientInfo = this.gatewayConfigService.getClientInfo(clientId);
        if (!clientInfo) {
            return comHandlerResult.setError(new GatewayAuthenticationError(ctx.gettext('params-validate-failed', 'clientId'), {clientId}))
                .setTips('客户端认证失败或未找到客户端信息');
        }

        const [token, sign] = tokenInfo.split(':');
        if (!token || !sign) {
            return comHandlerResult.setError(new GatewayAuthenticationError(ctx.gettext('params-format-validate-failed', 'authentication')))
                .setTips('内部身份认证失败,身份数据格式错误');
        }
        if (hmacSha1(token, clientInfo.privateKey) !== sign) {
            return comHandlerResult.setError(new GatewayAuthenticationError(ctx.gettext('params-validate-failed', 'sign'), {token}));
        }

        let internalIdentityInfo = {};
        try {
            internalIdentityInfo = JSON.parse(Buffer.from(token, 'base64').toString());
        } catch (e) {
            return comHandlerResult.setError(new GatewayAuthenticationError(ctx.gettext('params-format-validate-failed', 'authentication-token'), {e}))
                .setTips('内部身份认证失败,数据解析失败');
        }

        //透传的认证信息级别低于经过组件认证过的信息级别
        ctx.gatewayInfo.identityInfo = Object.assign(internalIdentityInfo, ctx.gatewayInfo.identityInfo);

        return comHandlerResult.setHandleResult(true).setAttachData(internalIdentityInfo);
    }
}