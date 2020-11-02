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
exports.IpBlackWhiteListAuthentication = void 0;
const midway_1 = require("midway");
const enum_1 = require("../../../../enum");
let IpBlackWhiteListAuthentication = class IpBlackWhiteListAuthentication {
    constructor() {
        this.comName = enum_1.RouterComponentNameEnum.IP_Black_White_List_Authentication;
        this.comType = enum_1.RouterComponentTypeEnum.Authentication;
        this.comLevel = enum_1.RouterComponentLevelEnum.RequestBefore;
    }
    async handle(ctx, config) {
        return this.componentHandleResult.build(this.comName, this.comType).setHandleResult(false).setTips('黑白名单功能暂未实现');
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], IpBlackWhiteListAuthentication.prototype, "componentHandleResult", void 0);
IpBlackWhiteListAuthentication = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide(`gateway_com_${enum_1.RouterComponentNameEnum.IP_Black_White_List_Authentication}`)
], IpBlackWhiteListAuthentication);
exports.IpBlackWhiteListAuthentication = IpBlackWhiteListAuthentication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXAtYmxhY2std2hpdGUtbGlzdC1hdXRoZW50aWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9nYXRld2F5LWNvcmUvY29tcG9uZW50cy9hdXRoZW50aWNhdGlvbi9pcC1ibGFjay13aGl0ZS1saXN0LWF1dGhlbnRpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFrRTtBQUVsRSwyQ0FBNEc7QUFJNUcsSUFBYSw4QkFBOEIsR0FBM0MsTUFBYSw4QkFBOEI7SUFBM0M7UUFFSSxZQUFPLEdBQUcsOEJBQXVCLENBQUMsa0NBQWtDLENBQUM7UUFDckUsWUFBTyxHQUFHLDhCQUF1QixDQUFDLGNBQWMsQ0FBQztRQUNqRCxhQUFRLEdBQUcsK0JBQXdCLENBQUMsYUFBYSxDQUFDO0lBUXRELENBQUM7SUFIRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVksRUFBRSxNQUFlO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JILENBQUM7Q0FDSixDQUFBO0FBTEc7SUFEQyxlQUFNLEVBQUU7OzZFQUNxQztBQVByQyw4QkFBOEI7SUFGMUMsY0FBSyxDQUFDLGtCQUFTLENBQUMsU0FBUyxDQUFDO0lBQzFCLGdCQUFPLENBQUMsZUFBZSw4QkFBdUIsQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDO0dBQ3hFLDhCQUE4QixDQVkxQztBQVpZLHdFQUE4QiJ9