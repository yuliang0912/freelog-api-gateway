'use strict'

const {GatewayComponentInvokingError} = require('egg-freelog-base/error')

module.exports = (ctx, componentName, error) => {

    ctx.status = 500

    console.error(`网关组件(${componentName})调用异常`, error)

    throw new GatewayComponentInvokingError('网关处理组件执行异常', {componentName, error: error.stack || error.message})

}