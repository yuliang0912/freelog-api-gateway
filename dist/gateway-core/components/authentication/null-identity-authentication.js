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
exports.NullIdentityAuthentication = void 0;
const midway_1 = require("midway");
const enum_1 = require("../../../enum");
let NullIdentityAuthentication = class NullIdentityAuthentication {
    constructor() {
        this.comName = enum_1.RouterComponentNameEnum.Null_Identity_Authentication;
        this.comType = enum_1.RouterComponentTypeEnum.Authentication;
        this.comLevel = enum_1.RouterComponentLevelEnum.RequestBefore;
    }
    async handle(ctx, config) {
        return this.componentHandleResult.build(this.comName, this.comType).setHandleResult(true);
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], NullIdentityAuthentication.prototype, "componentHandleResult", void 0);
NullIdentityAuthentication = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide(`gateway_com_${enum_1.RouterComponentNameEnum.Null_Identity_Authentication}`)
], NullIdentityAuthentication);
exports.NullIdentityAuthentication = NullIdentityAuthentication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVsbC1pZGVudGl0eS1hdXRoZW50aWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nYXRld2F5LWNvcmUvY29tcG9uZW50cy9hdXRoZW50aWNhdGlvbi9udWxsLWlkZW50aXR5LWF1dGhlbnRpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFrRTtBQUlsRSx3Q0FBeUc7QUFJekcsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFBdkM7UUFFSSxZQUFPLEdBQUcsOEJBQXVCLENBQUMsNEJBQTRCLENBQUM7UUFDL0QsWUFBTyxHQUFHLDhCQUF1QixDQUFDLGNBQWMsQ0FBQztRQUNqRCxhQUFRLEdBQUcsK0JBQXdCLENBQUMsYUFBYSxDQUFDO0lBVXRELENBQUM7SUFMRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVksRUFBRSxNQUFlO1FBRXRDLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFOUYsQ0FBQztDQUNKLENBQUE7QUFQRztJQURDLGVBQU0sRUFBRTs7eUVBQ3FDO0FBUHJDLDBCQUEwQjtJQUZ0QyxjQUFLLENBQUMsa0JBQVMsQ0FBQyxTQUFTLENBQUM7SUFDMUIsZ0JBQU8sQ0FBQyxlQUFlLDhCQUF1QixDQUFDLDRCQUE0QixFQUFFLENBQUM7R0FDbEUsMEJBQTBCLENBY3RDO0FBZFksZ0VBQTBCIn0=