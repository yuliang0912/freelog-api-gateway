export default class HomeController {
    /**
     * 首页
     * @param ctx
     * @returns {Promise<void>}
     */
    index(ctx: any): Promise<void>;
    /**
     * 运行状态
     * @param ctx
     */
    state(ctx: any): Promise<void>;
    /**
     * 访问记录
     * @param ctx
     */
    requestRecords(ctx: any): Promise<void>;
    /**
     * 同步路由数据
     * @param ctx
     */
    syncRouterData(ctx: any): Promise<void>;
}
