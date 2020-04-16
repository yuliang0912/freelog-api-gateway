'use strict'

const ComHandlerResult = require('../com-handle-result')
const {RequestBefore} = require('../../../enum/router-component-level-enum')
const {Authorization} = require('../../../enum/router-component-type-enum')

module.exports = class RefuseAllRequestAuthorizationComponent {

    constructor(app) {
        this.comName = "refuse-all-request"
        this.comType = Authorization
        this.comLevel = RequestBefore
    }

    /**
     *  拒绝所有请求
     */
    async handle(ctx, config) {

        const comHandlerResult = new ComHandlerResult(this.comName, this.comType, false)

        comHandlerResult.tips = "未授权的请求"

        return comHandlerResult
    }
}

