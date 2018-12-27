'use strict'

module.exports = (ctx) => {

    const {identityInfo} = ctx.gatewayInfo

    if (identityInfo) {
        ctx.headers['auth-token'] = new Buffer(JSON.stringify(identityInfo)).toString('base64')
    }
    else {
        //delete ctx.headers['auth-token']
    }
}