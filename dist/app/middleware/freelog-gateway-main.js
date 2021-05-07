"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const egg_freelog_base_1 = require("egg-freelog-base");
function freelogGatewayMainMiddleware(_options, _app) {
    return async function (ctx, next) {
        const gatewayErrorHandler = ctx.requestContext.get('gatewayErrorHandler');
        const gatewayMatchService = ctx.requestContext.get('gatewayMatchService');
        const gatewayConfigService = ctx.requestContext.get('gatewayConfigService');
        if (!gatewayConfigService.isSetGatewayInfo) {
            throw new egg_freelog_base_1.GatewayArgumentError('网关配置尚未加载完毕,请稍后再试');
        }
        const { path, method } = ctx;
        const routerPrefix = lodash_1.split(path.toLowerCase(), '/', 3).join('/') + '/';
        const routerList = gatewayConfigService.getRouterListByPrefix(routerPrefix, method);
        const routerInfo = gatewayMatchService.matchRouter(routerList, path, method);
        if (!routerInfo) {
            gatewayErrorHandler.routerNotMatchErrorHandle(ctx);
            return;
        }
        const gatewayInfo = {
            routerInfo, identityInfo: {}, componentProcessResults: []
        };
        ctx.gatewayInfo = gatewayInfo;
        ctx.set('x-router-id', routerInfo.routerId);
        ctx.success(routerInfo);
        await next();
    };
}
exports.default = freelogGatewayMainMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJlZWxvZy1nYXRld2F5LW1haW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL21pZGRsZXdhcmUvZnJlZWxvZy1nYXRld2F5LW1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBNkI7QUFDN0IsdURBQTBGO0FBSzFGLFNBQXdCLDRCQUE0QixDQUFDLFFBQXVCLEVBQUUsSUFBd0I7SUFFbEcsT0FBTyxLQUFLLFdBQVcsR0FBbUIsRUFBRSxJQUFJO1FBRTVDLE1BQU0sbUJBQW1CLEdBQXlCLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDaEcsTUFBTSxtQkFBbUIsR0FBeUIsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNoRyxNQUFNLG9CQUFvQixHQUEwQixHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBRW5HLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN4QyxNQUFNLElBQUksdUNBQW9CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUN0RDtRQUVELE1BQU0sRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzNCLE1BQU0sWUFBWSxHQUFHLGNBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDdkUsTUFBTSxVQUFVLEdBQUcsb0JBQW9CLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BGLE1BQU0sVUFBVSxHQUFHLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTdFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDYixtQkFBbUIsQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRCxPQUFPO1NBQ1Y7UUFFRCxNQUFNLFdBQVcsR0FBK0I7WUFDNUMsVUFBVSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsRUFBRTtTQUM1RCxDQUFDO1FBRUYsR0FBRyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDOUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTVDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEIsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUNqQixDQUFDLENBQUM7QUFDTixDQUFDO0FBakNELCtDQWlDQyJ9