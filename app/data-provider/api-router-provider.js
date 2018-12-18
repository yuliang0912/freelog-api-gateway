'use strict'

const MongoBaseOperation = require('egg-freelog-database/lib/database/mongo-base-operation')

module.exports = class ApiRouterProvider extends MongoBaseOperation {

    constructor(app) {
        super(app.model.ApiRouter)
    }

}