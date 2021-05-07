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
exports.RequestRecordHandler = void 0;
const midway_1 = require("midway");
const async_1 = require("async");
const enum_1 = require("../../../enum");
let RequestRecordHandler = class RequestRecordHandler {
    constructor() {
        this.comName = enum_1.RouterComponentNameEnum.Request_record;
        this.comType = enum_1.RouterComponentTypeEnum.Statistics;
        this.comLevel = enum_1.RouterComponentLevelEnum.ResponseAfter;
        this.taskQueue = async_1.queue(this.requestRecordHandle.bind(this), 50);
    }
    async handle(ctx, config) {
        const { routerId, routerUrlRule } = ctx.gatewayInfo.routerInfo;
        this.taskQueue.push({ routerId, routerUrlRule }, this.errorHandle.bind(this));
        return this.componentHandleResult.build(this.comName, this.comType).setHandleResult(true);
    }
    /**
     * 流量统计数据保存
     * @param routerId
     * @param routerUrlRule
     */
    async requestRecordHandle() {
        // console.log(this.ctx.host);
        // 暂时不保持每次的请求记录.后续可以考虑加入到日志系统中,目前记录在流量统计中一起实现了
    }
    /**
     * 错误处理
     * @param err
     */
    errorHandle(error) {
        if (error instanceof Error) {
            console.log(`gateway_com_${enum_1.RouterComponentNameEnum.Request_record}`, '事件执行异常', ...arguments);
            this.logger.error(`gateway_com_${enum_1.RouterComponentNameEnum.Request_record}`, '事件执行异常', ...arguments);
        }
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], RequestRecordHandler.prototype, "logger", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], RequestRecordHandler.prototype, "componentHandleResult", void 0);
RequestRecordHandler = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide(`gateway_com_${enum_1.RouterComponentNameEnum.Request_record}`)
], RequestRecordHandler);
exports.RequestRecordHandler = RequestRecordHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1yZWNvcmQtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9nYXRld2F5LWNvcmUvY29tcG9uZW50cy9vdGhlci9yZXF1ZXN0LXJlY29yZC1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1DQUF5RDtBQUl6RCxpQ0FBNEI7QUFDNUIsd0NBQXlHO0FBS3pHLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBQWpDO1FBRUksWUFBTyxHQUFHLDhCQUF1QixDQUFDLGNBQWMsQ0FBQztRQUNqRCxZQUFPLEdBQUcsOEJBQXVCLENBQUMsVUFBVSxDQUFDO1FBQzdDLGFBQVEsR0FBRywrQkFBd0IsQ0FBQyxhQUFhLENBQUM7UUFDbEQsY0FBUyxHQUFHLGFBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBcUMvRCxDQUFDO0lBOUJHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBbUIsRUFBRSxNQUFlO1FBRTdDLE1BQU0sRUFBQyxRQUFRLEVBQUUsYUFBYSxFQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7UUFFN0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUsYUFBYSxFQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUU1RSxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFHRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLG1CQUFtQjtRQUNyQiw4QkFBOEI7UUFDOUIsOENBQThDO0lBQ2xELENBQUM7SUFFRDs7O09BR0c7SUFDSCxXQUFXLENBQUMsS0FBSztRQUNiLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsOEJBQXVCLENBQUMsY0FBYyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDN0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSw4QkFBdUIsQ0FBQyxjQUFjLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQztTQUN0RztJQUNMLENBQUM7Q0FDSixDQUFBO0FBbENHO0lBREMsZUFBTSxFQUFFOztvREFDRjtBQUVQO0lBREMsZUFBTSxFQUFFOzttRUFDcUM7QUFWckMsb0JBQW9CO0lBRmhDLGNBQUssQ0FBQyxrQkFBUyxDQUFDLFNBQVMsQ0FBQztJQUMxQixnQkFBTyxDQUFDLGVBQWUsOEJBQXVCLENBQUMsY0FBYyxFQUFFLENBQUM7R0FDcEQsb0JBQW9CLENBMENoQztBQTFDWSxvREFBb0IifQ==