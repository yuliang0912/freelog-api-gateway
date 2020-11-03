import { IComponentHandleResult } from "../../interface";
import { RouterComponentNameEnum, RouterComponentTypeEnum } from "../../enum";
export declare class ComponentHandleResult implements IComponentHandleResult {
    comName: string;
    comType: RouterComponentTypeEnum;
    handleResult: boolean;
    attachData: object | null;
    error: Error | null;
    tips?: string;
    build(comName: RouterComponentNameEnum, comType: RouterComponentTypeEnum, handleResult?: boolean): IComponentHandleResult;
    setComName(comName: RouterComponentNameEnum): IComponentHandleResult;
    setComType(comType: RouterComponentTypeEnum): IComponentHandleResult;
    setHandleResult(handleResult: boolean): IComponentHandleResult;
    setError(error: Error): IComponentHandleResult;
    setTips(tips: string): IComponentHandleResult;
    setAttachData(attachData: any): IComponentHandleResult;
}
