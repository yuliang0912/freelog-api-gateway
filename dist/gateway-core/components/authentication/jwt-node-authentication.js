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
exports.JwtNodeAuthentication = void 0;
const midway_1 = require("midway");
const egg_freelog_base_1 = require("egg-freelog-base");
const enum_1 = require("../../../enum");
let JwtNodeAuthentication = class JwtNodeAuthentication {
    constructor() {
        this.comName = enum_1.RouterComponentNameEnum.JWT_Node_Authentication;
        this.comType = enum_1.RouterComponentTypeEnum.Authentication;
        this.comLevel = enum_1.RouterComponentLevelEnum.RequestBefore;
    }
    async handle(ctx, config) {
        const comHandlerResult = this.componentHandleResult.build(this.comName, this.comType);
        const jwtStr = ctx.cookies.get('nodeInfo', { signed: false });
        if (!jwtStr) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayArgumentError(ctx.gettext('params-required-validate-failed', 'authInfo or authorization')))
                .setTips('JWT认证失败,未获取到JWT信息');
        }
        const [header, payload, signature] = jwtStr.replace(/^(Bearer )?/i, '').split('.');
        if (!header || !payload || !signature) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('params-format-validate-failed', 'authInfo or authentication')))
                .setTips('节点JWT数据校验失败');
        }
        const isVerify = egg_freelog_base_1.CryptoHelper.rsaSha256Verify(`${header}.${payload}`, signature, this.RasSha256Key?.node?.publicKey ?? '');
        if (!isVerify) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('node-authentication-failed')))
                .setTips('节点JWT数据校验失败');
        }
        const payloadObject = JSON.parse(egg_freelog_base_1.CryptoHelper.base64Decode(payload));
        if (payloadObject.expire < this._getExpire()) {
            return comHandlerResult.setError(new egg_freelog_base_1.GatewayAuthenticationError(ctx.gettext('node-authentication-failed')))
                .setTips('节点JWT数据校验失败,数据已过期');
        }
        ctx.gatewayInfo.identityInfo.nodeInfo = payloadObject;
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
], JwtNodeAuthentication.prototype, "RasSha256Key", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], JwtNodeAuthentication.prototype, "componentHandleResult", void 0);
JwtNodeAuthentication = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide(`gateway_com_${enum_1.RouterComponentNameEnum.JWT_Node_Authentication}`)
], JwtNodeAuthentication);
exports.JwtNodeAuthentication = JwtNodeAuthentication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LW5vZGUtYXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ2F0ZXdheS1jb3JlL2NvbXBvbmVudHMvYXV0aGVudGljYXRpb24vand0LW5vZGUtYXV0aGVudGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQWlFO0FBQ2pFLHVEQUFnSDtBQUVoSCx3Q0FBeUc7QUFJekcsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFBbEM7UUFFSSxZQUFPLEdBQUcsOEJBQXVCLENBQUMsdUJBQXVCLENBQUM7UUFDMUQsWUFBTyxHQUFHLDhCQUF1QixDQUFDLGNBQWMsQ0FBQztRQUNqRCxhQUFRLEdBQUcsK0JBQXdCLENBQUMsYUFBYSxDQUFDO0lBOEN0RCxDQUFDO0lBdkNHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBbUIsRUFBRSxNQUFlO1FBRTdDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0RixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsT0FBTyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSx1Q0FBb0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGlDQUFpQyxFQUFFLDJCQUEyQixDQUFDLENBQUMsQ0FBQztpQkFDbEksT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDckM7UUFFRCxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEYsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQyxPQUFPLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLDZDQUEwQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsK0JBQStCLEVBQUUsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO2lCQUN2SSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDL0I7UUFFRCxNQUFNLFFBQVEsR0FBRywrQkFBWSxDQUFDLGVBQWUsQ0FBQyxHQUFHLE1BQU0sSUFBSSxPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzNILElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxPQUFPLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLDZDQUEwQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO2lCQUN0RyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDL0I7UUFFRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLCtCQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUMxQyxPQUFPLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLDZDQUEwQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO2lCQUN0RyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUNyQztRQUVELEdBQUcsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUM7UUFFdEQsT0FBTyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRDs7T0FFRztJQUNILFVBQVUsQ0FBQyxVQUFVLEdBQUcsQ0FBQztRQUNyQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7UUFDeEQsT0FBTyxRQUFRLEdBQUcsVUFBVSxDQUFBO0lBQ2hDLENBQUM7Q0FDSixDQUFBO0FBM0NHO0lBREMsZUFBTSxFQUFFOzsyREFDSTtBQUViO0lBREMsZUFBTSxFQUFFOztvRUFDcUM7QUFUckMscUJBQXFCO0lBRmpDLGNBQUssQ0FBQyxrQkFBUyxDQUFDLFNBQVMsQ0FBQztJQUMxQixnQkFBTyxDQUFDLGVBQWUsOEJBQXVCLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztHQUM3RCxxQkFBcUIsQ0FrRGpDO0FBbERZLHNEQUFxQiJ9