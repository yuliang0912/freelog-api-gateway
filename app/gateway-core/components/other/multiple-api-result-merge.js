'use strict'

const ComHandlerResult = require('../com-handle-result')

module.exports = class RouterTrafficStatisticsComponent {

    constructor(app) {
        this.app = app
        this.comName = "multiple-api-result-merge"
        this.comType = "result-handle"
    }

    /**
     * 多API数据合并组件处理函数
     */
    async handle(ctx, config) {

        const {routerId, routerUrlRule} = ctx.gatewayInfo.routerInfo

        //new Function(["arg1","arg2","arg3",...],funBody) { }

        return new ComHandlerResult(this.comName, this.comType, true)
    }
}

