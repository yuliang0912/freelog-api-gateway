"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpComponentHandleRule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpComponentHandleRule = void 0;
const lodash_1 = require("lodash");
const midway_1 = require("midway");
const mongoose_model_base_1 = require("./mongoose-model-base");
let HttpComponentHandleRule = HttpComponentHandleRule_1 = class HttpComponentHandleRule extends mongoose_model_base_1.MongooseModelBase {
    buildMongooseModel() {
        const HttpComponentHandleRuleSchema = new this.mongoose.Schema({
            ruleName: { type: String, required: true },
            httpComponentRules: [],
            componentConfig: {},
            status: { type: Number, default: 1, enum: [0, 1], required: true },
        }, {
            versionKey: false,
            timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
            toJSON: HttpComponentHandleRule_1.toObjectOptions,
            toObject: HttpComponentHandleRule_1.toObjectOptions
        });
        return this.mongoose.model('http-component-handle-rule', HttpComponentHandleRuleSchema);
    }
    static get toObjectOptions() {
        return {
            transform(doc, ret, options) {
                return Object.assign({ ruleId: doc.id }, lodash_1.omit(ret, ['_id']));
            }
        };
    }
};
HttpComponentHandleRule = HttpComponentHandleRule_1 = __decorate([
    midway_1.scope(midway_1.ScopeEnum.Singleton),
    midway_1.provide('model.HttpComponentHandleRule')
], HttpComponentHandleRule);
exports.HttpComponentHandleRule = HttpComponentHandleRule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jb21wb25lbnQtaGFuZGxlLXJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWwvaHR0cC1jb21wb25lbnQtaGFuZGxlLXJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1DQUE0QjtBQUM1QixtQ0FBaUQ7QUFDakQsK0RBQTRFO0FBSTVFLElBQWEsdUJBQXVCLCtCQUFwQyxNQUFhLHVCQUF3QixTQUFRLHVDQUFpQjtJQUUxRCxrQkFBa0I7UUFFZCxNQUFNLDZCQUE2QixHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDM0QsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO1lBQ3hDLGtCQUFrQixFQUFFLEVBQUU7WUFDdEIsZUFBZSxFQUFFLEVBQUU7WUFDbkIsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDO1NBQ25FLEVBQUU7WUFDQyxVQUFVLEVBQUUsS0FBSztZQUNqQixVQUFVLEVBQUUsRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUM7WUFDOUQsTUFBTSxFQUFFLHlCQUF1QixDQUFDLGVBQWU7WUFDL0MsUUFBUSxFQUFFLHlCQUF1QixDQUFDLGVBQWU7U0FDcEQsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFFRCxNQUFNLEtBQUssZUFBZTtRQUN0QixPQUFPO1lBQ0gsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBTztnQkFDdkIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUMsRUFBRSxhQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9ELENBQUM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUE7QUExQlksdUJBQXVCO0lBRm5DLGNBQUssQ0FBQyxrQkFBUyxDQUFDLFNBQVMsQ0FBQztJQUMxQixnQkFBTyxDQUFDLCtCQUErQixDQUFDO0dBQzVCLHVCQUF1QixDQTBCbkM7QUExQlksMERBQXVCIn0=