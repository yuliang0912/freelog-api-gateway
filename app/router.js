'use strict'

module.exports = app => {

    //首页
    app.router.all('/', 'home.index')

    //同步路由信息
    app.router.get("/gateway/routers/syncRouterData", "router.syncRouterData")

    //restful
    app.router.resources("router", "/gateway/routers", "router")

    //其他默认当网关代理处理
    app.router.all('/*', (ctx, next) => null)
}
