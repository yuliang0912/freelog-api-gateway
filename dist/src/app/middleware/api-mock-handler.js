module.exports = (option, app) => {
    return async function (ctx, next) {
        if (!ctx.gatewayInfo?.routerInfo?.mockStatus) {
            return await next();
        }
        ctx.body = { msg: "mock data" };
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLW1vY2staGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvbWlkZGxld2FyZS9hcGktbW9jay1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFFN0IsT0FBTyxLQUFLLFdBQVcsR0FBRyxFQUFFLElBQUk7UUFFNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRTtZQUMxQyxPQUFPLE1BQU0sSUFBSSxFQUFFLENBQUE7U0FDdEI7UUFFRCxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUMsR0FBRyxFQUFFLFdBQVcsRUFBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQTtBQUNMLENBQUMsQ0FBQSJ9