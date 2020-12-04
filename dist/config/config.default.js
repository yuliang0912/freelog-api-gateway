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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUc3QixNQUFNLG1CQUFtQixHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUE7QUFFOUYsa0JBQWUsQ0FBQyxPQUFtQixFQUFFLEVBQUU7SUFDbkMsTUFBTSxNQUFNLEdBQVEsRUFBRSxDQUFDO0lBRXZCLE1BQU0sQ0FBQyxPQUFPLEdBQUc7UUFDYixNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDO0tBQ3ZCLENBQUM7SUFFRixNQUFNLENBQUMsSUFBSSxHQUFHLGtDQUFrQyxDQUFDO0lBRWpELE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFDVixNQUFNLEVBQUUsS0FBSztLQUNoQixDQUFDO0lBRUYsTUFBTSxDQUFDLFFBQVEsR0FBRztRQUNkLE1BQU0sRUFBRTtZQUNKLE1BQU0sRUFBRSxLQUFLO1NBQ2hCO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsTUFBTSxFQUFFLEtBQUs7U0FDaEI7S0FDSixDQUFDO0lBRUYsTUFBTSxDQUFDLFVBQVUsR0FBRztRQUNoQixNQUFNLEVBQUUsSUFBSTtRQUNaLFdBQVcsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3JDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO0tBQ25ELENBQUM7SUFFRixNQUFNLENBQUMsUUFBUSxHQUFHO1FBQ2QsR0FBRyxFQUFFLHVDQUF1QztLQUMvQyxDQUFDO0lBRUYsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLHFCQUFxQixFQUFFLG9CQUFvQixFQUFFLG1DQUFtQyxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLHNCQUFzQixFQUFFLG1DQUFtQyxDQUFDLENBQUM7SUFFMU0sTUFBTSxDQUFDLGtCQUFrQixHQUFHO1FBQ3hCLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLG1CQUFtQjtLQUM5QixDQUFDO0lBRUYsTUFBTSxDQUFDLGNBQWMsR0FBRztRQUNwQixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxtQkFBbUI7S0FDOUIsQ0FBQztJQUVGLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRztRQUN0QixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxtQkFBbUI7S0FDOUIsQ0FBQztJQUVGLE1BQU0sQ0FBQyxvQkFBb0IsR0FBRztRQUMxQixNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxtQkFBbUI7S0FDOUIsQ0FBQztJQUVGLE1BQU0sQ0FBQyxpQ0FBaUMsR0FBRztRQUN2QyxNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxtQkFBbUI7S0FDOUIsQ0FBQztJQUVGLE1BQU0sQ0FBQyxpQ0FBaUMsR0FBRztRQUN2QyxNQUFNLEVBQUUsSUFBSTtRQUNaLE1BQU0sRUFBRSxtQkFBbUI7S0FDOUIsQ0FBQztJQUVGLE1BQU0sQ0FBQyxXQUFXLEdBQUc7UUFDakIsV0FBVyxFQUFFLEVBQUU7UUFDZixXQUFXLEVBQUUsRUFBRTtLQUNsQixDQUFBO0lBRUQsTUFBTSxDQUFDLE1BQU0sR0FBRztRQUNaLFlBQVksRUFBRSxNQUFNO1FBQ3BCLEtBQUssRUFBRSxPQUFPO0tBQ2pCLENBQUM7SUFFRixlQUFlO0lBQ2YsTUFBTSxDQUFDLFVBQVUsR0FBRztRQUNoQixpQkFBaUIsRUFBRTtZQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBQztTQUNwRTtRQUNELFdBQVcsRUFBRSxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxHQUFHO0tBQ3hDLENBQUM7SUFFRixNQUFNLENBQUMsWUFBWSxHQUFHO1FBQ2xCLElBQUksRUFBRTtZQUNGLFNBQVMsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLHFDQUFxQyxDQUFDLENBQUMsUUFBUSxFQUFFO1NBQy9FO1FBQ0QsUUFBUSxFQUFFO1lBQ04sU0FBUyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMseUNBQXlDLENBQUMsQ0FBQyxRQUFRLEVBQUU7U0FDbkY7S0FDSixDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyxDQUFDIn0=