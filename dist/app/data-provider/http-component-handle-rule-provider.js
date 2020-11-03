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
const MongoBaseOperation = require("egg-freelog-base/lib/database/mongo-base-operation");
let HttpComponentHandleRuleProvider = class HttpComponentHandleRuleProvider extends MongoBaseOperation {
    constructor(model) {
        super(model);
    }
};
HttpComponentHandleRuleProvider = __decorate([
    midway_1.provide(),
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    __param(0, midway_1.inject('model.HttpComponentHandleRule')),
    __metadata("design:paramtypes", [Object])
], HttpComponentHandleRuleProvider);
exports.default = HttpComponentHandleRuleProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jb21wb25lbnQtaGFuZGxlLXJ1bGUtcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2RhdGEtcHJvdmlkZXIvaHR0cC1jb21wb25lbnQtaGFuZGxlLXJ1bGUtcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBeUQ7QUFDekQseUZBQXlGO0FBSXpGLElBQXFCLCtCQUErQixHQUFwRCxNQUFxQiwrQkFBZ0MsU0FBUSxrQkFBa0I7SUFDM0UsWUFBcUQsS0FBSztRQUN0RCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQztDQUNKLENBQUE7QUFKb0IsK0JBQStCO0lBRm5ELGdCQUFPLEVBQUU7SUFDVCxjQUFLLENBQUMsa0JBQVMsQ0FBQyxTQUFTLENBQUM7SUFFVixXQUFBLGVBQU0sQ0FBQywrQkFBK0IsQ0FBQyxDQUFBOztHQURuQywrQkFBK0IsQ0FJbkQ7a0JBSm9CLCtCQUErQiJ9