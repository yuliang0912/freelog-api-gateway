import {split} from 'lodash';
import {FreelogApplication, FreelogContext, GatewayArgumentError} from 'egg-freelog-base';
import {
    IGatewayConfigService, IGatewayErrorHandler, IGatewayMatchService, IRequestContextGatewayInfo
} from '../../interface';

export default function freelogGatewayMainMiddleware(_options: object | null, _app: FreelogApplication): any {

    return async function (ctx: FreelogContext, next) {

        const gatewayErrorHandler: IGatewayErrorHandler = ctx.requestContext.get('gatewayErrorHandler');
        const gatewayMatchService: IGatewayMatchService = ctx.requestContext.get('gatewayMatchService');
        const gatewayConfigService: IGatewayConfigService = ctx.requestContext.get('gatewayConfigService');

        if (!gatewayConfigService.isSetGatewayInfo) {
            throw new GatewayArgumentError('网关配置尚未加载完毕,请稍后再试');
        }

        const {path, method} = ctx;
        const routerPrefix = split(path.toLowerCase(), '/', 3).join('/') + '/';
        const routerList = gatewayConfigService.getRouterListByPrefix(routerPrefix, method);
        const routerInfo = gatewayMatchService.matchRouter(routerList, path, method);

        if (!routerInfo) {
            gatewayErrorHandler.routerNotMatchErrorHandle(ctx);
            return;
        }

        const gatewayInfo: IRequestContextGatewayInfo = {
            routerInfo, identityInfo: {}, componentProcessResults: []
        };

        ctx.gatewayInfo = gatewayInfo;
        ctx.set('x-router-id', routerInfo.routerId);

        ctx.success(routerInfo);

        await next();
    };
}
