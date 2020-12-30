import {provide, inject, scope, ScopeEnum} from 'midway';
import {MongodbOperation} from 'egg-freelog-base';

@provide()
@scope(ScopeEnum.Singleton)
export default class ApiMockDataProvider extends MongodbOperation<any> {
    constructor(@inject('model.MockData') model) {
        super(model);
    }
}
