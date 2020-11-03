import { Context } from 'midway';
import { ICommonComponentHandler, IComponentHandleResult } from '../../../interface';
import { RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum } from '../../../enum';
export declare class RequestRecordHandler implements ICommonComponentHandler {
    comName: RouterComponentNameEnum;
    comType: RouterComponentTypeEnum;
    comLevel: RouterComponentLevelEnum;
    taskQueue: any;
    logger: any;
    componentHandleResult: IComponentHandleResult;
    handle(ctx: Context, config?: object): Promise<IComponentHandleResult>;
    /**
     * 流量统计数据保存
     * @param routerId
     * @param routerUrlRule
     */
    requestRecordHandle(): Promise<void>;
    /**
     * 错误处理
     * @param err
     */
    errorHandle(error: any): void;
}
