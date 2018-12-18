'use strict'

const Subscription = require('egg').Subscription;

module.exports = class CreateTestDataImport extends Subscription {

    static get schedule() {
        return {
            cron: '* */2 * * * * *',
            type: 'worker',
            immediate: true, //立即执行一次
            disable: false
        }
    }

    async subscribe() {

        const {apiRouterProvider, serverGroupProvider} = this.app.dal

        // serverGroupProvider.create({
        //     groupName: '本地环境',
        //     servers: [
        //         {
        //             serverName: '本机',
        //             serverIp: "127.0.0.1",
        //             weightCoefficient: 100
        //         }
        //     ]
        // })

        // apiRouterProvider.create({
        //     routerPrefix: "/v1/presentables/",
        //     routerUrlRule: "/v1/presentables/5c175892e5c181401cd91988/",
        //     upstream: {
        //         serverGroupId: "5c175892e5c181401cd91988",
        //         protocol: "http",
        //         forwardUriScheme: "/v1/presentables/${1}/"
        //     },
        //     httpMethod: ['GET', 'POST'],
        //     httpComponents: [{
        //         "should": ["internal-identity", "null", {"must": ["a", "b", "c"]}, {"should": ["e", "f", "g"]}],
        //         "must": ["client", {"should": ["x", "y", "z"]}],
        //         "group": [""],
        //     }, "m", "n"]
        // })
        //
        // apiRouterProvider.create({
        //     routerPrefix: "/v1/presentables/",
        //     routerUrlRule: "/v1/presentables/${0}/",
        //     routerRegExp : [
        //         "^[0-9a-f]{24}$"
        //     ],
        //     upstream: {
        //         serverGroupId: "5c175892e5c181401cd91988",
        //         protocol: "http",
        //         forwardUriScheme: "/v1/presentables/${1}/"
        //     },
        //     httpMethod: ['GET', 'POST'],
        //     httpComponents: [{
        //         "should": ["internal-identity", "null", {"must": ["a", "b", "c"]}, {"should": ["e", "f", "g"]}],
        //         "must": ["client", {"should": ["x", "y", "z"]}],
        //         "group": [""],
        //     }, "m", "n"]
        // })
    }
}