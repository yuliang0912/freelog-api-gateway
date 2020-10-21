'use strict'

const Subscription = require('egg').Subscription;

module.exports = class Keepalive extends Subscription {

    static get schedule() {
        return {
            type: 'all',
            cron: '*/20 * * * * *',
            immediate: false,
            disable: false
        }
    }

    async subscribe() {
        this.app.dal.clientInfoProvider.find({status: 1}).catch(error => {
            console.error('db链接失败');
        });
    }
}