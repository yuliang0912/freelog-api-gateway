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
exports.ClientCredentialsAuthentication = void 0;
const url_1 = require("url");
const lodash_1 = require("lodash");
const midway_1 = require("midway");
const egg_freelog_base_1 = require("egg-freelog-base");
const enum_1 = require("../../../enum");
let ClientCredentialsAuthentication = class ClientCredentialsAuthentication {
    constructor() {
        this.comName = enum_1.RouterComponentNameEnum.Client_Authentication;
        this.comType = enum_1.RouterComponentTypeEnum.Authentication;
        this.comLevel = enum_1.RouterComponentLevelEnum.RequestBefore;
    }
    async handle(ctx, config) {
        const comHandlerResult = this.componentHandleResult.build(this.comName, this.comType);
        const clientId = ctx.checkHeader('clientid').exist().notEmpty().toInt().value;
        const timeLine = ctx.checkHeader('timeline').exist().notEmpty().toInt().value;
        const sign = ctx.checkHeader('sign').exist().notEmpty().value;
        const currentUnixTime = Math.round(new Date().getTime() / 1000);
        if (!lodash_1.isEmpty(ctx.errors)) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayArgumentError(ctx.gettext('params-validate-failed', 'clientId,timeline,sign'), {
                clientId, timeLine, sign
            }));
        }
        if (Math.abs(currentUnixTime - timeLine) > 180) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('params-validate-failed', 'timeline'), {
                timeLine, currentUnixTime
            })).setTips('时间戳校验失败');
        }
        const clientInfo = this.gatewayConfigService.getClientInfo(clientId);
        if (!clientInfo) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('params-validate-failed', 'clientId'), { clientId }))
                .setTips('客户端认证失败或未找到客户端信息');
        }
        const { pathname, search } = new url_1.URL(ctx.href);
        const text = `${pathname + search}&timeline=${timeLine}`;
        if (egg_freelog_base_1.CryptoHelper.hmacSha1(text, clientInfo.privateKey) !== sign) {
            console.log(text, clientInfo.privateKey);
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('params-validate-failed', 'sign'), {
                clientId, sign: egg_freelog_base_1.CryptoHelper.hmacSha1(text, clientInfo.privateKey)
            })).setTips('签名校验失败');
        }
        ctx.gatewayInfo.identityInfo.clientInfo = lodash_1.pick(clientInfo, ['clientId', 'clientName']);
        return comHandlerResult.setHandleResult(true).setAttachData({ clientInfo });
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], ClientCredentialsAuthentication.prototype, "gatewayConfigService", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], ClientCredentialsAuthentication.prototype, "componentHandleResult", void 0);
ClientCredentialsAuthentication = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide(`gateway_com_${enum_1.RouterComponentNameEnum.Client_Authentication}`)
], ClientCredentialsAuthentication);
exports.ClientCredentialsAuthentication = ClientCredentialsAuthentication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LWNyZWRlbnRpYWxzLWF1dGhlbnRpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhdGV3YXktY29yZS9jb21wb25lbnRzL2F1dGhlbnRpY2F0aW9uL2NsaWVudC1jcmVkZW50aWFscy1hdXRoZW50aWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw2QkFBd0I7QUFDeEIsbUNBQXFDO0FBQ3JDLG1DQUF5RDtBQUN6RCx1REFBZ0g7QUFJaEgsd0NBQXlHO0FBSXpHLElBQWEsK0JBQStCLEdBQTVDLE1BQWEsK0JBQStCO0lBQTVDO1FBRUksWUFBTyxHQUFHLDhCQUF1QixDQUFDLHFCQUFxQixDQUFDO1FBQ3hELFlBQU8sR0FBRyw4QkFBdUIsQ0FBQyxjQUFjLENBQUM7UUFDakQsYUFBUSxHQUFHLCtCQUF3QixDQUFDLGFBQWEsQ0FBQztJQThDdEQsQ0FBQztJQXZDRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQW1CLEVBQUUsTUFBZTtRQUU3QyxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEYsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDOUUsTUFBTSxRQUFRLEdBQVcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDdEYsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxL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