"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const gatewayRouterIgnore = [ctx => ctx.path === "/", ctx => ctx.path.startsWith("/gateway/")];
exports.default = (appInfo) => {
    const config = {};
    config.cluster = {
        listen: { port: 8895 }
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
    config.middleware = [
        'errorHandler', 'identityAuthentication'
    ];
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
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUc3QixNQUFNLG1CQUFtQixHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUE7QUFFOUYsa0JBQWUsQ0FBQyxPQUFtQixFQUFFLEVBQUU7SUFDbkMsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO0lBRXZCLE1BQU0sQ0FBQyxPQUFPLEdBQUc7UUFDYixNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDO0tBQ3ZCLENBQUM7SUFFRixNQUFNLENBQUMsSUFBSSxHQUFHLGtDQUFrQyxDQUFDO0lBRWpELE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFDVixNQUFNLEVBQUUsS0FBSztLQUNoQixDQUFDO0lBRUYsTUFBTSxDQUFDLFFBQVEsR0FBRztRQUNkLE1BQU0sRUFBRTtZQUNKLE1BQU0sRUFBRSxLQUFLO1NBQ2hCO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsTUFBTSxFQUFFLEtBQUs7U0FDaEI7S0FDSixDQUFDO0lBRUYsTUFBTSxDQUFDLFVBQVUsR0FBRztRQUNoQixNQUFNLEVBQUUsSUFBSTtRQUNaLFdBQVcsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3JDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO0tBQ25ELENBQUM7SUFFRixNQUFNLENBQUMsUUFBUSxHQUFHO1FBQ2QsR0FBRyxFQUFFLHVDQUF1QztLQUMvQyxDQUFDO0lBRUYsTUFBTSxDQUFDLFVBQVUsR0FBRztRQUNoQixjQUFjLEVBQUUsd0JBQXdCO0tBQzNDLENBQUM7SUFFRixNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsbUNBQW1DLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUUsc0JBQXNCLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztJQUUxTSxNQUFNLENBQUMsa0JBQWtCLEdBQUc7UUFDeEIsTUFBTSxFQUFFLElBQUk7UUFDWixNQUFNLEVBQUUsbUJBQW1CO0tBQzlCLENBQUM7SUFFRixNQUFNLENBQUMsY0FBYyxHQUFHO1FBQ3BCLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLG1CQUFtQjtLQUM5QixDQUFDO0lBRUYsTUFBTSxDQUFDLGdCQUFnQixHQUFHO1FBQ3RCLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLG1CQUFtQjtLQUM5QixDQUFDO0lBRUYsTUFBTSxDQUFDLG9CQUFvQixHQUFHO1FBQzFCLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLG1CQUFtQjtLQUM5QixDQUFDO0lBRUYsTUFBTSxDQUFDLGlDQUFpQyxHQUFHO1FBQ3ZDLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLG1CQUFtQjtLQUM5QixDQUFDO0lBRUYsTUFBTSxDQUFDLGlDQUFpQyxHQUFHO1FBQ3ZDLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLG1CQUFtQjtLQUM5QixDQUFDO0lBRUYsTUFBTSxDQUFDLFdBQVcsR0FBRztRQUNqQixXQUFXLEVBQUUsRUFBRTtRQUNmLFdBQVcsRUFBRSxFQUFFO0tBQ2xCLENBQUE7SUFFRCxNQUFNLENBQUMsTUFBTSxHQUFHO1FBQ1osWUFBWSxFQUFFLE1BQU07UUFDcEIsS0FBSyxFQUFFLE9BQU87S0FDakIsQ0FBQztJQUVGLGVBQWU7SUFDZixNQUFNLENBQUMsVUFBVSxHQUFHO1FBQ2hCLGlCQUFpQixFQUFFO1lBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDO1NBQ3BFO1FBQ0QsV0FBVyxFQUFFLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUc7S0FDeEMsQ0FBQztJQUVGLE1BQU0sQ0FBQyxZQUFZLEdBQUc7UUFDbEIsSUFBSSxFQUFFO1lBQ0YsU0FBUyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMscUNBQXFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7U0FDL0U7UUFDRCxRQUFRLEVBQUU7WUFDTixTQUFTLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtTQUNuRjtLQUNKLENBQUM7SUFFRixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDLENBQUMifQ==