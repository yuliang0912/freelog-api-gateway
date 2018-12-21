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

        ctx.proxy = {type: "request", gatewayUri: options.uri, method}

        //设置HOST,不然代理网页的时候无法正常加载
        options.headers.host = serverInfo.serverIp
        options.headers.requestId = ctx.request.requestId

        delete options.headers['content-length']

        if (["POST", "PUT"].includes(method)) {
            if (ctx.is('urlencoded')) {
                options.form = ctx.request.body
            }
            else if (ctx.is('json')) {
                options.body = ctx.request.body
                options.json = true
            }
            else if (!this._isEmptyObject(ctx.request.body)) {
                options.body = ctx.request.body
            }
            else if (ctx.is('multipart') && ctx.req.readable) {
                options.timeout = 1800000; //文件流超时设置为30分钟
            }
        }

        return new Promise((resolve, reject) => {
            const proxyServer = Request(options, (error, response) => error ? reject(error) : resolve(response))
            if (ctx.req.readable && ["POST", "PUT"].includes(method)) {
                ctx.req.pipe(proxyServer)
            }
        })
    }

    /**
     * 是否空的object对象
     * @private
     */
    _isEmptyObject(obj) {
        if (toString.call(obj) !== "[object Object]") {
            return false
        }
        return Object.keys(obj).length === 0
    }
}