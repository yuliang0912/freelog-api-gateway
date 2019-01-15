'use strict'

const lodash = require('lodash')

module.exports = (ctx) => {

    const {identityInfo} = ctx.gatewayInfo

    if (!lodash.isEqual(identityInfo, {}) && lodash.isObject(identityInfo)) {
        ctx.headers['auth-token'] = Buffer.from(JSON.stringify(identityInfo)).toString("base64")
    }
    else {
        delete ctx.headers['auth-token']
    }
}