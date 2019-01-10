'use strict'

const Request = require('request')

module.exports = class HttpRequestProxy {

    /**
     * httpClient请求处理
     * @param ctx
     * @param upstreamRouterInfo
     * @returns {Promise<any>}
     */
    async httpProxy(ctx, upstreamRouterInfo) {

        const {protocol, method, serverInfo, port, forwardUri} = upstreamRouterInfo

        const options = {
            method,
            uri: `${protocol}://${serverInfo.serverIp}:${port}${forwardUri}`,
            headers: ctx.headers || {},
            json: false,
            gzip: false, //无需解压响应的内容
            timeout: 30000, //默认30秒
            encoding: null
        }
        options.headers.requestId = ctx.request.requestId

        ctx.startProxyStartTime = Date.now()
        ctx.proxyInfo = {type: "request", gatewayUri: options.uri, method}

        return new Promise((resolve, reject) => {
            const proxyServer = Request(options, (error, response) => error ? reject(error) : resolve(response))
            //网关不再解析body内容,直接通过流式传递
            if (ctx.req.readable && !["GET", "HEAD", "DELETE"].includes(method)) {
                ctx.req.pipe(proxyServer)
            }
        })

        // return new Promise((resolve, reject) => {
        //     const proxyServer = Request(options)
        //     //网关不再解析body内容,直接通过流式传递
        //     if (ctx.req.readable && !["GET", "HEAD", "DELETE"].includes(method)) {
        //         ctx.req.pipe(proxyServer)
        //     }
        //     proxyServer.on('response', resolve).on('error', reject).pipe(ctx.res)
        // })
    }
}

