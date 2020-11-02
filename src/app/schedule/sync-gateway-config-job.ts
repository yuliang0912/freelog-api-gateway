import {IGatewayService} from "../../../interface";

const Subscription = require('egg').Subscription;

module.exports = class SyncGatewayConfigJob extends Subscription {

    static get schedule() {
        return {
            type: 'all',
            cron: '*/30 * * * * *', //30秒同步一次路由数据
            immediate: true, //立即执行一次
            disable: false
        }
    }

    //定时同步DB中的路由信息到内存中,由于数据量不大,所以全部拉取
    //获取数据后,发送路由信息到所有的cluster-app上,然后每个子进程都同步一份
    async subscribe() {
        const gatewayService: IGatewayService = this.app.applicationContext.get('gatewayService');
        await gatewayService.updateRouterConfig().then(result => {
            if (!result) {
                console.log('同步失败');
            }
        }).catch(error => {
            console.log('路由配置同步异常.', error, '================end======================')
        })
    }
}