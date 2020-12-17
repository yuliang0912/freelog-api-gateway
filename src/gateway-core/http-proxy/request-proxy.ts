import {Context, provide, scope, ScopeEnum} from 'midway'
import {IHttpRequestProxy, UpstreamInfo} from "../../interface";

const Request = require('request')
const Promise = require('bluebird')

@scope(ScopeEnum.Singleton)
@provide()
export class HttpRequestProxy implements IHttpRequestProxy {

    /**
     * httpClient请求处理
     * @param ctx
     * @param upstreamRouterInfo
     * @returns {Promise<any>}
     */
    async httpProxy(ctx: Context, upstreamRouterInfo: UpstreamInfo) {

        const {protocol, method, port, serverGroupInfo, forwardUrl} = upstreamRouterInfo
        const serverInfo = serverGroupInfo.servers.find(x => x.status === 1);

        const options = {
            method: upstreamRouterInfo.method ?? method,
            uri: `${protocol}://${serverInfo.serverIp}:${port}${forwardUrl}`,
            headers: ctx.headers || {},
            json: false,
            gzip: false, //无需解压响应的内容
            timeout: 30000, //默认30秒
            encoding: null
        }
        options.headers['traceId'] = ctx.traceId;
        options.headers['requestId'] = ctx.requestId;
        if (!options.headers['Accept-Language'] && !options.headers['accept-language']) {
            options.headers['Accept-Language'] = 'zh-CN,zh;q=0.5'
        }

        delete options.headers['content-length'];

        ctx.proxyInfo = {type: "request", gatewayUri: options.uri, method: options.method};
        ctx.startRquestTime = Date.now();

        return this._httpRequest(ctx, options).finally(() => ctx.startResponseTime = Date.now())
    }

    async _httpRequest(ctx: Context, options) {

        return new Promise((resolve, reject) => {
            const proxyServer = Request(options, (error, response) => error ? reject(error) : resolve(response))
            if (ctx.req.readable && !["GET", "HEAD", "DELETE"].includes(options.method)) {
                ctx.req.pipe(proxyServer);
            }
            if (ctx.res.writable) {
                proxyServer.pipe(ctx.res);
            }
        })

        //暂不启用直接pipe到ctx.res方案,一般大文件传输才需要考虑
        // const proxyServer = Request(options)
        // if (ctx.req.readable && !["GET", "HEAD", "DELETE"].includes(method)) {
        //     ctx.req.pipe(proxyServer)
        // }
        // return new Promise((resolve, reject) => {
        //     proxyServer.on('response', resolve).on('error', reject).pipe(ctx.res)
        // })
    }
}
