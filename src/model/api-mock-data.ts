import {omit} from 'lodash';
import {scope, provide, ScopeEnum, plugin} from 'midway';
import {MongooseModelBase, IMongooseModelBase} from 'egg-freelog-base';

@scope(ScopeEnum.Singleton)
@provide('model.MockData')
export class ApiMockDataModel extends MongooseModelBase implements IMongooseModelBase {

    constructor(@plugin('mongoose') mongoose) {
        super(mongoose);
    }

    buildMongooseModel() {

        const ApiMockDataSchema = new this.mongoose.Schema({
            routeId: {type: String, unique: true, required: true},
            contentType: {type: String, required: true},
            mockData: {type: this.mongoose.Schema.Types.Mixed, required: true},
            status: {type: Number, default: 1, enum: [0, 1], required: true}
        }, {
            versionKey: false,
            timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'},
            toJSON: ApiMockDataModel.toObjectOptions
        });

        ApiMockDataSchema.index({routeId: 1}, {unique: true});

        return this.mongoose.model('api-mock-datas', ApiMockDataSchema);
    }

    static get toObjectOptions() {
        return {
            transform(doc, ret, options) {
                return omit(ret, ['_id']);
            }
        };
    }
}
