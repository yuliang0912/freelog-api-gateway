'use strict'

const Subscription = require('egg').Subscription;
const {GatewayInfoUpdateEvent} = require('../enum/app-event-emitter-enum')

module.exports = class CreateTestDataImport extends Subscription {

    static get schedule() {
        return {
            type: 'worker',
            cron: '* */1 * * * *', //10秒同步一次路由数据
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
            //rebuildRouterData(gatewayInfo.routers)
        }).catch(error => {
            console.log('路由配置信息同步失败', error)
        })

        function rebuildRouterData(routers) {
            routers.forEach(item => {
                let serverName = null
                if (item.upstream.port === 5001) {
                    serverName = 'api-resource-service.development'
                }
                else if (item.upstream.port === 5005) {
                    serverName = 'api-node-service.development'
                }
                else if (item.upstream.port === 5008) {
                    serverName = 'api-auth-service.development'
                }
                else if (item.upstream.port === 5011) {
                    serverName = 'api-identity-service.development'
                }
                else if (item.upstream.port === 5018) {
                    serverName = 'api-statistics-service.development'
                }
                else if (item.upstream.port === 5777) {
                    serverName = 'web-site-node-home.development'
                }
                serverName && app.dal.apiRouterProvider.updateOne({_id: item.routerId}, {'upstream.serverGroupName': serverName}).then()
            })
        }
    }


}