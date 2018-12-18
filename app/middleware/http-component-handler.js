'use strict'

const lodash = require('lodash')

const ComponentHandler = class ComponentHandler {

    constructor(app) {
        this.app = app
    }

    /**
     * 中间件入口
     */
    main(componentHandler) {
        return async function (ctx, next) {
            const {httpComponents} = ctx.gatewayInfo.routerInfo
            const result = await componentHandler._eachCheckComponents(httpComponents)
            if (!result) {
                //认证授权等失败...
            }
            await next()
        }
    }

    /**
     * 指定组件检查
     */
    async _componentHandle(componentName) {
        return true
    }

    /**
     * object复杂嵌套组合条件处理
     */
    async _objectConditionHandle({must, should}) {
        if (must) {
            const mustResult = await this._eachCheckComponents(must, true)
            if (!mustResult) {
                return false
            }
        }
        if (should) {
            const shouldResult = await this._eachCheckComponents(should, false)
            if (!shouldResult) {
                return false
            }
        }
        return true
    }

    /**
     * 循环检查各个组件的执行结果
     */
    async _eachCheckComponents(list, isEvery = true) {
        for (let i = 0; i < list.length; i++) {
            let condition = list[i], currRet = null
            if (lodash.isObject(condition)) {
                currRet = await this._objectConditionHandle(condition)
            } else if (lodash.isString(condition)) {
                currRet = await this._componentHandle(condition)
            } else if (lodash.isArray(condition)) {
                currRet = await this._eachCheckComponents(condition, isEvery)
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


module.exports = (option, app) => {
    const componentHandler = new ComponentHandler(app)
    return componentHandler.main(componentHandler)
}