module.exports = ({router, controller}) => {

    //网关自身提供的api,以gateway作为前缀.中间件自动忽略此部分
    router.get('/', controller.home.index);
    router.get('/gateway/state', controller.home.state);
    router.all('/gateway/routers/syncRouterData', controller.home.syncRouterData);
    router.get('/gateway/trafficStatistics/requestRecords', controller.home.requestRecords);

    //其他默认当网关代理处理
    router.all('/*', (ctx, next) => null);
};
