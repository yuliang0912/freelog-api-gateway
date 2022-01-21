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
const egg_freelog_base_1 = require("egg-freelog-base");
class HomeController {
    /**
     * 首页
     * @param ctx
     * @returns {Promise<void>}
     */
    async index(ctx) {
        ctx.body = '<h1>freelog api gateway!</h1>';
    }
    async update(ctx) {
        ctx.body = '<h1>freelog api gateway!</h1>';
    }
    /**
     * 运行状态
     * @param ctx
     */
    async state(ctx) {
        const requestRecordProvider = ctx.requestContext.get('gatewayConfigService');
        ctx.success({
            isSetGatewayInfo: requestRecordProvider.isSetGatewayInfo,
            latestUpdateDate: requestRecordProvider.latestUpdateDate
        });
    }
    /**
     * 访问记录
     * @param ctx
     */
    async requestRecords(ctx) {
        const page = ctx.checkQuery('page').optional().toInt().gt(0).default(1).value;
        const pageSize = ctx.checkQuery('pageSize').optional().toInt().gt(0).lt(101).default(10).value;
        const serverGroupName = ctx.checkQuery('serverGroupName').optional().type('string').len(1, 100).value;
        const serviceResponseTime = ctx.checkQuery('serviceResponseTime').optional().toInt().gt(0).value;
        const operator = ctx.checkQuery('operator').optional().toInt().in([1, 2]).value; //1:小于 2:大于
        const routerId = ctx.checkQuery('routerId').optional().isMongoObjectId().value;
        const requestUrl = ctx.checkQuery('requestUrl').optional().value;
        const userId = ctx.checkQuery('userId').optional().toInt().gt(0).value;
        ctx.validateParams();
        if (serviceResponseTime && !operator) {
            throw new egg_freelog_base_1.ArgumentError('组合参数serviceResponseTime,operator校验失败');
        }
        const condition = {};
        if (serverGroupName) {
            condition.serverGroupName = serverGroupName;
        }
        if (serviceResponseTime && operator) {
            let mongoOperator = operator === 1 ? '$lt' : '$gt';
            condition.serviceResponseTime = {
                [mongoOperator]: serviceResponseTime
            };
        }
        if (routerId) {
            condition.routerId = routerId;
        }
        if (requestUrl) {
            condition.requestUrl = requestUrl;
        }
        if (userId) {
            condition.userId = userId;
        }
        const requestRecordProvider = ctx.requestContext.get('requestRecordProvider');
        const task1 = requestRecordProvider.count(condition);
        const task2 = requestRecordProvider.findPageList(condition, page, pageSize, null, { createDate: -1 });
        await Promise.all([task1, task2]).then(([totalItem, dataList]) => ctx.success({
            page, pageSize, totalItem, dataList
        }));
    }
    /**
     * 同步路由数据
     * @param ctx
     */
    async syncRouterData(ctx) {
        const gatewayService = ctx.requestContext.get('gatewayService');
        await gatewayService.updateRouterConfig().then(ctx.success);
    }
}
__decorate([
    egg_freelog_base_1.visitorIdentityValidator(egg_freelog_base_1.IdentityTypeEnum.LoginUser | egg_freelog_base_1.IdentityTypeEnum.UnLoginUser),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "requestRecords", null);
exports.default = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29udHJvbGxlci9ob21lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsdURBQTJHO0FBRTNHLE1BQXFCLGNBQWM7SUFFL0I7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRztRQUNYLEdBQUcsQ0FBQyxJQUFJLEdBQUcsK0JBQStCLENBQUM7SUFDL0MsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRztRQUNaLEdBQUcsQ0FBQyxJQUFJLEdBQUcsK0JBQStCLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRztRQUVYLE1BQU0scUJBQXFCLEdBQTBCLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDcEcsR0FBRyxDQUFDLE9BQU8sQ0FBQztZQUNSLGdCQUFnQixFQUFFLHFCQUFxQixDQUFDLGdCQUFnQjtZQUN4RCxnQkFBZ0IsRUFBRSxxQkFBcUIsQ0FBQyxnQkFBZ0I7U0FDM0QsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7T0FHRztJQUVILEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBbUI7UUFFcEMsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUM5RSxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFD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