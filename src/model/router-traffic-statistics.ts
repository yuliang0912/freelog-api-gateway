import {scope, provide, ScopeEnum, plugin} from 'midway';
import {MongooseModelBase, IMongooseModelBase} from 'egg-freelog-base';

@scope(ScopeEnum.Singleton)
@provide('model.RouterTrafficStatistics')
export class RouterTrafficStatistics extends MongooseModelBase implements IMongooseModelBase {

    constructor(@plugin('mongoose') mongoose) {
        super(mongoose);
    }

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
