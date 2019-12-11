'use strict'

const Service = require('egg').Service
const {GatewayInfoUpdateEvent} = require('../enum/app-event-emitter-enum')

module.exports = class GatewayService extends Service {

    constructor({app}) {
        super(...arguments)
        this.app = app
        this.apiRouterProvider = app.dal.apiRouterProvider
        this.clientInfoProvider = app.dal.clientInfoProvider
        this.serverGroupProvider = app.dal.serverGroupProvider
        this.httpComponentHandleRuleProvider = app.dal.httpComponentHandleRuleProvider
    }

    /**
     * 通过路由前缀获取路由列表
     * @param routerPrefix
     * @returns {Promise<*>}
     */
    async getRouterListByPrefix(routerPrefix, method) {
        return this.app.getRouterListByPrefix(routerPrefix)
            .filter(x => x.httpMethod.some(m => m.toUpperCase() === "ALL" || m.toUpperCase() === method))
    }

    /**
     * 获取所有的有效路由数据
     * @returns {Promise<void>}
     */
    async getAllRouterInfo() {

        const {app} = this
        const {apiRouterProvider, serverGroupProvider, clientInfoProvider, httpComponentHandleRuleProvider} = app.dal

        const task1 = apiRouterProvider.find({status: 1})
        const task2 = clientInfoProvider.find({status: 1})
        const task3 = serverGroupProvider.find({status: 1})
        const task4 = httpComponentHandleRuleProvider.find({status: 1})

        return Promise.all([task1, task2, task3, task4]).then(([routers, clientInfos, serverGroups, rules]) => {
            return this._buildRouterInfo(routers, clientInfos, serverGroups, rules)
        }).then(gatewayInfo => {
            return gatewayInfo
        })
    }

    /**
     * 组装路由信息
     * @param routers
     * @param clientInfos
     * @param serverGroups
     * @param rules
     */
    _buildRouterInfo(gatewayRouters, clientInfos, serverGroups, rules) {

        const gatewayInfo = {routers: [], clientInfo: {}, serverGroup: {}, httpComponentRule: {}}

        clientInfos.forEach(x => gatewayInfo.clientInfo[x.clientId] = x.toObject())
        serverGroups.forEach(x => gatewayInfo.serverGroup[x.groupName] = x.toObject()) //groupName
        rules.forEach(x => gatewayInfo.httpComponentRule[x._id] = x.toObject())
        gatewayRouters.forEach(x => gatewayInfo.routers.push(x.toObject()))

        return gatewayInfo
    }
}