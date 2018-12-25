'use strict'

const Subscription = require('egg').Subscription;

module.exports = class CreateTestDataImport extends Subscription {

    static get schedule() {
        return {
            type: 'worker',
            cron: '*/30 * * * * * *', //从0分钟开始 30秒同步一次路有数据
            immediate: true, //立即执行一次
            disable: false
        }
    }

    //定时同步DB中的路由信息到内存中,由于数据量不大,所以全部拉取
    async subscribe() {
        await this.ctx.service.gatewayService.getAllRouterInfo().catch(error => {
            console.log('路由配置信息同步失败', error)
        })
    }
}