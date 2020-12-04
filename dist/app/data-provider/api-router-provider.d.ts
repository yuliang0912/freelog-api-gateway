import { MongodbOperation } from 'egg-freelog-base';
import { RouterInfo } from "../../interface";
export default class ApiRouterProvider extends MongodbOperation<RouterInfo> {
    constructor(model: any);
}
