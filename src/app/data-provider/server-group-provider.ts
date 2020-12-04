import {provide, inject, scope, ScopeEnum} from 'midway';
import {MongodbOperation} from 'egg-freelog-base'

@provide()
@scope(ScopeEnum.Singleton)
export default class ServerGroupProvider extends MongodbOperation<any> {
    constructor(@inject('model.ServerGroup') model) {
        super(model);
    }
}

