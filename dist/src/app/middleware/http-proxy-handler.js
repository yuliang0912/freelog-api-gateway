"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (options) => {
    return async function (ctx, next) {
        const gatewayInfo = ctx.gatewayInfo;
        const identityTransmit = ctx.requestContext.get('identityTransmit');
        const httpRequestProxy = ctx.requestContext.get('httpRequestProxy');
        const gatewayMatchService = ctx.requestContext.get('gatewayMatchService');
        const gatewayErrorHandler = ctx.requestContext.get('gatewayErrorHandler');
        gatewayInfo.routerInfo.upstream.forwardUrl = gatewayMatchService.generateUpstreamRouterUrl(gatewayInfo.routerInfo, ctx.url);
        identityTransmit.transmit(ctx);
        await httpRequestProxy.httpProxy(ctx, gatewayInfo.routerInfo.upstream).then(response => {
            ctx.proxyResponse = response;
        }).catch(error => gatewayErrorHandler.httpRequestProxyErrorHandle(ctx, error));
        const startRequestTime = ctx.startRquestTime;
        const startResponseTime = ctx.startResponseTime;
        ctx.set('x-service-response-time', (startResponseTime - startRequestTime).toString());
        await next();
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1wcm94eS1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9taWRkbGV3YXJlL2h0dHAtcHJveHktaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVNBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxPQUFnQixFQUFFLEVBQUU7SUFFbEMsT0FBTyxLQUFLLFdBQVcsR0FBWSxFQUFFLElBQUk7UUFFckMsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLFdBQXlDLENBQUM7UUFDbEUsTUFBTSxnQkFBZ0IsR0FBc0IsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN2RixNQUFNLGdCQUFnQixHQUFzQixHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3ZGLE1BQU0sbUJBQW1CLEdBQXlCLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDaEcsTUFBTSxtQkFBbUIsR0FBeUIsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNoRyxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsbUJBQW1CLENBQUMseUJBQXlCLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFNUgsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRS9CLE1BQU0sZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNuRixHQUFHLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQywyQkFBMkIsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUUvRSxNQUFNLGdCQUFnQixHQUFXLEdBQUcsQ0FBQyxlQUFlLENBQUM7UUFDckQsTUFBTSxpQkFBaUIsR0FBVyxHQUFHLENBQUMsaUJBQWlCLENBQUM7UUFFeEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUV0RixNQUFNLElBQUksRUFBRSxDQUFBO0lBQ2hCLENBQUMsQ0FBQTtBQUNMLENBQUMsQ0FBQSJ9