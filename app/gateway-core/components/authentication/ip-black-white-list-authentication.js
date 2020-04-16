'use strict'

const ComHandlerResult = require('../com-handle-result')
const {RequestBefore} = require('../../../enum/router-component-level-enum')
const {Authentication} = require('../../../enum/router-component-type-enum')

module.exports = class IpBlackWhiteListAuthenticationComponent {

    constructor(app) {
        this.comName = "ip-black-white-list"
        this.comType = Authentication
        this.comLevel = RequestBefore
        this.IpBlackWhiteGroupProvider = app.dal.IpBlackWhiteGroupProvider
    }

    /**
     * 黑白名单认证
     */
    async handle(ctx, config) {

        const comHandlerResult = new ComHandlerResult(this.comName, this.comType, true)

        comHandlerResult.tips = "黑白名单功能暂未实现"

        return comHandlerResult
    }
}

