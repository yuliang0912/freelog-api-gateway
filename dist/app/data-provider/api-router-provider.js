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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const midway_1 = require("midway");
const egg_freelog_base_1 = require("egg-freelog-base");
let ApiRouterProvider = class ApiRouterProvider extends egg_freelog_base_1.MongodbOperation {
    constructor(model) {
        super(model);
    }
};
ApiRouterProvider = __decorate([
    midway_1.provide(),
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    __param(0, midway_1.inject('model.ApiRouter')),
    __metadata("design:paramtypes", [Object])
], ApiRouterProvider);
exports.default = ApiRouterProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLXJvdXRlci1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvZGF0YS1wcm92aWRlci9hcGktcm91dGVyLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQXlEO0FBQ3pELHVEQUFrRDtBQUtsRCxJQUFxQixpQkFBaUIsR0FBdEMsTUFBcUIsaUJBQWtCLFNBQVEsbUNBQTRCO0lBQ3ZFLFlBQXVDLEtBQUs7UUFDeEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Q0FDSixDQUFBO0FBSm9CLGlCQUFpQjtJQUZyQyxnQkFBTyxFQUFFO0lBQ1QsY0FBSyxDQUFDLGtCQUFTLENBQUMsU0FBUyxDQUFDO0lBRVYsV0FBQSxlQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQTs7R0FEckIsaUJBQWlCLENBSXJDO2tCQUpvQixpQkFBaUIifQ==