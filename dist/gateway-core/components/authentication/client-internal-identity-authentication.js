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
exports.ClientInternalIdentityAuthentication = void 0;
const midway_1 = require("midway");
const crypto_helper_1 = require("egg-freelog-base/app/extend/helper/crypto_helper");
const egg_freelog_base_1 = require("egg-freelog-base");
const enum_1 = require("../../../enum");
let ClientInternalIdentityAuthentication = class ClientInternalIdentityAuthentication {
    constructor() {
        this.comName = enum_1.RouterComponentNameEnum.Client_Internal_Identity_Authentication;
        this.comType = enum_1.RouterComponentTypeEnum.Authentication;
        this.comLevel = enum_1.RouterComponentLevelEnum.RequestBefore;
    }
    async handle(ctx, config) {
        const tokenInfo = ctx.get('authentication');
        const comHandlerResult = this.componentHandleResult.build(this.comName, this.comType);
        if (!tokenInfo) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('user-authentication-failed')))
                .setTips('内部身份认证失败,未获取到有效内部身份');
        }
        const clientId = ctx.checkHeader("clientid").exist().notEmpty().toInt().value;
        if (!clientId) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayArgumentError(ctx.gettext('params-required-validate-failed', 'clientId')))
                .setTips('缺少参数clientid');
        }
        const clientInfo = this.gatewayConfigService.getClientInfo(clientId);
        if (!clientInfo) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('params-validate-failed', 'clientId'), { clientId }))
                .setTips('客户端认证失败或未找到客户端信息');
        }
        const [token, sign] = tokenInfo.split(':');
        if (!token || !sign) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('params-format-validate-failed', 'authentication')))
                .setTips('内部身份认证失败,身份数据格式错误');
        }
        if (crypto_helper_1.hmacSha1(token, clientInfo.privateKey) !== sign) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('params-validate-failed', 'sign'), { token }));
        }
        let internalIdentityInfo = {};
        try {
            internalIdentityInfo = JSON.parse(Buffer.from(token, 'base64').toString());
        }
        catch (e) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('params-format-validate-failed', 'authentication-token'), { e }))
                .setTips('内部身份认证失败,数据解析失败');
        }
        //透传的认证信息级别低于经过组件认证过的信息级别
        ctx.gatewayInfo.identityInfo = Object.assign(internalIdentityInfo, ctx.gatewayInfo.identityInfo);
        return comHandlerResult.setHandleResult(true).setAttachData(internalIdentityInfo);
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], ClientInternalIdentityAuthentication.prototype, "gatewayConfigService", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], ClientInternalIdentityAuthentication.prototype, "componentHandleResult", void 0);
ClientInternalIdentityAuthentication = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide(`gateway_com_${enum_1.RouterComponentNameEnum.Client_Internal_Identity_Authentication}`)
], ClientInternalIdentityAuthentication);
exports.ClientInternalIdentityAuthentication = ClientInternalIdentityAuthentication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LWludGVybmFsLWlkZW50aXR5LWF1dGhlbnRpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhdGV3YXktY29yZS9jb21wb25lbnRzL2F1dGhlbnRpY2F0aW9uL2NsaWVudC1pbnRlcm5hbC1pZGVudGl0eS1hdXRoZW50aWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBa0U7QUFDbEUsb0ZBQTBFO0FBQzFFLHVEQUFrRjtBQUlsRix3Q0FBeUc7QUFJekcsSUFBYSxvQ0FBb0MsR0FBakQsTUFBYSxvQ0FBb0M7SUFBakQ7UUFFSSxZQUFPLEdBQUcsOEJBQXVCLENBQUMsdUNBQXVDLENBQUM7UUFDMUUsWUFBTyxHQUFHLDhCQUF1QixDQUFDLGNBQWMsQ0FBQztRQUNqRCxhQUFRLEdBQUcsK0JBQXdCLENBQUMsYUFBYSxDQUFDO0lBaUR0RCxDQUFDO0lBMUNHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBWSxFQUFFLE1BQWU7UUFFdEMsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ1osT0FBTyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSw2Q0FBMEIsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztpQkFDdEcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDdkM7UUFFRCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxD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