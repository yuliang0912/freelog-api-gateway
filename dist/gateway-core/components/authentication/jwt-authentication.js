"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthentication = void 0;
const midway_1 = require("midway");
const egg_freelog_base_1 = require("egg-freelog-base");
const enum_1 = require("../../../enum");
const lodash_1 = require("lodash");
let JwtAuthentication = class JwtAuthentication {
    constructor() {
        this.comName = enum_1.RouterComponentNameEnum.JWT_Authentication;
        this.comType = enum_1.RouterComponentTypeEnum.Authentication;
        this.comLevel = enum_1.RouterComponentLevelEnum.RequestBefore;
    }
    async handle(ctx, config) {
        const comHandlerResult = this.componentHandleResult.build(this.comName, this.comType);
        const jwtStr = ctx.cookies.get('authInfo', { signed: false }) ?? ctx.get('authorization');
        if (!jwtStr) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayArgumentError(ctx.gettext('params-required-validate-failed', 'authInfo or authorization')))
                .setTips('JWT认证失败,未获取到JWT信息');
        }
        const [header, payload, signature] = jwtStr.replace(/^(Bearer )?/i, '').split('.');
        if (!header || !payload || !signature) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('params-format-validate-failed', 'authInfo or authentication')))
                .setTips('用户JWT数据校验失败');
        }
        const isVerify = egg_freelog_base_1.CryptoHelper.rsaSha256Verify(`${header}.${payload}`, signature, this.RasSha256Key?.identity?.publicKey ?? '');
        if (!isVerify) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('user-authentication-failed')))
                .setTips('用户JWT数据校验失败');
        }
        const payloadObject = JSON.parse(egg_freelog_base_1.CryptoHelper.base64Decode(payload));
        if (payloadObject.expire < this._getExpire()) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('user-authentication-failed')))
                .setTips('用户JWT数据校验失败,数据已过期');
        }
        const userInfo = await this.getUserInfo(ctx.app.createAnonymousContext(), payloadObject.userId);
        if (!userInfo) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('user-authentication-failed')))
                .setTips('用户信息缺失');
        }
        ctx.gatewayInfo.identityInfo.userInfo = userInfo;
        return comHandlerResult.setHandleResult(true).setAttachData(userInfo);
    }
    async getUserInfo(ctx, userId) {
        const gatewayConfigService = ctx.requestContext.get('gatewayConfigService');
        const path = '/v2/users/detail';
        const method = 'GET';
        const routerPrefix = lodash_1.split(path.toLowerCase(), '/', 3).join('/') + '/';
        const routerList = gatewayConfigService.getRouterListByPrefix(routerPrefix, method);
        const gatewayMatchService = ctx.requestContext.get('gatewayMatchService');
        const routerInfo = gatewayMatchService.matchRouter(routerList, path, method);
        if (!routerInfo) {
            return this.componentHandleResult.build(this.comName, this.comType).setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('user-authentication-failed')))
                .setTips('用户信息读取失败');
        }
        routerInfo.upstream.forwardUrl = gatewayMatchService.generateUpstreamRouterUrl(routerInfo, `/v2/users/detail?userId=${userId}`);
        const httpRequestProxy = ctx.requestContext.get('httpRequestProxy');
        return httpRequestProxy.httpProxy(ctx, routerInfo.upstream).then(response => {
            const { headers, statusCode, body } = response;
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
    _isJson(headers) {
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
};
__decorate([
    midway_1.config(),
    __metadata("design:type", Object)
], JwtAuthentication.prototype, "RasSha256Key", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], JwtAuthentication.prototype, "componentHandleResult", void 0);
JwtAuthentication = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide(`gateway_com_${enum_1.RouterComponentNameEnum.JWT_Authentication}`)
], JwtAuthentication);
exports.JwtAuthentication = JwtAuthentication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LWF1dGhlbnRpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhdGV3YXktY29yZS9jb21wb25lbnRzL2F1dGhlbnRpY2F0aW9uL2p3dC1hdXRoZW50aWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBaUU7QUFPakUsdURBQWdIO0FBQ2hILHdDQUF5RztBQUN6RyxtQ0FBNkI7QUFJN0IsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFBOUI7UUFFSSxZQUFPLEdBQUcsOEJBQXVCLENBQUMsa0JBQWtCLENBQUM7UUFDckQsWUFBTyxHQUFHLDhCQUF1QixDQUFDLGNBQWMsQ0FBQztRQUNqRCxhQUFRLEdBQUcsK0JBQXdCLENBQUMsYUFBYSxDQUFDO0lBcUZ0RCxDQUFDO0lBOUVHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBbUIsRUFBRSxNQUFlO1FBRTdDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV0RixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxPQUFPLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLHVDQUFvQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUNBQWlDLEVBQUUsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO2lCQUNsSSxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUNyQztRQUNELE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxHQUFHLE1B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