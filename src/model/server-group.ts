import {scope, provide, ScopeEnum, plugin} from 'midway';
import {MongooseModelBase, IMongooseModelBase} from 'egg-freelog-base';
import {omit} from 'lodash';

@scope(ScopeEnum.Singleton)
@provide('model.ServerGroup')
export class ServerGroup extends MongooseModelBase implements IMongooseModelBase {

    constructor(@plugin('mongoose') mongoose) {
        super(mongoose);
    }

    buildMongooseModel() {

        const ServerSchema = new this.mongoose.Schema({
            serverName: {type: String, required: true},
            serverIp: {type: String, required: true},
            weightCoefficient: {type: Number, default: 100, required: true},
            status: {type: Number, default: 1, enum: [0, 1], required: true}, //状态 1:启用 0:禁用
        }, {_id: false, versionKey: false});

        const ServerGroupSchema = new this.mongoose.Schema({
            groupName: {type: String, unique: true, required: true},
            servers: [ServerSchema],
            status: {type: Number, default: 1, enum: [0, 1], required: true}, //状态 1:启用 0:禁用
        }, {
            versionKey: false,
            timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'},
            toJSON: ServerGroup.toObjectOptions,
            toObject: ServerGroup.toObjectOptions
        });

        return this.mongoose.model('server-groups', ServerGroupSchema);
    }

    static get toObjectOptions() {
        return {
            transform(doc, ret, options) {
                return Object.assign({groupId: doc.id}, omit(ret, ['_id']));
            }
        };
    }
}
