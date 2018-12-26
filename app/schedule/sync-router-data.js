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

        const count = await this.app.dal.apiRouterProvider.count({})
        if (count > 0) {
            return
        }
        this.app.dal.oldDataProvider.find({status: 0}).then(list => {
            list.forEach(routerInfo => this.importData(routerInfo))
        })
    }

    //mysql导入到mongodb
    importData({routeUrl, redirectHost, forwardUrl, config}) {

        const model = {
            "upstream": {
                "protocol": "http",
                "port": 0,
                "method": null,
                "serverGroupId": "",
                "forwardUriScheme": ""
            },
            "httpMethod": ["ALL"],
            "httpComponentRuleIds": [],
            "status": 1,
            "routerPrefix": "",
            "routerUrlRule": "",
        }

        const routerList = routeUrl.split('/')
        routerList.splice(3)

        model.routerPrefix = routerList.join("/") + "/"
        model.routerUrlRule = routeUrl

        const [host, port] = redirectHost.split(':')
        model.upstream.port = port
        model.upstream.forwardUriScheme = forwardUrl

        if (host === "172.18.215.232") {
            model.upstream.serverGroupId = "5c22f44f4a3d9c2ed8864bc7"
        }
        if (host === "172.18.215.230") {
            model.upstream.serverGroupId = "5c175892e5c181401cd91988"
        }

        const auth = config.auth[0]
        if (auth === 'jwt') {
            model.httpComponentRuleIds = ["5c21e15a4a3d9c2ed8864b53"]
        }
        else if (auth === 'jwtOrNull') {
            model.httpComponentRuleIds = ["5c1a160005e96a557802bcca"]
        }
        else if (auth === 'oauth') {
            model.httpComponentRuleIds = ["5c21e08a4a3d9c2ed8864b46"]
        }

        this.app.dal.apiRouterProvider.create(model)
    }
}