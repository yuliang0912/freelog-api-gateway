'use strict'

module.exports = (ctx) => {
    ctx.status = 404
    ctx.error({msg: "404,网关服务未能匹配到可用的路由"})
}