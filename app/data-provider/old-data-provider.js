'use strict'

const moment = require('moment')
const KnexBaseOperation = require('egg-freelog-database/lib/database/knex-base-operation')

module.exports = class OldDataProvider extends KnexBaseOperation {

    constructor(app) {
        super(app.knex.gateway("apiroutes"))
        this.app = app
    }
}