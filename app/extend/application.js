'use strict'

const lodash = require('lodash')

module.exports = {

    /**
     * 获取client信息
     */
    getClientInfo(clientId) {
        const clientInfos = this.__cache__.clientInfo
        const clientInfo = clientInfos ? clientInfos[clientId] : null
        return lodash.cloneDeep(clientInfo)
    },

    /**
     * 获取router信息
     * @param routerId
     */
    getRouterInfo(routerId) {
        const routerList = this.__cache__.routerList
        const routerInfo = routerList ? routerList.find(x => x.routerId === routerId) : null
        return lodash.cloneDeep(routerInfo)
    },

    /**
     * 根据前缀获取路由
     */
    getRouterListByPrefix(routerPrefix) {
        const routerPrefixGroup = this.__cache__.routerPrefixGroup
        const routerList = routerPrefixGroup ? routerPrefixGroup[routerPrefix.toLowerCase()] : []
        return routerList.map(x => lodash.cloneDeep(x))
    },

    /**
     * 路由配置是否加载完成
     * @returns {*}
     */
    isLoadCompleteRouterInfo() {
        return this.__cache__.routerPrefixGroup && this.__cache__.routerList
    }
}