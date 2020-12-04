import {omit} from 'lodash';
import {scope, provide, ScopeEnum, plugin} from 'midway';
import {MongooseModelBase, IMongooseModelBase} from 'egg-freelog-base';

@scope(ScopeEnum.Singleton)
@provide('model.HttpComponentHandleRule')
export class HttpComponentHandleRule extends MongooseModelBase implements IMongooseModelBase {

    constructor(@plugin('mongoose') mongoose) {
        super(mongoose);
    }

    buildMongooseModel() {

        const HttpComponentHandleRuleSchema = new this.mongoose.Schema({
            ruleName: {type: String, required: true},
            httpComponentRules: [],
            componentConfig: {}, //此处的配置会全部透传给组件,具体的定义需要配合组件一起使用,例如自定义白名单配置.
            status: {type: Number, default: 1, enum: [0, 1], required: true}, //状态 1:启用 0:禁用
        }, {
            versionKey: false,
            timestamps: {createdAt: 'createDate', updatedAt: 'updateDate'},
            toJSON: HttpComponentHandleRule.toObjectOptions,
            toObject: HttpComponentHandleRule.toObjectOptions
        });

        return this.mongoose.model('http-component-handle-rule', HttpComponentHandleRuleSchema);
    }

    static get toObjectOptions() {
        return {
            transform(doc, ret, options) {
                return Object.assign({ruleId: doc.id}, omit(ret, ['_id']));
            }
        };
    }
}
