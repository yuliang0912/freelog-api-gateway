import {provide, inject, scope, ScopeEnum} from 'midway';
import {MongodbOperation} from 'egg-freelog-base';
import {ClientInfo} from '../../interface';

@provide()
@scope(ScopeEnum.Singleton)
export default class ClientInfoProvider extends MongodbOperation<ClientInfo> {
    constructor(@inject('model.ClientInfo') model) {
        super(model);
    }
}
