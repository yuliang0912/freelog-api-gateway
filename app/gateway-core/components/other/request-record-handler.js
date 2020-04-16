'use strict'

const queue = require('async/queue')
const ComHandlerResult = require('../com-handle-result')
const {ResponseAfter} = require('../../../enum/router-component-level-enum')
const {Statistics} = require('../../../enum/router-component-type-enum')

module.exports = class RequestRecordHandlerComponent {

    constructor(app) {
        this.app = app
        this.comName = "request-record"
        this.comType = Statistics
        this.comLevel = ResponseAfter
        this.queue = queue(this.requestRecordHandle.bind(this), 50)
        //this.routerTrafficStatisticsProvider = app.dal.routerTrafficStatisticsProvider
    }

    /**
     * 流量统计组件处理函数
     */
    async handle(ctx, config) {

        const {routerId, routerUrlRule} = ctx.gatewayInfo.routerInfo

        this.queue.push(ctx, this.errorHandle.bind(this))

        return new ComHandlerResult(this.comName, this.comType, true)
    }

    /**
     * 流量统计数据保存
     * @param routerId
     * @param routerUrlRule
     */
    async requestRecordHandle(ctx) {
        console.log(ctx.host)
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

