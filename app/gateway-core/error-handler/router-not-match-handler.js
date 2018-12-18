'use strict'

module.exports = class RouterNotMatchHandler {

    handle(ctx) {
        ctx.status = 404
        ctx.success(111111111)
    }
}