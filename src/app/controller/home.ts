import {IGatewayConfigService, IGatewayService} from '../../interface';
import {visitorIdentityValidator, IdentityTypeEnum, ArgumentError, FreelogContext} from 'egg-freelog-base';

export default class HomeController {

    /**
     * 首页
     * @param ctx
     * @returns {Promise<void>}
     */
    async index(ctx) {
        ctx.body = '<h1>freelog api gateway!</h1>';
    }

    /**
     * 运行状态
     * @param ctx
     */
    async state(ctx) {

        const requestRecordProvider: IGatewayConfigService = ctx.requestContext.get('gatewayConfigService');
        ctx.success({
            isSetGatewayInfo: requestRecordProvider.isSetGatewayInfo,
            latestUpdateDate: requestRecordProvider.latestUpdateDate
        });
    }

    /**
     * 访问记录
     * @param ctx
     */
    @visitorIdentityValidator(IdentityTypeEnum.LoginUser | IdentityTypeEnum.UnLoginUser)
    async requestRecords(ctx: FreelogContext) {

        const page = ctx.checkQuery('page').optional().toInt().gt(0).default(1).value;
        const pageSize = ctx.checkQuery('pageSize').optional().toInt().gt(0).lt(101).default(10).value;
        const serverGroupName = ctx.checkQuery('serverGroupName').optional().type('string').len(1, 100).value;
        const serviceResponseTime = ctx.checkQuery('serviceResponseTime').optional().toInt().gt(0).value;
        const operator = ctx.checkQuery('operator').optional().toInt().in([1, 2]).value; //1:小于 2:大于
        const routerId = ctx.checkQuery('routerId').optional().isMongoObjectId().value;
        const requestUrl = ctx.checkQuery('requestUrl').optional().value;
        const userId = ctx.checkQuery('userId').optional().toInt().gt(0).value;

        ctx.validateParams();

        if (serviceResponseTime && !operator) {
            throw new ArgumentError('组合参数serviceResponseTime,operator校验失败');
        }

        const condition: any = {};
        if (serverGroupName) {
            condition.serverGroupName = serverGroupName;
        }
        if (serviceResponseTime && operator) {
            let mongoOperator = operator === 1 ? '$lt' : '$gt';
            condition.serviceResponseTime = {
                [mongoOperator]: serviceResponseTime
            };
        }
        if (routerId) {
            condition.routerId = routerId;
        }
        if (requestUrl) {
            condition.requestUrl = requestUrl;
        }
        if (userId) {
            condition.userId = userId;
        }

        const requestRecordProvider = ctx.requestContext.get('requestRecordProvider');

        const task1 = requestRecordProvider.count(condition);
        const task2 = requestRecordProvider.findPageList(condition, page, pageSize, null, {createDate: -1});

        await Promise.all([task1, task2]).then(([totalItem, dataList]) => ctx.success({
            page, pageSize, totalItem, dataList
        }));
    }

    /**
     * 同步路由数据
     * @param ctx
     */
    async syncRouterData(ctx) {
        const gatewayService: IGatewayService = ctx.requestContext.get('gatewayService');
        await gatewayService.updateRouterConfig().then(ctx.success);
    }
}
