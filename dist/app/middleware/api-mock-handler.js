"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function apiMockHandlerMiddleware(_options, _app) {
    return async function (ctx, next) {
        if (!ctx.gatewayInfo?.routerInfo?.mockStatus) {
            return await next();
        }
        ctx.body = { msg: "mock data" };
    };
}
exports.default = apiMockHandlerMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLW1vY2staGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvbWlkZGxld2FyZS9hcGktbW9jay1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsU0FBd0Isd0JBQXdCLENBQUMsUUFBdUIsRUFBRSxJQUF3QjtJQUU5RixPQUFPLEtBQUssV0FBVyxHQUFHLEVBQUUsSUFBSTtRQUU1QixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFO1lBQzFDLE9BQU8sTUFBTSxJQUFJLEVBQUUsQ0FBQTtTQUN0QjtRQUVELEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBQyxHQUFHLEVBQUUsV0FBVyxFQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFBO0FBQ0wsQ0FBQztBQVZELDJDQVVDIn0=