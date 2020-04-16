'use strict'

const lodash = require('lodash')
const ComponentsHandler = require('../gateway-core/components/index')
const componentsInvokeErrorHandler = require('../gateway-core/error-handler/component-invoke-error-handler')
const {GatewayComponentInvokingError} = require('egg-freelog-base/error')
const {ResponseAfter} = require('../enum/router-component-level-enum')

class ComponentHandler {

    constructor(app) {
        this.app = app
        this.componentsHandler = new ComponentsHandler(app)
        return this.main.bind(this)
    }

    /**
     * 中间件入口
     */
    async main(ctx, next) {

        const {routerInfo} = ctx.gatewayInfo

        //多组规则按照定义的顺序依次循环处理
        for (let i = 0, j = routerInfo.httpComponentRules.length; i < j; i++) {
            const {httpComponentRules, componentConfig} = routerInfo.httpComponentRules[i]
            await this._eachCheckComponents(ctx, httpComponentRules, componentConfig, true).then(result => {
                !result && this._componentHandleFailedHandle(ctx, httpComponentRules)
            })
        }
        await next()
    }

    /**
     * 组件处理不通过
     */
    _componentHandleFailedHandle(ctx, httpComponentRules) {

        let data = {routeId: ctx.gatewayInfo.routerInfo.id}
        const {componentProcessResult} = ctx.gatewayInfo

        // 目前先放开所有的组件处理错误结果
        // const isShowDetailErrors = ctx.checkQuery('isShowDetailErrors').optional().toInt().default(1).value

        data.httpComponentRules = httpComponentRules
        data.componentProcessResult = componentProcessResult

        throw new GatewayComponentInvokingError("组件调用失败", data)
    }

    /**
     * 指定组件检查
     */
    async _componentHandle(ctx, componentName, comConfig) {

        const comHandlerResult = await this.componentsHandler.componentHandle(ctx, componentName, ResponseAfter, comConfig)
            .catch(error => componentsInvokeErrorHandler(ctx, componentName, error))

        ctx.gatewayInfo.componentProcessResult.push(comHandlerResult)

        return comHandlerResult.handleResult
    }

    /**
     * object复杂嵌套组合条件处理
     */
    async _objectConditionHandle(ctx, objectCondition, comConfig) {

        const keys = Object.keys(objectCondition)
        for (let i = 0; i < keys.length; i++) {
            var key = keys[i]
            switch (key.toLowerCase()) {
                case "must":
                    const mustResult = await this._eachCheckComponents(ctx, objectCondition[key], comConfig, true)
                    if (!mustResult) {
                        return false
                    }
                    break
                case "should":
                    const shouldResult = await this._eachCheckComponents(ctx, objectCondition[key], comConfig, false)
                    if (!shouldResult) {
                        return false
                    }
                    break;
                default:
                    console.warn("不被支持的关键字" + key)
                    break
            }
        }
        return true
    }

    /**
     * 循环检查各个组件的执行结果
     */
    async _eachCheckComponents(ctx, comlist, comConfig, isEvery = true) {
        if (!comlist.length) {
            return true
        }
        for (let i = 0; i < comlist.length; i++) {
            let condition = comlist[i], currRet = null
            if (lodash.isObject(condition)) {
                currRet = await this._objectConditionHandle(ctx, condition, comConfig)
            } else if (lodash.isString(condition)) {
                currRet = await this._componentHandle(ctx, condition, comConfig)
            } else if (lodash.isArray(condition)) {
                currRet = await this._eachCheckComponents(ctx, condition, comConfig, isEvery)
            }
            if (isEvery && !currRet) {
                return false
            }
            if (!isEvery && currRet) {
                return true
            }
        }
        return Boolean(isEvery)
    }
}


module.exports = (option, app) => new ComponentHandler(app)
