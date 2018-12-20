'use strict'

const ComHandlerResult = require('../com-handle-result')

module.exports = class IpBlackWhiteListAuthenticationComponent {

    constructor(app) {
        this.comName = "ip-black-white-list"
        this.comType = "authentication"
        this.IpBlackWhiteGroupProvider = app.dal.IpBlackWhiteGroupProvider
    }

    /**
     * 黑白名单认证
     */
    async handle(ctx) {

        const comHandlerResult = new ComHandlerResult(this.comName, this.comType, true)

        comHandlerResult.tips = "黑白名单功能暂未实现"

        return comHandlerResult
    }
}

