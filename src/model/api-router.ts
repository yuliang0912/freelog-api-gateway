import {omit} from 'lodash';
import {scope, provide, ScopeEnum, plugin} from 'midway';
import {MongooseModelBase, IMongooseModelBase} from 'egg-freelog-base';

@scope(ScopeEnum.Singleton)
@provide('model.ApiRouter')
export class ApiRouter extends MongooseModelBase implements IMongooseModelBase {

    constructor(@plugin('mongoose') mongoose) {
        super(mongoose);
    }

    buildMongooseModel() {

        const ApiRouterConfigSchema = new this.mongoose.Schema({
            routerPrefix: {type: String, required: true},
            routerUrlRule: {type: String, required: true},
            upstream: {
                serverGroupName: {type: String, required: true},
                protocol: {type: String, default: 'http', required: true},
                port: {type: Number, required: true},
                forwardUriScheme: {type: String, required: true},
                method: {type: String, default: null} //为空,则与请求的method相同
            },
            httpMethod: {
                type: [String], //enum: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH', 'COPY', 'LINK', 'UNLINK', 'PURGE'],
                required: true
            },
            httpComponentRuleIds: [],
            mockStatus: {type: Number, default: 0, enum: [0, 1], required: true}, //状态 1:启用 0:禁用
            status: {type: Number, default: 1, enum: [0, 1], required: true}, //状态 1:启用 0:禁用
        }, {
            versionKey: false,
            toJSON: ApiRouter.toObjectOptions,
            toObject: ApiRouter.toObjectOptions,
            timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'}
        });

        ApiRouterConfigSchema.index({routerPrefix: 1, httpMethod: 1, status: 1});
        ApiRouterConfigSchema.virtual('routerId').get(function (this: any) {
            return this.id;
        });

        return this.mongoose.model('api-router-config', ApiRouterConfigSchema);
    }

    static get toObjectOptions() {
        return {
            getters: true,
            virtuals: true,
            transform(doc, ret, options) {
                return Object.assign({routerId: doc.id}, omit(ret, ['_id']));
            }
        };
    }
}
