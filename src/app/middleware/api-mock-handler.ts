import {FreelogApplication} from "egg-freelog-base";

export default function apiMockHandlerMiddleware(_options: object | null, _app: FreelogApplication): any {

    return async function (ctx, next) {

        if (!ctx.gatewayInfo?.routerInfo?.mockStatus) {
            return await next()
        }

        ctx.body = {msg: "mock data"};
    }
}
