import {provide, inject, scope, ScopeEnum} from 'midway';
import {MongodbOperation} from 'egg-freelog-base';

@provide()
@scope(ScopeEnum.Singleton)
export default class RouterTrafficStatisticsProvider extends MongodbOperation<any> {
    constructor(@inject('model.RouterTrafficStatistics') model) {
        super(model);
    }
}
