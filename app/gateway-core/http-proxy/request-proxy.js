'use strict'

const lodash = require('lodash')
const Request = require('request-promise')

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

        // if (!["GET", "HEAD", "DELETE"].includes(method)) {
        //     if (ctx.is('multipart') && ctx.req.readable) {
        //         options.timeout = 1800000; //文件流超时设置为30分钟
        //     }
        //     if (ctx.is('json')) {
        //         options.body = ctx.request.body
        //         options.json = true
        //     }
        //     else if (ctx.is('urlencoded')) {
        //         options.form = ctx.request.body
        //     }
        //     else if (lodash.isBuffer(ctx.request.body) || lodash.isString(ctx.request.body)) {
        //         options.body = ctx.request.body
        //     }
        // }

        //设置HOST,不然代理网页的时候无法正常加载
        //options.headers.host = serverInfo.serverIp
        // options.simple = false
        // options.resolveWithFullResponse = true
        // delete options.headers['content-length'] //放最后.不然影响ctx.is函数
        // ctx.startProxyStartTime = Date.now()
        // const proxyServer = Request(options)
        // if (ctx.req.readable && !["GET", "HEAD", "DELETE"].includes(method)) {
        //     ctx.req.pipe(proxyServer)
        // }
        // return proxyServer

        return new Promise((resolve, reject) => {
            ctx.startProxyStartTime = Date.now()
            ctx.proxyInfo = {type: "request", gatewayUri: options.uri, method}
            delete options.headers['content-length'] //放最后.不然影响ctx.is函数
            const proxyServer = Request(options, (error, response) => error ? reject(error) : resolve(response))
            //网关不再解析body内容,直接通过流式传递
            if (ctx.req.readable && !["GET", "HEAD", "DELETE"].includes(method)) {
                ctx.req.pipe(proxyServer)
            }
        })
    }
}