'use strict'

const lodash = require('lodash')

module.exports = class RouterDataUpdateEventHandler {

    constructor(app) {
        this.app = app
    }

    /**
     * 路由配置信息定时同步处理
     * @param gatewayInfo
     */
    handle(gatewayInfo) {

        const {routers, clientInfo, serverGroup, httpComponentRule} = gatewayInfo

        routers.forEach(router => {
            const rules = []
            router.httpComponentRuleIds.forEach(ruleId => {
                Reflect.has(httpComponentRule, ruleId) && rules.push(httpComponentRule[ruleId])
            })
            router.routerPrefix = router.routerPrefix.toLowerCase()
            router.httpComponentRules = rules
            router.upstream.serverGroupInfo = serverGroup[router.upstream.serverGroupId]
        })

        this.app.__cache__.routerPrefixGroup = lodash.groupBy(gatewayInfo.routers, 'routerPrefix')
        this.app.__cache__.routerList = routers
        this.app.__cache__.clientInfo = clientInfo
    }
}