'use strict';

const Controller = require('egg').Controller;

module.exports = class HomeController extends Controller {

    /**
     * 首页
     * @param ctx
     * @returns {Promise<void>}
     */
    async index(ctx) {
        ctx.body = '<h1>freelog api gateway!</h1>'
    }

}
