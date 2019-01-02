'use strict'

const lodash = require('lodash')

class ComponentHandler {

    constructor(app) {
        this.app = app
        return this.main.bind(this)
    }

    /**
     * API数据返回格式校验
     */
    async main(ctx, next) {

        const {proxyResponse} = ctx
        const {headers, statusCode, body} = proxyResponse

        /**
         * 目前freelog-api服务限定只返回json或者附件文件两种.
         * 后续如果有其他需求可以拓展,或者直接在路由信息中进行格式检查配置
         * 此处暂未考虑304等.
         */
        if (!this._isJson(headers) && !this._isAttachment(headers)) {
            ctx.status = 500
            ctx.error({msg: "上游API未按协议返回数据格式", data: {proxy: ctx.proxyInfo, body: body.toString()}})
        }

        ctx.body = body
        ctx.status = statusCode
        Object.keys(headers).forEach(header => ctx.set(header, headers[header]))

        await next()
    }

    /**
     * 是否是附件
     * @private
     */
    _isAttachment(headers) {
        const header = headers['content-disposition'] || headers['Content-Disposition']
        return header && header.toLowerCase().includes('attachment; filename=')
    }

    /**
     * 是否JSON
     * @private
     */
    _isJson(headers) {
        const header = headers['content-type'] || headers['Content-Type']
        return header && header.toLowerCase().includes('application/json')
    }
}

module.exports = (option, app) => new ComponentHandler(app)