import * as fs from 'fs';
import * as path from 'path';
import {EggAppInfo} from 'midway';

const gatewayRouterIgnore = [ctx => ctx.path === "/", ctx => ctx.path.startsWith("/gateway/")]

export default (appInfo: EggAppInfo) => {
    const config: any = {};

    config.cluster = {
        listen: {port: 8895}
    };

    config.keys = '20ab72d9397ff78c5058a106c635f018';

    config.i18n = {
        enable: false
    };

    config.security = {
        xframe: {
            enable: false,
        },
        csrf: {
            enable: false,
        }
    };

    config.bodyParser = {
        enable: true,
        enableTypes: ['json', 'form', 'text'],
        ignore: ctx => !ctx.path.startsWith("/gateway/")
    };

    config.mongoose = {
        url: 'mongodb://127.0.0.1:27017/api-gateway'
    };

    config.middleware = ['gatewayErrorHandler', 'freelogGatewayMain', 'httpComponentRequestBeforeHandler', 'apiMockHandler', 'httpProxyHandler', 'proxyResponseHandler', 'httpComponentResponseAfterHandler'];

    config.freelogGatewayMain = {
        enable: true,
        ignore: gatewayRouterIgnore
    };

    config.apiMockHandler = {
        enable: true,
        ignore: gatewayRouterIgnore
    };

    config.httpProxyHandler = {
        enable: true,
        ignore: gatewayRouterIgnore
    };

    config.proxyResponseHandler = {
        enable: true,
        ignore: gatewayRouterIgnore
    };

    config.httpComponentRequestBeforeHandler = {
        enable: true,
        ignore: gatewayRouterIgnore
    };

    config.httpComponentResponseAfterHandler = {
        enable: true,
        ignore: gatewayRouterIgnore
    };

    config.freelogBase = {
        retCodeEnum: {},
        errCodeEnum: {}
    }

    config.logger = {
        consoleLevel: 'NONE',
        level: 'ERROR',
    };

    //错误日志500MB自动分割
    config.logrotator = {
        filesRotateBySize: [
            path.join(appInfo.root, 'logs', appInfo.name, 'common-error.log'),
        ],
        maxFileSize: 1024 * 1024 * 1024 * 0.5,
    };

    config.RasSha256Key = {
        node: {
            publicKey: fs.readFileSync('certificate/public-jwt-node-key.pem').toString()
        },
        identity: {
            publicKey: fs.readFileSync('certificate/public-jwt-identity-key.pem').toString()
        },
    };

    return config;
};
