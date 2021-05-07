import {provide, inject, scope, ScopeEnum} from 'midway';
import {MongodbOperation} from 'egg-freelog-base';
import {RouterInfo} from '../../interface';

@provide()
@scope(ScopeEnum.Singleton)
export default class ApiRouterProvider extends MongodbOperation<RouterInfo> {
    constructor(@inject('model.ApiRouter') model) {
        super(model);
    }
}
