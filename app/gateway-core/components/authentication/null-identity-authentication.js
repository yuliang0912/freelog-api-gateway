'use strict'

const ComHandlerResult = require('../com-handle-result')

module.exports = class NullIdentityAuthenticationComponent {

    constructor(app) {
        this.comName = "null-identity"
        this.comType = "authentication"
    }

    /**
     * null身份认证,一般用于直接通过,配合or条件可以达到已认证的获取到认证信息,没有登录的用户也能直接通过认证
     */
    async handle(ctx, config) {

        const comHandlerResult = new ComHandlerResult(this.comName, this.comType, true)

        return comHandlerResult
    }
}

