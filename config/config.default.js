'use strict';

const fs = require('fs')
const path = require('path')

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

        ua: {
            enable: true
        },

        bodyParser: {
            enable: true,
        },

        middleware: ['freelogHttpProxy'],

        mongoose: {
            url: "mongodb://127.0.0.1:27017/api-gateway"
        },

        multipart: {
            autoFields: false,
            defaultCharset: 'utf8',
            fieldNameSize: 100,
            fieldSize: '100kb',
            fields: 20,
            fileSize: '100mb',
            files: 10,
            fileExtensions: [],
            whitelist: (fileName) => true,
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
            identity: {
                publicKey: fs.readFileSync('app/certificate/public-jwt-identity-key.pem').toString()
            }
        },
    }
}
