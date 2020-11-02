import {omit} from 'lodash';
import {scope, provide, ScopeEnum} from 'midway';
import {MongooseModelBase, IMongooseModelBase} from './mongoose-model-base';

@scope(ScopeEnum.Singleton)
@provide('model.IpBlackWhiteGroup')
export class IpBlackWhiteGroup extends MongooseModelBase implements IMongooseModelBase {

    buildMongooseModel() {
        const IpSchema = new this.mongoose.Schema({
            ip: {type: String, unique: true, required: true},
            remark: {type: String, default: '', required: false},
            status: {type: Number, default: 1, enum: [0, 1], required: true}, //状态 1:启用 0:禁用
        }, {_id: false, versionKey: false});

        const IpWhiteListGroupSchema = new this.mongoose.Schema({
            groupName: {type: String, required: true},
            IpSettings: [IpSchema],
            groupType: {type: String, enum: ['black', 'white'], required: true},
            status: {type: Number, default: 1, enum: [0, 1], required: true}, //状态 1:启用 0:禁用
        }, {
            versionKey: false,
            timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'},
            toJSON: IpBlackWhiteGroup.toObjectOptions,
            toObject: IpBlackWhiteGroup.toObjectOptions
        });

        return this.mongoose.model('ip-black-white-list-group', IpWhiteListGroupSchema);
    }

    static get toObjectOptions() {
        return {
            transform(doc, ret, options) {
                return Object.assign({groupId: doc.id}, omit(ret, ['_id']));
            }
        };
    }
}
