'use strict';

const Controller = require('egg').Controller
const {ArgumentError} = require('egg-freelog-base/error')
const {LoginUser, UnLoginUser} = require('egg-freelog-base/app/enum/identity-type')

module.exports = class TrafficStatisticsController extends Controller {

    constructor({app}) {
        super(...arguments)
        this.apiRouterProvider = app.dal.apiRouterProvider
        this.requestRecordProvider = app.dal.requestRecordProvider
        this.routerTrafficStatisticsProvider = app.dal.routerTrafficStatisticsProvider
    }

    /**
     * 流量统计
     * @param ctx
     * @returns {Promise<void>}
     */
    async index(ctx) {


    }

    /**
     * 接口访问请求记录
     * @param ctx
     * @returns {Promise<void>}
     */
    async requestRecords(ctx) {

        const page = ctx.checkQuery("page").optional().toInt().gt(0).default(1).value
        const pageSize = ctx.checkQuery("pageSize").optional().toInt().gt(0).lt(101).default(10).value
        const serverGroupName = ctx.checkQuery('serverGroupName').optional().type('string').len(1, 100).value
        const serviceResponseTime = ctx.checkQuery('serviceResponseTime').optional().toInt().gt(0).value
        const operator = ctx.checkQuery('operator').optional().toInt().in([1, 2]).value //1:小于 2:大于
        const routerId = ctx.checkQuery('routerId').optional().isMongoObjectId().value
        const requestUrl = ctx.checkQuery('requestUrl').optional().value
        const userId = ctx.checkQuery("userId").optional().toInt().gt(0).value

        ctx.validateParams().validateVisitorIdentity(LoginUser | UnLoginUser)

        if(serviceResponseTime && !operator){
            throw new ArgumentError('组合参数serviceResponseTime,operator校验失败')
        }

        const condition = {}
        if (serverGroupName) {
            condition.serverGroupName = serverGroupName
        }
        if (serviceResponseTime && operator) {
            let mongoOperator = operator === 1 ? '$lt' : '$gt'
            condition.serviceResponseTime = {
                [mongoOperator]: serviceResponseTime
            }
        }
        if (routerId) {
            condition.routerId = routerId
        }
        if (requestUrl) {
            condition.requestUrl = requestUrl
        }
        if (userId) {
            condition.userId = userId
        }

        const task1 = this.requestRecordProvider.count(condition)
        const task2 = this.requestRecordProvider.findPageList(condition, page, pageSize, null, {createDate: -1})

        await Promise.all([task1, task2]).then(([totalItem, dataList]) => ctx.success({
            page, pageSize, totalItem, dataList
        }))
    }
}
