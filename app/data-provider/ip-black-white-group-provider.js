'use strict'

const MongoBaseOperation = require('egg-freelog-database/lib/database/mongo-base-operation')

module.exports = class IpBlackWhiteGroupProvider extends MongoBaseOperation {

    constructor(app) {
        super(app.model.IpBlackWhiteGroup)
    }
}