"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function apiMockHandlerMiddleware(_options, _app) {
    return async function (ctx, next) {
        if (!ctx.gatewayInfo?.routerInfo?.mockStatus) {
            return await next();
        }
        const gatewayService = ctx.requestContext.get('gatewayService');
        const mockData = await gatewayService.getMockData(ctx.gatewayInfo.routerInfo.routerId);
        ctx.body = mockData.mockData;
        ctx.set('content-type', mockData.contentType);
    };
}
exports.default = apiMockHandlerMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLW1vY2staGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvbWlkZGxld2FyZS9hcGktbW9jay1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsU0FBd0Isd0JBQXdCLENBQUMsUUFBdUIsRUFBRSxJQUF3QjtJQUU5RixPQUFPLEtBQUssV0FBVyxHQUFtQixFQUFFLElBQUk7UUFFNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRTtZQUMxQyxPQUFPLE1BQU0sSUFBSSxFQUFFLENBQUE7U0FDdEI7UUFFRCxNQUFNLGNBQWMsR0FBb0IsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRixNQUFNLFFBQVEsR0FBRyxNQUFNLGNBQWMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUE7UUFFdEYsR0FBRyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUE7QUFDTCxDQUFDO0FBZEQsMkNBY0MifQ==