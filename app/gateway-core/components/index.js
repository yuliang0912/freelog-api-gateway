'use strict'

const Patrun = require('patrun')
const {GatewayArgumentError} = require('egg-freelog-base/error')
const JsonWebTokenAuthenticationComponent = require('./authentication/jwt-authentication')
const JsonWebTokenNodeAuthenticationComponent = require('./authentication/jwt-node-authentication')
const NullIdentityAuthenticationComponent = require('./authentication/null-identity-authentication')
const InternalIdentityAuthenticationComponent = require('./authentication/internal-identity-authentication')
const IpBlackWhiteListAuthenticationComponent = require('./authentication/ip-black-white-list-authentication')
const ClientCredentialsAuthenticationComponent = require('./authentication/client-credentials-authentication')
const ClientInternalIdentityAuthenticationComponent = require('./authentication/client-internal-identity-authentication')

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
    async componentHandle(ctx, comName, comConfig) {
        const component = this.patrun.find({comName})
        if (!component) {
            throw new GatewayArgumentError(`参数comName:${comName}错误,未找到对应的组件`)
        }
        return component.handle(ctx, comConfig)
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
            new JsonWebTokenNodeAuthenticationComponent(app),
            new InternalIdentityAuthenticationComponent(app),
            new IpBlackWhiteListAuthenticationComponent(app),
            new ClientCredentialsAuthenticationComponent(app),
            new ClientInternalIdentityAuthenticationComponent(app)
        ]

        components.forEach(com => patrun.add({comName: com.comName}, com))
    }
}