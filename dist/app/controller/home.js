"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("egg-freelog-base/error");
const identity_type_1 = require("egg-freelog-base/app/enum/identity-type");
class HomeController {
    /**
     * 首页
     * @param ctx
     * @returns {Promise<void>}
     */
    async index(ctx) {
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
        const page = ctx.checkQuery("page").optional().toInt().gt(0).default(1).value;
        const pageSize = ctx.checkQuery("pageSize").optional().toInt().gt(0).lt(101).default(10).value;
        const serverGroupName = ctx.checkQuery('serverGroupName').optional().type('string').len(1, 100).value;
        const serviceResponseTime = ctx.checkQuery('serviceResponseTime').optional().toInt().gt(0).value;
        const operator = ctx.checkQuery('operator').optional().toInt().in([1, 2]).value; //1:小于 2:大于
        const routerId = ctx.checkQuery('routerId').optional().isMongoObjectId().value;
        const requestUrl = ctx.checkQuery('requestUrl').optional().value;
        const userId = ctx.checkQuery("userId").optional().toInt().gt(0).value;
        ctx.validateParams().validateVisitorIdentity(identity_type_1.LoginUser | identity_type_1.UnLoginUser);
        if (serviceResponseTime && !operator) {
            throw new error_1.ArgumentError('组合参数serviceResponseTime,operator校验失败');
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
exports.default = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29udHJvbGxlci9ob21lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQXFEO0FBQ3JELDJFQUErRTtBQUcvRSxNQUFxQixjQUFjO0lBRS9COzs7O09BSUc7SUFDSCxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUc7UUFDWCxHQUFHLENBQUMsSUFBSSxHQUFHLCtCQUErQixDQUFBO0lBQzlDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUc7UUFFWCxNQUFNLHFCQUFxQixHQUEwQixHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3BHLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDUixnQkFBZ0IsRUFBRSxxQkFBcUIsQ0FBQyxnQkFBZ0I7WUFDeEQsZ0JBQWdCLEVBQUUscUJBQXFCLENBQUMsZ0JBQWdCO1NBQzNELENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUc7UUFFcEIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtRQUM3RSxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQTtRQUM5RixNQUFNLGVBQWUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLGlCQUFpQixD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