import {provide, inject, scope, ScopeEnum} from 'midway';
import {MongodbOperation} from 'egg-freelog-base';

@provide()
@scope(ScopeEnum.Singleton)
export default class IpBlackWhiteGroupProvider extends MongodbOperation<any> {
    constructor(@inject('model.IpBlackWhiteGroup') model) {
        super(model);
    }
}
