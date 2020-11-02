import {provide, scope, ScopeEnum} from 'midway';
import {IComponentHandleResult} from "../../../interface";
import {RouterComponentNameEnum, RouterComponentTypeEnum} from "../../../enum";

@provide()
@scope(ScopeEnum.Prototype)
export class ComponentHandleResult implements IComponentHandleResult {

    comName: string;
    comType: RouterComponentTypeEnum;
    handleResult: boolean;
    attachData: object | null;
    error: Error | null;
    tips?: string;

    build(comName: RouterComponentNameEnum, comType: RouterComponentTypeEnum, handleResult?: boolean): IComponentHandleResult {
        this.comName = comName;
        this.comType = comType;
        this.handleResult = handleResult ?? false;
        return this;
    }

    setComName(comName: RouterComponentNameEnum): IComponentHandleResult {
        this.comName = comName;
        return this;
    }

    setComType(comType: RouterComponentTypeEnum): IComponentHandleResult {
        this.comType = comType;
        return this;
    }

    setHandleResult(handleResult: boolean): IComponentHandleResult {
        this.handleResult = handleResult;
        return this;
    }

    setError(error: Error): IComponentHandleResult {
        this.error = error;
        return this;
    }

    setTips(tips: string): IComponentHandleResult {
        this.tips = tips;
        return this;
    }

    setAttachData(attachData: any): IComponentHandleResult {
        this.attachData = attachData;
        return this;
    }
}