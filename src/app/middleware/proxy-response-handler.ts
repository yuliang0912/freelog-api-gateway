import {FreelogContext, ApiInvokingError, FreelogApplication} from 'egg-freelog-base';

export default function proxyResponseHandlerMiddleware(_options: object | null, _app: FreelogApplication): any {

    return async function (ctx: FreelogContext, next) {
        const {proxyResponse} = ctx;
        const {headers, statusCode, body} = proxyResponse;

        if (statusCode >= 500 && statusCode < 600) {
            ctx.error(new ApiInvokingError('上游API服务器异常', {proxy: ctx.proxyInfo, body: body.toString()}));
        }

        /**
         * 目前freelog-api服务限定只返回json或者附件文件两种.
         * 后续如果有其他需求可以拓展,或者直接在路由信息中进行格式检查配置
         * 此处暂未考虑304等.
         */
        // else if (!this._isJson(headers) && !this._isAttachment(headers)) {
        //     ctx.error({msg: "上游API未按协议返回数据格式", data: {proxy: ctx.proxyInfo, body: body.toString()}})
        // }

        // /**
        //  * 是否是附件
        //  * @private
        //  */
        // _isAttachment(headers: object) {
        //     const header = headers['content-disposition'] || headers['Content-Disposition']
        //     return header && header.toLowerCase().includes('attachment; filename=');
        // }

        // /**
        //  * 是否JSON
        //  * @private
        //  */
        // _isJson(headers: object) {
        //     const header = headers['content-type'] || headers['Content-Type']
        //     return header && header.toLowerCase().includes('application/json');
        // }

        ctx.body = body;
        ctx.status = statusCode;
        Object.keys(headers).forEach(header => ctx.set(header, headers[header]));

        await next();
    };
}
