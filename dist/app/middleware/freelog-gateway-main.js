"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const egg_freelog_base_1 = require("egg-freelog-base");
module.exports = (options) => {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJlZWxvZy1nYXRld2F5LW1haW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL21pZGRsZXdhcmUvZnJlZWxvZy1nYXRld2F5LW1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBNkI7QUFDN0IsdURBQXFEO0FBS3JELE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxPQUFnQixFQUFFLEVBQUU7SUFFbEMsT0FBTyxLQUFLLFdBQVcsR0FBRyxFQUFFLElBQUk7UUFFNUIsTUFBTSxtQkFBbUIsR0FBeUIsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNoRyxNQUFNLG1CQUFtQixHQUF5QixHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2hHLE1BQU0sb0JBQW9CLEdBQTBCLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFbkcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixFQUFFO1lBQ3hDLE1BQU0sSUFBSSx1Q0FBb0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3REO1FBRUQsTUFBTSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsR0FBRyxHQUFHLENBQUM7UUFDM0IsTUFBTSxZQUFZLEdBQUcsY0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN2RSxNQUFNLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEYsTUFBTSxVQUFVLEdBQUcsbUJBQW1CLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFN0UsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNiLG1CQUFtQixDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25ELE9BQU87U0FDVjtRQUVELE1BQU0sV0FBVyxHQUErQjtZQUM1QyxVQUFVLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSx1QkFBdUIsRUFBRSxFQUFFO1NBQzVELENBQUM7UUFFRixHQUFHLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUM5QixHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFNUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV4QixNQUFNLElBQUksRUFBRSxDQUFBO0lBQ2hCLENBQUMsQ0FBQTtBQUNMLENBQUMsQ0FBQSJ9