import {provide, inject, config, scope, ScopeEnum} from 'midway';
import {GatewayArgumentError, GatewayAuthenticationError, CryptoHelper, FreelogContext} from 'egg-freelog-base';
import {ICommonComponentHandler, IComponentHandleResult} from "../../../interface";
import {RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum} from '../../../enum';

@scope(ScopeEnum.Singleton)
@provide(`gateway_com_${RouterComponentNameEnum.JWT_Node_Authentication}`)
export class JwtNodeAuthentication implements ICommonComponentHandler {

    comName = RouterComponentNameEnum.JWT_Node_Authentication;
    comType = RouterComponentTypeEnum.Authentication;
    comLevel = RouterComponentLevelEnum.RequestBefore;

    @config()
    RasSha256Key;
    @inject()
    componentHandleResult: IComponentHandleResult;

    async handle(ctx: FreelogContext, config?: object): Promise<IComponentHandleResult> {

        const comHandlerResult = this.componentHandleResult.build(this.comName, this.comType);
        const jwtStr = ctx.cookies.get('nodeInfo', {signed: false});
        if (!jwtStr) {
            return comHandlerResult.setError(new GatewayArgumentError(ctx.gettext('params-required-validate-failed', 'authInfo or authorization')))
                .setTips('JWT认证失败,未获取到JWT信息');
        }

        const [header, payload, signature] = jwtStr.replace(/^(Bearer )?/i, '').split('.')
        if (!header || !payload || !signature) {
            return comHandlerResult.setError(new GatewayAuthenticationError(ctx.gettext('params-format-validate-failed', 'authInfo or authentication')))
                .setTips('节点JWT数据校验失败');
        }

        const isVerify = CryptoHelper.rsaSha256Verify(`${header}.${payload}`, signature, this.RasSha256Key?.node?.publicKey ?? '');
        if (!isVerify) {
            return comHandlerResult.setError(new GatewayAuthenticationError(ctx.gettext('node-authentication-failed')))
                .setTips('节点JWT数据校验失败');
        }

        const payloadObject = JSON.parse(CryptoHelper.base64Decode(payload));
        if (payloadObject.expire < this._getExpire()) {
            return comHandlerResult.setError(new GatewayAuthenticationError(ctx.gettext('node-authentication-failed')))
                .setTips('节点JWT数据校验失败,数据已过期');
        }

        ctx.gatewayInfo.identityInfo.nodeInfo = payloadObject;

        return comHandlerResult.setHandleResult(true).setAttachData(payloadObject);
    }

    /**
     * 获取有效期
     */
    _getExpire(expireSpan = 0) {
        const currTime = Math.round(new Date().getTime() / 1000)
        return currTime + expireSpan
    }
}
