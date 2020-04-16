'use strict'

const Subscription = require('egg').Subscription;
const {GatewayInfoUpdateEvent} = require('../enum/app-event-emitter-enum')

module.exports = class CreateTestDataImport extends Subscription {

    static get schedule() {
        return {
            type: 'worker',
            cron: '* */15 * * * *', //15秒同步一次路由数据
            immediate: true, //立即执行一次
            disable: false
        }
    }

    //定时同步DB中的路由信息到内存中,由于数据量不大,所以全部拉取
    //获取数据后,发送路由信息到所有的cluster-app上,然后每个子进程都同步一份
    async subscribe() {

        let {app} = this
        await this.ctx.service.gatewayService.getAllRouterInfo().then(gatewayInfo => {
            app.messenger.sendToApp(GatewayInfoUpdateEvent, gatewayInfo)
        }).catch(error => {
            console.log('路由配置信息同步失败', error)
        })
    }

}