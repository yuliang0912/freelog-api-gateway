'use strict'

const {GatewayComponentInvokingError} = require('egg-freelog-base/error')

module.exports = (ctx, componentName, error) => {

    ctx.status = 500

    throw new GatewayComponentInvokingError('网关处理组件执行异常', {componentName, error: error.stack || error.message})

}