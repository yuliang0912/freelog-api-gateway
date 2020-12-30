import {FreelogApplication, FreelogContext} from "egg-freelog-base";
import {IGatewayService} from "../../interface";

export default function apiMockHandlerMiddleware(_options: object | null, _app: FreelogApplication): any {

    return async function (ctx: FreelogContext, next) {

        if (!ctx.gatewayInfo?.routerInfo?.mockStatus) {
            return await next()
        }

        const gatewayService: IGatewayService = ctx.requestContext.get('gatewayService');
        const mockData = await gatewayService.getMockData(ctx.gatewayInfo.routerInfo.routeId)

        ctx.body = mockData.mockData;
        ctx.set('content-type', mockData.contentType);
    }
}
