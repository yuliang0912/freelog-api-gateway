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
exports.TrafficStatisticsHandler = void 0;
const async_1 = require("async");
const midway_1 = require("midway");
const enum_1 = require("../../../enum");
let TrafficStatisticsHandler = class TrafficStatisticsHandler {
    constructor() {
        this.comName = enum_1.RouterComponentNameEnum.Traffic_Statistics;
        this.comType = enum_1.RouterComponentTypeEnum.Statistics;
        this.comLevel = enum_1.RouterComponentLevelEnum.ResponseAfter;
        this.taskQueue = async_1.queue(this.trafficStatisticsHandle.bind(this), 50);
    }
    async handle(ctx, config) {
        this.taskQueue.push(ctx, this.errorHandle.bind(this));
        return this.componentHandleResult.build(this.comName, this.comType).setHandleResult(true);
    }
    /**
     * 流量统计数据保存
     * @param routerId
     * @param routerUrlRule
     */
    async trafficStatisticsHandle(ctx) {
        const gatewayInfo = ctx.gatewayInfo;
        const { requestId, traceId, url, method, proxyResponse } = ctx;
        const { routerId, upstream, routerUrlRule } = gatewayInfo.routerInfo;
        const recordInfo = {
            requestId, traceId, routerId, method,
            requestUrl: url,
            forwardUrl: upstream.forwardUrl,
            serverGroupName: upstream.serverGroupName,
            serviceResponseTime: (ctx.startResponseTime - ctx.startRquestTime),
            reqContentLength: ctx.get('content-length') ?? 0,
            resContentLength: proxyResponse.headers['content-length'] ?? 0,
            userId: gatewayInfo.identityInfo.userInfo?.['userId'] ?? 0
        };
        this.routerTrafficStatisticsProvider?.findOneAndUpdate({
            routerId, routerUrlRule
        }, { $inc: { totalCount: 1 } }, { new: true }).then(data => {
            return data ?? this.routerTrafficStatisticsProvider.create({ routerId, routerUrlRule, totalCount: 1 });
        });
        this.requestRecordProvider?.create(recordInfo);
    }
    /**
     * 错误处理
     * @param err
     */
    errorHandle(error) {
        if (error instanceof Error) {
            console.log("end-of-cycle-event-handler", '事件执行异常', ...arguments);
        }
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], TrafficStatisticsHandler.prototype, "requestRecordProvider", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], TrafficStatisticsHandler.prototype, "routerTrafficStatisticsProvider", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], TrafficStatisticsHandler.prototype, "componentHandleResult", void 0);
TrafficStatisticsHandler = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide(`gateway_com_${enum_1.RouterComponentNameEnum.Traffic_Statistics}`)
], TrafficStatisticsHandler);
exports.TrafficStatisticsHandler = TrafficStatisticsHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhZmZpYy1zdGF0aXN0aWNzLWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZ2F0ZXdheS1jb3JlL2NvbXBvbmVudHMvb3RoZXIvdHJhZmZpYy1zdGF0aXN0aWNzLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTRCO0FBQzVCLG1DQUFrRTtBQUNsRSx3Q0FBeUc7QUFLekcsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFBckM7UUFFSSxZQUFPLEdBQUcsOEJBQXVCLENBQUMsa0JBQWtCLENBQUM7UUFDckQsWUFBTyxHQUFHLDhCQUF1QixDQUFDLFVBQVUsQ0FBQztRQUM3QyxhQUFRLEdBQUcsK0JBQXdCLENBQUMsYUFBYSxDQUFDO1FBQzFDLGNBQVMsR0FBRyxhQUFLLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQTBEM0UsQ0FBQztJQWhERyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVksRUFBRSxNQUFlO1FBRXRDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXRELE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUdEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsdUJBQXVCLENBQUMsR0FBWTtRQUV0QyxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsV0FBeUMsQ0FBQztRQUNsRSxNQUFNLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBQyxHQUFHLEdBQUcsQ0FBQztRQUM3RCxNQUFNLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUMsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDO1FBRW5FLE1BQU0sVUFBVSxHQUFHO1lBQ2YsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTTtZQUNwQyxVQUFVLEVBQUUsR0FBRztZQUNmLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVTtZQUMvQixlQUFlLEVBQUUsUUFBUSxDQUFDLGVBQWU7WUFDekMsbUJBQW1CLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQztZQUNsRSxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQztZQUNoRCxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQztZQUM5RCxNQUFNLEVBQUUsV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1NBQzdELENBQUE7UUFFRCxJQUFJLENBQUMsK0JBQStCLEVBQUUsZ0JBQWdCLENBQUM7WUFDbkQsUUFBUSxFQUFFLGFBQWE7U0FDMUIsRUFBRSxFQUFDLElBQUksRUFBRSxFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pELE9BQU8sSUFBSSxJQUFJLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxNQUFNLENBQUMsRUFBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ3pHLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVyxDQUFDLEtBQUs7UUFDYixJQUFJLEtBQUssWUFBWSxLQUFLLEVBQUU7WUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxRQUFRLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQztTQUNyRTtJQUNMLENBQUM7Q0FDSixDQUFBO0FBdkRHO0lBREMsZUFBTSxFQUFFOzt1RUFDYTtBQUV0QjtJQURDLGVBQU0sRUFBRTs7aUZBQ3VCO0FBRWhDO0lBREMsZUFBTSxFQUFFOzt1RUFDcUM7QUFackMsd0JBQXdCO0lBRnBDLGNBQUssQ0FBQyxrQkFBUyxDQUFDLFNBQVMsQ0FBQztJQUMxQixnQkFBTyxDQUFDLGVBQWUsOEJBQXVCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztHQUN4RCx3QkFBd0IsQ0ErRHBDO0FBL0RZLDREQUF3QiJ9