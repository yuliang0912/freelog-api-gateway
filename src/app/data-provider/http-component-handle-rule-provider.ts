import {provide, inject, scope, ScopeEnum} from 'midway';
import * as MongoBaseOperation from 'egg-freelog-base/lib/database/mongo-base-operation';

@provide()
@scope(ScopeEnum.Singleton)
export default class HttpComponentHandleRuleProvider extends MongoBaseOperation {
    constructor(@inject('model.HttpComponentHandleRule') model) {
        super(model);
    }
}
