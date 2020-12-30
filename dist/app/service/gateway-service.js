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
exports.GatewayService = void 0;
const lodash_1 = require("lodash");
const egg_freelog_base_1 = require("egg-freelog-base");
const midway_1 = require("midway");
const api_mock_data_provider_1 = require("../data-provider/api-mock-data-provider");
let GatewayService = class GatewayService {
    async getMockData(routerId) {
        return this.apiMockDataProvider.findOne({ routerId });
    }
    async updateRouterConfig() {
        const condition = { status: 1 };
        const routerTask = this.findRouters(condition);
        const clientTask = this.findClients(condition);
        const serverGroupTask = this.findServerGroups(condition);
        const httpComponentHandleRuleTask = this.findHttpComponentHandleRules(condition);
        const [routers, clients, serverGroups, httpComponentHandleRules] = await Promise.all([routerTask, clientTask, serverGroupTask, httpComponentHandleRuleTask]);
        const routerList = this.toObjects(routers);
        const clientList = this.toObjects(clients);
        const serverGroupList = this.toObjects(serverGroups);
        const httpComponentHandleRuleList = this.toObjects(httpComponentHandleRules);
        return this.gatewayConfigService.setGatewayInfo(routerList, clientList, serverGroupList, httpComponentHandleRuleList);
    }
    async findRouters(condition) {
        return this.apiRouterProvider.find(condition);
    }
    async findClients(condition) {
        return this.clientInfoProvider.find(condition);
    }
    async findServerGroups(condition) {
        return this.serverGroupProvider.find(condition);
    }
    async findHttpComponentHandleRules(condition) {
        return this.httpComponentHandleRuleProvider.find(condition);
    }
    toObjects(target) {
        if (lodash_1.isArray(target)) {
            return target.map(x => x.toObject());
        }
        return target?.toObject();
    }
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", api_mock_data_provider_1.default)
], GatewayService.prototype, "apiMockDataProvider", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], GatewayService.prototype, "gatewayConfigService", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", egg_freelog_base_1.MongodbOperation)
], GatewayService.prototype, "apiRouterProvider", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", egg_freelog_base_1.MongodbOperation)
], GatewayService.prototype, "clientInfoProvider", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", egg_freelog_base_1.MongodbOperation)
], GatewayService.prototype, "serverGroupProvider", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", egg_freelog_base_1.MongodbOperation)
], GatewayService.prototype, "httpComponentHandleRuleProvider", void 0);
GatewayService = __decorate([
    midway_1.provide(),
    midway_1.scope(midway_1.ScopeEnum.Singleton)
], GatewayService);
exports.GatewayService = GatewayService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZXdheS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9zZXJ2aWNlL2dhdGV3YXktc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBK0I7QUFDL0IsdURBQWtEO0FBQ2xELG1DQUF5RDtBQUt6RCxvRkFBMEU7QUFJMUUsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQWV2QixLQUFLLENBQUMsV0FBVyxDQUFDLFFBQWdCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELEtBQUssQ0FBQyxrQkFBa0I7UUFFcEIsTUFBTSxTQUFTLEdBQUcsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFDOUIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6RCxNQUFNLDJCQUEyQixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVqRixNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsd0JBQXdCLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDLENBQUM7UUFFN0osTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQWlCLENBQUM7UUFDM0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQWlCLENBQUM7UUFDM0QsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQXNCLENBQUM7UUFDMUUsTUFBTSwyQkFBMkIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUE4QixDQUFDO1FBRTFHLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO0lBQzFILENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQWlCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFpQjtRQUMvQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFpQjtRQUNwQyxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxTQUFpQjtRQUNoRCxPQUFPLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUF5QjtRQUMvQixJQUFJLGdCQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDakIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQU8sQ0FBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7U0FDOUM7UUFDRCxPQUFhLE1BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0NBQ0osQ0FBQTtBQXhERztJQURDLGVBQU0sRUFBRTs4QkFDWSxnQ0FBbUI7MkRBQUM7QUFFekM7SUFEQyxlQUFNLEVBQUU7OzREQUNtQztBQUU1QztJQURDLGVBQU0sRUFBRTs4QkFDVSxtQ0FBZ0I7eURBQWE7QUFFaEQ7SUFEQyxlQUFNLEVBQUU7OEJBQ1csbUNBQWdCOzBEQUFhO0FBRWpEO0lBREMsZUFBTSxFQUFFOzhCQUNZLG1DQUFnQjsyREFBa0I7QUFFdkQ7SUFEQyxlQUFNLEVBQUU7OEJBQ3dCLG1DQUFnQjt1RUFBMEI7QUFibEUsY0FBYztJQUYxQixnQkFBTyxFQUFFO0lBQ1QsY0FBSyxDQUFDLGtCQUFTLENBQUMsU0FBUyxDQUFDO0dBQ2QsY0FBYyxDQTJEMUI7QUEzRFksd0NBQWMifQ==