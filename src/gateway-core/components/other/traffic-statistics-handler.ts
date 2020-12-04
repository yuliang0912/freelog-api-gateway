import {queue} from 'async';
import {FreelogContext} from 'egg-freelog-base';
import {provide, inject, scope, ScopeEnum} from 'midway';
import {RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum} from '../../../enum';
import {ICommonComponentHandler, IComponentHandleResult, IRequestContextGatewayInfo} from '../../../interface';

@scope(ScopeEnum.Singleton)
@provide(`gateway_com_${RouterComponentNameEnum.Traffic_Statistics}`)
export class TrafficStatisticsHandler implements ICommonComponentHandler {

    comName = RouterComponentNameEnum.Traffic_Statistics;
    comType = RouterComponentTypeEnum.Statistics;
    comLevel = RouterComponentLevelEnum.ResponseAfter;
    private taskQueue = queue(this.trafficStatisticsHandle.bind(this), 50);

    @inject()
    requestRecordProvider;
    @inject()
    routerTrafficStatisticsProvider;
    @inject()
    componentHandleResult: IComponentHandleResult;


    async handle(ctx: FreelogContext, config?: object): Promise<IComponentHandleResult> {

        this.taskQueue.push(ctx, this.errorHandle.bind(this));

        return this.componentHandleResult.build(this.comName, this.comType).setHandleResult(true);
    }


    /**
     * 流量统计数据保存
     * @param routerId
     * @param routerUrlRule
     */
    async trafficStatisticsHandle(ctx: FreelogContext) {

        const gatewayInfo = ctx.gatewayInfo as IRequestContextGatewayInfo;
        const {requestId, traceId, url, method, proxyResponse} = ctx;
        const {routerId, upstream, routerUrlRule} = gatewayInfo.routerInfo;

        const recordInfo = {
            requestId, traceId, routerId, method,
            requestUrl: url,
            forwardUrl: upstream.forwardUrl,
            serverGroupName: upstream.serverGroupName,
            serviceResponseTime: (ctx.startResponseTime - ctx.startRquestTime),
            reqContentLength: ctx.get('content-length') ?? 0,
            resContentLength: proxyResponse.headers['content-length'] ?? 0,
            userId: gatewayInfo.identityInfo.userInfo?.['userId'] ?? 0
        }

        this.routerTrafficStatisticsProvider?.findOneAndUpdate({
            routerId, routerUrlRule
        }, {$inc: {totalCount: 1}}, {new: true}).then(data => {
            return data ?? this.routerTrafficStatisticsProvider.create({routerId, routerUrlRule, totalCount: 1});
        });

        this.requestRecordProvider?.create(recordInfo);
    }

    /**
     * 错误处理
     * @param err
     */
    errorHandle(error) {
        if (error instanceof Error) {
            console.log("end-of-cycle-event-handler", '事件执行异常', ...arguments);
        }
    }
}
