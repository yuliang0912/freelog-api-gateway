'use strict';

const Controller = require('egg').Controller;

module.exports = class RouterController extends Controller {

    constructor({app}) {
        super(...arguments)
        this.apiRouterProvider = app.dal.apiRouterProvider
    }

    /**
     * 路由列表
     * @param ctx
     * @returns {Promise<void>}
     */
    async index(ctx) {

        const keywords = ctx.checkQuery('keywords').optional().value
        const status = ctx.checkQuery('status').optional().toInt().in([0, 1]).default(1).value

        const condition = {status}
        if (keywords) {
            let searchExp = {$regex: keywords, $options: 'i'}
            condition.$or = [{routerPrefix: searchExp}, {'upstream.forwardUriScheme': searchExp}, {router: searchExp}]
        }

        await this.apiRouterProvider.find(condition).then(ctx.success)
    }

    /**
     * 路由详情
     * @param ctx
     * @returns {Promise<void>}
     */
    async show(ctx) {

        const routerId = ctx.checkParams("id").isMongoObjectId().value

        ctx.success(ctx.app.getRouterInfo(routerId))
    }

    /**
     * 禁用路由配置
     * @param ctx
     * @returns {Promise<void>}
     */
    async destroy(ctx) {

        const routerId = ctx.checkParams("id").isMongoObjectId().value

        await this.apiRouterProvider.updateOne({_id: routerId}, {status: 0})
            .then(({nModified}) => ctx.success(nModified > 0))

        this.syncRouterData(ctx).then()
    }

    /**
     * 同步路由数据
     * @param ctx
     * @returns {Promise<void>}
     */
    async syncRouterData(ctx) {
        await this.ctx.service.gatewayService.getAllRouterInfo().then(() => ctx.success('同步成功'))
    }
}
