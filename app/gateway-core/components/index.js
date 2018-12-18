'use strict'

const patrun = require('patrun')
const lodash = require('lodash')

module.exports = class ComponentHandler {

    constructor(app) {

    }

    async handle(routerInfo, ctx) {

        const {httpComponents} = routerInfo

        await this._eachCheckComponents(httpComponents, true).then(console.log)
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