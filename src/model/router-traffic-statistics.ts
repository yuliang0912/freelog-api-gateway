import {scope, provide, ScopeEnum} from 'midway';
import {MongooseModelBase, IMongooseModelBase} from './mongoose-model-base';

@scope(ScopeEnum.Singleton)
@provide('model.RouterTrafficStatistics')
export class RouterTrafficStatistics extends MongooseModelBase implements IMongooseModelBase {

    buildMongooseModel() {

        const RouterTrafficStatisticsSchema = new this.mongoose.Schema({
            routerId: {type: String, required: true},
            routerUrlRule: {type: String, required: true},
            totalCount: {type: Number, default: 1, required: true},
        }, {
            versionKey: false,
            timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'}
        });

        return this.mongoose.model('router-traffic-statistics', RouterTrafficStatisticsSchema);
    }
}
