"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var HttpComponentHandleRule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpComponentHandleRule = void 0;
const lodash_1 = require("lodash");
const midway_1 = require("midway");
const egg_freelog_base_1 = require("egg-freelog-base");
let HttpComponentHandleRule = HttpComponentHandleRule_1 = class HttpComponentHandleRule extends egg_freelog_base_1.MongooseModelBase {
    constructor(mongoose) {
        super(mongoose);
    }
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
    midway_1.provide('model.HttpComponentHandleRule'),
    __param(0, midway_1.plugin('mongoose')),
    __metadata("design:paramtypes", [Object])
], HttpComponentHandleRule);
exports.HttpComponentHandleRule = HttpComponentHandleRule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jb21wb25lbnQtaGFuZGxlLXJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWwvaHR0cC1jb21wb25lbnQtaGFuZGxlLXJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUE0QjtBQUM1QixtQ0FBeUQ7QUFDekQsdURBQXVFO0FBSXZFLElBQWEsdUJBQXVCLCtCQUFwQyxNQUFhLHVCQUF3QixTQUFRLG9DQUFpQjtJQUUxRCxZQUFnQyxRQUFRO1FBQ3BDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsa0JBQWtCO1FBRWQsTUFBTSw2QkFBNkIsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzNELFFBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztZQUN4QyxrQkFBa0IsRUFBRSxFQUFFO1lBQ3RCLGVBQWUsRUFBRSxFQUFFO1lBQ25CLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQztTQUNuRSxFQUFFO1lBQ0MsVUFBVSxFQUFFLEtBQUs7WUFDakIsVUFBVSxFQUFFLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFDO1lBQzlELE1BQU0sRUFBRSx5QkFBdUIsQ0FBQyxlQUFlO1lBQy9DLFFBQVEsRUFBRSx5QkFBdUIsQ0FBQyxlQUFlO1NBQ3BELENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRUQsTUFBTSxLQUFLLGVBQWU7UUFDdEIsT0FBTztZQUNILFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU87Z0JBQ3ZCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFDLEVBQUUsYUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRCxDQUFDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSixDQUFBO0FBOUJZLHVCQUF1QjtJQUZuQyxjQUFLLENBQUMsa0JBQVMsQ0FBQyxTQUFTLENBQUM7SUFDMUIsZ0JBQU8sQ0FBQywrQkFBK0IsQ0FBQztJQUd4QixXQUFBLGVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTs7R0FGdEIsdUJBQXVCLENBOEJuQztBQTlCWSwwREFBdUIifQ==