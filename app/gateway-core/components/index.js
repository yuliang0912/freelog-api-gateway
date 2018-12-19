'use strict'

const Patrun = require('patrun')
const {ArgumentError} = require('egg-freelog-base/error')
const JsonWebTokenAuthenticationComponent = require('./authentication/jwt-authentication')
const NullIdentityAuthenticationComponent = require('./authentication/null-identity-authentication')
const InternalIdentityAuthenticationComponent = require('./authentication/internal-identity-authentication')
const ClientCredentialsAuthenticationComponent = require('./authentication/client-credentials-authentication')

module.exports = class ComponentHandler {

    constructor(app) {
        this.app = app
        this.patrun = Patrun()
        this._registerHttpComponents()
    }

    /**
     * 执行http组件
     * @param comName
     * @param ctx
     */
    async componentHandle(comName, ctx) {
        const component = this.patrun.find({comName})
        if (!component) {
            throw new ArgumentError(`参数comName:${comName}错误,未找到对应的组件`)
        }
        return component.handle(ctx)
    }

    /**
     * 注册http处理组件
     * @private
     */
    _registerHttpComponents() {

        const {app, patrun} = this

        const components = [
            new JsonWebTokenAuthenticationComponent(app),
            new NullIdentityAuthenticationComponent(app),
            new InternalIdentityAuthenticationComponent(app),
            new ClientCredentialsAuthenticationComponent(app)
        ]

        components.forEach(com => patrun.add({comName: com.comName}, com))
    }
}