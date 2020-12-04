"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function httpProxyHandlerMiddleware(_options, _app) {
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
}
exports.default = httpProxyHandlerMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1wcm94eS1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9taWRkbGV3YXJlL2h0dHAtcHJveHktaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVNBLFNBQXdCLDBCQUEwQixDQUFDLFFBQXVCLEVBQUUsSUFBd0I7SUFFaEcsT0FBTyxLQUFLLFdBQVcsR0FBbUIsRUFBRSxJQUFJO1FBRTVDLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxXQUF5QyxDQUFDO1FBQ2xFLE1BQU0sZ0JBQWdCLEdBQXNCLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDdkYsTUFBTSxnQkFBZ0IsR0FBc0IsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN2RixNQUFNLG1CQUFtQixHQUF5QixHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2hHLE1BQU0sbUJBQW1CLEdBQXlCLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDaEcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLG1CQUFtQixDQUFDLHlCQUF5QixDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTVILGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUvQixNQUFNLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbkYsR0FBRyxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsbUJBQW1CLENBQUMsMkJBQTJCLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFL0UsTUFBTSxnQkFBZ0IsR0FBVyxHQUFHLENBQUMsZUFBZSxDQUFDO1FBQ3JELE1BQU0saUJBQWlCLEdBQVcsR0FBRyxDQUFDLGlCQUFpQixDQUFDO1FBRXhELEdBQUcsQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFFdEYsTUFBTSxJQUFJLEVBQUUsQ0FBQTtJQUNoQixDQUFDLENBQUE7QUFDTCxDQUFDO0FBeEJELDZDQXdCQyJ9