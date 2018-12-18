'use strict'

module.exports = (option, app) => {

    return async function (ctx, next) {
        ctx.success("代理成功")
    }
}