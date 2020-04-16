'use strict'

module.exports = app => {

    const {router, controller} = app

    //首页或者网关自身API. 中间件的使用详见config中的启用与忽略
    router.all('/', 'home.index')
    router.get("/gateway/routers/syncRouterData", controller.router.syncRouterData)
    router.get("/gateway/trafficStatistics/requestRecords", controller.trafficStatistics.requestRecords)

    //restful
    router.resources("router", "/gateway/routers", "router")

    //其他默认当网关代理处理
    app.router.all('/*', (ctx, next) => null)
}
