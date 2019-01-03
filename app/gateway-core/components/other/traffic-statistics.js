'use strict'

const ComHandlerResult = require('../com-handle-result')

module.exports = class RouterTrafficStatisticsComponent {

    constructor(app) {
        this.app = app
        this.comName = "traffic-statistics"
        this.comType = "statistics"
        this.routerTrafficStatisticsProvider = app.dal.routerTrafficStatisticsProvider
    }

    /**
     * client证书认证组件处理函数
     */
    async handle(ctx, config) {

        const {routerId, routerUrlRule} = ctx.gatewayInfo.routerInfo

        this.routerTrafficStatisticsProvider.findOneAndUpdate({
            routerId, routerUrlRule
        }, {$inc: {totalCount: 1}}, {new: true}).then(data => {
            return data || this.routerTrafficStatisticsProvider.create({routerId, routerUrlRule, totalCount: 1})
        })

        return new ComHandlerResult(this.comName, this.comType, true)
    }
}

