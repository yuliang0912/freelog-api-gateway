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
const midway_1 = require("midway");
let GatewayService = class GatewayService {
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
    __metadata("design:type", Object)
], GatewayService.prototype, "apiRouterProvider", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], GatewayService.prototype, "clientInfoProvider", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], GatewayService.prototype, "serverGroupProvider", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], GatewayService.prototype, "httpComponentHandleRuleProvider", void 0);
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], GatewayService.prototype, "gatewayConfigService", void 0);
GatewayService = __decorate([
    midway_1.provide(),
    midway_1.scope(midway_1.ScopeEnum.Singleton)
], GatewayService);
exports.GatewayService = GatewayService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZXdheS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9zZXJ2aWNlL2dhdGV3YXktc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBK0I7QUFDL0IsbUNBQXlEO0FBUXpELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFhdkIsS0FBSyxDQUFDLGtCQUFrQjtRQUVwQixNQUFNLFNBQVMsR0FBRyxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQztRQUM5QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sMkJBQTJCLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWpGLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSx3QkFBd0IsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLDJCQUEyQixDQUFDLENBQUMsQ0FBQztRQUU3SixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBaUIsQ0FBQztRQUMzRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBaUIsQ0FBQztRQUMzRCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBc0IsQ0FBQztRQUMxRSxNQUFNLDJCQUEyQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQThCLENBQUM7UUFFMUcsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLDJCQUEyQixDQUFDLENBQUM7SUFDMUgsQ0FBQztJQUVELEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBaUI7UUFDL0IsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQWlCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFNBQWlCO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsS0FBSyxDQUFDLDRCQUE0QixDQUFDLFNBQWlCO1FBQ2hELE9BQU8sSUFBSSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQXlCO1FBQy9CLElBQUksZ0JBQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNqQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBTyxDQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtTQUM5QztRQUNELE9BQWEsTUFBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7Q0FDSixDQUFBO0FBbERHO0lBREMsZUFBTSxFQUFFOzt5REFDUztBQUVsQjtJQURDLGVBQU0sRUFBRTs7MERBQ1U7QUFFbkI7SUFEQyxlQUFNLEVBQUU7OzJEQUNXO0FBRXBCO0lBREMsZUFBTSxFQUFFOzt1RUFDdUI7QUFFaEM7SUFEQyxlQUFNLEVBQUU7OzREQUNtQztBQVhuQyxjQUFjO0lBRjFCLGdCQUFPLEVBQUU7SUFDVCxjQUFLLENBQUMsa0JBQVMsQ0FBQyxTQUFTLENBQUM7R0FDZCxjQUFjLENBcUQxQjtBQXJEWSx3Q0FBYyJ9