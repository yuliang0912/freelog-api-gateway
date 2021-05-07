"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosProxy = void 0;
const midway_1 = require("midway");
let AxiosProxy = class AxiosProxy {
    /**
     * httpClient请求处理
     * @param ctx
     * @param upstreamRouterInfo
     * @returns {Promise<any>}
     */
    async httpProxy(ctx, upstreamRouterInfo) {
        const { protocol, method, port, serverGroupInfo, forwardUrl } = upstreamRouterInfo;
        const serverInfo = serverGroupInfo.servers.find(x => x.status === 1);
        const options = {
            method: upstreamRouterInfo.method ?? method,
            uri: `${protocol}://${serverInfo.serverIp}:${port}${forwardUrl}`,
            headers: ctx.headers || {},
            json: false,
            gzip: false,
            timeout: 30000,
            encoding: null
        };
        options.headers['traceId'] = ctx.traceId;
        options.headers['requestId'] = ctx.requestId;
        if (!options.headers['Accept-Language'] && !options.headers['accept-language']) {
            options.headers['Accept-Language'] = 'zh-CN,zh;q=0.5';
        }
        delete options.headers['content-length'];
        ctx.proxyInfo = { type: 'request', gatewayUri: options.uri, method: options.method };
        ctx.startRquestTime = Date.now();
        return this._httpRequest(ctx, options).finally(() => ctx.startResponseTime = Date.now());
    }
    async _httpRequest(ctx, options) {
        //暂不启用直接pipe到ctx.res方案,一般大文件传输才需要考虑
        // const proxyServer = Request(options)
        // if (ctx.req.readable && !["GET", "HEAD", "DELETE"].includes(method)) {
        //     ctx.req.pipe(proxyServer)
        // }
        // return new Promise((resolve, reject) => {
        //     proxyServer.on('response', resolve).on('error', reject).pipe(ctx.res)
        // })
    }
};
AxiosProxy = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide()
], AxiosProxy);
exports.AxiosProxy = AxiosProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpb3MtcHJveHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ2F0ZXdheS1jb3JlL2h0dHAtcHJveHkvYXhpb3MtcHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbUNBQTBEO0FBTTFELElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7SUFFbkI7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQVksRUFBRSxrQkFBZ0M7UUFFMUQsTUFBTSxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUMsR0FBRyxrQkFBa0IsQ0FBQztRQUNqRixNQUFNLFVBQVUsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFckUsTUFBTSxPQUFPLEdBQUc7WUFDWixNQUFNLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxJQUFJLE1BQU07WUFDM0MsR0FBRyxFQUFFLEdBQUcsUUFBUSxNQUFNLFVBQVUsQ0FBQyxRQUFRLElBQUksSUFBSSxHQUFHLFVBQVUsRUFBRTtZQUNoRSxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sSUFBSSxFQUFFO1lBQzFCLElBQUksRUFBRSxLQUFLO1lBQ1gsSUFBSSxFQUFFLEtBQUs7WUFDWCxPQUFPLEVBQUUsS0FBSztZQUNkLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUM7UUFDRixPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDekMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDNUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLGdCQUFnQixDQUFDO1NBQ3pEO1FBRUQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFekMsR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUMsQ0FBQztRQUNuRixHQUFHLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVqQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBWSxFQUFFLE9BQU87UUFDcEMsbUNBQW1DO1FBQ25DLHVDQUF1QztRQUN2Qyx5RUFBeUU7UUFDekUsZ0NBQWdDO1FBQ2hDLElBQUk7UUFDSiw0Q0FBNEM7UUFDNUMsNEVBQTRFO1FBQzVFLEtBQUs7SUFDVCxDQUFDO0NBQ0osQ0FBQTtBQTlDWSxVQUFVO0lBRnRCLGNBQUssQ0FBQyxrQkFBUyxDQUFDLFNBQVMsQ0FBQztJQUMxQixnQkFBTyxFQUFFO0dBQ0csVUFBVSxDQThDdEI7QUE5Q1ksZ0NBQVUifQ==