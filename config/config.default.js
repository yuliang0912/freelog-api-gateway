'use strict';

const fs = require('fs')
const path = require('path')
const gatewayRouterIgnore = [ctx => ctx.path === "/", ctx => ctx.path.startsWith("/gateway/")]

module.exports = app => {

    return {
        cluster: {
            listen: {port: 8895}
        },

        keys: '20ab72d9397ff78c5058a106c635f008',

        i18n: {
            enable: false
        },

        /**
         * 关闭安全防护
         */
        security: {
            xframe: {
                enable: false,
            },
            csrf: {
                enable: false,
            }
        },

        bodyParser: {
            enable: true,
            enableTypes: ['json', 'form', 'text'],
            ignore: ctx => !ctx.path.startsWith("/gateway/")
        },

        mongoose: {
            url: "mongodb://127.0.0.1:27017/api-gateway"
        },

        customLoader: ['app/event-handler'],

        middleware: ['gatewayErrorHandler', 'freelogGatewayMain', 'httpComponentHandler', 'apiMockHandler', 'httpProxyHandler', 'proxyResponseHandler'],

        freelogGatewayMain: {
            enable: true,
            ignore: gatewayRouterIgnore
        },

        httpComponentHandler: {
            enable: true,
            ignore: gatewayRouterIgnore
        },

        apiMockHandler: {
            enable: true,
            ignore: gatewayRouterIgnore
        },

        httpProxyHandler: {
            enable: true,
            ignore: gatewayRouterIgnore
        },

        proxyResponseHandler: {
            enable: true,
            ignore: gatewayRouterIgnore
        },

        freelogBase: {
            retCodeEnum: {},
            errCodeEnum: {}
        },

        logger: {
            consoleLevel: 'NONE',
            level: 'ERROR',
        },

        //错误日志500MB自动分割
        logrotator: {
            filesRotateBySize: [
                path.join(app.root, 'logs', app.name, 'common-error.log'),
            ],
            maxFileSize: 1024 * 1024 * 1024 * 0.5,
        },

        RasSha256Key: {
            node: {
                publicKey: fs.readFileSync('app/certificate/public-jwt-node-key.pem').toString()
            },
            identity: {
                publicKey: fs.readFileSync('app/certificate/public-jwt-identity-key.pem').toString()
            },
        }
    }
}
