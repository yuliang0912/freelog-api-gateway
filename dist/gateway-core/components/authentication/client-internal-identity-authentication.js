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
        const clientId = ctx.checkHeader('clientid').exist().notEmpty().toInt().value;
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
        if (egg_freelog_base_1.CryptoHelper.hmacSha1(token, clientInfo.privateKey) !== sign) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LWludGVybmFsLWlkZW50aXR5LWF1dGhlbnRpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhdGV3YXktY29yZS9jb21wb25lbnRzL2F1dGhlbnRpY2F0aW9uL2NsaWVudC1pbnRlcm5hbC1pZGVudGl0eS1hdXRoZW50aWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBeUQ7QUFDekQsdURBQWdIO0FBSWhILHdDQUF5RztBQUl6RyxJQUFhLG9DQUFvQyxHQUFqRCxNQUFhLG9DQUFvQztJQUFqRDtRQUVJLFlBQU8sR0FBRyw4QkFBdUIsQ0FBQyx1Q0FBdUMsQ0FBQztRQUMxRSxZQUFPLEdBQUcsOEJBQXVCLENBQUMsY0FBYyxDQUFDO1FBQ2pELGFBQVEsR0FBRywrQkFBd0IsQ0FBQyxhQUFhLENBQUM7SUFpRHRELENBQUM7SUExQ0csS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFtQixFQUFFLE1BQWU7UUFFN0MsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ1osT0FBTyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSw2Q0FBMEIsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztpQkFDdEcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDdkM7UUFFRCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FB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