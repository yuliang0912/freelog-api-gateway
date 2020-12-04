import {provide, inject, scope, ScopeEnum} from 'midway';
import {
    ICommonComponentHandler, IComponentHandleResult
} from '../../../interface';
import {queue} from 'async';
import {RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum} from '../../../enum';
import {FreelogContext} from "egg-freelog-base";

@scope(ScopeEnum.Singleton)
@provide(`gateway_com_${RouterComponentNameEnum.Request_record}`)
export class RequestRecordHandler implements ICommonComponentHandler {

    comName = RouterComponentNameEnum.Request_record;
    comType = RouterComponentTypeEnum.Statistics;
    comLevel = RouterComponentLevelEnum.ResponseAfter;
    taskQueue = queue(this.requestRecordHandle.bind(this), 50);

    @inject()
    logger;
    @inject()
    componentHandleResult: IComponentHandleResult;

    async handle(ctx: FreelogContext, config?: object): Promise<IComponentHandleResult> {

        const {routerId, routerUrlRule} = ctx.gatewayInfo.routerInfo;

        this.taskQueue.push({routerId, routerUrlRule}, this.errorHandle.bind(this));

        return this.componentHandleResult.build(this.comName, this.comType).setHandleResult(true);
    }


    /**
     * 流量统计数据保存
     * @param routerId
     * @param routerUrlRule
     */
    async requestRecordHandle() {
        // console.log(this.ctx.host);
        // 暂时不保持每次的请求记录.后续可以考虑加入到日志系统中,目前记录在流量统计中一起实现了
    }

    /**
     * 错误处理
     * @param err
     */
    errorHandle(error) {
        if (error instanceof Error) {
            console.log("end-of-cycle-event-handler", '事件执行异常', ...arguments);
            this.logger.error("end-of-cycle-event-handler", '事件执行异常', ...arguments);
        }
    }
}
