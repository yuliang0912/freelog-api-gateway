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
exports.RefuseAllRequestAuthorization = void 0;
const midway_1 = require("midway");
const enum_1 = require("../../../enum");
let RefuseAllRequestAuthorization = class RefuseAllRequestAuthorization {
    constructor() {
        this.comName = enum_1.RouterComponentNameEnum.AdminAccountAuthorization;
        this.comType = enum_1.RouterComponentTypeEnum.Authorization;
        this.comLevel = enum_1.RouterComponentLevelEnum.RequestBefore;
    }
    async handle(ctx, config) {
        const { userInfo } = ctx.gatewayInfo.identityInfo;
        if (userInfo?.email === 'support@freelog.com') {
            return this.componentHandleResult.build(this.comName, this.comType).setHandleResult(true);
        }
        return this.componentHandleResult
            .build(this.comName, this.comType)
            .setHandleResult(false).setTips('未授权的请求');
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], RefuseAllRequestAuthorization.prototype, "componentHandleResult", void 0);
RefuseAllRequestAuthorization = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide(`gateway_com_${enum_1.RouterComponentNameEnum.AdminAccountAuthorization}`)
], RefuseAllRequestAuthorization);
exports.RefuseAllRequestAuthorization = RefuseAllRequestAuthorization;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4tYWNjb3VudC1hdXRob3JpemF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2dhdGV3YXktY29yZS9jb21wb25lbnRzL2F1dGhvcml6YXRpb24vYWRtaW4tYWNjb3VudC1hdXRob3JpemF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1DQUF5RDtBQUt6RCx3Q0FBeUc7QUFLekcsSUFBYSw2QkFBNkIsR0FBMUMsTUFBYSw2QkFBNkI7SUFBMUM7UUFFSSxZQUFPLEdBQUcsOEJBQXVCLENBQUMseUJBQXlCLENBQUM7UUFDNUQsWUFBTyxHQUFHLDhCQUF1QixDQUFDLGFBQWEsQ0FBQztRQUNoRCxhQUFRLEdBQUcsK0JBQXdCLENBQUMsYUFBYSxDQUFDO0lBZ0J0RCxDQUFDO0lBWEcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFtQixFQUFFLE1BQWU7UUFFN0MsTUFBTSxFQUFDLFFBQVEsRUFBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1FBQ2hELElBQUksUUFBUSxFQUFFLEtBQUssS0FBSyxxQkFBcUIsRUFBRTtZQUMzQyxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdGO1FBRUQsT0FBTyxJQUFJLENBQUMscUJBQXFCO2FBQzVCLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDakMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0osQ0FBQTtBQWJHO0lBREMsZUFBTSxFQUFFOzs0RUFDcUM7QUFQckMsNkJBQTZCO0lBRnpDLGNBQUssQ0FBQyxrQkFBUyxDQUFDLFNBQVMsQ0FBQztJQUMxQixnQkFBTyxDQUFDLGVBQWUsOEJBQXVCLENBQUMseUJBQXlCLEVBQUUsQ0FBQztHQUMvRCw2QkFBNkIsQ0FvQnpDO0FBcEJZLHNFQUE2QiJ9