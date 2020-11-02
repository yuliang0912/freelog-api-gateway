"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (options) => {
    return async function (ctx, next) {
        const { proxyResponse } = ctx;
        const { headers, statusCode, body } = proxyResponse;
        if (statusCode >= 500 && statusCode < 600) {
            ctx.error({ msg: "上游API服务器异常", data: { proxy: ctx.proxyInfo, body: body.toString() } });
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHktcmVzcG9uc2UtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvbWlkZGxld2FyZS9wcm94eS1yZXNwb25zZS1oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLE9BQWdCLEVBQUUsRUFBRTtJQUVsQyxPQUFPLEtBQUssV0FBVyxHQUFZLEVBQUUsSUFBSTtRQUNyQyxNQUFNLEVBQUMsYUFBYSxFQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzVCLE1BQU0sRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxHQUFHLGFBQWEsQ0FBQztRQUVsRCxJQUFJLFVBQVUsSUFBSSxHQUFHLElBQUksVUFBVSxHQUFHLEdBQUcsRUFBRTtZQUN2QyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFDLEVBQUMsQ0FBQyxDQUFBO1NBQ3RGO1FBRUQ7Ozs7V0FJRztRQUNILHFFQUFxRTtRQUNyRSwrRkFBK0Y7UUFDL0YsSUFBSTtRQUVKLE1BQU07UUFDTixXQUFXO1FBQ1gsY0FBYztRQUNkLE1BQU07UUFDTixtQ0FBbUM7UUFDbkMsc0ZBQXNGO1FBQ3RGLCtFQUErRTtRQUMvRSxJQUFJO1FBRUosTUFBTTtRQUNOLFlBQVk7UUFDWixjQUFjO1FBQ2QsTUFBTTtRQUNOLDZCQUE2QjtRQUM3Qix3RUFBd0U7UUFDeEUsMEVBQTBFO1FBQzFFLElBQUk7UUFFSixHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixHQUFHLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFeEUsTUFBTSxJQUFJLEVBQUUsQ0FBQTtJQUNoQixDQUFDLENBQUE7QUFDTCxDQUFDLENBQUEifQ==