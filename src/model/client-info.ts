import {omit} from 'lodash';
import {scope, provide, ScopeEnum, plugin} from 'midway';
import {MongooseModelBase, IMongooseModelBase} from 'egg-freelog-base';

@scope(ScopeEnum.Singleton)
@provide('model.ClientInfo')
export class ClientInfo extends MongooseModelBase implements IMongooseModelBase {


    constructor(@plugin('mongoose') mongoose) {
        super(mongoose);
    }

    buildMongooseModel() {

        const ClientInfoSchema = new this.mongoose.Schema({
            clientId: {type: Number, unique: true, required: true},
            clientName: {type: String, unique: true, required: true},
            publicKey: {type: String, unique: true, required: true},
            privateKey: {type: String, unique: true, required: true},
            status: {type: Number, default: 1, enum: [0, 1], required: true}, //状态 1:启用 0:禁用
        }, {
            versionKey: false,
            timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'},
            toJSON: ClientInfo.toObjectOptions
        });

        return this.mongoose.model('client-infos', ClientInfoSchema);
    }

    static get toObjectOptions() {
        return {
            transform(doc, ret, options) {
                return omit(ret, ['_id', 'privateKey']);
            }
        };
    }
}
