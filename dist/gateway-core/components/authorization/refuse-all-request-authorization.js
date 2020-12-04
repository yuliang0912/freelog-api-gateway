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
        this.comName = enum_1.RouterComponentNameEnum.Refuse_All_Request_Authorization;
        this.comType = enum_1.RouterComponentTypeEnum.Authorization;
        this.comLevel = enum_1.RouterComponentLevelEnum.RequestBefore;
    }
    async handle(ctx, config) {
        return this.componentHandleResult.build(this.comName, this.comType).setHandleResult(false).setTips('未授权的请求');
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], RefuseAllRequestAuthorization.prototype, "componentHandleResult", void 0);
RefuseAllRequestAuthorization = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide(`gateway_com_${enum_1.RouterComponentNameEnum.Refuse_All_Request_Authorization}`)
], RefuseAllRequestAuthorization);
exports.RefuseAllRequestAuthorization = RefuseAllRequestAuthorization;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmdXNlLWFsbC1yZXF1ZXN0LWF1dGhvcml6YXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ2F0ZXdheS1jb3JlL2NvbXBvbmVudHMvYXV0aG9yaXphdGlvbi9yZWZ1c2UtYWxsLXJlcXVlc3QtYXV0aG9yaXphdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBeUQ7QUFLekQsd0NBQXlHO0FBS3pHLElBQWEsNkJBQTZCLEdBQTFDLE1BQWEsNkJBQTZCO0lBQTFDO1FBRUksWUFBTyxHQUFHLDhCQUF1QixDQUFDLGdDQUFnQyxDQUFDO1FBQ25FLFlBQU8sR0FBRyw4QkFBdUIsQ0FBQyxhQUFhLENBQUM7UUFDaEQsYUFBUSxHQUFHLCtCQUF3QixDQUFDLGFBQWEsQ0FBQztJQVV0RCxDQUFDO0lBTEcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFtQixFQUFFLE1BQWU7UUFFN0MsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFakgsQ0FBQztDQUNKLENBQUE7QUFQRztJQURDLGVBQU0sRUFBRTs7NEVBQ3FDO0FBUHJDLDZCQUE2QjtJQUZ6QyxjQUFLLENBQUMsa0JBQVMsQ0FBQyxTQUFTLENBQUM7SUFDMUIsZ0JBQU8sQ0FBQyxlQUFlLDhCQUF1QixDQUFDLGdDQUFnQyxFQUFFLENBQUM7R0FDdEUsNkJBQTZCLENBY3pDO0FBZFksc0VBQTZCIn0=