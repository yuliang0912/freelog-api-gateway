'use strict'

const queue = require('async/queue')
const ComHandlerResult = require('../com-handle-result')
const {ResponseAfter} = require('../../../enum/router-component-level-enum')
const {Statistics} = require('../../../enum/router-component-type-enum')

module.exports = class RouterTrafficStatisticsComponent {

    constructor(app) {
        this.app = app
        this.comName = "traffic-statistics"
        this.comType = Statistics
        this.comLevel = ResponseAfter
        this.queue = queue(this.trafficStatisticsHandle.bind(this), 50)
        this.requestRecordProvider = app.dal.requestRecordProvider
        this.routerTrafficStatisticsProvider = app.dal.routerTrafficStatisticsProvider
    }

    /**
     * 流量统计组件处理函数
     */
    async handle(ctx, config) {

        this.queue.push(ctx, this.errorHandle.bind(this))

        return new ComHandlerResult(this.comName, this.comType, true)
    }

    /**
     * 流量统计数据保存
     * @param routerId
     * @param routerUrlRule
     */
    async trafficStatisticsHandle(ctx) {

        const {requestId, traceId, url, method, proxyResponse, gatewayInfo = {}} = ctx
        const {identityInfo = {}} = gatewayInfo
        const {routerId, upstream, routerUrlRule} = gatewayInfo.routerInfo

        const recordInfo = {
            requestId, traceId, routerId, method,
            requestUrl: url,
            forwardUrl: upstream.forwardUri,
            serverGroupName: upstream.serverGroupName,
            serviceResponseTime: (ctx.startResponseTime - ctx.startRquestTime),
            reqContentLength: ctx.get('content-length') || 0,
            resContentLength: proxyResponse.headers['content-length'] || 0,
            userId: identityInfo.userInfo ? identityInfo.userInfo.userId : 0
        }

        this.routerTrafficStatisticsProvider.findOneAndUpdate({
            routerId, routerUrlRule
        }, {$inc: {totalCount: 1}}, {new: true}).then(data => {
            return data || this.routerTrafficStatisticsProvider.create({routerId, routerUrlRule, totalCount: 1})
        })

        this.requestRecordProvider.create(recordInfo)
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

