import {provide, inject, scope, ScopeEnum} from 'midway';
import {MongodbOperation} from 'egg-freelog-base';

@provide()
@scope(ScopeEnum.Singleton)
export default class RequestRecordProvider extends MongodbOperation<any> {
    constructor(@inject('model.RequestRecord') model) {
        super(model);
    }
}
