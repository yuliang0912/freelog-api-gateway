'use strict'

module.exports = app => {

    app.router.all('/', 'home.index')
    app.router.resources("router", "/gateway/routers", "router")

    app.router.all('/*', (ctx, next) => {
    })
}
