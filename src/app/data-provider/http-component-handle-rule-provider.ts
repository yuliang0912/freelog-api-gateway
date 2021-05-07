import {provide, inject, scope, ScopeEnum} from 'midway';
import {MongodbOperation} from 'egg-freelog-base';

@provide()
@scope(ScopeEnum.Singleton)
export default class HttpComponentHandleRuleProvider extends MongodbOperation<any> {
    constructor(@inject('model.HttpComponentHandleRule') model) {
        super(model);
    }
}
