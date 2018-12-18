'use strict';

const Controller = require('egg').Controller;

module.exports = class HomeController extends Controller {

    constructor({app}) {
        super(...arguments)
    }

    async index(ctx) {
        ctx.success('<h1>freelog api gateway!</h1>')
    }
}
