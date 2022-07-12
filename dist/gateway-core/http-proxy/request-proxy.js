"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequestProxy = void 0;
const midway_1 = require("midway");
const Request = require('request');
const Promise = require('bluebird');
let HttpRequestProxy = class HttpRequestProxy {
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
            method: method ?? ctx.method,
            uri: `${protocol}://${serverInfo.serverIp}:${port}${forwardUrl}`,
            headers: ctx.headers || {},
            json: false,
            gzip: false,
            timeout: 30000,
            encoding: null
        };
        options.uri = options.uri.replace('http://api-identity-service.production:7111/', 'http://api.testfreelog.com/');
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
        return new Promise((resolve, reject) => {
            const proxyServer = Request(options, (error, response) => error ? reject(error) : resolve(response));
            if (ctx.req.readable && !['GET', 'HEAD', 'DELETE'].includes(options.method)) {
                ctx.req.pipe(proxyServer);
            }
            if (ctx.res.writable) {
                proxyServer.pipe(ctx.res);
            }
        });
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
HttpRequestProxy = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide()
], HttpRequestProxy);
exports.HttpRequestProxy = HttpRequestProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1wcm94eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9nYXRld2F5LWNvcmUvaHR0cC1wcm94eS9yZXF1ZXN0LXByb3h5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUEwRDtBQUcxRCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBSXBDLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBRXpCOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFZLEVBQUUsa0JBQWdDO1FBRTFELE1BQU0sRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFDLEdBQUcsa0JBQWtCLENBQUM7UUFDakYsTUFBTSxVQUFVLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRXJFLE1BQU0sT0FBTyxHQUFHO1lBQ1osTUFBTSxFQUFFLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBTTtZQUM1QixHQUFHLEVBQUUsR0FBRyxRQUFRLE1BQU0sVUFBVSxDQUFDLFFBQVEsSUFBSSxJQUFJLEdBQUcsVUFBVSxFQUFFO1lBQ2hFLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUU7WUFDMUIsSUFBSSxFQUFFLEtBQUs7WUFDWCxJQUFJLEVBQUUsS0FBSztZQUNYLE9BQU8sRUFBRSxLQUFLO1lBQ2QsUUFBUSxFQUFFLElBQUk7U0FDakIsQ0FBQztRQUNGLE9BQU8sQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsOENBQThDLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztRQUNqSCxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDekMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDNUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLGdCQUFnQixDQUFDO1NBQ3pEO1FBRUQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFekMsR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUMsQ0FBQztRQUNuRixHQUFHLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVqQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBWSxFQUFFLE9BQU87UUFFcEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3JHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDekUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDN0I7WUFDRCxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO2dCQUNsQixXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM3QjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsbUNBQW1DO1FBQ25DLHVDQUF1QztRQUN2Qyx5RUFBeUU7UUFDekUsZ0NBQWdDO1FBQ2hDLElBQUk7UUFDSiw0Q0FBNEM7UUFDNUMsNEVBQTRFO1FBQzVFLEtBQUs7SUFDVCxDQUFDO0NBQ0osQ0FBQTtBQTFEWSxnQkFBZ0I7SUFGNUIsY0FBSyxDQUFDLGtCQUFTLENBQUMsU0FBUyxDQUFDO0lBQzFCLGdCQUFPLEVBQUU7R0FDRyxnQkFBZ0IsQ0EwRDVCO0FBMURZLDRDQUFnQiJ9