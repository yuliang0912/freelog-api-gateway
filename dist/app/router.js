module.exports = ({ router, controller }) => {
    //网关自身提供的api,以gateway作为前缀.中间件自动忽略此部分
    router.get('/gateway/state', controller.home.state);
    router.all('/gateway/routers/syncRouterData', controller.home.syncRouterData);
    router.get('/gateway/trafficStatistics/requestRecords', controller.home.requestRecords);
    //其他默认当网关代理处理
    router.all('/*', (ctx, next) => null);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxFQUFFLEVBQUU7SUFFdEMsb0NBQW9DO0lBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRCxNQUFNLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDOUUsTUFBTSxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXhGLGFBQWE7SUFDYixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFDLENBQUMsQ0FBQSJ9