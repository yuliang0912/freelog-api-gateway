'use strict'

const Service = require('egg').Service

module.exports = class GatewayService extends Service {

    constructor({app}) {
        super(...arguments)
        this.apiRouterProvider = app.dal.apiRouterProvider
    }

    /**
     * 通过路由前缀获取路由列表
     * @param routerPrefix
     * @returns {Promise<*>}
     */
    async getRouterListByPrefix(routerPrefix, method) {
        return this.apiRouterProvider.find({routerPrefix, status: 1, $or: [{httpMethod: "ALL"}, {httpMethod: method}]})
    }
}