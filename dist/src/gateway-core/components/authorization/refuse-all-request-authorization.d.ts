import { ICommonComponentHandler, IComponentHandleResult } from '../../../../interface';
import { RouterComponentLevelEnum, RouterComponentTypeEnum, RouterComponentNameEnum } from '../../../../enum';
export declare class RefuseAllRequestAuthorization implements ICommonComponentHandler {
    comName: RouterComponentNameEnum;
    comType: RouterComponentTypeEnum;
    comLevel: RouterComponentLevelEnum;
    componentHandleResult: IComponentHandleResult;
    handle(config?: object): Promise<IComponentHandleResult>;
}
