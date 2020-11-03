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
        delete options.headers['content-length'];
        ctx.proxyInfo = { type: "request", gatewayUri: options.uri, method: options.method };
        ctx.startRquestTime = Date.now();
        return this._httpRequest(ctx, options).finally(() => ctx.startResponseTime = Date.now());
    }
    async _httpRequest(ctx, options) {
        return new Promise((resolve, reject) => {
            const proxyServer = Request(options, (error, response) => error ? reject(error) : resolve(response));
            if (ctx.req.readable && !["GET", "HEAD", "DELETE"].includes(options.method)) {
                ctx.req.pipe(proxyServer);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC1wcm94eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9nYXRld2F5LWNvcmUvaHR0cC1wcm94eS9yZXF1ZXN0LXByb3h5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUF5RDtBQUd6RCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7QUFDbEMsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBSW5DLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBRXpCOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFZLEVBQUUsa0JBQWdDO1FBRTFELE1BQU0sRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFDLEdBQUcsa0JBQWtCLENBQUE7UUFDaEYsTUFBTSxVQUFVLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRXJFLE1BQU0sT0FBTyxHQUFHO1lBQ1osTUFBTSxFQUFFLGtCQUFrQixDQUFDLE1BQU0sSUFBSSxNQUFNO1lBQzNDLEdBQUcsRUFBRSxHQUFHLFFBQVEsTUFBTSxVQUFVLENBQUMsUUFBUSxJQUFJLElBQUksR0FBRyxVQUFVLEVBQUU7WUFDaEUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLElBQUksRUFBRTtZQUMxQixJQUFJLEVBQUUsS0FBSztZQUNYLElBQUksRUFBRSxLQUFLO1lBQ1gsT0FBTyxFQUFFLEtBQUs7WUFDZCxRQUFRLEVBQUUsSUFBSTtTQUNqQixDQUFBO1FBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQ3pDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUU3QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUV4QyxHQUFHLENBQUMsU0FBUyxHQUFHLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBQyxDQUFDO1FBQ25GLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWpDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUM1RixDQUFDO0lBRUQsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFZLEVBQUUsT0FBTztRQUVwQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7WUFDcEcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN6RSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUM3QjtRQUNMLENBQUMsQ0FBQyxDQUFBO1FBRUYsbUNBQW1DO1FBQ25DLHVDQUF1QztRQUN2Qyx5RUFBeUU7UUFDekUsZ0NBQWdDO1FBQ2hDLElBQUk7UUFDSiw0Q0FBNEM7UUFDNUMsNEVBQTRFO1FBQzVFLEtBQUs7SUFDVCxDQUFDO0NBQ0osQ0FBQTtBQW5EWSxnQkFBZ0I7SUFGNUIsY0FBSyxDQUFDLGtCQUFTLENBQUMsU0FBUyxDQUFDO0lBQzFCLGdCQUFPLEVBQUU7R0FDRyxnQkFBZ0IsQ0FtRDVCO0FBbkRZLDRDQUFnQiJ9