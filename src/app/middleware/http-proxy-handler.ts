import {
    IGatewayErrorHandler,
    IGatewayMatchService,
    IHttpRequestProxy,
    IIdentityTransmit,
    IRequestContextGatewayInfo
} from '../../interface';
import {FreelogApplication, FreelogContext} from 'egg-freelog-base';

export default function httpProxyHandlerMiddleware(_options: object | null, _app: FreelogApplication): any {

    return async function (ctx: FreelogContext, next) {

        const gatewayInfo = ctx.gatewayInfo as IRequestContextGatewayInfo;
        const identityTransmit: IIdentityTransmit = ctx.requestContext.get('identityTransmit');
        const httpRequestProxy: IHttpRequestProxy = ctx.requestContext.get('httpRequestProxy');
        const gatewayMatchService: IGatewayMatchService = ctx.requestContext.get('gatewayMatchService');
        const gatewayErrorHandler: IGatewayErrorHandler = ctx.requestContext.get('gatewayErrorHandler');
        gatewayInfo.routerInfo.upstream.forwardUrl = gatewayMatchService.generateUpstreamRouterUrl(gatewayInfo.routerInfo, ctx.url);

        identityTransmit.transmit(ctx);

        await httpRequestProxy.httpProxy(ctx, gatewayInfo.routerInfo.upstream).then(response => {
            ctx.proxyResponse = response;
        }).catch(error => gatewayErrorHandler.httpRequestProxyErrorHandle(ctx, error));

        const startRequestTime: number = ctx.startRquestTime;
        const startResponseTime: number = ctx.startResponseTime;

        ctx.set('x-service-response-time', (startResponseTime - startRequestTime).toString());

        await next();
    };
}
