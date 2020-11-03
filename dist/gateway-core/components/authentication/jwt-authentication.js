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
const crypto_helper_1 = require("egg-freelog-base/app/extend/helper/crypto_helper");
const enum_1 = require("../../../enum");
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
        const isVerify = crypto_helper_1.rsaSha256Verify(`${header}.${payload}`, signature, this.RasSha256Key?.identity?.publicKey ?? '');
        if (!isVerify) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('user-authentication-failed')))
                .setTips('用户JWT数据校验失败');
        }
        const payloadObject = JSON.parse(crypto_helper_1.base64Decode(payload));
        if (payloadObject.expire < this._getExpire()) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('user-authentication-failed')))
                .setTips('用户JWT数据校验失败,数据已过期');
        }
        ctx.gatewayInfo.identityInfo.userInfo = payloadObject;
        return comHandlerResult.setHandleResult(true).setAttachData(payloadObject);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LWF1dGhlbnRpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhdGV3YXktY29yZS9jb21wb25lbnRzL2F1dGhlbnRpY2F0aW9uL2p3dC1hdXRoZW50aWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBMEU7QUFFMUUsdURBQWtGO0FBQ2xGLG9GQUErRjtBQUMvRix3Q0FBeUc7QUFJekcsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFBOUI7UUFFSSxZQUFPLEdBQUcsOEJBQXVCLENBQUMsa0JBQWtCLENBQUM7UUFDckQsWUFBTyxHQUFHLDhCQUF1QixDQUFDLGNBQWMsQ0FBQztRQUNqRCxhQUFRLEdBQUcsK0JBQXdCLENBQUMsYUFBYSxDQUFDO0lBOEN0RCxDQUFDO0lBdkNHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBWSxFQUFFLE1BQWU7UUFFdEMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDeEYsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE9BQU8sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksdUNBQW9CLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQ0FBaUMsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDLENBQUM7aUJBQ2xJLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xGLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkMsT0FBTyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSw2Q0FBMEIsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLCtCQUErQixFQUFFLDRCQUE0QixDQUFDLENBQUMsQ0FBQztpQkFDdkksT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQy9CO1FBRUQsTUFBTSxRQUFRLEdBQUcsK0JBQWUsQ0FBQyxHQUFHLE1BQU0sSUFBSSxPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2xILElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxPQUFPLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLDZDQUEwQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO2lCQUN0RyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDL0I7UUFFRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLDRCQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQzFDLE9BQU8sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksNkNBQTBCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7aUJBQ3RHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsR0FBRyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQztRQUV0RCxPQUFPLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVSxDQUFDLFVBQVUsR0FBRyxDQUFDO1FBQ3JCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQTtRQUN4RCxPQUFPLFFBQVEsR0FBRyxVQUFVLENBQUE7SUFDaEMsQ0FBQztDQUNKLENBQUE7QUEzQ0c7SUFEQyxlQUFNLEVBQUU7O3VEQUNJO0FBRWI7SUFEQyxlQUFNLEVBQUU7O2dFQUNxQztBQVRyQyxpQkFBaUI7SUFGN0IsY0FBSyxDQUFDLGtCQUFTLENBQUMsU0FBUyxDQUFDO0lBQzFCLGdCQUFPLENBQUMsZUFBZSw4QkFBdUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0dBQ3hELGlCQUFpQixDQWtEN0I7QUFsRFksOENBQWlCIn0=