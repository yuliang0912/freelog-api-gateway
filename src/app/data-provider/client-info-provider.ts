import {provide, inject, scope, ScopeEnum} from 'midway';
import * as MongoBaseOperation from 'egg-freelog-base/lib/database/mongo-base-operation';

@provide()
@scope(ScopeEnum.Singleton)
export default class ClientInfoProvider extends MongoBaseOperation {
    constructor(@inject('model.ClientInfo') model) {
        super(model);
    }
}
