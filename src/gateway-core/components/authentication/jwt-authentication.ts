import {provide, inject, config, scope, ScopeEnum} from 'midway';
import {
    ICommonComponentHandler,
    IComponentHandleResult,
    IGatewayConfigService, IGatewayMatchService,
    IHttpRequestProxy
} from '../../../interface';
import {GatewayAuthenticationError, FreelogContext, CryptoHelper, GatewayArgumentError} from 'egg-freelog-base';
import {RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum} from '../../../enum';
import {split} from 'lodash';

@scope(ScopeEnum.Singleton)
@provide(`gateway_com_${RouterComponentNameEnum.JWT_Authentication}`)
export class JwtAuthentication implements ICommonComponentHandler {

    comName = RouterComponentNameEnum.JWT_Authentication;
    comType = RouterComponentTypeEnum.Authentication;
    comLevel = RouterComponentLevelEnum.RequestBefore;

    @config()
    RasSha256Key;
    @inject()
    componentHandleResult: IComponentHandleResult;

    async handle(ctx: FreelogContext, config?: object): Promise<IComponentHandleResult> {

        const comHandlerResult = this.componentHandleResult.build(this.comName, this.comType);

        const jwtStr = ctx.cookies.get('authInfo', {signed: false}) ?? ctx.get('authorization');
        if (!jwtStr) {
            return comHandlerResult.setError(new GatewayArgumentError(ctx.gettext('params-required-validate-failed', 'authInfo or authorization')))
                .setTips('JWT认证失败,未获取到JWT信息');
        }
        const [header, payload, signature] = jwtStr.replace(/^(Bearer )?/i, '').split('.');
        if (!header || !payload || !signature) {
            return comHandlerResult.setError(new GatewayAuthenticationError(ctx.gettext('params-format-validate-failed', 'authInfo or authentication')))
                .setTips('用户JWT数据校验失败');
        }

        const isVerify = CryptoHelper.rsaSha256Verify(`${header}.${payload}`, signature, this.RasSha256Key?.identity?.publicKey ?? '');
        if (!isVerify) {
            return comHandlerResult.setError(new GatewayAuthenticationError(ctx.gettext('user-authentication-failed')))
                .setTips('用户JWT数据校验失败');
        }

        const payloadObject = JSON.parse(CryptoHelper.base64Decode(payload));
        if (payloadObject.expire < this._getExpire()) {
            return comHandlerResult.setError(new GatewayAuthenticationError(ctx.gettext('user-authentication-failed')))
                .setTips('用户JWT数据校验失败,数据已过期');
        }

        const userInfo = await this.getUserInfo(ctx.app.createAnonymousContext() as any, payloadObject.userId);
        if (!userInfo) {
            return comHandlerResult.setError(new GatewayAuthenticationError(ctx.gettext('user-authentication-failed')))
                .setTips('用户信息缺失');
        }
        ctx.gatewayInfo.identityInfo.userInfo = userInfo;
        return comHandlerResult.setHandleResult(true).setAttachData(userInfo);
    }

    async getUserInfo(ctx: FreelogContext, userId: number) {
        const gatewayConfigService: IGatewayConfigService = ctx.requestContext.get('gatewayConfigService');

        const path = '/v2/users/detail';
        const method = 'GET';
        const routerPrefix = split(path.toLowerCase(), '/', 3).join('/') + '/';
        const routerList = gatewayConfigService.getRouterListByPrefix(routerPrefix, method);
        const gatewayMatchService: IGatewayMatchService = ctx.requestContext.get('gatewayMatchService');

        const routerInfo = gatewayMatchService.matchRouter(routerList, path, method);
        if (!routerInfo) {
            return this.componentHandleResult.build(this.comName, this.comType).setError(new GatewayAuthenticationError(ctx.gettext('user-authentication-failed')))
                .setTips('用户信息读取失败');
        }
        routerInfo.upstream.forwardUrl = gatewayMatchService.generateUpstreamRouterUrl(routerInfo, `/v2/users/detail?userId=${userId}`);
        const httpRequestProxy: IHttpRequestProxy = ctx.requestContext.get('httpRequestProxy');

        return httpRequestProxy.httpProxy(ctx, routerInfo.upstream).then(response => {
            const {headers, statusCode, body} = response;
            if (statusCode >= 500 && statusCode < 600 || !this._isJson(headers)) {
                return null;
            }
            const responseData = JSON.parse(body.toString());
            if (responseData.ret === 0 && responseData.errCode === 0) {
                return responseData.data;
            }
            return null;
        });
    }

    _isJson(headers: object) {
        const header = headers['content-type'] || headers['Content-Type'];
        return header && header.toLowerCase().includes('application/json');
    }

    /**
     * 获取有效期
     */
    _getExpire(expireSpan = 0) {
        const currTime = Math.round(new Date().getTime() / 1000);
        return currTime + expireSpan;
    }
}
