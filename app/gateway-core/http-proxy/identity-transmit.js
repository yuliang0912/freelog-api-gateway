'use strict'

const lodash = require('lodash')

module.exports = (ctx) => {

    const {identityInfo} = ctx.gatewayInfo
    if (!lodash.isEqual(identityInfo, {})) {
        ctx.headers['auth-token'] = new Buffer(JSON.stringify(identityInfo)).toString('base64')
    }
    else {
        //目前内部api调用直接通过auth-token头来透传身份.后期会优化
        //delete ctx.headers['auth-token']
    }
}