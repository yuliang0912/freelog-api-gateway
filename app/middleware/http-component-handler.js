'use strict'

const lodash = require('lodash')
const ComponentsHandler = require('../gateway-core/components/index')

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

        const {httpComponents} = ctx.gatewayInfo.routerInfo

        const result = await this._eachCheckComponents(httpComponents, ctx, true)
        if (result) {
            return await next()
        }

        const isShowDetailErrors = ctx.checkQuery('isShowDetailErrors').optional().toInt().value
        if (isShowDetailErrors) {
            ctx.error({
                msg: "授权不通过", data: {
                    componentProcessResult: ctx.gatewayInfo.componentProcessResult,
                    httpComponentRules: httpComponents
                }
            })
        }

        ctx.error({msg: '授权不通过'})
    }

    /**
     * 指定组件检查
     */
    async _componentHandle(componentName, ctx) {

        const comHandlerResult = await this.componentsHandler.componentHandle(componentName, ctx)

        ctx.gatewayInfo.componentProcessResult.push(comHandlerResult)

        return comHandlerResult.handleResult
    }

    /**
     * object复杂嵌套组合条件处理
     */
    async _objectConditionHandle(objectCondition, ctx) {

        const keys = Object.keys(objectCondition)
        for (let i = 0; i < keys.length; i++) {
            var key = keys[i]
            switch (key.toLowerCase()) {
                case "must":
                    const mustResult = await this._eachCheckComponents(objectCondition[key], ctx, true)
                    if (!mustResult) {
                        return false
                    }
                    break
                case "should":
                    const shouldResult = await this._eachCheckComponents(objectCondition[key], ctx, false)
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
    async _eachCheckComponents(list, ctx, isEvery = true) {
        if (!list.length) {
            return true
        }
        for (let i = 0; i < list.length; i++) {
            let condition = list[i], currRet = null
            if (lodash.isObject(condition)) {
                currRet = await this._objectConditionHandle(condition, ctx)
            } else if (lodash.isString(condition)) {
                currRet = await this._componentHandle(condition, ctx)
            } else if (lodash.isArray(condition)) {
                currRet = await this._eachCheckComponents(condition, ctx, isEvery)
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
