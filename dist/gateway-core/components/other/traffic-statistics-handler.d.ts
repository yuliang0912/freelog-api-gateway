import { FreelogContext } from 'egg-freelog-base';
import { RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum } from '../../../enum';
import { ICommonComponentHandler, IComponentHandleResult } from '../../../interface';
export declare class TrafficStatisticsHandler implements ICommonComponentHandler {
    comName: RouterComponentNameEnum;
    comType: RouterComponentTypeEnum;
    comLevel: RouterComponentLevelEnum;
    private taskQueue;
    requestRecordProvider: any;
    routerTrafficStatisticsProvider: any;
    componentHandleResult: IComponentHandleResult;
    handle(ctx: FreelogContext, config?: object): Promise<IComponentHandleResult>;
    /**
     * 流量统计数据保存
     * @param routerId
     * @param routerUrlRule
     */
    trafficStatisticsHandle(ctx: FreelogContext): Promise<void>;
    /**
     * 错误处理
     * @param err
     */
    errorHandle(error: any): void;
}
