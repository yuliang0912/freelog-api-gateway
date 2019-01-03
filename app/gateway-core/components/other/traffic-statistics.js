'use strict'

const queue = require('async/queue')
const ComHandlerResult = require('../com-handle-result')

module.exports = class RouterTrafficStatisticsComponent {

    constructor(app) {
        this.app = app
        this.comName = "traffic-statistics"
        this.comType = "statistics"
        this.queue = queue(this.trafficStatisticsHandle.bind(this), 50)
        this.routerTrafficStatisticsProvider = app.dal.routerTrafficStatisticsProvider
    }

    /**
     * client证书认证组件处理函数
     */
    async handle(ctx, config) {

        const {routerId, routerUrlRule} = ctx.gatewayInfo.routerInfo

        this.queue.push({routerId, routerUrlRule}, this.errorHandle.bind(this))

        return new ComHandlerResult(this.comName, this.comType, true)
    }

    /**
     * 流量统计数据保存
     * @param routerId
     * @param routerUrlRule
     */
    async trafficStatisticsHandle({routerId, routerUrlRule}) {
        await this.routerTrafficStatisticsProvider.findOneAndUpdate({
            routerId, routerUrlRule
        }, {$inc: {totalCount: 1}}, {new: true}).then(data => {
            return data || this.routerTrafficStatisticsProvider.create({routerId, routerUrlRule, totalCount: 1})
        })
    }

    /**
     * 错误处理
     * @param err
     */
    errorHandle(error) {
        if (error instanceof Error) {
            console.log("end-of-cycle-event-handler", '事件执行异常', ...arguments)
            this.app.logger.error("end-of-cycle-event-handler", '事件执行异常', ...arguments)
        }
    }
}

